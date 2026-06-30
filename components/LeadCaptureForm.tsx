'use client';

import { FormEvent, useState } from 'react';
import { track } from '@vercel/analytics';

type LeadCaptureFormProps = {
  source: string;
  variant?: 'inline' | 'popup';
  onSuccess?: () => void;
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const PROJECT_TYPES = [
  'AI automation',
  'Custom web app',
  'Internal tool',
  'MVP build',
  'Growth system',
  'Acquisition-ready product',
];

const BUDGETS = [
  '$5k-$10k',
  '$10k-$25k',
  '$25k-$50k',
  '$50k+',
  'Retainer',
  'Not sure yet',
];

const TIMELINES = [
  'ASAP',
  '2-4 weeks',
  '1-2 months',
  'This quarter',
  'Exploring',
];

function getAttribution() {
  if (typeof window === 'undefined') {
    return { page: '', referrer: '', utm: {} };
  }

  const params = new URLSearchParams(window.location.search);
  const utm = Object.fromEntries(
    Array.from(params.entries()).filter(([key]) => key.startsWith('utm_')),
  );

  return {
    page: window.location.href,
    referrer: document.referrer,
    utm,
  };
}

export default function LeadCaptureForm({
  source,
  variant = 'inline',
  onSuccess,
}: LeadCaptureFormProps) {
  const [state, setState] = useState<SubmitState>('idle');
  const [error, setError] = useState('');

  const isPopup = variant === 'popup';
  const submitLabel =
    state === 'submitting'
      ? 'SENDING'
      : state === 'success'
        ? 'SENT'
        : isPopup
          ? 'GET THE BUILD PLAN'
          : 'START THE CONVERSATION';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const attribution = getAttribution();
    const payload = {
      source,
      page: attribution.page,
      referrer: attribution.referrer,
      utm: attribution.utm,
      consent: formData.get('consent') === 'on',
      website: formData.get('website'),
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      role: formData.get('role'),
      phone: formData.get('phone'),
      projectType: formData.get('projectType'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'The form could not be sent.');
      }

      track('lead_submitted', {
        source,
        projectType: String(payload.projectType || ''),
        budget: String(payload.budget || ''),
      });

      setState('success');
      form.reset();
      onSuccess?.();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'The form could not be sent.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={isPopup ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4 text-left'}
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className={isPopup ? 'block' : 'block md:col-span-1'}>
        <span className="sr-only">Name</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Name"
          className="w-full cursor-text border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#CCFF00]/70"
        />
      </label>

      <label className={isPopup ? 'block' : 'block md:col-span-1'}>
        <span className="sr-only">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          required
          className="w-full cursor-text border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#CCFF00]/70"
        />
      </label>

      <label className={isPopup ? 'block' : 'block md:col-span-1'}>
        <span className="sr-only">Company</span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company"
          className="w-full cursor-text border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#CCFF00]/70"
        />
      </label>

      <label className={isPopup ? 'block' : 'block md:col-span-1'}>
        <span className="sr-only">Project type</span>
        <select
          name="projectType"
          defaultValue=""
          className="w-full cursor-pointer border border-white/10 bg-[#0a0a0a] px-4 py-4 text-sm text-white/75 outline-none transition-colors focus:border-[#CCFF00]/70"
        >
          <option value="" disabled>
            Project type
          </option>
          {PROJECT_TYPES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {!isPopup && (
        <>
          <label className="block md:col-span-1">
            <span className="sr-only">Budget</span>
            <select
              name="budget"
              defaultValue=""
              className="w-full cursor-pointer border border-white/10 bg-[#0a0a0a] px-4 py-4 text-sm text-white/75 outline-none transition-colors focus:border-[#CCFF00]/70"
            >
              <option value="" disabled>
                Budget
              </option>
              {BUDGETS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block md:col-span-1">
            <span className="sr-only">Timeline</span>
            <select
              name="timeline"
              defaultValue=""
              className="w-full cursor-pointer border border-white/10 bg-[#0a0a0a] px-4 py-4 text-sm text-white/75 outline-none transition-colors focus:border-[#CCFF00]/70"
            >
              <option value="" disabled>
                Timeline
              </option>
              {TIMELINES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className="sr-only">Project notes</span>
            <textarea
              name="message"
              rows={5}
              placeholder="What needs to happen?"
              className="w-full cursor-text resize-none border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#CCFF00]/70"
            />
          </label>
        </>
      )}

      {isPopup && (
        <label className="block">
          <span className="sr-only">Project notes</span>
          <textarea
            name="message"
            rows={3}
            placeholder="What are you building?"
            className="w-full cursor-text resize-none border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#CCFF00]/70"
          />
        </label>
      )}

      <label className={isPopup ? 'flex items-start gap-3' : 'flex items-start gap-3 md:col-span-2'}>
        <input
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 cursor-pointer accent-[#CCFF00]"
        />
        <span className="text-[11px] leading-relaxed text-white/35">
          Send me relevant follow-up about my project.
        </span>
      </label>

      <div className={isPopup ? 'space-y-3' : 'md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center'}>
        <button
          type="submit"
          disabled={state === 'submitting' || state === 'success'}
          className="w-full cursor-pointer bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-black transition-colors hover:bg-[#CCFF00] disabled:cursor-not-allowed disabled:bg-white/25 disabled:text-white/50 sm:w-auto"
        >
          {submitLabel}
        </button>

        <p
          className="min-h-5 text-xs text-white/35"
          role={state === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {state === 'success' && 'Got it. I will follow up shortly.'}
          {state === 'error' && error}
        </p>
      </div>
    </form>
  );
}
