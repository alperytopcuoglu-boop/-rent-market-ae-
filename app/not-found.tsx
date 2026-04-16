import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6 pb-24">
      {/* Icon */}
      <div className="w-16 h-16 rounded-3xl bg-white border border-stone-100 shadow-sm flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-xl font-bold text-stone-900 mb-1">Page Not Found</h1>
      <p className="text-sm text-stone-500 text-center mb-8 leading-relaxed max-w-[260px]">
        This page doesn't exist or the car you're looking for may no longer be available.
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3 w-full max-w-[280px]">
        <Link
          href="/"
          className="w-full flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="w-full flex items-center justify-center bg-white border border-stone-200 text-stone-700 font-semibold py-3.5 rounded-2xl text-sm hover:bg-stone-50 transition-colors"
        >
          Browse All Cars
        </Link>
      </div>

      {/* Brand */}
      <p className="mt-10 text-[11px] text-stone-400 font-medium">Rent Market AE</p>
    </div>
  )
}
