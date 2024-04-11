import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', 
        allow: '/', 
        disallow: '/bcawley@cherrycreekschools.org', 
      },
    ],
    sitemap: 'https://creekcshs.org/sitemap.xml', 
  }
}
