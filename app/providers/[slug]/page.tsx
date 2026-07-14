import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  allProviderSlugs,
  getProviderBySlug,
  getProviderStats,
  providerSlug,
} from '@/lib/providers'
import Header from '@/components/layout/Header'
import CarCard from '@/components/home/CarCard'

export function generateStaticParams() {
  return allProviderSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const provider = getProviderBySlug(params.slug)
  if (!provider) return { title: 'Provider not found — Rent Market AE' }

  const { carCount, fromPrice } = getProviderStats(provider)
  const title = `${provider.name} Car Rental Dubai — ${carCount} cars from AED ${fromPrice}/day | Rent Market AE`
  const description = `Rent from ${provider.name} in Dubai. ${carCount} verified cars from AED ${fromPrice}/day. ${provider.tagline}. True total pricing — insurance, mileage and delivery shown upfront.`

  return {
    title,
    description,
    alternates: { canonical: `/providers/${providerSlug(provider)}` },
    openGraph: { title, description, type: 'website' },
  }
}

const accentBar: Record<string, string> = {
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  blue: 'bg-blue-500',
  rose: 'bg-rose-500',
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display font-extrabold text-stone-900 text-xl md:text-2xl leading-none">
        {value}
      </p>
      <p className="text-stone-400 text-[10.5px] mt-1.5 uppercase tracking-wide font-bold">{label}</p>
    </div>
  )
}

function FeeRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-stone-100 last:border-0">
      <div>
        <p className="text-[13px] font-bold text-stone-700">{label}</p>
        {note && <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">{note}</p>}
      </div>
      <p className="text-[13px] font-display font-bold text-stone-900 whitespace-nowrap">{value}</p>
    </div>
  )
}

