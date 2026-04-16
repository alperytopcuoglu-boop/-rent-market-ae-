'use client'

import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'
import { getCarById, cars } from '@/lib/data'
import CarCard from '@/components/home/CarCard'

const categoryColors: Record<string, string> = {
  Economy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  SUV: 'bg-blue-50 text-blue-700 border-blue-100',
  Luxury: 'bg-violet-50 text-violet-700 border-violet-100',
  Sports: 'bg-amber-50 text-amber-700 border-amber-100',
  Exotic: 'bg-rose-50 text-rose-700 border-rose-100',
}

// Clean SVG spec icons
const SpecIcon = ({ type }: { type: string }) => {
  const cls = "text-stone-400"
  switch (type) {
    case 'transmission':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className={cls}>
          <circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/>
          <path d="M5 8v3a7 7 0 007 7M19 8v3a7 7 0 01-7 7M12 6v6"/>
        </svg>
      )
    case 'seats':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className={cls}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      )
    case 'fuel':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className={cls}>
          <path d="M3 22V6a2 2 0 012-2h8a2 2 0 012 2v16M3 22h12M12 12h4a2 2 0 012 2v4a2 2 0 002 2V8l-3-4"/>
          <path d="M7 10h4M7 6h4"/>
        </svg>
      )
    case 'year':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className={cls}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    default:
      return null
  }
}

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const car = getCarById(id)

  if (!car) notFound()

  // Related cars: same provider, different car, max 4
  const related = cars
    .filter((c) => c.providerId === car.providerId && c.id !== car.id)
    .slice(0, 4)

  const specs = [
    { type: 'transmission', label: 'Transmission', value: car.transmission },
    { type: 'seats',        label: 'Seats',         value: `${car.seats} seats` },
    { type: 'fuel',         label: 'Fuel Type',     value: car.fuelType },
    { type: 'year',         label: 'Model Year',    value: String(car.year) },
  ]

  const waText = encodeURIComponent(
    `Hi, I'd like to book the ${car.year} ${car.brand} ${car.model}. Could you share availability and rates?`
  )

  return (
    <div className="min-h-screen pb-32 bg-stone-50">

      {/* ── HERO ────────────────────────────────────────── */}
      <div className="relative h-[300px] bg-stone-200 overflow-hidden">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-stone-900/20" />

        {/* Top bar buttons */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <a
            href={`https://wa.me/971501234567?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>

        {/* Hero info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          {/* Badges row */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${categoryColors[car.category]}`}>
              {car.category}
            </span>
            {car.isHotDeal && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Hot Deal
              </span>
            )}
            {car.isNewArrival && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                New Arrival
              </span>
            )}
            {!car.availableNow && (
              <span className="bg-stone-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Unavailable
              </span>
            )}
          </div>

          {/* Car name */}
          <h1 className="text-white font-bold text-2xl leading-tight drop-shadow-sm">
            {car.brand} {car.model}
          </h1>
          <p className="text-white/70 text-xs mt-0.5">{car.year} · {car.providerName}</p>

          {/* Price on hero */}
          <div className="mt-3 flex items-end gap-3">
            <div>
              <span className="text-white font-bold text-2xl">
                AED {car.dailyPrice.toLocaleString()}
              </span>
              <span className="text-white/60 text-xs ml-1">/day</span>
            </div>
            <span className="text-white/50 text-xs pb-0.5">
              AED {car.monthlyPrice.toLocaleString()}/month
            </span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────── */}
      <div className="px-4 pt-4">

        {/* Deposit status */}
        <div className="mb-4">
          {car.depositType === 'no-deposit' ? (
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3.5 py-2 rounded-xl">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              No Deposit Required
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-stone-100 border border-stone-200 text-stone-600 text-xs font-semibold px-3.5 py-2 rounded-xl">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Security Deposit: AED {car.depositAmount?.toLocaleString()}
            </div>
          )}
        </div>

        {/* ── PRICING BLOCK ── */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden mb-4">
          <div className="px-4 pt-3 pb-1">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Rental Rates</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-stone-100">
            {[
              { label: 'Daily',   price: car.dailyPrice,   unit: '/day',   highlight: true },
              { label: 'Weekly',  price: car.weeklyPrice,  unit: '/week',  highlight: false },
              { label: 'Monthly', price: car.monthlyPrice, unit: '/month', highlight: false },
            ].map((rate) => (
              <div
                key={rate.label}
                className={`flex flex-col items-center py-4 ${rate.highlight ? 'bg-amber-50' : ''}`}
              >
                <p className={`text-[10px] font-semibold mb-1 ${rate.highlight ? 'text-amber-600' : 'text-stone-400'}`}>
                  {rate.label}
                </p>
                <p className={`font-bold text-lg leading-none ${rate.highlight ? 'text-amber-700' : 'text-stone-800'}`}>
                  {rate.price.toLocaleString()}
                </p>
                <p className={`text-[10px] mt-0.5 ${rate.highlight ? 'text-amber-500' : 'text-stone-400'}`}>
                  AED{rate.unit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── ABOUT ── */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-4">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">About This Car</h2>
          <p className="text-stone-700 text-sm leading-relaxed">{car.shortDescription}</p>
        </div>

        {/* ── SPECS ── */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-4">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Specifications</h2>
          <div className="grid grid-cols-2 gap-y-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center flex-shrink-0">
                  <SpecIcon type={spec.type} />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-medium">{spec.label}</p>
                  <p className="text-sm font-semibold text-stone-800">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        {car.features.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-4">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Key Features</h2>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-100 text-stone-700 text-xs font-medium px-3 py-1.5 rounded-xl"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── PROVIDER CARD ── */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-4">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Rental Provider</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-stone-900 text-sm">{car.providerName}</p>
              <p className="text-xs text-stone-500 mt-0.5">Verified Dubai rental provider</p>
            </div>
            <a
              href={`https://wa.me/971501234567?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-3 py-2 rounded-xl"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat Now
            </a>
          </div>
        </div>

        {/* ── RELATED CARS ── */}
        {related.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-stone-900">
                More from {car.providerName}
              </h2>
              <Link href="/shop" className="text-amber-600 text-[11px] font-bold">
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {related.map((c) => (
                <CarCard key={c.id} car={c} compact />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── STICKY BOTTOM CTA ── */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[480px] mx-auto bg-white/95 backdrop-blur-sm border-t border-stone-100 px-4 py-3 z-40">
        <div className="flex gap-2">
          <a
            href={`https://wa.me/971501234567?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book on WhatsApp
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 px-5 rounded-2xl text-sm transition-colors"
          >
            Inquiry
          </Link>
        </div>
      </div>

    </div>
  )
}
