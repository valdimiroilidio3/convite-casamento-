import type { MetadataRoute } from 'next';
import { wedding } from '@/data/wedding';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: wedding.seo.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
