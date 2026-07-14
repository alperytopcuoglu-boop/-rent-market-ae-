import { Provider, Car } from './types'
import { providers, cars } from './data'
import { ProviderFees, verifiedFees } from './pricing'

// SEO slug: provider adı (ör. "4 HIRE" → 4-hire)
export function providerSlug(p: Provider): string {
  return p.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function providerHref(p: Provider): string {
  return `/providers/${providerSlug(p)}`
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((p) => providerSlug(p) === slug || p.id === slug) // eski id linkleri de çalışsın
}

export function allProviderSlugs(): string[] {
  return providers.map(providerSlug)
}

export interface ProviderStats {
  cars: Car[]
  carCount: number
  fromPrice: number          // filodaki en düşük günlük fiyat
  rating: number             // araç puanlarının filo ortalaması
  reviewCount: number
  noDepositCount: number
  categories: string[]
  /** Doğrulanmamışsa undefined — sayfa hiçbir ücret rakamı göstermez. */
  fees: ProviderFees | undefined
}

export function getProviderStats(p: Provider): ProviderStats {
  const fleet = cars.filter((c) => c.providerId === p.id)
  const reviewCount = fleet.reduce((sum, c) => sum + c.reviewCount, 0)

  // Puan, yorum sayısına göre ağırlıklı — çok yorumlu araç ortalamayı daha çok etkilesin.
  const rating =
    reviewCount > 0
      ? fleet.reduce((sum, c) => sum + c.rating * c.reviewCount, 0) / reviewCount
      : 0

  return {
    cars: fleet,
    carCount: fleet.length,
    fromPrice: fleet.length ? Math.min(...fleet.map((c) => c.dailyPrice)) : 0,
    rating: Math.round(rating * 10) / 10,
    reviewCount,
    noDepositCount: fleet.filter((c) => c.depositType === 'no-deposit').length,
    categories: Array.from(new Set(fleet.map((c) => c.category))),
    fees: verifiedFees(p.id),
  }
}
