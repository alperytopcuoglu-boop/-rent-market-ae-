'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    badge: "Dubai's #1 Rental Marketplace",
    headline: 'Your Dream Car\nAwaits in Dubai',
    sub: '5 trusted providers. 100+ cars. Daily, weekly & monthly rates.',
    cta: 'Explore Cars',
    ctaHref: '/shop',
    ctaSecondary: 'Book on WhatsApp',
    ctaSecondaryHref: 'https://wa.me/971501234567',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    badge: 'Zero Deposit Available',
    headline: 'Drive Now,\nNo Deposit Needed',
    sub: 'Selected sports cars and SUVs with no security deposit required.',
    cta: 'View No-Deposit Cars',
    ctaHref: '/shop',
    ctaSecondary: 'How It Works',
    ctaSecondaryHref: '/shop',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    badge: 'Exotic & Luxury Fleet',
    headline: 'Lamborghini,\nFerrari & More',
    sub: 'Exclusive exotic rentals — VIP concierge delivery across Dubai.',
    cta: 'View Exotic Cars',
    ctaHref: '/shop',
    ctaSecondary: 'Book on WhatsApp',
    ctaSecondaryHref: 'https://wa.me/971501234567',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    badge: 'Weekend Special Rates',
    headline: 'Best Rates\nThis Weekend',
    sub: 'Special weekend pricing on SUVs and sports cars. Limited availability.',
    cta: 'See Weekend Deals',
    ctaHref: '/shop',
    ctaSecondary: 'Book on WhatsApp',
    ctaSecondaryHref: 'https://wa.me/971501234567',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    badge: 'Premium SUV Collection',
    headline: 'G63, Patrol\n& Range Rover',
    sub: 'Dominate Dubai roads. Premium SUVs available for daily and monthly hire.',
    cta: 'Browse SUVs',
    ctaHref: '/shop',
    ctaSecondary: 'Contact Us',
    ctaSecondaryHref: '/contact',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    badge: 'Monthly Rental Plans',
    headline: 'Long-Term\nSavings Await',
    sub: 'Monthly rentals from AED 5,900. Full insurance included. No hidden fees.',
    cta: 'View Monthly Rates',
    ctaHref: '/shop',
    ctaSecondary: 'Send Inquiry',
    ctaSecondaryHref: '/contact',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <div className="relative w-full h-[260px] overflow-hidden">
      {/* Background images — all preloaded, crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={s.image}
            alt={s.headline}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Gradient: stronger on left for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/72 via-stone-900/38 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
        </div>
      ))}

      {/* Slide content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 pb-6">
        {/* Campaign badge */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            {slide.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-white font-bold text-[22px] leading-tight mb-1.5 whitespace-pre-line drop-shadow-sm">
          {slide.headline}
        </h1>

        {/* Supporting text */}
        <p className="text-white/75 text-[11px] mb-4 leading-relaxed max-w-[260px]">
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Link
            href={slide.ctaHref}
            className="bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            {slide.cta}
          </Link>
          <a
            href={slide.ctaSecondaryHref}
            target={slide.ctaSecondaryHref.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/25 hover:bg-white/25 transition-colors"
          >
            {slide.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-3 right-4 flex gap-1.5 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
