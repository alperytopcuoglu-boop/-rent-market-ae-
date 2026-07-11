'use client'

import Link from 'next/link'
import { Car } from '@/lib/types'
import CarCard from './CarCard'

interface CarSectionProps {
  title: string
  cars: Car[]
  viewAllHref?: string
  horizontal?: boolean
}

const sectionMeta: Record<string, { label: string }> = {
  'Hot Deals':     { label: 'Limited Time' },
  'Popular Picks': { label: 'Most Booked' },
  'New Arrivals':  { label: 'Just Landed' },
}

export default function CarSection({
  title,
  cars,
  viewAllHref = '/shop',
  horizontal = false,
}: CarSectionProps) {
  if (cars.length === 0) return null

  const meta = sectionMeta[title] || { label: 'Collection' }

  const header = (
    <div className="flex items-end justify-between px-5 mb-5">
      <div>
        <p className="section-label">{meta.label}</p>
        <h2 className="font-display font-bold text-stone-900 text-xl md:text-2xl mt-1 leading-none">
          {title} <span className="text-stone-400 text-sm font-medium">({cars.length})</span>
        </h2>
      </div>
      <Link href={viewAllHref} className="text-gold text-[11px] font-bold tracking-[0.12em] uppercase">
        See All →
      </Link>
    </div>
  )

  if (horizontal) {
    return (
      <div className="mb-12">
        {header}
        <div className="overflow-x-auto scrollbar-hide px-5">
          <div className="flex gap-4 md:gap-5 w-max pb-1">
            {cars.map((car) => (
              <div key={car.id} className="w-[200px] md:w-[260px] flex-shrink-0">
                <CarCard car={car} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      {header}
      <div className="px-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {cars.slice(0, 4).map((car) => (
          <CarCard key={car.id} car={car} compact />
        ))}
      </div>
    </div>
  )
}
