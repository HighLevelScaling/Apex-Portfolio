'use client';

import { motion } from 'framer-motion';

const ORBS = [
  {
    left: '12%', top: '30%', w: '55vw', h: '50vw', maxW: 700, maxH: 600,
    color: 'rgba(99,102,241,0.11)', dur: 22,
    tx: [0, 70, 20, -50, 0], ty: [0, 40, -70, 15, 0],
    scale: [1, 1.08, 0.96, 1.04, 1],
  },
  {
    left: '65%', top: '55%', w: '60vw', h: '55vw', maxW: 750, maxH: 680,
    color: 'rgba(168,85,247,0.08)', dur: 28,
    tx: [0, -60, -15, 45, 0], ty: [0, -45, 35, -25, 0],
    scale: [1, 0.94, 1.06, 1.02, 1],
  },
  {
    left: '45%', top: '5%', w: '40vw', h: '40vw', maxW: 500, maxH: 500,
    color: 'rgba(59,130,246,0.09)', dur: 18,
    tx: [0, 35, -25, 10, 0], ty: [0, 55, 25, -35, 0],
    scale: [1, 1.1, 0.98, 1.06, 1],
  },
  {
    left: '82%', top: '35%', w: '38vw', h: '38vw', maxW: 480, maxH: 480,
    color: 'rgba(99,102,241,0.07)', dur: 24,
    tx: [0, -45, 25, 30, 0], ty: [0, 30, -55, 45, 0],
    scale: [1, 1.05, 0.93, 1.08, 1],
  },
  {
    left: '5%', top: '68%', w: '35vw', h: '35vw', maxW: 420, maxH: 420,
    color: 'rgba(204,255,0,0.045)', dur: 32,
    tx: [0, 55, 10, -30, 0], ty: [0, -35, -65, 20, 0],
    scale: [1, 0.97, 1.07, 0.99, 1],
  },
];

const PARTICLES = [
  { left: '8%',  top: '48%', s: 3, color: 'rgba(99,102,241,0.7)',  dur: 6,  delay: 0   },
  { left: '22%', top: '72%', s: 2, color: 'rgba(168,85,247,0.6)', dur: 8,  delay: 1   },
  { left: '35%', top: '32%', s: 4, color: 'rgba(59,130,246,0.65)', dur: 7,  delay: 2   },
  { left: '52%', top: '82%', s: 2, color: 'rgba(99,102,241,0.55)', dur: 9,  delay: 0.5 },
  { left: '64%', top: '22%', s: 3, color: 'rgba(204,255,0,0.5)',   dur: 6,  delay: 3   },
  { left: '76%', top: '63%', s: 2, color: 'rgba(168,85,247,0.65)', dur: 8,  delay: 1.5 },
  { left: '88%', top: '42%', s: 3, color: 'rgba(59,130,246,0.6)',  dur: 7,  delay: 4   },
  { left: '4%',  top: '57%', s: 2, color: 'rgba(99,102,241,0.5)',  dur: 10, delay: 2.5 },
  { left: '47%', top: '12%', s: 4, color: 'rgba(168,85,247,0.6)',  dur: 6,  delay: 0.8 },
  { left: '93%', top: '78%', s: 2, color: 'rgba(204,255,0,0.4)',   dur: 9,  delay: 3.5 },
  { left: '30%', top: '90%', s: 3, color: 'rgba(99,102,241,0.55)', dur: 7,  delay: 1.2 },
  { left: '60%', top: '40%', s: 2, color: 'rgba(59,130,246,0.65)', dur: 8,  delay: 4.5 },
  { left: '18%', top: '14%', s: 3, color: 'rgba(168,85,247,0.5)',  dur: 6,  delay: 2   },
  { left: '72%', top: '87%', s: 2, color: 'rgba(99,102,241,0.55)', dur: 10, delay: 0.3 },
  { left: '40%', top: '58%', s: 4, color: 'rgba(204,255,0,0.35)',  dur: 7,  delay: 5   },
  { left: '55%', top: '5%',  s: 2, color: 'rgba(59,130,246,0.5)',  dur: 8,  delay: 1.8 },
  { left: '14%', top: '38%', s: 3, color: 'rgba(99,102,241,0.6)',  dur: 6,  delay: 3.2 },
  { left: '83%', top: '20%', s: 2, color: 'rgba(168,85,247,0.55)', dur: 9,  delay: 0.6 },
];

const RINGS = [
  { dur: 4,  delay: 0,   opacity: 0.12 },
  { dur: 4,  delay: 1.3, opacity: 0.08 },
  { dur: 4,  delay: 2.6, opacity: 0.05 },
];

const H_LINES = [
  { top: '18%', delay: 0,   dur: 5 },
  { top: '38%', delay: 1.8, dur: 6 },
  { top: '62%', delay: 3.5, dur: 5 },
  { top: '78%', delay: 2.2, dur: 7 },
];

const V_LINES = [
  { left: '22%', delay: 1,   dur: 6 },
  { left: '48%', delay: 2.8, dur: 5 },
  { left: '76%', delay: 0.5, dur: 7 },
];

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>

      {/* ── Drifting gradient orbs ── */}
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
            filter: 'blur(90px)',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ x: orb.tx, y: orb.ty, scale: orb.scale }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Expanding pulse rings from center ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        {RINGS.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-indigo-500/20"
            style={{ width: 80, height: 80 }}
            animate={{ scale: [1, 8], opacity: [ring.opacity, 0] }}
            transition={{
              duration: ring.dur,
              delay: ring.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* ── Subtle grid lines ── */}
      {H_LINES.map((line, i) => (
        <motion.div
          key={`h${i}`}
          className="absolute left-0 right-0 h-px"
          style={{
            top: line.top,
            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 100%)',
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: line.dur, delay: line.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {V_LINES.map((line, i) => (
        <motion.div
          key={`v${i}`}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: line.left,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 100%)',
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: line.dur, delay: line.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

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
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.4, 0.5],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Corner accent lines ── */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-indigo-500/40 to-transparent" />
        <div className="absolute top-8 left-8 h-16 w-px bg-gradient-to-b from-indigo-500/40 to-transparent" />
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute top-8 right-8 w-16 h-px bg-gradient-to-l from-purple-500/40 to-transparent" />
        <div className="absolute top-8 right-8 h-16 w-px bg-gradient-to-b from-purple-500/40 to-transparent" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute bottom-8 left-8 w-16 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
        <div className="absolute bottom-8 left-8 h-16 w-px bg-gradient-to-t from-blue-500/40 to-transparent" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-indigo-500/30 to-transparent" />
        <div className="absolute bottom-8 right-8 h-16 w-px bg-gradient-to-t from-indigo-500/30 to-transparent" />
      </motion.div>

      {/* ── Vignette overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,5,5,0.6) 100%)',
        }}
      />
    </div>
  );
}
