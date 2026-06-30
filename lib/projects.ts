export type Project = {
  id: string;
  slug: string;
  client: string;
  title: string;
  category: string;
  image: string;
  color: string;
  description: string;
  summary: string;
  challenge: string;
  aiTwist: string;
  solution: string;
  outcome: string;
  tech: string[];
  year: string;
};

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ai-economic-agent',
    client: 'CLAWWORK',
    title: 'AI Economic Agent',
    category: 'Autonomous AI Systems',
    image: '/images/3d-ai-agent.webp',
    color: '#00FF88',
    description:
      'Autonomous AI coworker that completes real-world professional tasks, earns income, and manages its own token budget to stay solvent.',
    summary:
      'An autonomous business agent designed to execute professional tasks, manage operating constraints, and behave like a revenue-aware digital worker.',
    challenge:
      'The system needed to move beyond simple chat automation and coordinate task execution, budgeting, and self-directed workflow decisions without constant human input.',
    aiTwist:
      'A self-solvency loop lets the agent treat compute like oxygen: it evaluates task value, token spend, and earning potential before deciding what work deserves attention.',
    solution:
      'Built a multi-agent operating loop with task planning, tool execution, budget checks, and feedback cycles so the agent can prioritize work and keep itself solvent.',
    outcome:
      'Created a working foundation for an AI coworker that can be assigned business objectives instead of isolated prompts.',
    tech: ['Python', 'Claude API', 'LangChain', 'Multi-Agent'],
    year: '2021',
  },
  {
    id: '2',
    slug: 'fraud-detection-ai',
    client: 'CLIENTGUARD',
    title: 'Fraud Detection AI',
    category: 'AI · FinTech · Insurance',
    image: '/images/3d-fraud-detection.webp',
    color: '#3B82F6',
    description:
      'AI-powered fraud detection platform helping insurance companies save $500K–2M annually with 90%+ accuracy across pet, event, cyber, and specialty lines.',
    summary:
      'A fraud detection operating system for specialty insurance teams that need faster claim triage and clearer investigation signals.',
    challenge:
      'Insurance operators needed to identify suspicious claims earlier while keeping legitimate customers moving through the process.',
    aiTwist:
      'The model behaves like a second investigator, turning messy claim context into an explainable suspicion map that shows why a case deserves human review.',
    solution:
      'Designed an AI scoring layer that reviews claim data, flags risk patterns, and gives internal teams a prioritized queue with explainable signals.',
    outcome:
      'Reduced manual review pressure and created a clearer path for high-risk claim escalation across multiple insurance categories.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'ML/AI'],
    year: '2020',
  },
  {
    id: '3',
    slug: 'hyperlocal-nightlife',
    client: 'FLOC',
    title: 'Hyperlocal Nightlife',
    category: 'Mobile · Social Discovery',
    image: '/images/3d-nightlife.webp',
    color: '#A855F7',
    description:
      'Feel where your people go. A hyperlocal discovery app for small cities — find venues, see crowd levels, and know exactly where your contacts are going out tonight.',
    summary:
      'A mobile nightlife discovery product that turns local venue activity, social intent, and crowd signals into a live decision tool.',
    challenge:
      'Small-city nightlife is fragmented across group chats, venue pages, and guesswork, making it hard to know where the right crowd is gathering.',
    aiTwist:
      'A social heat engine predicts where momentum is forming before venues feel packed, using crowd signals, friend intent, and timing patterns as a living nightlife graph.',
    solution:
      'Created a social discovery experience with venue context, crowd signals, and contact-aware nightlife planning for quick decisions.',
    outcome:
      'Gave users a faster way to choose where to go while giving venues a stronger signal about local demand.',
    tech: ['React Native', 'Node.js', 'Maps API', 'PostgreSQL'],
    year: '2022',
  },
  {
    id: '4',
    slug: 'unified-ops-dashboard',
    client: 'COMMANDCENTER',
    title: 'Unified Ops Dashboard',
    category: 'SaaS · Developer Tools',
    image: '/images/3d-ops-dashboard.webp',
    color: '#F59E0B',
    description:
      'One pane of glass for engineering teams — Vercel deploys, real-time analytics, Stripe revenue, and Resend email campaigns unified in a single command center.',
    summary:
      'An operations command center that gives builders one place to monitor deploys, revenue, analytics, and outbound campaigns.',
    challenge:
      'Teams were switching between multiple dashboards to understand product health, customer movement, and revenue status.',
    aiTwist:
      'An operator copilot sits above the metrics and translates deploys, revenue, email, and traffic into plain-English daily priorities for the team.',
    solution:
      'Connected deployment, analytics, payments, and email systems into a unified dashboard with operational summaries and action-ready views.',
    outcome:
      'Reduced context switching and gave teams a single operating surface for daily product and business decisions.',
    tech: ['Next.js', 'Vercel API', 'Stripe', 'Resend'],
    year: '2024',
  },
  {
    id: '5',
    slug: 'sneaker-exchange',
    client: 'SNEAKX',
    title: 'The Sneaker Exchange',
    category: 'Marketplace · Trading',
    image: '/images/3d-sneaker-exchange.webp',
    color: '#CCFF00',
    description:
      'Neo-brutalist sneaker trading platform. Live price tickers, authentication tags, real-time bids — where streetwear culture meets the precision of a financial exchange.',
    summary:
      'A marketplace concept that treats sneaker trading like a live exchange with pricing, authenticity, bids, and fast market movement.',
    challenge:
      'Collectors and resellers needed a trading experience that felt more immediate and trustworthy than static marketplace listings.',
    aiTwist:
      'A market-maker intelligence layer can surface suspicious listings, momentum shifts, and underpriced assets so sneaker trading feels closer to a live financial terminal.',
    solution:
      'Designed a real-time trading interface with live bids, authentication cues, asset-style product cards, and market-inspired pricing behavior.',
    outcome:
      'Turned sneaker discovery and trading into a sharper exchange-style experience for culture-driven buyers and sellers.',
    tech: ['React', 'Node.js', 'WebSockets', 'Drizzle ORM'],
    year: '2021',
  },
  {
    id: '6',
    slug: 'ai-onboarding-platform',
    client: 'NAVIGATOR',
    title: 'AI Onboarding Platform',
    category: 'HR Tech · AI Agents',
    image: '/images/3d-onboarding-platform.webp',
    color: '#10B981',
    description:
      'AI agent-powered employee onboarding that learns company culture, adapts to each new hire, and automates the entire workflow from offer letter to day 90.',
    summary:
      'An AI onboarding operating system that guides new hires through company knowledge, tasks, culture, and manager workflows.',
    challenge:
      'Growing teams needed onboarding to be consistent without forcing managers to manually repeat every process for every new hire.',
    aiTwist:
      'Each hire gets an adaptive AI onboarding concierge that learns their role, asks context-aware check-ins, and adjusts the day-by-day path as they ramp.',
    solution:
      'Built adaptive onboarding flows with AI guidance, knowledge retrieval, task sequencing, and milestones from offer acceptance through day 90.',
    outcome:
      'Created a repeatable onboarding experience that scales manager knowledge and gives new hires clearer early momentum.',
    tech: ['Next.js', 'AI Agents', 'SQLite', 'TypeScript'],
    year: '2024',
  },
  {
    id: '7',
    slug: 'content-protection-suite',
    client: 'GLOWMARK',
    title: 'Content Protection Suite',
    category: 'Security · Creative Tools',
    image: '/images/3d-content-protection.webp',
    color: '#EC4899',
    description:
      'Watermark and protect your digital content with visible marks, invisible steganographic encoding, and cryptographic metadata signing — all in one suite.',
    summary:
      'A content security suite for creators and teams that need visible ownership, invisible protection, and verifiable metadata.',
    challenge:
      'Digital content can be copied, reposted, and stripped of context quickly, leaving creators without practical proof of origin.',
    aiTwist:
      'An AI provenance layer can inspect assets, suggest protection settings, and generate ownership fingerprints that stay useful even when content is resized or reposted.',
    solution:
      'Combined visible watermarking, hidden steganographic encoding, and cryptographic metadata signing into a single workflow.',
    outcome:
      'Gave creators a stronger chain of ownership and a practical toolset for protecting distributed digital assets.',
    tech: ['Next.js', 'Canvas API', 'Crypto', 'Vercel'],
    year: '2020',
  },
  {
    id: '8',
    slug: 'agent-swarm-engine',
    client: 'ANTIGRAVITY',
    title: 'Agent Swarm Engine',
    category: 'AI Infrastructure',
    image: '/images/3d-agent-swarm.webp',
    color: '#6366F1',
    description:
      'Deploy autonomous Gemini-powered agent swarms for any complex task. Orchestrate specialized AI teams that plan, delegate, execute, and self-correct at scale.',
    summary:
      'An AI infrastructure layer for coordinating specialized agents that can plan, delegate, execute, and self-correct across complex tasks.',
    challenge:
      'Single-agent workflows often fail when tasks require specialization, parallel work, and structured correction loops.',
    aiTwist:
      'The swarm behaves like an AI org chart: planner, specialist, critic, and executor agents negotiate the work until the system converges on a better answer.',
    solution:
      'Created a swarm engine with agent roles, YAML task definitions, delegation logic, and review cycles for iterative execution.',
    outcome:
      'Enabled complex work to be broken into coordinated agent responsibilities instead of relying on one general-purpose model call.',
    tech: ['Python', 'Gemini API', 'Multi-Agent', 'YAML'],
    year: '2022',
  },
  {
    id: '9',
    slug: 'ecommerce-arbitrage',
    client: 'WHISTLEBLOW',
    title: 'E-Commerce Arbitrage',
    category: 'Automation · eCommerce',
    image: '/images/3d-ecommerce-arbitrage.webp',
    color: '#14B8A6',
    description:
      'Automated e-commerce arbitrage engine that scans marketplaces, surfaces price discrepancies, and executes cross-platform trades before the window closes.',
    summary:
      'An e-commerce automation system for detecting marketplace pricing gaps and moving quickly before arbitrage windows close.',
    challenge:
      'Manual product scanning is too slow for high-volume marketplace arbitrage, especially when price windows change quickly.',
    aiTwist:
      'An AI deal desk grades each opportunity by margin, velocity, risk, and confidence so operators can chase the right spread instead of every spread.',
    solution:
      'Built automation to monitor listings, compare pricing across sources, surface margin opportunities, and prepare execution workflows.',
    outcome:
      'Created a faster discovery layer for operators looking for cross-platform price discrepancies and repeatable trade windows.',
    tech: ['Node.js', 'Puppeteer', 'Redis', 'Docker'],
    year: '2024',
  },
  {
    id: '10',
    slug: 'market-signal-tracker',
    client: 'TRADINGWATCHER',
    title: 'Market Signal Tracker',
    category: 'FinTech · Data',
    image: '/images/3d-market-signal.webp',
    color: '#F97316',
    description:
      'Real-time market signal tracker with custom alert rules, pattern detection across assets, and a clean dashboard built for serious traders who move fast.',
    summary:
      'A real-time market intelligence dashboard that helps traders monitor signals, patterns, and alert conditions across assets.',
    challenge:
      'Active traders need fast signal visibility without building custom monitors across disconnected data sources.',
    aiTwist:
      'A signal interpreter turns raw market movement into narrative alerts, explaining what changed, why it matters, and which patterns deserve immediate attention.',
    solution:
      'Designed a signal tracker with live data streams, configurable alerts, pattern detection, and a dashboard built for quick scanning.',
    outcome:
      'Gave traders a cleaner operational layer for watching market movement and reacting to meaningful signal changes.',
    tech: ['Next.js', 'WebSockets', 'Charts', 'PostgreSQL'],
    year: '2024',
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
