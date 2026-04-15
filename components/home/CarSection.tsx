'use client'

import Link from 'next/link'
import { Car } from '@/lib/types'
import CarCard from './CarCard'

interface CarSectionProps {
  title: string
  emoji?: string
  cars: Car[]
  viewAllHref?: string
  horizontal?: boolean
}

export default function CarSection({
  title,
  emoji,
  cars,
  viewAllHref = '/shop',
  horizontal = false,
}: CarSectionProps) {
  if (cars.length === 0) return null

  if (horizontal) {
    return (
      <div className="mb-6">
        {/* Header */}
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-bold text-stone-900 text-sm">
            {emoji && <span className="mr-1.5">{emoji}</span>}
            {title}
          </h2>
          <Link href={viewAllHref} className="text-amber-600 text-[11px] font-bold">
            See All
          </Link>
        </div>

        {/* Horizontal scroll */}
        <div className="overflow-x-auto scrollbar-hide pl-4 pr-2">
          <div className="flex gap-3 w-max pr-2">
            {cars.map((car) => (
              <div key={car.id} className="w-[200px]">
                <CarCard car={car} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-stone-900 text-sm">
          {emoji && <span className="mr-1.5">{emoji}</span>}
          {title}
        </h2>
        <Link href={viewAllHref} className="text-amber-600 text-[11px] font-bold">
          See All
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {cars.slice(0, 4).map((car) => (
          <CarCard key={car.id} car={car} compact />
        ))}
      </div>
    </div>
  )
}
