'use client';

import { useEffect, useRef, useState } from 'react';

const REEL_PLAYED_KEY = 'apex_product_reel_played';
const REEL_CAPTIONS = [
  {
    title: 'AI Economic Agent',
    label: 'Autonomous coworker that prices its own work',
  },
  {
    title: 'Fraud Detection AI',
    label: 'Claim risk scoring with explainable AI flags',
  },
  {
    title: 'Hyperlocal Nightlife',
    label: 'Predictive social heat map for local venues',
  },
  {
    title: 'Unified Ops Dashboard',
    label: 'Deploys, revenue, analytics, and campaigns in one AI cockpit',
  },
  {
    title: 'The Sneaker Exchange',
    label: 'Live marketplace intelligence for bids, pricing, and trust',
  },
  {
    title: 'AI Onboarding Platform',
    label: 'Adaptive hire concierge from offer to day 90',
  },
  {
    title: 'Content Protection Suite',
    label: 'AI provenance, watermarks, fingerprints, and metadata',
  },
  {
    title: 'Agent Swarm Engine',
    label: 'Specialist agents plan, critique, execute, and self-correct',
  },
  {
    title: 'E-Commerce Arbitrage',
    label: 'AI deal desk for margin, velocity, and risk',
  },
  {
    title: 'Market Signal Tracker',
    label: 'Narrative alerts for pattern shifts and trader action',
  },
];

export default function ProductReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [playedThisVisit, setPlayedThisVisit] = useState(false);
  const [activeCaptionIndex, setActiveCaptionIndex] = useState(0);
  const activeCaption = REEL_CAPTIONS[activeCaptionIndex];

  useEffect(() => {
    const alreadyPlayed = window.sessionStorage.getItem(REEL_PLAYED_KEY) === 'true';

    if (alreadyPlayed) {
      setPlayedThisVisit(true);
      return;
    }

    setShouldAutoplay(true);
  }, []);

  useEffect(() => {
    if (!shouldAutoplay || playedThisVisit) {
      return;
    }

    videoRef.current?.play().catch(() => {
      setShouldAutoplay(false);
    });
  }, [playedThisVisit, shouldAutoplay]);

  function markPlayed() {
    window.sessionStorage.setItem(REEL_PLAYED_KEY, 'true');
  }

  function handleEnded() {
    markPlayed();
    setShouldAutoplay(false);
    setPlayedThisVisit(true);
    setActiveCaptionIndex(REEL_CAPTIONS.length - 1);
  }

  function handleTimeUpdate() {
    const currentTime = videoRef.current?.currentTime ?? 0;
    const nextIndex = Math.min(REEL_CAPTIONS.length - 1, Math.floor(currentTime));

    setActiveCaptionIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505] px-4 py-20 md:px-12">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(204,255,0,0.06) 0%, transparent 42%), radial-gradient(ellipse at 80% 70%, rgba(99,102,241,0.08) 0%, transparent 45%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.55em] text-[#CCFF00]">
              Kian&apos;s Top 10 So Far
            </p>
            <h2 className="font-sans text-3xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
              60+ AI Operating Systems Built
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
              Ten selected builds from a wider catalog of AI systems designed for businesses
              that need better intake, analysis, automation, reporting, and decision support.
            </p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/25">
            Automation / Ops / Growth
          </p>
        </div>

        <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay={shouldAutoplay}
            controls={!playedThisVisit}
            muted
            playsInline
            preload="metadata"
            poster="/images/3d-ai-agent.webp"
            aria-label="Automated reel showing Kian's top ten selected AI operating system builds so far."
            onPlay={markPlayed}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src="/videos/product-reel.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/10" />

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-4 py-4 md:px-6">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/60">
              Kian&apos;s Top 10
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#CCFF00]">
              60+ Systems Built
            </span>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-4 max-w-[720px] md:bottom-8 md:left-8">
            <div className="inline-flex border border-[#CCFF00]/35 bg-black/72 px-3 py-2 text-[9px] font-black uppercase tracking-[0.34em] text-[#CCFF00] backdrop-blur-sm">
              AI Operating System
            </div>
            <div className="mt-3 max-w-[92vw] border border-white/12 bg-black/72 p-4 backdrop-blur-sm md:p-5">
              <h3 className="text-2xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
                {activeCaption.title}
              </h3>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-white/72 md:text-sm">
                {activeCaption.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
