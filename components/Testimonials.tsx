'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const TESTIMONIALS = [
  {
    quote: "Kian is the best business developer and builder I've ever worked with. He doesn't just write code — he thinks like an operator. Every product he shipped for us was designed to convert, retain, and scale.",
    name: 'Marcus Reid',
    title: 'CEO, Scaleworks Capital',
    accent: '#00FF88',
  },
  {
    quote: "This guy knows how to build businesses that generate real MRR — and sell them. I was actively looking to acquire a ready-made company and Kian had exactly that: a clean codebase, predictable revenue, and a hand-off that took 48 hours. Best acquisition I've made.",
    name: 'Jonathan Voss',
    title: 'CEO & Serial Acquirer',
    accent: '#6366F1',
  },
  {
    quote: "Working with Kian felt like hiring a founding CTO and a growth hacker at the same time. He architected our entire AI backend in three weeks and had us charging customers by week four. That velocity is rare.",
    name: 'Priya Anand',
    title: 'Founder, Lumen AI',
    accent: '#A855F7',
  },
  {
    quote: "Most developers build features. Kian builds leverage. He came in, understood exactly what our enterprise clients needed, and shipped a product that let us close $200K in contracts within the first quarter.",
    name: 'Derek Okafor',
    title: 'VP of Product, ClientGuard',
    accent: '#3B82F6',
  },
  {
    quote: "I've worked with dozens of agencies and freelancers. Kian is categorically different. He thinks in systems, moves fast, and takes ownership like a co-founder — not a contractor.",
    name: 'Sofia Marchetti',
    title: 'COO, NovaStack',
    accent: '#CCFF00',
  },
  {
    quote: "We came to Kian with a rough idea and a deadline. He came back with a fully working MVP, a growth strategy, and a pitch deck. The man builds things that actually ship — and actually sell.",
    name: 'Tyler Wren',
    title: 'Partner, Westbridge Ventures',
    accent: '#F59E0B',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Testimonials() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/25 text-[10px] uppercase tracking-[0.6em] mb-4 font-sans">
            Social Proof
          </p>
          <h2
            className="text-white font-black tracking-tighter leading-none font-sans"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            WHAT THEY SAY
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative bg-[#050505] p-8 lg:p-10 flex flex-col gap-6 group transition-colors duration-300"
              style={{
                background: hovered === i
                  ? `linear-gradient(135deg, rgba(5,5,5,1) 0%, ${t.accent}08 100%)`
                  : '#050505',
              }}
            >
              {/* Accent top bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: t.accent }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Quote mark */}
              <span
                className="text-5xl font-black leading-none select-none"
                style={{ color: t.accent, opacity: 0.25 }}
              >
                "
              </span>

              {/* Quote text */}
              <p className="text-white/55 text-sm leading-relaxed font-sans flex-1">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                {/* Avatar initial */}
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-black shrink-0"
                  style={{ background: `${t.accent}18`, color: t.accent, border: `1px solid ${t.accent}30` }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white/80 text-xs font-bold tracking-wide">{t.name}</div>
                  <div className="text-white/30 text-[10px] uppercase tracking-[0.3em]">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
