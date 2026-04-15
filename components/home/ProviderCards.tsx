'use client'

import { providers } from '@/lib/data'
import { Provider } from '@/lib/types'

interface ProviderCardsProps {
  selectedId: string | null
  onSelect: (id: string | null) => void
}

// Clean SVG lettermark logos — one per provider
const ProviderLogo = ({ id, isSelected }: { id: string; isSelected: boolean }) => {
  const fill = isSelected ? '#ffffff' : '#44403c'
  const size = 28

  switch (id) {
    case '4hire':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="20" fill={fill} letterSpacing="-1">4H</text>
        </svg>
      )
    case 'habibcar':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* H lettermark with a thin underline accent */}
          <path d="M5 7v18M5 16h10M15 7v18" stroke={fill} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M18 24h9" stroke={fill} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      )
    case 'exoticcar':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Diamond / gem shape */}
          <path d="M16 4L28 14L16 28L4 14L16 4Z" stroke={fill} strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M4 14h24M10 14L16 4M22 14L16 4" stroke={fill} strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
        </svg>
      )
    case 'royaldrive':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crown silhouette */}
          <path d="M4 22h24M4 22L7 11l5 5 4-8 4 8 5-5 3 11" stroke={fill} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="16" cy="13" r="1.2" fill={fill}/>
        </svg>
      )
    case 'elitedrive':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylised E with horizontal bars */}
          <path d="M7 7h13M7 16h10M7 25h13" stroke={fill} strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M7 7v18" stroke={fill} strokeWidth="2.2" strokeLinecap="round"/>
          {/* small star accent */}
          <path d="M24 7l1 2.5L28 10l-2.5 1L24 14l-1-2.5L20 10l2.5-1L24 7Z" fill={fill} opacity="0.7"/>
        </svg>
      )
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke={fill} strokeWidth="2"/>
        </svg>
      )
  }
}

const colorMap: Record<string, { bg: string; activeBg: string; border: string; activeBorder: string; dot: string }> = {
  amber:   { bg: 'bg-stone-50',   activeBg: 'bg-stone-900',   border: 'border-stone-200', activeBorder: 'border-stone-900', dot: 'bg-amber-500' },
  emerald: { bg: 'bg-stone-50',   activeBg: 'bg-stone-900',   border: 'border-stone-200', activeBorder: 'border-stone-900', dot: 'bg-emerald-500' },
  violet:  { bg: 'bg-stone-50',   activeBg: 'bg-stone-900',   border: 'border-stone-200', activeBorder: 'border-stone-900', dot: 'bg-violet-500' },
  blue:    { bg: 'bg-stone-50',   activeBg: 'bg-stone-900',   border: 'border-stone-200', activeBorder: 'border-stone-900', dot: 'bg-blue-500' },
  rose:    { bg: 'bg-stone-50',   activeBg: 'bg-stone-900',   border: 'border-stone-200', activeBorder: 'border-stone-900', dot: 'bg-rose-500' },
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
      className={`flex-shrink-0 flex flex-col items-center gap-1.5 transition-all duration-200 ${
        isSelected ? 'scale-[1.04]' : 'scale-100'
      }`}
    >
      {/* Logo block */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
          isSelected
            ? `${colors.activeBg} ${colors.activeBorder} shadow-md`
            : `${colors.bg} ${colors.border} shadow-sm`
        }`}
      >
        <ProviderLogo id={provider.id} isSelected={isSelected} />
      </div>

      {/* Name */}
      <span
        className={`text-[10px] font-bold tracking-tight text-center leading-tight max-w-[60px] ${
          isSelected ? 'text-stone-900' : 'text-stone-500'
        }`}
      >
        {provider.name}
      </span>

      {/* Tagline */}
      <span className="text-[9px] text-stone-400 text-center leading-tight max-w-[60px]">
        {provider.tagline}
      </span>

      {/* Active indicator */}
      {isSelected && (
        <span className={`w-4 h-0.5 rounded-full ${colors.dot}`} />
      )}
    </button>
  )
}

// "All Cars" icon — minimal car outline
const AllCarsIcon = ({ isSelected }: { isSelected: boolean }) => {
  const stroke = isSelected ? '#ffffff' : '#78716c'
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 18h22M8 22h3M21 22h3" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 18l2.5-6h15L26 18" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="22" r="2" stroke={stroke} strokeWidth="1.8"/>
      <circle cx="22" cy="22" r="2" stroke={stroke} strokeWidth="1.8"/>
    </svg>
  )
}

export default function ProviderCards({ selectedId, onSelect }: ProviderCardsProps) {
  return (
    <div className="bg-white border-b border-stone-100">
      {/* Section title */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-stone-900">Rental Providers</h2>
        {selectedId && (
          <button
            onClick={() => onSelect(null)}
            className="text-[11px] text-amber-600 font-semibold"
          >
            View All
          </button>
        )}
      </div>

      {/* Scrollable cards */}
      <div className="overflow-x-auto scrollbar-hide px-4 pb-4">
        <div className="flex gap-4 w-max">
          {/* All Cars button */}
          <button
            onClick={() => onSelect(null)}
            className="flex-shrink-0 flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-200 ${
                selectedId === null
                  ? 'bg-stone-900 border-stone-900 shadow-md'
                  : 'bg-stone-50 border-stone-200 shadow-sm'
              }`}
            >
              <AllCarsIcon isSelected={selectedId === null} />
            </div>
            <span
              className={`text-[10px] font-bold tracking-tight ${
                selectedId === null ? 'text-stone-900' : 'text-stone-500'
              }`}
            >
              All Cars
            </span>
            <span className="text-[9px] text-stone-400">Browse All</span>
            {selectedId === null && (
              <span className="w-4 h-0.5 rounded-full bg-stone-400" />
            )}
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
