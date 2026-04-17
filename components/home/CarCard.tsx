'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/lib/types'

interface CarCardProps {
  car: Car
  compact?: boolean
  featured?: boolean
}

const categoryConfig: Record<string, { shadow: string; chip: string }> = {
  Economy: { shadow: 'shadow-economy', chip: 'bg-emerald-50 text-emerald-700' },
  SUV:     { shadow: 'shadow-suv',     chip: 'bg-blue-50 text-blue-700'      },
  Luxury:  { shadow: 'shadow-luxury',  chip: 'bg-violet-50 text-violet-700'  },
  Sports:  { shadow: 'shadow-sports',  chip: 'bg-amber-50 text-amber-700'    },
  Exotic:  { shadow: 'shadow-exotic',  chip: 'bg-rose-50 text-rose-700'      },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <span className="text-[10px] font-bold text-stone-700 leading-none">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function CarCard({ car, compact = false, featured = false }: CarCardProps) {
  const [imgError, setImgError] = useState(false)
  const waText = encodeURIComponent(
    `Hi, I'm interested in renting the ${car.year} ${car.brand} ${car.model}`
  )
  const cfg = categoryConfig[car.category] || categoryConfig.Sports

  if (featured) {
    return (
      <Link href={`/cars/${car.id}`} className="block">
        <div className={`relative rounded-2xl overflow-hidden ${cfg.shadow} border border-stone-100`}>
          {/* Image */}
          <div className="relative h-52 bg-stone-200">
            <Image
              src={imgError ? '' : car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              className="object-cover"
              priority
              onError={() => setImgError(true)}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

            {/* Featured badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide uppercase">
                Featured Deal
              </span>
            </div>

            {/* Rating */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-white text-[10px] font-bold">{car.rating.toFixed(1)}</span>
            </div>

            {/* Bottom info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-[11px] font-medium mb-0.5">{car.providerName}</p>
                  <h3 className="text-white font-black text-xl leading-tight">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-white/60 text-xs mt-0.5">{car.year} · {car.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-2xl leading-none">
                    AED {car.dailyPrice.toLocaleString()}
                  </p>
                  <p className="text-white/55 text-[11px]">/day</p>
                </div>
              </div>

              {/* Highlights */}
              {car.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {car.highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="bg-white/15 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="bg-white flex items-center justify-between px-4 py-3">
            {car.depositType === 'no-deposit' ? (
              <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                No Deposit
              </span>
            ) : (
              <span className="text-stone-400 text-xs font-medium">
                Deposit: AED {car.depositAmount?.toLocaleString()}
              </span>
            )}
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/971556755532?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 bg-green-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book Now
              </a>
              <span className="text-amber-600 text-[11px] font-bold">View →</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/cars/${car.id}`} className="block group">
      <div className={`bg-white rounded-2xl overflow-hidden border border-stone-100 card-lift ${cfg.shadow}`}>

        {/* Image */}
        <div className={`relative bg-stone-100 ${compact ? 'h-[130px]' : 'h-44'}`}>
          <Image
            src={imgError ? '' : car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(max-width: 480px) 50vw, 240px"
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />

          {/* Top badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {car.isHotDeal && (
              <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm tracking-wide">
                HOT
              </span>
            )}
            {car.isNewArrival && (
              <span className="bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                NEW
              </span>
            )}
            {car.depositType === 'no-deposit' && (
              <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                0 DEP
              </span>
            )}
          </div>

          {/* WhatsApp quick action */}
          <a
            href={`https://wa.me/971556755532?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
            aria-label="WhatsApp"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#22c55e">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          {/* Unavailable overlay */}
          {!car.availableNow && (
            <div className="absolute inset-0 bg-white/55 flex items-center justify-center">
              <span className="bg-stone-800/85 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                Unavailable
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-3">
          {/* Name + rating row */}
          <div className="flex items-start justify-between gap-1 mb-0.5">
            <h3 className="font-bold text-stone-900 text-[13px] leading-snug line-clamp-1 flex-1">
              {car.brand} {car.model}
            </h3>
            <StarRating rating={car.rating} />
          </div>

          {/* Year + provider */}
          <p className="text-[10px] text-stone-400 font-medium mb-2.5">
            {car.year} · {car.providerName}
          </p>

          {/* Price + category */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-black text-stone-900 text-[15px] leading-none">
                  AED {car.dailyPrice.toLocaleString()}
                </span>
                <span className="text-stone-400 text-[9px] font-medium">/day</span>
              </div>
              {!compact && (
                <p className="text-[10px] text-stone-400">
                  AED {car.weeklyPrice.toLocaleString()}/week
                </p>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/971556755532?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors flex-shrink-0"
                aria-label="WhatsApp"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#22c55e"/>
                </svg>
              </a>

              {/* View Details */}
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-xl leading-none">
                View
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
