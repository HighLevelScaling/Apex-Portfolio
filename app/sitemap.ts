import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { projectUrl, siteUrl } from './seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();

  return [
    {
      url: siteUrl,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: projectUrl(project.slug),
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
