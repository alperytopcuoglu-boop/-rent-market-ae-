'use client'

import Link from 'next/link'
import { providers, cars } from '@/lib/data'

interface ProviderCardsProps {
  selectedId: string | null
  onSelect: (id: string | null) => void
}

const accentBar: Record<string, string> = {
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  blue: 'bg-blue-500',
  rose: 'bg-rose-500',
  teal: 'bg-teal-500',
  indigo: 'bg-indigo-500',
}

// Provider kartları — logo alanı + isim + 1 satır değer önerisi (harf kutusu YOK).
export default function ProviderCards({ selectedId, onSelect }: ProviderCardsProps) {
  return (
    <div className="max-w-[1200px] mx-auto pt-8">
      <div className="px-5 md:px-8 pb-4 flex items-center justify-between">
        <div>
          <p className="section-label">Our Partners</p>
          <h2 className="font-display font-bold text-stone-900 text-lg md:text-xl mt-0.5">Rental Providers</h2>
        </div>
        <div className="flex items-center gap-4">
          {selectedId && (
            <button
              onClick={() => onSelect(null)}
              className="text-[11px] text-stone-400 font-bold tracking-wide uppercase hover:text-stone-600"
            >
              Clear
            </button>
          )}
          <Link
            href="/providers"
            className="text-[11px] text-amber-700 font-bold tracking-wide uppercase hover:text-amber-800 whitespace-nowrap"
          >
            Compare all →
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide px-5 md:px-8 pb-2">
        <div className="flex gap-3 w-max lg:w-full lg:grid lg:grid-cols-5">
          {providers.map((p) => {
            const isSelected = selectedId === p.id
            const carCount = cars.filter((c) => c.providerId === p.id).length
            return (
              <button
                key={p.id}
                onClick={() => onSelect(isSelected ? null : p.id)}
                className={`relative flex-shrink-0 w-[190px] lg:w-auto text-left bg-white rounded-2xl border shadow-sm px-4 pt-4 pb-3.5 transition-all overflow-hidden ${
                  isSelected
                    ? 'border-stone-900 shadow-md'
                    : 'border-stone-100 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <span className={`absolute top-0 left-0 right-0 h-[3px] ${accentBar[p.color] ?? 'bg-amber-500'}`} />
                <p className="font-display font-extrabold text-stone-900 text-[13px] tracking-tight leading-tight">
                  {p.name}
                </p>
                <p className="text-stone-400 text-[10.5px] mt-1 leading-snug">{p.tagline}</p>
                <p className="text-[10px] font-bold text-stone-500 mt-2.5">
                  {carCount} cars {isSelected ? '· selected ✓' : '→'}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
