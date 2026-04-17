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

const sectionMeta: Record<string, { dot: string }> = {
  'Hot Deals':     { dot: 'bg-rose-500'    },
  'Popular Picks': { dot: 'bg-amber-500'   },
  'New Arrivals':  { dot: 'bg-emerald-500' },
}

export default function CarSection({
  title,
  cars,
  viewAllHref = '/shop',
  horizontal = false,
}: CarSectionProps) {
  if (cars.length === 0) return null

  const meta = sectionMeta[title] || { dot: 'bg-stone-400' }

  const header = (
    <div className="flex items-center justify-between px-4 mb-3">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`} />
        <h2 className="font-bold text-stone-900 text-[15px] leading-none">{title}</h2>
        <span className="text-[11px] text-stone-400 font-medium">({cars.length})</span>
      </div>
      <Link href={viewAllHref} className="text-amber-600 text-[11px] font-bold">
        See All →
      </Link>
    </div>
  )

  if (horizontal) {
    return (
      <div className="mb-6">
        {header}
        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-3 w-max pb-1">
            {cars.map((car) => (
              <div key={car.id} className="w-[178px] flex-shrink-0">
                <CarCard car={car} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      {header}
      <div className="px-4 grid grid-cols-2 gap-3">
        {cars.slice(0, 4).map((car) => (
          <CarCard key={car.id} car={car} compact />
        ))}
      </div>
    </div>
  )
}
