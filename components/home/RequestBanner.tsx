import Link from 'next/link'

// Talep başlatıcı şerit — ana farklılaşma yüzeyine giriş.
export default function RequestBanner() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-8 -mt-5 relative z-10">
      <Link
        href="/request"
        className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-stone-100 shadow-[0_10px_32px_rgba(28,25,23,0.08)] px-5 py-4 hover:shadow-[0_14px_40px_rgba(28,25,23,0.12)] transition-shadow"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold text-stone-900 text-[14px] md:text-[15px] leading-tight">
              Tell us your car — we&apos;ll fetch the best offer
            </p>
            <p className="text-stone-400 text-[11px] md:text-xs mt-0.5">
              60 seconds · reaches 5 providers · free
            </p>
          </div>
        </div>
        <span className="flex-shrink-0 bg-stone-900 text-white text-[11px] md:text-xs font-bold px-4 py-2.5 rounded-full">
          Start →
        </span>
      </Link>
    </div>
  )
}
