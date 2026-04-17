export interface Provider {
  id: string
  name: string
  tagline: string
  promoTitle: string
  promoText: string
  featured: boolean
  color: string
}

export interface Car {
  id: string
  providerId: string
  providerName: string
  brand: string
  model: string
  year: number
  category: 'Economy' | 'SUV' | 'Luxury' | 'Sports' | 'Exotic'
  dailyPrice: number
  weeklyPrice: number
  monthlyPrice: number
  depositType: 'no-deposit' | 'deposit'
  depositAmount?: number
  availableNow: boolean
  transmission: string
  seats: number
  fuelType: string
  image: string
  isHotDeal: boolean
  isPopular: boolean
  isNewArrival: boolean
  shortDescription: string
  features: string[]
  highlights: string[]
  rating: number
  reviewCount: number
}

export type CategoryFilter = 'All' | 'Economy' | 'SUV' | 'Luxury' | 'Sports' | 'Exotic'
export type DepositFilter = 'all' | 'no-deposit' | 'deposit'
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating'