export default function ProviderPage({ params }: { params: { slug: string } }) {
  const provider = getProviderBySlug(params.slug)
  if (!provider) notFound()

  const stats = getProviderStats(provider)
  const { fees } = stats

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: provider.name,
    description: provider.promoText,
    areaServed: { '@type': 'City', name: 'Dubai' },
    priceRange: `From AED ${stats.fromPrice}/day`,
    ...(stats.reviewCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: stats.rating,
        reviewCount: stats.reviewCount,
      },
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-16">
        {/* Kırıntı yolu */}
        <nav className="text-[11px] text-stone-400 mb-5">
          <Link href="/" className="hover:text-stone-600">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/providers" className="hover:text-stone-600">Providers</Link>
          <span className="mx-1.5">/</span>
          <span className="text-stone-600 font-medium">{provider.name}</span>
        </nav>

        {/* Başlık */}
        <header className="relative bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden p-6 md:p-9">
          <span
            className={`absolute top-0 left-0 right-0 h-[3px] ${accentBar[provider.color] ?? 'bg-amber-500'}`}
          />
          <div className="md:flex md:items-start md:justify-between md:gap-10">
            <div className="md:max-w-xl">
              <p className="section-label">Verified Provider</p>
              <h1 className="font-display font-extrabold text-stone-900 text-2xl md:text-4xl mt-1 leading-tight">
                {provider.name}
              </h1>
              <p className="text-amber-700 font-bold text-[13px] mt-1.5">{provider.tagline}</p>
              <p className="text-stone-500 text-[13px] md:text-sm leading-relaxed mt-4">
                {provider.promoText}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-7 md:mt-1 md:gap-8 md:flex-shrink-0">
              <Stat value={`${stats.carCount}`} label="Cars" />
              <Stat value={`AED ${stats.fromPrice.toLocaleString('en-US')}`} label="From / day" />
              <Stat
                value={stats.rating ? stats.rating.toFixed(1) : '—'}
                label={stats.reviewCount ? `${stats.reviewCount} reviews` : 'No reviews'}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-7">
            <Link
              href="/request"
              className="bg-stone-900 text-white text-[12px] font-bold px-5 py-3 rounded-full hover:bg-stone-800 transition-colors"
            >
              Get the best offer →
            </Link>
            <a
              href={`https://wa.me/971556755532?text=${encodeURIComponent(
                `Hi, I'd like to rent a car from ${provider.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 text-white text-[12px] font-bold px-5 py-3 rounded-full hover:bg-emerald-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </header>

        {/* Ücret şeffaflığı — "Sürpriz Yok" sözünün provider seviyesindeki karşılığı */}
        <section className="mt-10 md:grid md:grid-cols-[1fr_1.15fr] md:gap-10 md:items-start">
          <div className="md:sticky md:top-6">
            <p className="section-label">No Surprises</p>
            <h2 className="font-display font-bold text-stone-900 text-lg md:text-xl mt-0.5">
              What {provider.name} actually charges
            </h2>
            <p className="text-stone-500 text-[13px] leading-relaxed mt-3">
              Every cost that shows up after the listed daily rate — insurance excess, mileage
              limits, delivery — is published here before you book. This is what separates a real
              quote from a listing price.
            </p>
            <Link
              href="/shop"
              className="inline-block text-[12px] font-bold text-amber-700 mt-4 hover:text-amber-800"
            >
              Compare with other providers →
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-5 md:px-6 py-2 mt-5 md:mt-0">
            <FeeRow
              label="Insurance"
              value={fees.insuranceIncluded ? 'Included' : 'Not included'}
              note={`You are liable up to AED ${fees.insuranceExcessAED.toLocaleString('en-US')} in case of damage (excess).`}
            />
            <FeeRow
              label="Mileage included"
              value={`${fees.kmLimitDaily} km / day`}
              note={`Beyond the limit: AED ${fees.extraKmFeeAED} per extra km.`}
            />
            <FeeRow
              label="Door delivery"
              value={fees.deliveryFeeAED === 0 ? 'Free' : `AED ${fees.deliveryFeeAED}`}
              note={
                fees.deliveryFeeAED === 0
                  ? 'Delivered anywhere in Dubai at no cost.'
                  : `Free on rentals of ${fees.minDaysForFreeDelivery}+ days.`
              }
            />
            <FeeRow
              label="Deposit"
              value={
                stats.noDepositCount === stats.carCount
                  ? 'None'
                  : stats.noDepositCount > 0
                    ? `${stats.noDepositCount} of ${stats.carCount} cars deposit-free`
                    : 'Required'
              }
              note={
                stats.noDepositCount === stats.carCount
                  ? 'Nothing is blocked or held on your card.'
                  : 'Where required, it is blocked on your card and released after return — never charged. The amount is shown on each car.'
              }
            />
            <FeeRow
              label="Salik (road tolls)"
              value="AED 4 / crossing"
              note="Billed after the rental, based on actual crossings."
            />
          </div>
        </section>

        {/* Filo */}
        <section className="mt-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="section-label">The Fleet</p>
              <h2 className="font-display font-bold text-stone-900 text-lg md:text-xl mt-0.5">
                {stats.carCount} cars from {provider.name}
              </h2>
            </div>
            <p className="text-[11px] text-stone-400 hidden md:block">
              {stats.categories.join(' · ')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {stats.cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        {/* Kapanış CTA */}
        <section className="mt-12 bg-white rounded-3xl border border-stone-100 shadow-sm p-7 md:p-10 text-center">
          <h2 className="font-display font-bold text-stone-900 text-lg md:text-2xl">
            Not sure {provider.name} is the best price?
          </h2>
          <p className="text-stone-500 text-[13px] md:text-sm mt-2.5 max-w-md mx-auto leading-relaxed">
            Send one request and all 5 verified providers come back with their best offer. Free,
            takes 60 seconds, no obligation.
          </p>
          <Link
            href="/request"
            className="inline-block bg-stone-900 text-white text-[12px] font-bold px-6 py-3.5 rounded-full mt-5 hover:bg-stone-800 transition-colors"
          >
            Get the best offer →
          </Link>
        </section>
      </div>
    </>
  )
}
