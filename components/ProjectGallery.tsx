'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  client: string;
  title: string;
  category: string;
  image: string;
  color: string;
  description: string;
  tech: string[];
  year: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [delayedInView, setDelayedInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px', amount: 0.3 });

  // Apply 1s delay to scroll-triggered activation
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setDelayedInView(true), 1000);
      return () => clearTimeout(t);
    } else {
      setDelayedInView(false);
    }
  }, [inView]);

  const active = delayedInView || hovered;

  return (
    <motion.div
      ref={ref}
      key={project.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className="group relative cursor-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Project number */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/15 text-[9px] uppercase tracking-[0.5em] font-sans font-mono">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-white/15 text-[9px] uppercase tracking-[0.4em] font-sans">
          {project.year}
        </span>
      </div>

      {/* Image card */}
      <div className="relative h-[420px] md:h-[480px] w-full overflow-hidden">

        {/* Dark overlay — lifts when in view */}
        <div
          className="absolute inset-0 z-10 transition-all duration-700"
          style={{ background: active ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.5)' }}
        />

        {/* Color accent line at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-30 transition-all duration-500"
          style={{
            background: project.color,
            opacity: active ? 1 : 0,
            transform: active ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
          }}
        />

        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={80}
          priority={index < 2}
          className="object-cover transition-all duration-700"
          style={{
            transform: active ? 'scale(1.05)' : 'scale(1)',
            filter: active ? 'grayscale(0%)' : 'grayscale(100%)',
          }}
        />

        {/* Overlay content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-7">

          {/* Tech chips — visible when in view */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap gap-2 mb-5"
              >
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 border font-sans"
                    style={{ borderColor: `${project.color}50`, color: project.color, background: `${project.color}10` }}
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Client label */}
          <AnimatePresence>
            {active && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] font-bold uppercase tracking-[0.5em] mb-2 font-sans"
                style={{ color: project.color }}
              >
                {project.client}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-black text-white leading-tight font-sans tracking-tight mb-3">
            {project.title}
          </h3>

          {/* Description — on active */}
          <AnimatePresence>
            {active && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/55 text-xs leading-relaxed font-sans mb-4 max-w-sm overflow-hidden"
              >
                {project.description}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Footer row */}
          <div className="flex justify-between items-center border-t border-white/15 pt-4">
            <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-sans">
              {project.category}
            </span>
            <span
              className="text-lg transition-all duration-200"
              style={{ color: active ? project.color : 'rgba(255,255,255,0.6)' }}
            >
              ↗
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const activeProject = projects[0]; // fallback for background wash

  return (
    <section className="relative w-full bg-[#050505] py-20 px-4 md:px-12 overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <div className="flex items-end justify-between border-b border-white/[0.07] pb-5 mb-14">
          <h2 className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-sans">
            Selected Works
          </h2>
          <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-sans">
            2024–2025 /// {projects.length} Projects
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
