import { type MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://creekcshs.org/', 
      priority: 1,
    },
    {
      url: 'https://creekcshs.org/#apply',
      priority: 0.9,
    },
    {
      url: 'https://creekcshs.org/#what',
      priority: 0.8,
    },
    {
      url: 'https://creekcshs.org/calendar',
      priority: 0.6,
    },
    {
      url: 'https://creekcshs.org/#initiatives',
      priority: 0.5,
    },
  ]
}
