'use client';

import { motion } from 'framer-motion';

// Reduced to 3 orbs — enough for the effect, won't kill mobile GPUs
const ORBS = [
  {
    left: '15%', top: '35%', w: '50vw', h: '45vw', maxW: 600, maxH: 550,
    color: 'rgba(99,102,241,0.12)', dur: 24,
    tx: [0, 60, -30, 0], ty: [0, 30, -50, 0],
  },
  {
    left: '70%', top: '50%', w: '55vw', h: '50vw', maxW: 650, maxH: 600,
    color: 'rgba(168,85,247,0.09)', dur: 30,
    tx: [0, -50, 20, 0], ty: [0, -40, 30, 0],
  },
  {
    left: '45%', top: '10%', w: '40vw', h: '40vw', maxW: 480, maxH: 480,
    color: 'rgba(59,130,246,0.08)', dur: 20,
    tx: [0, 30, -20, 0], ty: [0, 50, -30, 0],
  },
];

// Reduced to 6 particles — still looks alive, 3x less GPU work
const PARTICLES = [
  { left: '12%', top: '45%', s: 3, color: 'rgba(99,102,241,0.7)',  dur: 6,  delay: 0   },
  { left: '35%', top: '30%', s: 4, color: 'rgba(59,130,246,0.65)', dur: 7,  delay: 1.5 },
  { left: '62%', top: '20%', s: 3, color: 'rgba(204,255,0,0.5)',   dur: 6,  delay: 2.8 },
  { left: '78%', top: '60%', s: 2, color: 'rgba(168,85,247,0.65)', dur: 8,  delay: 0.8 },
  { left: '50%', top: '80%', s: 3, color: 'rgba(99,102,241,0.55)', dur: 9,  delay: 4   },
  { left: '88%', top: '38%', s: 2, color: 'rgba(59,130,246,0.6)',  dur: 7,  delay: 3.2 },
];

// Single pulse ring — enough for the effect
const RINGS = [
  { dur: 4, delay: 0,   opacity: 0.1 },
  { dur: 4, delay: 2,   opacity: 0.06 },
];

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>

      {/* ── Drifting gradient orbs — will-change forces GPU layer ── */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.w,
            height: orb.h,
            maxWidth: orb.maxW,
            maxHeight: orb.maxH,
            background: orb.color,
            filter: 'blur(80px)',
            translateX: '-50%',
            translateY: '-50%',
            willChange: 'transform',
          }}
          animate={{ x: orb.tx, y: orb.ty }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Pulse rings ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        {RINGS.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-indigo-500/20"
            style={{ width: 80, height: 80, willChange: 'transform, opacity' }}
            animate={{ scale: [1, 8], opacity: [ring.opacity, 0] }}
            transition={{ duration: ring.dur, delay: ring.delay, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* ── Floating micro-particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={`p${i}`}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.s,
            height: p.s,
            background: p.color,
            boxShadow: `0 0 ${p.s * 4}px ${p.color}`,
            willChange: 'transform, opacity',
          }}
          animate={{ y: [0, -28, 0], opacity: [0, 1, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Corner accents — pure CSS, zero JS ── */}
      <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-indigo-500/40 to-transparent animate-pulse" />
      <div className="absolute top-8 left-8 h-16 w-px bg-gradient-to-b from-indigo-500/40 to-transparent animate-pulse" />
      <div className="absolute top-8 right-8 w-16 h-px bg-gradient-to-l from-purple-500/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-8 right-8 h-16 w-px bg-gradient-to-b from-purple-500/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-8 left-8 w-16 h-px bg-gradient-to-r from-blue-500/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-indigo-500/25 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,5,5,0.6) 100%)' }}
      />
    </div>
  );
}
