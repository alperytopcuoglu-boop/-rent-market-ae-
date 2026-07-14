'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import HeroBanner from '@/components/home/HeroBanner'
import RequestBanner from '@/components/home/RequestBanner'
import ScenarioStrip from '@/components/home/ScenarioStrip'
import ProviderCards from '@/components/home/ProviderCards'
import ProviderPromo from '@/components/home/ProviderPromo'
import CarSection from '@/components/home/CarSection'
import CarCard from '@/components/home/CarCard'
import TrustBlock from '@/components/home/TrustBlock'
import {
  cars,
  getHotDeals,
  getPopularCars,
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

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />

      {/* 1-2. Hero (light) + talep başlatıcı şerit */}
      {!selectedProviderId && (
        <>
          <HeroBanner />
          <RequestBanner />
          <ScenarioStrip />
        </>
      )}

      {/* 5. Provider kartları */}
      <ProviderCards selectedId={selectedProviderId} onSelect={setSelectedProviderId} />
      {selectedProvider && <ProviderPromo provider={selectedProvider} />}

      <div className="max-w-[1200px] mx-auto pt-8">
        {/* 6. Hot Deals */}
        {hotDeals.length > 0 && <CarSection title="Hot Deals" cars={hotDeals} horizontal />}

        {/* 7. Popular Picks */}
        {popularCars.length > 0 && (
          <CarSection title="Popular Picks" cars={popularCars} horizontal />
        )}

        {/* 8. All Cars grid */}
        <div className="px-5 md:px-8 mb-14">
          <div className="mb-5">
            <p className="section-label">The Fleet</p>
            <h2 className="font-display font-bold text-stone-900 text-xl md:text-2xl mt-1">
              {selectedProvider ? `${selectedProvider.name} Fleet` : 'All Cars'}{' '}
              <span className="text-stone-400 text-sm font-medium">({filteredCars.length})</span>
            </h2>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm font-bold text-stone-600">No cars available</p>
              <p className="text-xs mt-1 text-stone-400">Try selecting a different provider</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} compact />
              ))}
            </div>
          )}
        </div>

        {/* 9. Güven bloğu */}
        {!selectedProviderId && <TrustBlock />}
      </div>
    </div>
  )
}
