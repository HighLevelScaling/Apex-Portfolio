import { projects } from '@/lib/projects';

export const siteUrl = 'https://www.apexportfolio.me';
export const siteName = 'APEX';
export const creatorName = 'Kian';
export const creatorHandle = '@apexbuilds';

export const siteTitle = 'APEX | Custom AI Agents & Full-Stack Development';
export const siteDescription =
  'APEX builds custom AI agents, automation systems, and full-stack products for serious business operators. Built by Kian for teams that need revenue-ready software.';

export const seoKeywords = [
  'custom AI agents',
  'AI automation developer',
  'AI agent development',
  'full-stack developer',
  'Next.js developer',
  'business automation',
  'agentic systems',
  'AI product builder',
  'SaaS development',
  'workflow automation',
  'AI consulting',
  'autonomous AI systems',
  'Vercel developer',
  'TypeScript developer',
  'AI agency',
];

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function projectUrl(slug: string) {
  return absoluteUrl(`/projects/${slug}`);
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: absoluteUrl('/og-image.png'),
  image: absoluteUrl('/og-image.png'),
  founder: {
    '@type': 'Person',
    name: creatorName,
    url: siteUrl,
  },
  description: siteDescription,
  areaServed: 'Worldwide',
  serviceType: [
    'Custom AI agent development',
    'Full-stack product development',
    'Business automation systems',
    'SaaS development',
  ],
  knowsAbout: seoKeywords,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: siteTitle,
  description: siteDescription,
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  inLanguage: 'en-US',
};

export const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/#portfolio`,
  url: siteUrl,
  name: `${siteName} AI Product Portfolio`,
  description: siteDescription,
  hasPart: projects.map((project, index) => ({
    '@type': 'CreativeWork',
    position: index + 1,
    name: project.title,
    url: projectUrl(project.slug),
    image: absoluteUrl(project.image),
    description: project.summary,
    genre: project.category,
    dateCreated: project.year,
  })),
};
