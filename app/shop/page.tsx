'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import CarCard from '@/components/home/CarCard'
import { cars, providers } from '@/lib/data'
import { CategoryFilter, DepositFilter, SortOption } from '@/lib/types'

const CATEGORIES: CategoryFilter[] = ['All', 'Economy', 'SUV', 'Luxury', 'Sports', 'Exotic']

function ShopContent() {
  const searchParams = useSearchParams()
  const initialProvider = searchParams.get('provider') || 'all'
  const initialCategory = (searchParams.get('category') as CategoryFilter) || 'All'
  const initialDeposit = (searchParams.get('deposit') as DepositFilter) || 'all'

  const [search, setSearch]                    = useState(searchParams.get('q') || '')
  const [selectedProvider, setSelectedProvider] = useState<string>(initialProvider)
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  )
  const [depositFilter, setDepositFilter]       = useState<DepositFilter>(
    initialDeposit === 'no-deposit' ? 'no-deposit' : 'all'
  )
  const [availableOnly, setAvailableOnly]       = useState(false)
  const [sort, setSort]                         = useState<SortOption>('default')

  useEffect(() => {
    setSelectedProvider(searchParams.get('provider') || 'all')
    const q = searchParams.get('q')
    if (q) setSearch(q)
    const cat = searchParams.get('category') as CategoryFilter | null
    if (cat && CATEGORIES.includes(cat)) setSelectedCategory(cat)
    if (searchParams.get('deposit') === 'no-deposit') setDepositFilter('no-deposit')
  }, [searchParams])

  const filteredCars = useMemo(() => {
    let result = [...cars]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.providerName.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
    }
    if (selectedProvider !== 'all') result = result.filter((c) => c.providerId === selectedProvider)
    if (selectedCategory !== 'All') result = result.filter((c) => c.category === selectedCategory)
    if (depositFilter !== 'all')    result = result.filter((c) => c.depositType === depositFilter)
    if (availableOnly)              result = result.filter((c) => c.availableNow)

    if (sort === 'price-asc')  result.sort((a, b) => a.dailyPrice - b.dailyPrice)
    if (sort === 'price-desc') result.sort((a, b) => b.dailyPrice - a.dailyPrice)
    if (sort === 'rating')     result.sort((a, b) => b.rating - a.rating)

    return result
  }, [search, selectedProvider, selectedCategory, depositFilter, availableOnly, sort])

  const activeFilterCount = [
    selectedProvider !== 'all',
    selectedCategory !== 'All',
    depositFilter !== 'all',
    availableOnly,
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedProvider('all')
    setSelectedCategory('All')
    setDepositFilter('all')
    setAvailableOnly(false)
    setSort('default')
    setSearch('')
  }

  const activeProviderName = providers.find((p) => p.id === selectedProvider)?.name

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      <Header showSearch onSearchChange={setSearch} />

      <div className="max-w-[1200px] mx-auto">

      {/* Page header */}
      <div className="px-5 pt-8 pb-5 flex items-end justify-between">
        <div>
          <p className="section-label">The Fleet</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 leading-tight mt-1">
            {activeProviderName ? `${activeProviderName} Fleet` : 'Browse Cars'}
          </h1>
          <p className="text-xs text-stone-400 mt-1.5 font-medium">{filteredCars.length} cars available</p>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-[11px] font-bold text-gold glass px-4 py-2 rounded-full uppercase tracking-wide"
          >
            Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 glass rounded-2xl px-4 py-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cars, brands, providers…"
            className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-400 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-stone-400 hover:text-stone-900">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Provider chips */}
      <div className="overflow-x-auto scrollbar-hide px-5 mb-3">
        <div className="flex gap-2 w-max">
          <button
            onClick={() => setSelectedProvider('all')}
            className={`flex-shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
              selectedProvider === 'all'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
            }`}
          >
            All
          </button>
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProvider(selectedProvider === p.id ? 'all' : p.id)}
              className={`flex-shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                selectedProvider === p.id
                  ? 'bg-gold-gradient text-white border-transparent'
                  : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="overflow-x-auto scrollbar-hide px-5 mb-3">
        <div className="flex gap-2 w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-gradient text-white border-transparent'
                  : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Utility row */}
      <div className="px-5 mb-6 flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setDepositFilter(depositFilter === 'no-deposit' ? 'all' : 'no-deposit')}
          className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
            depositFilter === 'no-deposit'
              ? 'bg-emerald-500 text-white border-emerald-500'
              : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
          }`}
        >
          No Deposit
        </button>
        <button
          onClick={() => setAvailableOnly(!availableOnly)}
          className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
            availableOnly
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
          }`}
        >
          Available Now
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="ml-auto text-xs font-bold px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-600 outline-none appearance-none pr-7"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23a8a29e' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
          }}
        >
          <option value="default">Sort: Default</option>
          <option value="rating">Highest Rated</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Results */}
      <div className="px-5 pb-10">
        {filteredCars.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <p className="text-base font-bold text-stone-700">No cars found</p>
            <p className="text-sm mt-1 text-stone-400">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="mt-5 bg-gold-gradient text-white text-sm font-bold px-6 py-2.5 rounded-full uppercase tracking-wide"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} compact />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
