'use client'

import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'
import { getCarById } from '@/lib/data'

const categoryColors: Record<string, string> = {
  Economy: 'bg-emerald-50 text-emerald-700',
  SUV: 'bg-blue-50 text-blue-700',
  Luxury: 'bg-violet-50 text-violet-700',
  Sports: 'bg-amber-50 text-amber-700',
  Exotic: 'bg-rose-50 text-rose-700',
}

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const car = getCarById(id)

  if (!car) notFound()

  const specs = [
    { icon: '⚙️', label: 'Transmission', value: car.transmission },
    { icon: '👥', label: 'Seats', value: `${car.seats} seats` },
    { icon: '⛽', label: 'Fuel', value: car.fuelType },
    { icon: '📅', label: 'Year', value: String(car.year) },
  ]

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-stone-100">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-stone-700">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-stone-900 text-sm truncate">
              {car.brand} {car.model}
            </p>
            <p className="text-[11px] text-stone-400">{car.providerName}</p>
          </div>
          <a
            href={`https://wa.me/971501234567?text=Hi, I'm interested in renting the ${car.year} ${car.brand} ${car.model}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#22c55e"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-56 bg-stone-100">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
          priority
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {car.isHotDeal && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              🔥 Hot Deal
            </span>
          )}
          {car.isNewArrival && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              ✨ New Arrival
            </span>
          )}
        </div>
        {/* Availability */}
        {!car.availableNow && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-stone-900/80 text-white text-[10px] font-bold px-3 py-1 rounded-full">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="px-4 pt-4">
        {/* Car title */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-xl font-bold text-stone-900">
              {car.brand} {car.model}
            </h1>
            <p className="text-stone-500 text-sm">{car.year} · {car.providerName}</p>
          </div>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg flex-shrink-0 mt-1 ${categoryColors[car.category]}`}>
            {car.category}
          </span>
        </div>

        {/* Deposit badge */}
        {car.depositType === 'no-deposit' ? (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
            ✓ No Deposit Required
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Deposit: AED {car.depositAmount?.toLocaleString()}
          </span>
        )}

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-4">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Rental Rates</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Daily', price: car.dailyPrice, unit: '/day' },
              { label: 'Weekly', price: car.weeklyPrice, unit: '/week' },
              { label: 'Monthly', price: car.monthlyPrice, unit: '/month' },
            ].map((rate) => (
              <div key={rate.label} className="text-center">
                <p className="text-[11px] text-stone-400 font-medium mb-0.5">{rate.label}</p>
                <p className="font-bold text-stone-900 text-base leading-tight">
                  AED {rate.price.toLocaleString()}
                </p>
                <p className="text-[10px] text-stone-400">{rate.unit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specs */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-4">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Specifications</h3>
          <div className="grid grid-cols-2 gap-3">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-2.5">
                <span className="text-lg">{spec.icon}</span>
                <div>
                  <p className="text-[10px] text-stone-400 font-medium">{spec.label}</p>
                  <p className="text-sm font-semibold text-stone-800">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-stone-900 mb-2">About This Car</h3>
          <p className="text-stone-600 text-sm leading-relaxed">{car.shortDescription}</p>
        </div>

        {/* Features */}
        {car.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-stone-900 mb-2">Key Features</h3>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature) => (
                <span
                  key={feature}
                  className="bg-stone-100 text-stone-700 text-xs font-medium px-3 py-1.5 rounded-xl"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-stone-100 px-4 py-3 z-40">
        <div className="flex gap-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/971501234567?text=Hi, I'd like to book the ${car.year} ${car.brand} ${car.model}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-2xl text-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book on WhatsApp
          </a>

          {/* Inquiry */}
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 px-4 rounded-2xl text-sm transition-colors"
          >
            Inquiry
          </Link>
        </div>
      </div>
    </div>
  )
}
