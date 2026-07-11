'use client'

import { providers } from '@/lib/data'
import { Provider } from '@/lib/types'

interface ProviderCardsProps {
  selectedId: string | null
  onSelect: (id: string | null) => void
}

// Monogram badges — polished lettermark per provider
const monogramMap: Record<string, string> = {
  '4hire':      '4H',
  'habibcar':   'HC',
  'exoticcar':  'EX',
  'royaldrive': 'RD',
  'elitedrive': 'ED',
}

const colorMap: Record<string, { text: string; activeBg: string; glow: string }> = {
  amber:   { text: 'text-amber-600',   activeBg: 'bg-gradient-to-br from-amber-400 to-amber-600',     glow: 'shadow-[0_8px_28px_rgba(245,158,11,0.35)]' },
  emerald: { text: 'text-emerald-600', activeBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600', glow: 'shadow-[0_8px_28px_rgba(16,185,129,0.35)]' },
  violet:  { text: 'text-violet-600',  activeBg: 'bg-gradient-to-br from-violet-400 to-violet-600',   glow: 'shadow-[0_8px_28px_rgba(139,92,246,0.35)]' },
  blue:    { text: 'text-blue-600',    activeBg: 'bg-gradient-to-br from-blue-400 to-blue-600',       glow: 'shadow-[0_8px_28px_rgba(59,130,246,0.35)]' },
  rose:    { text: 'text-rose-600',    activeBg: 'bg-gradient-to-br from-rose-400 to-rose-600',       glow: 'shadow-[0_8px_28px_rgba(244,63,94,0.35)]' },
}

function ProviderCard({
  provider,
  isSelected,
  onSelect,
}: {
  provider: Provider
  isSelected: boolean
  onSelect: () => void
}) {
  const colors = colorMap[provider.color] || colorMap.amber

  return (
    <button
      onClick={onSelect}
      className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-200 ${
        isSelected ? 'scale-[1.04]' : 'scale-100'
      }`}
    >
      {/* Logo block */}
      <div
        className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center transition-all duration-200 ${
          isSelected
            ? `${colors.activeBg} ${colors.glow}`
            : 'glass hover:shadow-md'
        }`}
      >
        <span
          className={`text-[17px] font-black tracking-tight leading-none ${
            isSelected ? 'text-white' : colors.text
          }`}
        >
          {monogramMap[provider.id] || '••'}
        </span>
      </div>

      {/* Name */}
      <span
        className={`text-[10px] font-bold tracking-wide text-center leading-tight max-w-[64px] uppercase ${
          isSelected ? 'text-stone-900' : 'text-stone-500'
        }`}
      >
        {provider.name}
      </span>

      {/* Tagline */}
      <span className="text-[9px] text-stone-400 text-center leading-tight max-w-[64px]">
        {provider.tagline}
      </span>
    </button>
  )
}

export default function ProviderCards({ selectedId, onSelect }: ProviderCardsProps) {
  return (
    <div className="border-b border-stone-200/60">
      {/* Section title */}
      <div className="px-5 pt-8 pb-4 flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <p className="section-label">Our Partners</p>
          <h2 className="font-display text-lg md:text-xl font-bold text-stone-900 mt-1">Rental Providers</h2>
        </div>
        {selectedId && (
          <button
            onClick={() => onSelect(null)}
            className="text-[11px] text-gold font-bold tracking-wide uppercase"
          >
            View All
          </button>
        )}
      </div>

      {/* Scrollable cards */}
      <div className="overflow-x-auto scrollbar-hide px-5 pb-7 max-w-7xl mx-auto">
        <div className="flex gap-5 md:gap-9 w-max">
          {/* All Cars button */}
          <button
            onClick={() => onSelect(null)}
            className="flex-shrink-0 flex flex-col items-center gap-2"
          >
            <div
              className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center transition-all duration-200 ${
                selectedId === null
                  ? 'bg-gold-gradient gold-glow'
                  : 'glass hover:shadow-md'
              }`}
            >
              <span
                className={`text-[12px] font-black tracking-[0.14em] leading-none ${
                  selectedId === null ? 'text-white' : 'text-stone-600'
                }`}
              >
                ALL
              </span>
            </div>
            <span
              className={`text-[10px] font-bold tracking-wide uppercase ${
                selectedId === null ? 'text-stone-900' : 'text-stone-500'
              }`}
            >
              All Cars
            </span>
            <span className="text-[9px] text-stone-400">Browse All</span>
          </button>

          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              isSelected={selectedId === provider.id}
              onSelect={() =>
                onSelect(selectedId === provider.id ? null : provider.id)
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
