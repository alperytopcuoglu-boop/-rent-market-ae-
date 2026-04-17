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
    <div className="min-h-screen pb-20">
      <Header />

      {/* Hero Banner */}
      {!selectedProviderId && <HeroBanner />}

      {/* Provider Cards */}
      <ProviderCards selectedId={selectedProviderId} onSelect={setSelectedProviderId} />

      {/* Provider Promo */}
      {selectedProvider && <ProviderPromo provider={selectedProvider} />}

      <div className="pt-3">

        {/* Featured Deal — only on home (no provider selected) */}
        {!selectedProviderId && (
          <div className="px-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="font-bold text-stone-900 text-[15px]">Featured Deal</h2>
            </div>
            <CarCard car={featuredCar} featured />
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
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              <h2 className="font-bold text-stone-900 text-[15px]">
                {selectedProvider ? `${selectedProvider.name} Fleet` : 'All Cars'}
              </h2>
              <span className="text-[11px] text-stone-400 font-medium">({filteredCars.length})</span>
            </div>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-14">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p className="text-sm font-bold text-stone-600">No cars available</p>
              <p className="text-xs mt-1 text-stone-400">Try selecting a different provider</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} compact />
              ))}
            </div>
          )}
        </div>

        {/* Trust Strip */}
        {!selectedProviderId && (
          <div className="mx-4 mb-6 bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
            <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 text-center">
              Why Rent Market AE
            </h3>

            {/* 3 icons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1" fill="#78716c"/>
                    </svg>
                  ),
                  label: 'No Deposit\nOptions',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  label: 'Same-Day\nDelivery',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  ),
                  label: 'WhatsApp\nBooking',
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-stone-600 text-center font-semibold leading-tight whitespace-pre-line">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="border-t border-stone-100 pt-3 grid grid-cols-2 gap-2">
              {['Verified providers', 'Full insurance', 'No hidden fees', '24/7 support'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-[10px] text-stone-500 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
