import { MetadataRoute } from 'next'

// AI arama motorlarının tarayıcıları açıkça izinli. Alıntılanmanın (GEO) ön koşulu bu:
// bu botlar taramadan hiçbir AI motoru kaynak gösteremez.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: 'https://www.rentmarketae.com/sitemap.xml',
  }
}
