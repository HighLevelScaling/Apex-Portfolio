import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} Summary`,
    description: project.summary,
    openGraph: {
      title: `${project.title} Summary | APEX`,
      description: project.summary,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} app screenshot`,
        },
      ],
    },
  };
}

export default async function ProjectSummaryPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const projectNumber = String(projectIndex + 1).padStart(2, '0');

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden px-4 py-8 md:px-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 18% 15%, ${project.color}14 0%, transparent 38%), radial-gradient(ellipse at 82% 55%, rgba(255,255,255,0.06) 0%, transparent 36%)`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="mb-10 flex items-center justify-between border-b border-white/[0.06] pb-5">
            <Link
              href="/#selected-work"
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/45 transition-colors hover:text-white"
            >
              Back to Work
            </Link>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/20">
              Summary / {projectNumber}
            </span>
          </nav>

          <div className="grid min-h-[calc(100vh-7rem)] grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p
                className="mb-5 text-[10px] font-black uppercase tracking-[0.6em]"
                style={{ color: project.color }}
              >
                {project.client}
              </p>
              <h1
                className="font-sans font-black uppercase leading-none tracking-tighter"
                style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
              >
                {project.title}
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/50">
                {project.summary}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-px bg-white/[0.08]">
                {[
                  ['Year', project.year],
                  ['Type', project.category],
                  ['Index', projectNumber],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#050505] p-4">
                    <div className="text-[9px] uppercase tracking-[0.35em] text-white/25">
                      {label}
                    </div>
                    <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-white/25">
                App Screenshot
              </p>
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-black">
                <Image
                  src={project.image}
                  alt={`${project.title} app screenshot`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[3px]"
                  style={{ background: project.color }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-white/[0.07] lg:grid-cols-2">
          {[
            ['Challenge', project.challenge],
            ['AI Twist', project.aiTwist],
            ['System Build', project.solution],
            ['Outcome', project.outcome],
          ].map(([label, text]) => (
            <section key={label} className="bg-[#050505] p-7 md:p-10">
              <p
                className="mb-5 text-[10px] font-black uppercase tracking-[0.45em]"
                style={{ color: label === 'AI Twist' ? project.color : 'rgba(255,255,255,0.32)' }}
              >
                {label}
              </p>
              <p className="text-sm leading-7 text-white/55">{text}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-white/25">
              Stack
            </p>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.28em]"
                  style={{
                    borderColor: `${project.color}50`,
                    color: project.color,
                    background: `${project.color}10`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.08] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-white/25">
              Next Summary
            </p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group block"
              style={{ color: nextProject.color }}
            >
              <span className="block text-3xl font-black uppercase leading-none tracking-tight text-white transition-colors group-hover:text-white/65">
                {nextProject.title}
              </span>
              <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.35em]">
                Open Page
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
