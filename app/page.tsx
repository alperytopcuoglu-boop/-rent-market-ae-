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
  providers,
  getHotDeals,
  getPopularCars,
  getNewArrivals,
  getCarsByProvider,
  getProviderById,
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

  return (
    <div className="min-h-screen pb-20">
      <Header />

      {/* Hero — hide when provider selected */}
      {!selectedProviderId && <HeroBanner />}

      {/* Provider Cards */}
      <ProviderCards
        selectedId={selectedProviderId}
        onSelect={setSelectedProviderId}
      />

      {/* Provider Promo banner */}
      {selectedProvider && <ProviderPromo provider={selectedProvider} />}

      {/* Content sections */}
      <div className="pt-2">
        {/* Hot Deals */}
        {hotDeals.length > 0 && (
          <CarSection
            title="Hot Deals"
            emoji="🔥"
            cars={hotDeals}
            horizontal
          />
        )}

        {/* Popular Cars */}
        {popularCars.length > 0 && (
          <CarSection
            title="Popular Cars"
            emoji="⭐"
            cars={popularCars}
            horizontal
          />
        )}

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <CarSection
            title="New Arrivals"
            emoji="✨"
            cars={newArrivals}
            horizontal
          />
        )}

        {/* All Cars */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-stone-900 text-sm">
              {selectedProvider
                ? `${selectedProvider.name} Fleet`
                : 'All Cars'}
              <span className="ml-1.5 text-stone-400 font-normal text-[11px]">
                ({filteredCars.length})
              </span>
            </h2>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-stone-600">No cars available</p>
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

        {/* Trust strip */}
        {!selectedProviderId && (
          <div className="mx-4 mb-6 bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 text-center">
              Why Rent Market AE
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {/* No Deposit */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    <circle cx="12" cy="16" r="1" fill="#78716c"/>
                  </svg>
                </div>
                <span className="text-[10px] text-stone-600 text-center font-semibold leading-tight">
                  No Deposit<br/>Options
                </span>
              </div>

              {/* Same-Day Delivery */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <span className="text-[10px] text-stone-600 text-center font-semibold leading-tight">
                  Same-Day<br/>Delivery
                </span>
              </div>

              {/* WhatsApp Booking */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <span className="text-[10px] text-stone-600 text-center font-semibold leading-tight">
                  WhatsApp<br/>Booking
                </span>
              </div>
            </div>

            {/* Divider + secondary row */}
            <div className="border-t border-stone-100 mt-4 pt-3 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.8" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-[10px] text-stone-500 font-medium">Verified providers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.8" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-[10px] text-stone-500 font-medium">Full insurance</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.8" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-[10px] text-stone-500 font-medium">No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.8" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-[10px] text-stone-500 font-medium">24/7 support</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
