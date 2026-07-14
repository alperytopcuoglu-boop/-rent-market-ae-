'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/lib/types'
import { carHref } from '@/lib/slugs'

interface CarCardProps {
  car: Car
  compact?: boolean
  featured?: boolean
}

// Tek badge kuralı: HOT > NEW > 0 DEP — kart başına en fazla 1.
function primaryBadge(car: Car): { label: string; cls: string } | null {
  if (car.isHotDeal) return { label: 'Hot Deal', cls: 'bg-rose-500 text-white' }
  if (car.isNewArrival) return { label: 'New', cls: 'bg-amber-500 text-white' }
  if (car.depositType === 'no-deposit') return { label: 'No Deposit', cls: 'bg-emerald-500 text-white' }
  return null
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <span className="text-[10px] font-bold text-stone-600 leading-none">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function CarCard({ car, compact = false, featured = false }: CarCardProps) {
  const [imgError, setImgError] = useState(false)
  const badge = primaryBadge(car)

  if (featured) {
    return (
      <Link href={carHref(car)} className="block group">
        <div className="relative rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm card-lift">
          <div className="relative h-56 md:h-72 bg-stone-100 overflow-hidden">
            <Image
              src={imgError ? '' : car.image}
              alt={`Rent ${car.brand} ${car.model} in Dubai`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover img-zoom"
              priority
              onError={() => setImgError(true)}
              unoptimized
            />
            {badge && (
              <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${badge.cls}`}>
                {badge.label}
              </span>
            )}
          </div>
          <div className="flex items-end justify-between px-4 py-3.5">
            <div>
              <h3 className="font-display font-bold text-stone-900 text-base leading-tight">
                {car.brand} {car.model}
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">{car.year} · {car.providerName}</p>
            </div>
            <div className="text-right">
              <p className="font-display font-extrabold text-stone-900 text-xl leading-none">
                AED {car.dailyPrice.toLocaleString('en-US')}
              </p>
              <p className="text-stone-400 text-[10px] mt-0.5">/day</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={carHref(car)} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm card-lift">
        {/* Görsel */}
        <div className={`relative bg-stone-100 overflow-hidden ${compact ? 'h-[130px] md:h-[160px]' : 'h-44'}`}>
          <Image
            src={imgError ? '' : car.image}
            alt={`Rent ${car.brand} ${car.model} in Dubai`}
            fill
            sizes="(max-width: 768px) 50vw, 300px"
            className="object-cover img-zoom"
            onError={() => setImgError(true)}
            unoptimized
          />
          {badge && (
            <span className={`absolute top-2.5 left-2.5 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide ${badge.cls}`}>
              {badge.label}
            </span>
          )}
          {!car.availableNow && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-stone-800/85 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                Unavailable
              </span>
            </div>
          )}
        </div>

        {/* Gövde — fiyat, başlıktan sonra en baskın öğe */}
        <div className="p-3">
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-bold text-stone-900 text-[13px] leading-snug line-clamp-1 flex-1">
              {car.brand} {car.model}
            </h3>
            <StarRating rating={car.rating} />
          </div>
          <p className="text-[10px] text-stone-400 font-medium mt-0.5 mb-2.5">
            {car.year} · {car.providerName}
          </p>

          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-stone-900 text-[16px] leading-none">
                AED {car.dailyPrice.toLocaleString('en-US')}
              </span>
              <span className="text-stone-400 text-[9px] font-medium">/day</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
