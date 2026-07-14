import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCarSlugs, getCarBySlug, carSlug } from '@/lib/slugs'
import CarDetailClient from './CarDetailClient'

export function generateStaticParams() {
  return allCarSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const car = getCarBySlug(params.slug)
  if (!car) return { title: 'Car not found — Rent Market AE' }
  const title = `Rent ${car.brand} ${car.model} ${car.year} in Dubai — AED ${car.dailyPrice}/day | Rent Market AE`
  const description = `${car.brand} ${car.model} ${car.year} for rent in Dubai from ${car.providerName}. AED ${car.dailyPrice}/day, ${car.weeklyPrice}/week. ${car.depositType === 'no-deposit' ? 'No deposit required. ' : ''}True total pricing, WhatsApp booking, door delivery.`
  return {
    title,
    description,
    alternates: { canonical: `/cars/${carSlug(car)}` },
    openGraph: { title, description, images: [{ url: car.image }], type: 'website' },
  }
}

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  const car = getCarBySlug(params.slug)
  if (!car) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${car.brand} ${car.model} ${car.year}`,
    image: car.image,
    description: car.shortDescription,
    brand: { '@type': 'Brand', name: car.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AED',
      price: car.dailyPrice,
      availability: car.availableNow
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: car.providerName },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: car.rating,
      reviewCount: car.reviewCount,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarDetailClient slug={params.slug} />
    </>
  )
}
