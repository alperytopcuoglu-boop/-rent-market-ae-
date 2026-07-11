'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import HeroBanner from '@/components/home/HeroBanner'
import ProviderCards from '@/components/home/ProviderCards'
import ProviderPromo from '@/components/home/ProviderPromo'
import CarSection from '@/components/home/CarSection'
import CarCard from '@/components/home/CarCard'
import {
  cars,
  getHotDeals,
  getPopularCars,
  getNewArrivals,
  getCarsByProvider,
  getProviderById,
  getFeaturedCar,
} from '@/lib/data'

export default function HomePage() {
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null)
  const selectedProvider = selectedProviderId ? getProviderById(selectedProviderId) : null

  const filteredCars = useMemo(() => {
    if (selectedProviderId) return getCarsByProvider(selectedProviderId)
    return cars
  }, [selectedProviderId])

  const hotDeals = useMemo(() => {
    if (selectedProviderId) return filteredCars.filter((c) => c.isHotDeal)
    return getHotDeals()
  }, [selectedProviderId, filteredCars])

  const popularCars = useMemo(() => {
    if (selectedProviderId) return filteredCars.filter((c) => c.isPopular)
    return getPopularCars()
  }, [selectedProviderId, filteredCars])

  const newArrivals = useMemo(() => {
    if (selectedProviderId) return filteredCars.filter((c) => c.isNewArrival)
    return getNewArrivals()
  }, [selectedProviderId, filteredCars])

  const featuredCar = useMemo(() => getFeaturedCar(), [])

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      <Header />

      {/* Hero Banner */}
      {!selectedProviderId && <HeroBanner />}

      {/* Provider Cards */}
      <ProviderCards selectedId={selectedProviderId} onSelect={setSelectedProviderId} />

      {/* Provider Promo */}
      {selectedProvider && <ProviderPromo provider={selectedProvider} />}

      <div className="pt-10 max-w-7xl mx-auto">

        {/* Featured Deal — only on home (no provider selected) */}
        {!selectedProviderId && (
          <div className="px-5 mb-12">
            <div className="mb-5">
              <p className="section-label">Spotlight</p>
              <h2 className="font-display font-bold text-stone-900 text-xl md:text-2xl mt-1">Featured Deal</h2>
            </div>
            <div className="md:max-w-4xl">
              <CarCard car={featuredCar} featured />
            </div>
          </div>
        )}

        {/* Hot Deals */}
        {hotDeals.length > 0 && (
          <CarSection title="Hot Deals" cars={hotDeals} horizontal />
        )}

        {/* Popular Picks */}
        {popularCars.length > 0 && (
          <CarSection title="Popular Picks" cars={popularCars} horizontal />
        )}

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <CarSection title="New Arrivals" cars={newArrivals} horizontal />
        )}

        {/* All Cars grid */}
        <div className="px-5 mb-12">
          <div className="mb-5">
            <p className="section-label">The Fleet</p>
            <h2 className="font-display font-bold text-stone-900 text-xl md:text-2xl mt-1">
              {selectedProvider ? `${selectedProvider.name} Fleet` : 'All Cars'}{' '}
              <span className="text-stone-400 text-sm font-medium">({filteredCars.length})</span>
            </h2>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p className="text-sm font-bold text-stone-600">No cars available</p>
              <p className="text-xs mt-1 text-stone-400">Try selecting a different provider</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} compact />
              ))}
            </div>
          )}
        </div>

        {/* Trust Strip */}
        {!selectedProviderId && (
          <div className="px-5 pb-16">
            <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-60" />
              <div className="text-center mb-8">
                <p className="section-label">Why Choose Us</p>
                <h3 className="font-display font-bold text-stone-900 text-2xl md:text-3xl mt-1">
                  Dubai&apos;s Trusted Marketplace
                </h3>
              </div>

              {/* 3 pillars */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 max-w-3xl mx-auto">
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1" fill="#d97706"/>
                      </svg>
                    ),
                    label: 'No Deposit\nOptions',
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    ),
                    label: 'Same-Day\nDelivery',
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                      </svg>
                    ),
                    label: 'WhatsApp\nBooking',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[11px] text-stone-700 text-center font-semibold leading-tight whitespace-pre-line">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div className="border-t border-stone-200/70 pt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
                {['Verified providers', 'Full insurance', 'No hidden fees', '24/7 support'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="text-[11px] text-stone-500 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
