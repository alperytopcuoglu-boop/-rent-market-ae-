import Link from 'next/link'

// Senaryo şeridi — emoji yerine tutarlı çizgi ikonlar (premium his).
const SCENARIOS = [
  {
    title: 'Desert Trip',
    sub: 'Capable SUVs',
    href: '/shop?category=SUV',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="17" cy="6" r="2.5" />
        <path d="M2 19h20" />
        <path d="M4 19c1.5-4 3-6 5-6s3.5 2 5 6" />
        <path d="M12 19c1-2.5 2-4 3.5-4s2.5 1.5 3.5 4" />
      </svg>
    ),
  },
  {
    title: 'Night Out',
    sub: 'Sports & exotics',
    href: '/shop?category=Sports',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        <path d="M16 5h.01M19 8h.01" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    title: 'Business',
    sub: 'Executive class',
    href: '/shop?category=Luxury',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <path d="M2 13h20" />
      </svg>
    ),
  },
  {
    title: 'Family',
    sub: 'Comfort & space',
    href: '/shop?category=Economy',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
        <circle cx="10" cy="7" r="3.5" />
        <path d="M21 21v-2a4 4 0 00-3-3.87M16 3.6a3.5 3.5 0 010 6.8" />
      </svg>
    ),
  },
]

export default function ScenarioStrip() {
  return (
    <div className="max-w-[1200px] mx-auto pt-8">
      <div className="overflow-x-auto scrollbar-hide px-5 md:px-8">
        <div className="flex gap-3 md:gap-4 w-max md:w-full">
          {SCENARIOS.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="flex items-center gap-3 bg-white rounded-2xl border border-stone-100 shadow-sm px-4 py-3.5 md:flex-1 card-lift"
            >
              <span className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </span>
              <div>
                <p className="font-display font-bold text-stone-900 text-[13px] leading-tight">{s.title}</p>
                <p className="text-stone-400 text-[10px] mt-0.5">{s.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
