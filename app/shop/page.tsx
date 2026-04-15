'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import CarCard from '@/components/home/CarCard'
import { cars, providers } from '@/lib/data'
import { Car, CategoryFilter, DepositFilter, SortOption } from '@/lib/types'

const CATEGORIES: CategoryFilter[] = ['All', 'Economy', 'SUV', 'Luxury', 'Sports', 'Exotic']

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')
  const [depositFilter, setDepositFilter] = useState<DepositFilter>('all')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sort, setSort] = useState<SortOption>('default')

  const filteredCars = useMemo(() => {
    let result = [...cars]

    // Search
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

    // Provider
    if (selectedProvider !== 'all') {
      result = result.filter((c) => c.providerId === selectedProvider)
    }

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter((c) => c.category === selectedCategory)
    }

    // Deposit
    if (depositFilter !== 'all') {
      result = result.filter((c) => c.depositType === depositFilter)
    }

    // Available
    if (availableOnly) {
      result = result.filter((c) => c.availableNow)
    }

    // Sort
    if (sort === 'price-asc') {
      result.sort((a, b) => a.dailyPrice - b.dailyPrice)
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.dailyPrice - a.dailyPrice)
    }

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
  }

  return (
    <div className="min-h-screen pb-20">
      <Header showSearch onSearchChange={setSearch} />

      {/* Page title */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-stone-900">Browse Cars</h1>
          <p className="text-xs text-stone-500">{filteredCars.length} cars available</p>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full"
          >
            Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-4 py-2.5 shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400 flex-shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cars, brands, providers…"
            className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-400 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-stone-400 hover:text-stone-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Provider filter */}
      <div className="overflow-x-auto scrollbar-hide px-4 mb-3">
        <div className="flex gap-2 w-max">
          <button
            onClick={() => setSelectedProvider('all')}
            className={`flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
              selectedProvider === 'all'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200'
            }`}
          >
            All Providers
          </button>
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProvider(selectedProvider === p.id ? 'all' : p.id)}
              className={`flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                selectedProvider === p.id
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="overflow-x-auto scrollbar-hide px-4 mb-3">
        <div className="flex gap-2 w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Second row filters */}
      <div className="px-4 mb-4 flex gap-2 flex-wrap">
        {/* Deposit filter */}
        <button
          onClick={() =>
            setDepositFilter(depositFilter === 'no-deposit' ? 'all' : 'no-deposit')
          }
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
            depositFilter === 'no-deposit'
              ? 'bg-emerald-500 text-white border-emerald-500'
              : 'bg-white text-stone-600 border-stone-200'
          }`}
        >
          No Deposit
        </button>
        <button
          onClick={() => setAvailableOnly(!availableOnly)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
            availableOnly
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-stone-600 border-stone-200'
          }`}
        >
          Available Now
        </button>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-600 outline-none"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Car grid */}
      <div className="px-4">
        {filteredCars.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-base font-semibold text-stone-600">No cars found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-amber-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
