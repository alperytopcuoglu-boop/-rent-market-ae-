import { MetadataRoute } from 'next'
import { cars, providers } from '@/lib/data'
import { carSlug } from '@/lib/slugs'
import { providerSlug } from '@/lib/providers'
import { allLandingSlugs } from '@/lib/landings'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rentmarketae.com'
  const lastModified = new Date()

  const carPages = cars.map((car) => ({
    url: `${baseUrl}/cars/${carSlug(car)}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const providerPages = providers.map((p) => ({
    url: `${baseUrl}/providers/${providerSlug(p)}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const landingPages = allLandingSlugs().map((slug) => ({
    url: `${baseUrl}/car-rental-dubai/${slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.85, // arama niyetine en yakın sayfalar
  }))

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/request`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/providers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...landingPages,
    ...providerPages,
    ...carPages,
  ]
}
