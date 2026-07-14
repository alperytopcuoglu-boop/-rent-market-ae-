'use client'

import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { cars } from '@/lib/data'
import { getCarBySlug } from '@/lib/slugs'
import CarCard from '@/components/home/CarCard'
import TruePriceCard from '@/components/TruePriceCard'

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Economy: { bg: 'bg-emerald-500', text: 'text-white' },
  SUV:     { bg: 'bg-blue-500',    text: 'text-white' },
  Luxury:  { bg: 'bg-violet-600',  text: 'text-white' },
  Sports:  { bg: 'bg-amber-500',   text: 'text-white' },
  Exotic:  { bg: 'bg-rose-500',    text: 'text-white' },
}

const WA_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function CarDetailClient({ slug }: { slug: string }) {
  const router = useRouter()
  const car = getCarBySlug(slug)

  if (!car) notFound()

  const related = cars
    .filter((c) => c.providerId === car.providerId && c.id !== car.id)
    .slice(0, 4)

  const catStyle = categoryStyle[car.category] || categoryStyle.Sports

  const waText = encodeURIComponent(
    `Hi, I'd like to book the ${car.year} ${car.brand} ${car.model}. Could you share availability and rates?`
  )

  const specs = [
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/>
          <path d="M5 8v3a7 7 0 007 7M19 8v3a7 7 0 01-7 7M12 6v6"/>
        </svg>
      ),
      label: 'Transmission', value: car.transmission,
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      label: 'Seats', value: `${car.seats} seats`,
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 22V6a2 2 0 012-2h8a2 2 0 012 2v16M3 22h12M12 12h4a2 2 0 012 2v4a2 2 0 002 2V8l-3-4"/>
          <path d="M7 10h4M7 6h4"/>
        </svg>
      ),
      label: 'Fuel Type', value: car.fuelType,
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      label: 'Model Year', value: String(car.year),
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f7f4] pb-28 lg:pb-10">

      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-10 lg:px-6 lg:pt-6">

      {/* ─── HERO ─────────────────────────────────── */}
      <div className="relative h-[340px] lg:h-[500px] lg:rounded-3xl lg:sticky lg:top-24 lg:self-start bg-stone-200 overflow-hidden">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-5">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/35 backdrop-blur-md border border-white/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <a
            href={`https://wa.me/971556755532?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/35 backdrop-blur-md border border-white/20"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>

        {/* Hero info */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${catStyle.bg} ${catStyle.text}`}>
              {car.category}
            </span>
            {car.isHotDeal && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Hot Deal</span>
            )}
            {car.isNewArrival && (
              <span className="bg-amber-400 text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full">New Arrival</span>
            )}
            {!car.availableNow && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/30">
                Unavailable
              </span>
            )}
          </div>

          {/* Name + rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h1 className="text-white font-black text-[26px] leading-tight tracking-tight drop-shadow flex-1">
              {car.brand} {car.model}
            </h1>
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex-shrink-0">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-white text-[11px] font-black">{car.rating.toFixed(1)}</span>
              <span className="text-white/55 text-[10px]">({car.reviewCount})</span>
            </div>
          </div>

          <p className="text-white/65 text-xs font-medium">{car.year} &nbsp;·&nbsp; {car.providerName}</p>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-white font-black text-[30px] leading-none">
              AED {car.dailyPrice.toLocaleString('en-US')}
            </span>
            <span className="text-white/55 text-sm font-medium">/day</span>
            <span className="text-white/40 text-xs ml-1">
              · {car.monthlyPrice.toLocaleString('en-US')}/mo
            </span>
          </div>
        </div>
      </div>

      {/* ─── CONTENT ─────────────────────────────── */}
      <div className="px-4 pt-4 space-y-4 lg:px-0 lg:pt-0">

        {/* Desktop CTA — sticky bar mobilde, inline desktop'ta */}
        <div className="hidden lg:flex gap-2.5">
          <a
            href={`https://wa.me/971556755532?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gold-gradient gold-glow text-white font-bold py-4 rounded-full text-[13px] uppercase tracking-wide transition-transform hover:scale-[1.02]"
          >
            {WA_ICON}
            Book on WhatsApp
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center glass text-stone-700 font-semibold py-4 px-7 rounded-full text-[13px] uppercase tracking-wide hover:shadow-md transition-colors"
          >
            Inquiry
          </Link>
        </div>

        {/* Deposit banner */}
        {car.depositType === 'no-deposit' ? (
          <div className="flex items-center gap-3 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl px-4 py-3.5 shadow-[0_8px_28px_rgba(16,185,129,0.25)]">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm">No Deposit Required</p>
              <p className="text-white/80 text-[11px] font-medium">Book without any security deposit</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 glass rounded-2xl px-4 py-3.5">
            <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm text-stone-800">Security Deposit</p>
              <p className="text-stone-500 text-[11px]">AED {car.depositAmount?.toLocaleString('en-US')} — refunded on return</p>
            </div>
          </div>
        )}

        {/* Key highlights */}
        {car.highlights.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            {car.highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 glass rounded-xl px-3.5 py-3">
                <div className="w-6 h-6 rounded-full bg-amber-400/15 flex items-center justify-center flex-shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f5b544" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span className="text-stone-800 text-[13px] font-semibold">{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-4 pt-3.5 pb-1">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Rental Rates</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-stone-100">
            {[
              { label: 'Daily',   price: car.dailyPrice,   unit: '/day',   hi: true  },
              { label: 'Weekly',  price: car.weeklyPrice,  unit: '/week',  hi: false },
              { label: 'Monthly', price: car.monthlyPrice, unit: '/month', hi: false },
            ].map((r) => (
              <div key={r.label} className={`flex flex-col items-center py-5 ${r.hi ? 'bg-amber-400/10' : ''}`}>
                <p className={`text-[10px] font-black uppercase tracking-wide mb-1.5 ${r.hi ? 'text-gold' : 'text-stone-400'}`}>
                  {r.label}
                </p>
                <p className={`font-black text-xl leading-none ${r.hi ? 'text-gold' : 'text-stone-900'}`}>
                  {r.price.toLocaleString('en-US')}
                </p>
                <p className={`text-[10px] mt-1 font-medium ${r.hi ? 'text-amber-600/70' : 'text-stone-400'}`}>
                  AED{r.unit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* True Total Price */}
        <TruePriceCard car={car} />

        {/* About */}
        <div className="glass rounded-2xl p-4">
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">About This Car</p>
          <p className="text-stone-600 text-[13px] leading-relaxed">{car.shortDescription}</p>
        </div>

        {/* Specs */}
        <div className="glass rounded-2xl p-4">
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Specifications</p>
          <div className="grid grid-cols-2 gap-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                  {spec.icon}
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">{spec.label}</p>
                  <p className="text-[13px] font-bold text-stone-800 mt-0.5">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        {car.features.length > 0 && (
          <div className="glass rounded-2xl p-4">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Key Features</p>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-2">
              {car.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-400/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#f5b544" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="text-stone-700 text-[12px] font-medium leading-tight">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Provider */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-4 pt-3.5 pb-1">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Rental Provider</p>
          </div>
          <div className="px-4 pb-4 pt-2 flex items-center justify-between">
            <div>
              <p className="font-black text-stone-900 text-base">{car.providerName}</p>
              <div className="flex items-center gap-1 mt-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#22c55e">
                  <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-2-11l-2 2 4 4 6-8-2-1.5-4 5.3-2-1.8z"/>
                </svg>
                <span className="text-[11px] text-stone-500 font-medium">Verified Dubai rental provider</span>
              </div>
            </div>
            <a
              href={`https://wa.me/971556755532?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gold-gradient text-white text-xs font-bold px-4 py-2.5 rounded-full uppercase tracking-wide"
            >
              {WA_ICON}
              Chat Now
            </a>
          </div>
        </div>

      </div>

      </div>

      {/* Related Cars */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 lg:px-6 pt-4 lg:pt-10 mb-2">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display text-[17px] md:text-xl font-bold text-stone-900">More from {car.providerName}</p>
            <Link
              href={`/shop?provider=${car.providerId}`}
              className="text-gold text-[11px] font-bold uppercase tracking-wide"
            >
              See All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {related.map((c) => (
              <CarCard key={c.id} car={c} compact />
            ))}
          </div>
        </div>
      )}

      {/* ─── STICKY CTA (mobil/tablet) ─────────────── */}
      <div className="lg:hidden fixed bottom-16 md:bottom-0 left-0 right-0 px-4 py-3 glass-strong border-t border-stone-200/70 z-40">
        <div className="flex gap-2.5 max-w-xl mx-auto">
          <a
            href={`https://wa.me/971556755532?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gold-gradient text-white font-bold py-3.5 rounded-full text-sm active:scale-[0.98] transition-transform"
          >
            {WA_ICON}
            Book on WhatsApp
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center glass text-stone-700 font-bold py-3.5 px-5 rounded-full text-sm active:scale-[0.98] transition-transform"
          >
            Inquiry
          </Link>
        </div>
      </div>

    </div>
  )
}
