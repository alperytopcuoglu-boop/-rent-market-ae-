import { Car } from './types'
import { cars } from './data'

// SEO slug: marka-model-yıl-provider (ör. ford-mustang-gt-2024-4hire)
export function carSlug(car: Car): string {
  return `${car.brand} ${car.model} ${car.year} ${car.providerId}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function carHref(car: Car): string {
  return `/cars/${carSlug(car)}`
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => carSlug(c) === slug || c.id === slug) // eski id linkleri de çalışsın
}

export function allCarSlugs(): string[] {
  return cars.map(carSlug)
}
