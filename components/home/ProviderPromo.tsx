'use client'

import Link from 'next/link'
import { Provider } from '@/lib/types'

const colorMap: Record<string, { gradient: string; button: string; badge: string }> = {
  amber: {
    gradient: 'from-amber-50 to-amber-100/60',
    button: 'bg-amber-500 hover:bg-amber-600',
    badge: 'bg-amber-500',
  },
  emerald: {
    gradient: 'from-emerald-50 to-emerald-100/60',
    button: 'bg-emerald-500 hover:bg-emerald-600',
    badge: 'bg-emerald-500',
  },
  violet: {
    gradient: 'from-violet-50 to-violet-100/60',
    button: 'bg-violet-500 hover:bg-violet-600',
    badge: 'bg-violet-500',
  },
  blue: {
    gradient: 'from-blue-50 to-blue-100/60',
    button: 'bg-blue-500 hover:bg-blue-600',
    badge: 'bg-blue-500',
  },
  rose: {
    gradient: 'from-rose-50 to-rose-100/60',
    button: 'bg-rose-500 hover:bg-rose-600',
    badge: 'bg-rose-500',
  },
}

interface ProviderPromoProps {
  provider: Provider
}

export default function ProviderPromo({ provider }: ProviderPromoProps) {
  const colors = colorMap[provider.color] || colorMap.amber

  return (
    <div className={`mx-4 my-3 rounded-2xl bg-gradient-to-br ${colors.gradient} p-4 border border-white`}>
      {/* Provider badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`${colors.badge} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
          {provider.badge} {provider.name}
        </span>
        <span className="text-[10px] text-stone-500 font-medium">{provider.tagline}</span>
      </div>

      {/* Promo content */}
      <h3 className="font-bold text-stone-900 text-base mb-1">{provider.promoTitle}</h3>
      <p className="text-stone-600 text-xs leading-relaxed mb-4">{provider.promoText}</p>

      {/* Actions */}
      <div className="flex gap-2">
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 ${colors.button} text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Book on WhatsApp
        </a>
        <Link
          href="/shop"
          className="text-stone-700 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 transition-colors"
        >
          View All Cars
        </Link>
      </div>
    </div>
  )
}
