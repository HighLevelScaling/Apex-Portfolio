import { NextResponse } from 'next/server';

type RawLeadBody = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  role?: unknown;
  phone?: unknown;
  projectType?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  source?: unknown;
  page?: unknown;
  referrer?: unknown;
  consent?: unknown;
  website?: unknown;
  utm?: Record<string, unknown>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_LIMIT = 500;
const MESSAGE_LIMIT = 2500;

function cleanString(value: unknown, limit = FIELD_LIMIT) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim().slice(0, limit);
}

function cleanUtm(value: unknown) {
  if (!value || typeof value !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => key.startsWith('utm_'))
      .map(([key, val]) => [key, cleanString(val, 160)])
      .filter(([, val]) => val.length > 0),
  );
}

function scoreLead(lead: {
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  source: string;
}) {
  let score = 25;

  if (lead.company) score += 10;
  if (lead.projectType) score += 10;
  if (lead.message.length > 80) score += 15;
  if (/10k|15k|25k|50k|enterprise|retainer/i.test(lead.budget)) score += 20;
  if (/now|asap|this month|30 days|2 weeks/i.test(lead.timeline)) score += 15;
  if (/popup|footer|hero/i.test(lead.source)) score += 5;

  return Math.min(score, 100);
}

function leadPriority(score: number) {
  if (score >= 75) return 'hot';
  if (score >= 50) return 'warm';
  return 'nurture';
}

async function postWebhook(payload: Record<string, unknown>) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return { configured: false, delivered: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Lead webhook failed with ${response.status}`);
    }

    return { configured: true, delivered: true };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  let body: RawLeadBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (cleanString(body.website)) {
    return NextResponse.json({ ok: true, queued: true });
  }

  const email = cleanString(body.email, 320).toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email is required.' }, { status: 400 });
  }

  const lead = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name: cleanString(body.name),
    email,
    company: cleanString(body.company),
    role: cleanString(body.role),
    phone: cleanString(body.phone, 80),
    projectType: cleanString(body.projectType),
    budget: cleanString(body.budget),
    timeline: cleanString(body.timeline),
    message: cleanString(body.message, MESSAGE_LIMIT),
    source: cleanString(body.source) || 'website',
    page: cleanString(body.page, 1000),
    referrer: cleanString(body.referrer, 1000),
    consent: body.consent === true,
  };

  const score = scoreLead(lead);
  const priority = leadPriority(score);
  const headers = request.headers;
  const payload = {
    event: 'lead.submitted',
    lead,
    attribution: {
      utm: cleanUtm(body.utm),
      userAgent: cleanString(headers.get('user-agent'), 500),
      ip:
        cleanString(headers.get('x-forwarded-for'), 160).split(',')[0] ||
        cleanString(headers.get('x-real-ip'), 160),
    },
    automation: {
      score,
      priority,
      tags: [
        'website-lead',
        `source:${lead.source}`,
        `priority:${priority}`,
        lead.projectType ? `project:${lead.projectType.toLowerCase().replace(/\s+/g, '-')}` : '',
      ].filter(Boolean),
      recommendedWorkflow:
        priority === 'hot'
          ? 'instant-founder-follow-up'
          : priority === 'warm'
            ? 'same-day-discovery-sequence'
            : 'lead-nurture-sequence',
    },
  };

  try {
    const delivery = await postWebhook(payload);

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      delivery,
      priority,
    });
  } catch (error) {
    console.error('Lead automation webhook error:', error);

    if (process.env.REQUIRE_LEAD_WEBHOOK === 'true') {
      return NextResponse.json(
        { ok: false, error: 'Lead automation delivery failed.' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      delivery: { configured: true, delivered: false },
      priority,
    });
  }
}
