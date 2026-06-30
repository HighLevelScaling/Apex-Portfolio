'use client';

import { useEffect, useRef, useState } from 'react';

const REEL_PLAYED_KEY = 'apex_product_reel_played';

export default function ProductReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [playedThisVisit, setPlayedThisVisit] = useState(false);

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
              A six-second pass through ten selected product builds from AI operating systems
              built for businesses across automation, operations, marketplaces, security,
              finance, and growth.
            </p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/25">
            Plays once per visit
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
            aria-label="Six second automated reel showing Kian's top ten selected product builds so far."
            onPlay={markPlayed}
            onEnded={handleEnded}
          >
            <source src="/videos/product-reel.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/55 to-transparent px-4 py-4 md:px-6">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/55">
              Apex Index
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#CCFF00]">
              00:06 Film
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
