'use client'

import Link from 'next/link'
import { Provider } from '@/lib/types'

const colorMap: Record<string, { accent: string; pill: string; glow: string }> = {
  amber:   { accent: 'from-amber-400 to-amber-600',     pill: 'text-amber-600',   glow: 'shadow-[0_8px_28px_rgba(245,158,11,0.25)]' },
  emerald: { accent: 'from-emerald-400 to-emerald-600', pill: 'text-emerald-600', glow: 'shadow-[0_8px_28px_rgba(16,185,129,0.25)]' },
  violet:  { accent: 'from-violet-400 to-violet-600',   pill: 'text-violet-600',  glow: 'shadow-[0_8px_28px_rgba(139,92,246,0.25)]' },
  blue:    { accent: 'from-blue-400 to-blue-600',       pill: 'text-blue-600',    glow: 'shadow-[0_8px_28px_rgba(59,130,246,0.25)]' },
  rose:    { accent: 'from-rose-400 to-rose-600',       pill: 'text-rose-600',    glow: 'shadow-[0_8px_28px_rgba(244,63,94,0.25)]' },
  teal:    { accent: 'from-teal-400 to-teal-600',       pill: 'text-teal-600',    glow: 'shadow-[0_8px_28px_rgba(20,184,166,0.25)]' },
  indigo:  { accent: 'from-indigo-400 to-indigo-600',   pill: 'text-indigo-600',  glow: 'shadow-[0_8px_28px_rgba(99,102,241,0.25)]' },
}

export default function ProviderPromo({ provider }: { provider: Provider }) {
  const colors = colorMap[provider.color] || colorMap.amber

  return (
    <div className="max-w-[1200px] mx-auto px-5">
      <div className="my-6 rounded-3xl glass p-6 md:p-8 relative overflow-hidden">
        {/* Accent glow line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.accent}`} />

        {/* Provider header */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`glass text-[10px] font-black px-3 py-1.5 rounded-full tracking-[0.14em] uppercase ${colors.pill}`}>
            {provider.name}
          </span>
          <span className="text-[11px] text-stone-400 font-medium">{provider.tagline}</span>
        </div>

        {/* Promo content */}
        <h3 className="font-display font-bold text-stone-900 text-xl md:text-2xl leading-snug mb-2">{provider.promoTitle}</h3>
        <p className="text-stone-500 text-[13px] md:text-sm leading-relaxed mb-6 max-w-2xl">{provider.promoText}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={`https://wa.me/971556755532?text=Hi, I'd like to inquire about ${provider.name} rental offers`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 bg-gradient-to-br ${colors.accent} ${colors.glow} text-white text-[11px] font-bold tracking-wide uppercase px-5 py-2.5 rounded-full transition-transform hover:scale-[1.03]`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book on WhatsApp
          </a>
          <Link
            href={`/shop?provider=${provider.id}`}
            className="glass text-stone-700 text-[11px] font-semibold tracking-wide uppercase px-5 py-2.5 rounded-full hover:shadow-md transition-colors"
          >
            View Fleet
          </Link>
        </div>
      </div>
    </div>
  )
}
