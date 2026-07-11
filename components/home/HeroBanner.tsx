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
    cta: 'Explore the Fleet',
    ctaHref: '/shop',
    ctaSecondary: 'Book on WhatsApp',
    ctaSecondaryHref: 'https://wa.me/971556755532',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80',
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
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    badge: 'Exotic & Luxury Fleet',
    headline: 'Lamborghini,\nFerrari & More',
    sub: 'Exclusive exotic rentals — VIP concierge delivery across Dubai.',
    cta: 'View Exotic Cars',
    ctaHref: '/shop',
    ctaSecondary: 'Book on WhatsApp',
    ctaSecondaryHref: 'https://wa.me/971556755532',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 4,
    badge: 'Premium SUV Collection',
    headline: 'G63, Patrol\n& Range Rover',
    sub: 'Dominate Dubai roads. Premium SUVs for daily and monthly hire.',
    cta: 'Browse SUVs',
    ctaHref: '/shop',
    ctaSecondary: 'Contact Us',
    ctaSecondaryHref: '/contact',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 5,
    badge: 'Monthly Rental Plans',
    headline: 'Long-Term\nSavings Await',
    sub: 'Monthly rentals from AED 5,900. Full insurance included. No hidden fees.',
    cta: 'View Monthly Rates',
    ctaHref: '/shop',
    ctaSecondary: 'Send Inquiry',
    ctaSecondaryHref: '/contact',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
  },
]

const stats = [
  { value: '100+', label: 'Premium Cars' },
  { value: '5', label: 'Verified Providers' },
  { value: '0', label: 'Deposit Options' },
  { value: '24/7', label: 'WhatsApp Support' },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <div className="relative w-full h-[540px] md:h-[640px] lg:h-[calc(100vh-72px)] lg:max-h-[820px] overflow-hidden">
      {/* Background images — all preloaded, crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={s.image}
            alt={s.headline}
            fill
            sizes="100vw"
            className={`object-cover transition-transform duration-[6000ms] ease-out ${
              i === current ? 'scale-105' : 'scale-100'
            }`}
            priority={i === 0}
            unoptimized
          />
          {/* Cinematic gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
        </div>
      ))}

      {/* Slide content */}
      <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-5 md:px-8 pb-10 md:pb-14">
        {/* Campaign badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 glass-dark text-amber-300 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 bg-gold-gradient rounded-full animate-pulse-dot" />
            {slide.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-white font-bold text-[40px] leading-[1.04] md:text-6xl lg:text-[76px] mb-4 md:mb-5 whitespace-pre-line">
          {slide.headline}
        </h1>

        {/* Supporting text */}
        <p className="text-zinc-300 text-[13px] md:text-base mb-7 md:mb-9 leading-relaxed max-w-[300px] md:max-w-lg">
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href={slide.ctaHref}
            className="bg-gold-gradient gold-glow text-white text-[12px] md:text-[13px] font-bold tracking-wide uppercase px-6 py-3.5 md:px-8 md:py-4 rounded-full transition-transform hover:scale-[1.04]"
          >
            {slide.cta}
          </Link>
          <a
            href={slide.ctaSecondaryHref}
            target={slide.ctaSecondaryHref.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="glass-dark text-white text-[12px] md:text-[13px] font-semibold tracking-wide uppercase px-6 py-3.5 md:px-8 md:py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            {slide.ctaSecondary}
          </a>
        </div>

        {/* Stats strip */}
        <div className="hidden md:grid grid-cols-4 gap-px mt-12 max-w-2xl rounded-2xl overflow-hidden border border-white/[0.14]">
          {stats.map((s) => (
            <div key={s.label} className="bg-black/25 backdrop-blur-md px-6 py-4">
              <p className="font-display text-white font-bold text-2xl leading-none">{s.value}</p>
              <p className="text-zinc-300 text-[10px] font-semibold tracking-[0.14em] uppercase mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 flex gap-1.5 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-7 h-1 bg-gold-gradient' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
