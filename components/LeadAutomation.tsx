'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { AnimatePresence, motion } from 'framer-motion';
import LeadCaptureForm from './LeadCaptureForm';

const STORAGE_KEY = 'apex_lead_popup_state';
const DISMISS_WINDOW_MS = 1000 * 60 * 60 * 24 * 7;

type PopupState = {
  dismissedAt?: number;
  submittedAt?: number;
};

function getPopupState(): PopupState {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function setPopupState(state: PopupState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function canShowPopup() {
  const state = getPopupState();
  const lastAction = state.submittedAt || state.dismissedAt || 0;

  return Date.now() - lastAction > DISMISS_WINDOW_MS;
}

export default function LeadAutomation() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('popup_timed');
  const shownRef = useRef(false);

  useEffect(() => {
    if (!canShowPopup()) return;

    const show = (nextSource: string) => {
      if (shownRef.current || !canShowPopup()) return;

      shownRef.current = true;
      setSource(nextSource);
      setOpen(true);
      track('lead_popup_viewed', { source: nextSource });
    };

    const timer = window.setTimeout(() => show('popup_timed'), 12000);

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      if (window.scrollY / scrollable > 0.55) {
        show('popup_scroll_depth');
      }
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        show('popup_exit_intent');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  function dismiss() {
    setPopupState({ ...getPopupState(), dismissedAt: Date.now() });
    setOpen(false);
    track('lead_popup_dismissed', { source });
  }

  function handleSuccess() {
    setPopupState({ ...getPopupState(), submittedAt: Date.now() });
    window.setTimeout(() => setOpen(false), 1400);
  }

  return (
    <>
      <a
        href="#lead-capture"
        className="fixed bottom-5 right-5 z-40 hidden cursor-pointer border border-white/10 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-black shadow-2xl transition-colors hover:bg-[#CCFF00] md:inline-flex"
        onClick={() => track('lead_floating_cta_clicked', { source: 'floating_cta' })}
      >
        Start Project
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end bg-black/70 px-4 py-4 backdrop-blur-sm sm:items-center sm:justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              aria-label="Close project inquiry popup"
              onClick={dismiss}
            />

            <motion.div
              className="relative w-full max-w-lg border border-white/10 bg-[#050505] p-6 shadow-2xl sm:p-8"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={dismiss}
                className="absolute right-4 top-4 cursor-pointer text-xl leading-none text-white/30 transition-colors hover:text-white"
                aria-label="Close"
              >
                x
              </button>

              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.5em] text-[#CCFF00]">
                Build Intake
              </p>
              <h2
                id="lead-popup-title"
                className="mb-6 max-w-sm font-sans text-3xl font-black leading-none tracking-tight text-white"
              >
                Turn the idea into a build plan.
              </h2>

              <LeadCaptureForm source={source} variant="popup" onSuccess={handleSuccess} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
