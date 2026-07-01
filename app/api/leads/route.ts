import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

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
const DEFAULT_LEAD_EMAIL_TO = 'kian@apexportfolio.me';

type Lead = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  source: string;
  page: string;
  referrer: string;
  consent: boolean;
};

type LeadPayload = {
  event: 'lead.submitted';
  lead: Lead;
  attribution: {
    utm: Record<string, string>;
    userAgent: string;
    ip: string;
  };
  automation: {
    score: number;
    priority: string;
    tags: string[];
    recommendedWorkflow: string;
  };
};

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatValue(value: string | number | boolean | undefined) {
  if (value === undefined || value === '') {
    return 'Not provided';
  }

  return String(value);
}

function formatSubject(payload: LeadPayload) {
  const { lead, automation } = payload;
  const identity = [lead.name, lead.company].filter(Boolean).join(' / ') || lead.email;

  return `[${automation.priority.toUpperCase()}] Apex website lead: ${identity}`.replace(
    /[\r\n]+/g,
    ' ',
  );
}

function formatLeadEmail(payload: LeadPayload) {
  const { lead, attribution, automation } = payload;
  const fields = [
    ['Priority', `${automation.priority.toUpperCase()} (${automation.score}/100)`],
    ['Recommended workflow', automation.recommendedWorkflow],
    ['Name', lead.name],
    ['Email', lead.email],
    ['Company', lead.company],
    ['Role', lead.role],
    ['Phone', lead.phone],
    ['Project type', lead.projectType],
    ['Budget', lead.budget],
    ['Timeline', lead.timeline],
    ['Source', lead.source],
    ['Page', lead.page],
    ['Referrer', lead.referrer],
    ['Consent', lead.consent],
    ['Submitted at', lead.submittedAt],
    ['Lead ID', lead.id],
    ['IP', attribution.ip],
    ['User agent', attribution.userAgent],
    ['UTM', JSON.stringify(attribution.utm)],
    ['Tags', automation.tags.join(', ')],
  ];

  const text = [
    'New Apex website lead',
    '',
    ...fields.map(([label, value]) => `${label}: ${formatValue(value)}`),
    '',
    'Message:',
    formatValue(lead.message),
  ].join('\n');

  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;white-space:nowrap;">${escapeHtml(String(label))}</th>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#374151;">${escapeHtml(formatValue(value))}</td>
        </tr>`,
    )
    .join('');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111827;line-height:1.5;">
      <h1 style="font-size:22px;margin:0 0 16px;">New Apex website lead</h1>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:760px;border:1px solid #e5e7eb;">
        ${rows}
      </table>
      <h2 style="font-size:16px;margin:24px 0 8px;">Message</h2>
      <div style="white-space:pre-wrap;padding:12px;border:1px solid #e5e7eb;background:#f9fafb;color:#374151;">${escapeHtml(formatValue(lead.message))}</div>
    </div>`;

  return { text, html };
}

async function sendLeadEmail(payload: LeadPayload) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.LEAD_EMAIL_TO || DEFAULT_LEAD_EMAIL_TO;

  if (!host || !user || !pass || !to) {
    return { configured: false, delivered: false };
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE === undefined ? port === 465 : process.env.SMTP_SECURE === 'true';
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
  const { text, html } = formatLeadEmail(payload);

  await transporter.sendMail({
    from: process.env.LEAD_EMAIL_FROM || `APEX Leads <${user}>`,
    to,
    replyTo: payload.lead.email,
    subject: formatSubject(payload),
    text,
    html,
  });

  return { configured: true, delivered: true };
}

async function postWebhook(payload: LeadPayload) {
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
  const payload: LeadPayload = {
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

  const [webhookResult, emailResult] = await Promise.allSettled([
    postWebhook(payload),
    sendLeadEmail(payload),
  ]);

  const webhookDelivery =
    webhookResult.status === 'fulfilled'
      ? webhookResult.value
      : { configured: true, delivered: false };
  const emailDelivery =
    emailResult.status === 'fulfilled' ? emailResult.value : { configured: true, delivered: false };

  if (webhookResult.status === 'rejected') {
    console.error('Lead automation webhook error:', webhookResult.reason);
  }

  if (emailResult.status === 'rejected') {
    console.error('Lead notification email error:', emailResult.reason);
  }

  if (webhookResult.status === 'rejected' && process.env.REQUIRE_LEAD_WEBHOOK === 'true') {
    return NextResponse.json(
      { ok: false, error: 'Lead automation delivery failed.' },
      { status: 502 },
    );
  }

  if (emailResult.status === 'rejected' && process.env.REQUIRE_LEAD_EMAIL === 'true') {
    return NextResponse.json({
      ok: false,
      error: 'Lead notification email failed.',
    }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    leadId: lead.id,
    delivery: {
      webhook: webhookDelivery,
      email: emailDelivery,
    },
    priority,
  });
}
