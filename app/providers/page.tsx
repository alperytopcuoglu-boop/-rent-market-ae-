import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { providers } from '@/lib/data'
import { getProviderStats, providerHref } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'Car Rental Companies in Dubai — 5 Verified Providers Compared | Rent Market AE',
  description:
    'Compare Dubai car rental companies side by side: insurance excess, mileage limits, delivery fees and deposits. 5 verified providers, true total pricing, no hidden costs.',
  alternates: { canonical: '/providers' },
}

const accentBar: Record<string, string> = {
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  blue: 'bg-blue-500',
  rose: 'bg-rose-500',
}

export default function ProvidersPage() {
  const rows = providers.map((p) => ({ provider: p, stats: getProviderStats(p) }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Car rental companies in Dubai',
    itemListElement: rows.map(({ provider, stats }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'AutoRental',
        name: provider.name,
        description: provider.tagline,
        areaServed: { '@type': 'City', name: 'Dubai' },
        priceRange: `From AED ${stats.fromPrice}/day`,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-16">
        <nav className="text-[11px] text-stone-400 mb-5">
          <Link href="/" className="hover:text-stone-600">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-stone-600 font-medium">Providers</span>
        </nav>

        <header className="max-w-2xl">
          <p className="section-label">Our Partners</p>
          <h1 className="font-display font-extrabold text-stone-900 text-2xl md:text-4xl mt-1 leading-tight">
            Car rental companies in Dubai, compared
          </h1>
          <p className="text-stone-500 text-[13px] md:text-sm leading-relaxed mt-4">
            We work with 5 verified rental companies. Every one of them publishes what they
            actually charge — insurance excess, mileage caps, delivery, deposit — so the price you
            see is the price you pay. Compare them below, or send one request and let them compete
            for your booking.
          </p>
          <Link
            href="/request"
            className="inline-block bg-stone-900 text-white text-[12px] font-bold px-5 py-3 rounded-full mt-5 hover:bg-stone-800 transition-colors"
          >
            Get offers from all 5 →
          </Link>
        </header>

        {/* Karşılaştırma tablosu — masaüstü */}
        <section className="mt-10 hidden md:block">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/60">
                  {['Provider', 'Fleet', 'From', 'Insurance excess', 'Mileage / day', 'Delivery', ''].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-5 py-3.5"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ provider, stats }) => (
                  <tr
                    key={provider.id}
                    className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-1 h-8 rounded-full ${accentBar[provider.color] ?? 'bg-amber-500'}`}
                        />
                        <div>
                          <p className="font-display font-bold text-stone-900 text-[13px] leading-tight">
                            {provider.name}
                          </p>
                          <p className="text-stone-400 text-[11px] mt-0.5">{provider.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-stone-600">{stats.carCount} cars</td>
                    <td className="px-5 py-4 font-display font-bold text-stone-900 text-[13px] whitespace-nowrap">
                      AED {stats.fromPrice.toLocaleString('en-US')}
                    </td>
                    <td className="px-5 py-4 text-[13px] text-stone-600 whitespace-nowrap">
                      AED {stats.fees.insuranceExcessAED.toLocaleString('en-US')}
                    </td>
                    <td className="px-5 py-4 text-[13px] text-stone-600 whitespace-nowrap">
                      {stats.fees.kmLimitDaily} km
                    </td>
                    <td className="px-5 py-4 text-[13px] whitespace-nowrap">
                      {stats.fees.deliveryFeeAED === 0 ? (
                        <span className="text-emerald-600 font-bold">Free</span>
                      ) : (
                        <span className="text-stone-600">AED {stats.fees.deliveryFeeAED}</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={providerHref(provider)}
                        className="text-[11px] font-bold uppercase tracking-wide text-amber-700 hover:text-amber-800 whitespace-nowrap"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-stone-400 mt-3">
            Lower insurance excess means less liability if something goes wrong. Higher mileage
            means more freedom on long drives.
          </p>
        </section>

        {/* Kartlar — mobil */}
        <section className="mt-8 grid gap-3 md:hidden">
          {rows.map(({ provider, stats }) => (
            <Link
              key={provider.id}
              href={providerHref(provider)}
              className="relative block bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden p-4 pt-5"
            >
              <span
                className={`absolute top-0 left-0 right-0 h-[3px] ${accentBar[provider.color] ?? 'bg-amber-500'}`}
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display font-extrabold text-stone-900 text-sm leading-tight">
                    {provider.name}
                  </p>
                  <p className="text-stone-400 text-[11px] mt-0.5">{provider.tagline}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display font-extrabold text-stone-900 text-base leading-none">
                    AED {stats.fromPrice.toLocaleString('en-US')}
                  </p>
                  <p className="text-stone-400 text-[10px] mt-0.5">from / day</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-stone-100">
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wide font-bold">Fleet</p>
                  <p className="text-[12px] font-bold text-stone-700 mt-0.5">{stats.carCount} cars</p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wide font-bold">Excess</p>
                  <p className="text-[12px] font-bold text-stone-700 mt-0.5">
                    AED {stats.fees.insuranceExcessAED.toLocaleString('en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wide font-bold">Delivery</p>
                  <p className="text-[12px] font-bold text-stone-700 mt-0.5">
                    {stats.fees.deliveryFeeAED === 0 ? 'Free' : `AED ${stats.fees.deliveryFeeAED}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </>
  )
}
