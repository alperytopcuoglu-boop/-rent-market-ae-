import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allLandingSlugs, getLanding, landingCars } from '@/lib/landings'
import { providers } from '@/lib/data'
import { providerHref } from '@/lib/providers'
import Header from '@/components/layout/Header'
import CarCard from '@/components/home/CarCard'

export function generateStaticParams() {
  return allLandingSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const landing = getLanding(params.slug)
  if (!landing) return { title: 'Page not found — Rent Market AE' }

  return {
    title: landing.title,
    description: landing.description,
    alternates: { canonical: `/car-rental-dubai/${landing.slug}` },
    openGraph: { title: landing.title, description: landing.description, type: 'website' },
  }
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const landing = getLanding(params.slug)
  if (!landing) notFound()

  const fleet = landingCars(landing)
  const isMonthly = landing.slug === 'monthly'

  const fromDaily = fleet.length ? Math.min(...fleet.map((c) => c.dailyPrice)) : 0
  const fromMonthly = fleet.length ? Math.min(...fleet.map((c) => c.monthlyPrice)) : 0
  const noDepositCount = fleet.filter((c) => c.depositType === 'no-deposit').length

  // FAQPage şeması — AI arama motorlarının ve Google'ın soru-cevap kutularının yemi.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: landing.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.rentmarketae.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: landing.h1,
        item: `https://www.rentmarketae.com/car-rental-dubai/${landing.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-16">
        <nav className="text-[11px] text-stone-400 mb-5">
          <Link href="/" className="hover:text-stone-600">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-stone-600 font-medium">{landing.h1}</span>
        </nav>

        {/* Başlık */}
        <header className="md:flex md:items-end md:justify-between md:gap-10">
          <div className="md:max-w-2xl">
            <p className="section-label">Dubai · No Surprises</p>
            <h1 className="font-display font-extrabold text-stone-900 text-2xl md:text-4xl mt-1 leading-tight">
              {landing.h1}
            </h1>
            <p className="text-stone-500 text-[13px] md:text-sm leading-relaxed mt-4">
              {landing.intro}
            </p>
          </div>

          <div className="flex gap-7 md:gap-9 mt-6 md:mt-0 md:flex-shrink-0">
            <div>
              <p className="font-display font-extrabold text-stone-900 text-xl md:text-2xl leading-none">
                {fleet.length}
              </p>
              <p className="text-stone-400 text-[10.5px] mt-1.5 uppercase tracking-wide font-bold">
                Cars
              </p>
            </div>
            <div>
              <p className="font-display font-extrabold text-stone-900 text-xl md:text-2xl leading-none whitespace-nowrap">
                AED {(isMonthly ? fromMonthly : fromDaily).toLocaleString('en-US')}
              </p>
              <p className="text-stone-400 text-[10.5px] mt-1.5 uppercase tracking-wide font-bold">
                From / {isMonthly ? 'month' : 'day'}
              </p>
            </div>
            {noDepositCount > 0 && (
              <div>
                <p className="font-display font-extrabold text-stone-900 text-xl md:text-2xl leading-none">
                  {noDepositCount}
                </p>
                <p className="text-stone-400 text-[10.5px] mt-1.5 uppercase tracking-wide font-bold">
                  No deposit
                </p>
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-wrap gap-2.5 mt-6">
          <Link
            href="/request"
            className="bg-stone-900 text-white text-[12px] font-bold px-5 py-3 rounded-full hover:bg-stone-800 transition-colors"
          >
            Get the best offer →
          </Link>
          <a
            href={`https://wa.me/971556755532?text=${encodeURIComponent(
              `Hi, I'm looking for ${landing.h1.toLowerCase()}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 text-white text-[12px] font-bold px-5 py-3 rounded-full hover:bg-emerald-600 transition-colors"
          >
            WhatsApp
          </a>
        </div>

        {/* Filo */}
        <section className="mt-11">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-display font-bold text-stone-900 text-lg md:text-xl">
              {fleet.length} cars available
            </h2>
            <p className="text-[11px] text-stone-400">
              Sorted by {isMonthly ? 'monthly' : 'daily'} price
            </p>
          </div>

          {fleet.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {fleet.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-[13px] bg-white rounded-2xl border border-stone-100 p-8 text-center">
              No cars match right now.{' '}
              <Link href="/request" className="text-amber-700 font-bold">
                Send a request
              </Link>{' '}
              and providers will come back with what they have.
            </p>
          )}
        </section>

        {/* SSS — sayfadaki görünür metin, FAQPage şemasıyla birebir aynı */}
        <section className="mt-14 md:grid md:grid-cols-[1fr_1.4fr] md:gap-12 md:items-start">
          <div className="md:sticky md:top-6">
            <p className="section-label">Questions</p>
            <h2 className="font-display font-bold text-stone-900 text-lg md:text-xl mt-0.5">
              What you should know first
            </h2>
            <p className="text-stone-500 text-[13px] leading-relaxed mt-3">
              Still unsure? Send one request and 5 verified providers answer with their best offer
              — free, and it takes about a minute.
            </p>
          </div>

          <div className="mt-5 md:mt-0 space-y-3">
            {landing.faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-white rounded-2xl border border-stone-100 shadow-sm px-5 py-4 open:shadow-md transition-shadow"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-[13px] font-bold text-stone-800 leading-snug">{f.q}</h3>
                  <span className="text-stone-300 text-lg leading-none flex-shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-stone-500 text-[12.5px] leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Sağlayıcılara iç linkler */}
        <section className="mt-14">
          <p className="section-label">Who you&apos;re renting from</p>
          <h2 className="font-display font-bold text-stone-900 text-lg md:text-xl mt-0.5 mb-4">
            5 verified providers
          </h2>
          <div className="flex flex-wrap gap-2">
            {providers.map((p) => (
              <Link
                key={p.id}
                href={providerHref(p)}
                className="bg-white border border-stone-200 rounded-full px-4 py-2 text-[12px] font-bold text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors"
              >
                {p.name}
              </Link>
            ))}
            <Link
              href="/providers"
              className="bg-stone-900 border border-stone-900 rounded-full px-4 py-2 text-[12px] font-bold text-white hover:bg-stone-800 transition-colors"
            >
              Compare all →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
