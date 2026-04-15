'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/lib/types'

interface CarCardProps {
  car: Car
  compact?: boolean
}

const categoryColors: Record<string, string> = {
  Economy: 'bg-emerald-50 text-emerald-700',
  SUV: 'bg-blue-50 text-blue-700',
  Luxury: 'bg-violet-50 text-violet-700',
  Sports: 'bg-amber-50 text-amber-700',
  Exotic: 'bg-rose-50 text-rose-700',
}

export default function CarCard({ car, compact = false }: CarCardProps) {
  return (
    <Link href={`/cars/${car.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-200">
        {/* Image */}
        <div className={`relative bg-stone-100 ${compact ? 'h-32' : 'h-44'}`}>
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
          />

          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {car.isHotDeal && (
              <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                🔥 Hot Deal
              </span>
            )}
            {car.isNewArrival && (
              <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                ✨ New
              </span>
            )}
            {car.depositType === 'no-deposit' && (
              <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                No Deposit
              </span>
            )}
          </div>

          {/* Availability */}
          {!car.availableNow && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-stone-800/80 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                Not Available
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Car name + year */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-bold text-stone-900 text-sm leading-tight">
                {car.brand} {car.model}
              </h3>
              <span className="text-[11px] text-stone-400 font-medium">{car.year}</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${
                categoryColors[car.category]
              }`}
            >
              {car.category}
            </span>
          </div>

          {/* Provider */}
          <p className="text-[11px] text-stone-500 mb-2">{car.providerName}</p>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-900 text-base">
                AED {car.dailyPrice.toLocaleString()}
              </span>
              <span className="text-stone-400 text-[11px]">/day</span>
              {!compact && (
                <p className="text-[11px] text-stone-400">
                  AED {car.weeklyPrice.toLocaleString()}/week
                </p>
              )}
            </div>
            <div className="flex gap-1.5">
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/971501234567?text=Hi, I'm interested in renting the ${car.year} ${car.brand} ${car.model}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center hover:bg-green-100 transition-colors"
                aria-label="Book on WhatsApp"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#22c55e"/>
                </svg>
              </a>

              {/* View CTA */}
              <span className="bg-amber-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl">
                View
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
