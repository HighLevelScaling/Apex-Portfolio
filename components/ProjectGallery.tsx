'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const hovered = projects.find(p => p.id === hoveredProject);

  return (
    <section className="relative w-full bg-[#050505] py-20 px-4 md:px-12 overflow-hidden">

      {/* Global color wash behind the whole grid */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out"
        style={{
          background: hovered
            ? `radial-gradient(ellipse at 50% 50%, ${hovered.color}12 0%, transparent 65%)`
            : 'transparent',
          opacity: hovered ? 1 : 0,
        }}
      />

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
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-80px' }}
              className="group relative cursor-none"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
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

                {/* Dark overlay that lifts on hover */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-all duration-700 z-10" />

                {/* Color accent line at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] z-30 transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: project.color }}
                />

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />

                {/* Overlay content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-7">

                  {/* Tech chips — visible on hover */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
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
                    {hoveredProject === project.id && (
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

                  {/* Description — on hover */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
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
                    <motion.span
                      animate={{ x: hoveredProject === project.id ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-white/60 text-lg"
                      style={{ color: hoveredProject === project.id ? project.color : undefined }}
                    >
                      ↗
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
