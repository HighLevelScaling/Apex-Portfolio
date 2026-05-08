import ProjectGallery from '@/components/ProjectGallery';
import CustomCursor from '@/components/CustomCursor';

const projects = [
  {
    id: '1',
    client: 'CLAWWORK',
    title: 'AI Economic Agent',
    category: 'Autonomous AI Systems',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=2032&auto=format&fit=crop',
    color: '#00FF88',
    description: 'Autonomous AI coworker that completes real-world professional tasks, earns income, and manages its own token budget to stay solvent.',
    tech: ['Python', 'Claude API', 'LangChain', 'Multi-Agent'],
    year: '2025',
  },
  {
    id: '2',
    client: 'CLIENTGUARD',
    title: 'Fraud Detection AI',
    category: 'AI · FinTech · Insurance',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    color: '#3B82F6',
    description: 'AI-powered fraud detection platform helping insurance companies save $500K–2M annually with 90%+ accuracy across pet, event, cyber, and specialty lines.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'ML/AI'],
    year: '2025',
  },
  {
    id: '3',
    client: 'FLOC',
    title: 'Hyperlocal Nightlife',
    category: 'Mobile · Social Discovery',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop',
    color: '#A855F7',
    description: 'Feel where your people go. A hyperlocal discovery app for small cities — find venues, see crowd levels, and know exactly where your contacts are going out tonight.',
    tech: ['React Native', 'Node.js', 'Maps API', 'PostgreSQL'],
    year: '2025',
  },
  {
    id: '4',
    client: 'COMMANDCENTER',
    title: 'Unified Ops Dashboard',
    category: 'SaaS · Developer Tools',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    color: '#F59E0B',
    description: 'One pane of glass for engineering teams — Vercel deploys, real-time analytics, Stripe revenue, and Resend email campaigns unified in a single command center.',
    tech: ['Next.js', 'Vercel API', 'Stripe', 'Resend'],
    year: '2024',
  },
  {
    id: '5',
    client: 'SNEAKX',
    title: 'The Sneaker Exchange',
    category: 'Marketplace · Trading',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
    color: '#CCFF00',
    description: 'Neo-brutalist sneaker trading platform. Live price tickers, authentication tags, real-time bids — where streetwear culture meets the precision of a financial exchange.',
    tech: ['React', 'Node.js', 'WebSockets', 'Drizzle ORM'],
    year: '2025',
  },
  {
    id: '6',
    client: 'NAVIGATOR',
    title: 'AI Onboarding Platform',
    category: 'HR Tech · AI Agents',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    color: '#10B981',
    description: 'AI agent-powered employee onboarding that learns company culture, adapts to each new hire, and automates the entire workflow from offer letter to day 90.',
    tech: ['Next.js', 'AI Agents', 'SQLite', 'TypeScript'],
    year: '2024',
  },
  {
    id: '7',
    client: 'GLOWMARK',
    title: 'Content Protection Suite',
    category: 'Security · Creative Tools',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop',
    color: '#EC4899',
    description: 'Watermark and protect your digital content with visible marks, invisible steganographic encoding, and cryptographic metadata signing — all in one suite.',
    tech: ['Next.js', 'Canvas API', 'Crypto', 'Vercel'],
    year: '2025',
  },
  {
    id: '8',
    client: 'ANTIGRAVITY',
    title: 'Agent Swarm Engine',
    category: 'AI Infrastructure',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
    color: '#6366F1',
    description: 'Deploy autonomous Gemini-powered agent swarms for any complex task. Orchestrate specialized AI teams that plan, delegate, execute, and self-correct at scale.',
    tech: ['Python', 'Gemini API', 'Multi-Agent', 'YAML'],
    year: '2025',
  },
  {
    id: '9',
    client: 'WHISTLEBLOW',
    title: 'E-Commerce Arbitrage',
    category: 'Automation · eCommerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    color: '#14B8A6',
    description: 'Automated e-commerce arbitrage engine that scans marketplaces, surfaces price discrepancies, and executes cross-platform trades before the window closes.',
    tech: ['Node.js', 'Puppeteer', 'Redis', 'Docker'],
    year: '2024',
  },
  {
    id: '10',
    client: 'TRADINGWATCHER',
    title: 'Market Signal Tracker',
    category: 'FinTech · Data',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    color: '#F97316',
    description: 'Real-time market signal tracker with custom alert rules, pattern detection across assets, and a clean dashboard built for serious traders who move fast.',
    tech: ['Next.js', 'WebSockets', 'Charts', 'PostgreSQL'],
    year: '2024',
  },
];

const STACK = [
  'Next.js', 'TypeScript', 'Python', 'Claude API', 'Gemini', 'Prisma',
  'PostgreSQL', 'React Native', 'WebSockets', 'Drizzle ORM', 'Framer Motion',
  'Stripe', 'Vercel', 'LangChain', 'Multi-Agent AI', 'Docker', 'Redis',
];

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <CustomCursor />

      {/* ── HERO ── */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[140px] animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)' }} />

        {/* Corner labels */}
        <div className="absolute top-8 left-8 text-white/20 text-[10px] uppercase tracking-[0.4em] font-sans">
          Portfolio 2024–2025
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

      {/* ── PORTFOLIO GRID ── */}
      <ProjectGallery projects={projects} />

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
          href="mailto:hello@apex.dev"
          className="inline-block px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.4em] hover:bg-[#CCFF00] transition-colors duration-300"
        >
          Get In Touch ↗
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
