import Image from 'next/image'
import Link from 'next/link'
import { cars } from '@/lib/data'

// Light hero — bej/beyaz zemin, net değer önerisi, TEK ana CTA, yanda araç görseli.
export default function HeroBanner() {
  const heroCar = cars.find((c) => c.id === 'mustang-2024') ?? cars[0]

  return (
    <div className="relative overflow-hidden bg-[#f3f1ec]">
      {/* yumuşak amber leke — az dozda */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-stone-200/60 blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8 py-10 md:py-16 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Sol: değer önerisi */}
        <div>
          <span className="inline-flex items-center gap-2 bg-white border border-stone-200 text-stone-600 text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase rounded-full px-3.5 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            5 verified providers · 1 request
          </span>

          <h1 className="font-display font-extrabold text-stone-900 text-[34px] leading-[1.06] md:text-5xl lg:text-[56px] tracking-tight mb-4">
            Tell us the car.
            <br />
            We bring the <span className="text-amber-600">best offer</span>.
          </h1>

          <p className="text-stone-500 text-[14px] md:text-base leading-relaxed max-w-md mb-7">
            One request reaches Dubai&apos;s trusted rental companies. Compare true
            totals — no deposit surprises, no hidden fees.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/request"
              className="bg-gold-gradient gold-glow text-white text-[13px] md:text-sm font-bold px-7 py-3.5 md:px-8 md:py-4 rounded-full transition-transform hover:scale-[1.03]"
            >
              Get My Best Offer
            </Link>
            <Link
              href="/shop"
              className="text-stone-600 hover:text-stone-900 text-[13px] font-semibold underline-offset-4 hover:underline"
            >
              Browse cars →
            </Link>
          </div>

          {/* Belirgin arama — native GET, JS gerekmez */}
          <form action="/shop" className="mt-7 max-w-md">
            <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-full pl-4 pr-1.5 py-1.5 shadow-[0_6px_24px_rgba(28,25,23,0.08)] focus-within:border-amber-400 transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                name="q"
                placeholder="Search — Mustang, G63, SUV, no deposit…"
                className="flex-1 bg-transparent text-[13px] text-stone-900 placeholder-stone-400 outline-none min-w-0"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-stone-900 text-white text-[11px] font-bold px-4 py-2.5 rounded-full"
              >
                Search
              </button>
            </div>
          </form>

          {/* mini güven satırı */}
          <div className="flex items-center gap-5 mt-8">
            {[
              ['100+', 'cars'],
              ['0', 'deposit options'],
              ['24/7', 'WhatsApp'],
            ].map(([v, l]) => (
              <div key={l} className="flex items-baseline gap-1.5">
                <span className="font-display font-extrabold text-stone-900 text-lg md:text-xl">{v}</span>
                <span className="text-stone-400 text-[11px] font-medium">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ: çerçeveli araç görseli */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(28,25,23,0.18)] aspect-[4/3]">
            <Image
              src={heroCar.image}
              alt={`${heroCar.brand} ${heroCar.model} for rent in Dubai`}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority
              unoptimized
            />
            {/* fiyat rozeti */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur rounded-2xl px-4 py-2.5 shadow-sm">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">{heroCar.brand} {heroCar.model}</p>
              <p className="font-display font-extrabold text-stone-900 text-lg leading-tight">
                AED {heroCar.dailyPrice} <span className="text-[11px] font-semibold text-stone-400">/day</span>
              </p>
            </div>
            {heroCar.depositType === 'no-deposit' && (
              <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                No Deposit
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
