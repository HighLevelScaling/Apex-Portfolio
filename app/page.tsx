import ProjectGallery from '@/components/ProjectGallery';
import CustomCursor from '@/components/CustomCursor';
import HeroBackground from '@/components/HeroBackground';
import Testimonials from '@/components/Testimonials';
import LeadAutomation from '@/components/LeadAutomation';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import ProductReel from '@/components/ProductReel';
import { projects } from '@/lib/projects';

const STACK = [
  'Next.js', 'TypeScript', 'Python', 'Claude API', 'Gemini', 'Prisma',
  'PostgreSQL', 'React Native', 'WebSockets', 'Drizzle ORM', 'Framer Motion',
  'Stripe', 'Vercel', 'LangChain', 'Multi-Agent AI', 'Docker', 'Redis',
];

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <CustomCursor />
      <LeadAutomation />

      {/* ── HERO ── */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <HeroBackground />

        {/* Corner labels */}
        <div className="absolute top-8 left-8 text-white/20 text-[10px] uppercase tracking-[0.4em] font-sans">
          Portfolio 2020–2024
        </div>
        <div className="absolute top-8 right-8 text-white/20 text-[10px] uppercase tracking-[0.4em] font-sans">
          {projects.length} Projects
        </div>

        {/* Main hero text */}
        <div className="z-10 text-center px-4 select-none">
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] mb-8 font-sans">
            AI Builder · Full-Stack Developer
          </p>

          <h1 className="text-white font-black tracking-tighter leading-[0.85] font-sans"
            style={{ fontSize: 'clamp(5rem, 18vw, 16rem)' }}>
            APEX
          </h1>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="flex-1 max-w-[120px] h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-white/20 text-[10px] uppercase tracking-[0.5em]">Building the future</span>
            <div className="flex-1 max-w-[120px] h-[1px] bg-gradient-to-l from-transparent to-white/20" />
          </div>

          <p className="text-white/25 text-xs md:text-sm uppercase tracking-[0.4em] font-sans">
            Products at the edge of what&apos;s possible
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#lead-capture"
              className="cursor-pointer bg-white px-7 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-black transition-colors hover:bg-[#CCFF00]"
            >
              Start Project
            </a>
            <a
              href="#selected-work"
              className="cursor-pointer border border-white/10 px-7 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              View Work
            </a>
          </div>
        </div>

        {/* Floating stat pills */}
        <div className="absolute left-8 bottom-1/3 hidden lg:flex flex-col gap-3 animate-float">
          <div className="border border-white/10 bg-white/3 px-4 py-2 rounded-sm backdrop-blur-sm">
            <div className="text-white text-xl font-black">{projects.length}</div>
            <div className="text-white/30 text-[9px] uppercase tracking-widest">Projects</div>
          </div>
          <div className="border border-white/10 bg-white/3 px-4 py-2 rounded-sm backdrop-blur-sm">
            <div className="text-white text-xl font-black">AI</div>
            <div className="text-white/30 text-[9px] uppercase tracking-widest">First</div>
          </div>
        </div>

        <div className="absolute right-8 bottom-1/3 hidden lg:flex flex-col gap-3" style={{ animationDelay: '2s' }}>
          <div className="border border-white/10 bg-white/3 px-4 py-2 rounded-sm backdrop-blur-sm animate-float">
            <div className="text-white text-xl font-black">FS</div>
            <div className="text-white/30 text-[9px] uppercase tracking-widest">Full-Stack</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-white/20 text-[9px] uppercase tracking-[0.5em]">Scroll</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── TECH STACK MARQUEE ── */}
      <div className="overflow-hidden border-y border-white/[0.06] py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...STACK, ...STACK].map((item, i) => (
            <span key={i} className="text-white/15 text-[10px] uppercase tracking-[0.4em] mx-10 font-sans">
              {item} ///
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCT REEL ── */}
      <ProductReel />

      {/* ── PORTFOLIO GRID ── */}
      <div id="selected-work">
        <ProjectGallery projects={projects} />
      </div>

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

      {/* ── LEAD CAPTURE ── */}
      <section
        id="lead-capture"
        className="relative overflow-hidden border-y border-white/[0.06] px-4 py-28 md:px-12"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(204,255,0,0.08) 0%, transparent 35%), radial-gradient(ellipse at 75% 50%, rgba(20,184,166,0.08) 0%, transparent 45%)',
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.6em] text-[#CCFF00]">
              Project Intake
            </p>
            <h2
              className="mb-8 font-sans font-black leading-none tracking-tighter text-white"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)' }}
            >
              BUILD THE SYSTEM.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/45">
              Custom AI agents, full-stack products, internal tools, growth systems,
              and acquisition-ready software with the automation hooks already wired in.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px bg-white/[0.06]">
              {[
                ['24H', 'Reply'],
                ['AI', 'First'],
                ['FS', 'Build'],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#050505] p-5">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="mt-2 text-[9px] uppercase tracking-[0.35em] text-white/25">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-[#080808]/90 p-5 backdrop-blur-sm md:p-8">
            <LeadCaptureForm source="embedded_project_intake" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-32 px-4 text-center border-t border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 60%)' }} />

        <p className="text-white/20 text-[10px] uppercase tracking-[0.6em] mb-6 font-sans">
          Available for new projects
        </p>

        <h2 className="text-white font-black tracking-tighter leading-none font-sans mb-12"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
          LET&apos;S BUILD<br />
          <span className="text-white/20">SOMETHING WILD.</span>
        </h2>

        <a
          href="#lead-capture"
          className="inline-block px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.4em] hover:bg-[#CCFF00] transition-colors duration-300"
        >
          Get In Touch
        </a>

        <div className="mt-20 flex justify-center gap-12 text-white/15 text-[9px] uppercase tracking-[0.4em]">
          <span>© 2025 Apex</span>
          <span>Full-Stack · AI · Products</span>
          <span>Available Now</span>
        </div>
      </footer>
    </main>
  );
}
