import { Car } from './types'

// ── True Total Price — sağlayıcı ücret matrisi ─────────────────────
// NOT: Bu değerler Dubai pazarı standart varsayımlarıdır.
// Sağlayıcılarla teyit edilecek (VERIFY_WITH_PROVIDERS).

export interface ProviderFees {
  insuranceIncluded: boolean
  insuranceExcessAED: number      // hasar durumunda müşteri sorumluluğu üst sınırı
  kmLimitDaily: number            // günlük dahil km
  extraKmFeeAED: number           // limit aşımı AED/km
  deliveryFeeAED: number          // kapıya teslim (minDaysForFreeDelivery altında)
  minDaysForFreeDelivery: number
}

export const PROVIDER_FEES: Record<string, ProviderFees> = {
  '4hire':      { insuranceIncluded: true, insuranceExcessAED: 1500, kmLimitDaily: 250, extraKmFeeAED: 0.5, deliveryFeeAED: 75,  minDaysForFreeDelivery: 3 },
  habibcar:     { insuranceIncluded: true, insuranceExcessAED: 1000, kmLimitDaily: 300, extraKmFeeAED: 0.5, deliveryFeeAED: 50,  minDaysForFreeDelivery: 3 },
  exoticcar:    { insuranceIncluded: true, insuranceExcessAED: 5000, kmLimitDaily: 200, extraKmFeeAED: 2,   deliveryFeeAED: 0,   minDaysForFreeDelivery: 1 },
  royaldrive:   { insuranceIncluded: true, insuranceExcessAED: 2000, kmLimitDaily: 250, extraKmFeeAED: 1,   deliveryFeeAED: 75,  minDaysForFreeDelivery: 3 },
  elitedrive:   { insuranceIncluded: true, insuranceExcessAED: 2500, kmLimitDaily: 250, extraKmFeeAED: 1,   deliveryFeeAED: 0,   minDaysForFreeDelivery: 1 },
}

export const SALIK_PER_CROSSING_AED = 4 // kiralama sonrası faturalanır

export interface TruePriceBreakdown {
  days: number
  rateLabel: 'daily' | 'weekly' | 'monthly'
  baseTotal: number
  deliveryFee: number
  total: number                  // baseTotal + deliveryFee — kiralamada ödenen
  depositBlockAED: number        // bloke edilir, iade edilir (0 = depozitosuz)
  insuranceIncluded: boolean
  insuranceExcessAED: number
  kmIncludedTotal: number
  extraKmFeeAED: number
  salikNoteAED: number           // geçiş başına, sonradan faturalanır
}

export function computeTruePrice(car: Car, days: number): TruePriceBreakdown {
  const fees = PROVIDER_FEES[car.providerId] ?? PROVIDER_FEES['4hire']
  const d = Math.max(1, Math.round(days))

  let baseTotal: number
  let rateLabel: TruePriceBreakdown['rateLabel']
  if (d >= 30) {
    rateLabel = 'monthly'
    baseTotal = Math.round((car.monthlyPrice / 30) * d)
  } else if (d >= 7) {
    rateLabel = 'weekly'
    baseTotal = Math.round((car.weeklyPrice / 7) * d)
  } else {
    rateLabel = 'daily'
    baseTotal = car.dailyPrice * d
  }

  const deliveryFee = d >= fees.minDaysForFreeDelivery ? 0 : fees.deliveryFeeAED

  return {
    days: d,
    rateLabel,
    baseTotal,
    deliveryFee,
    total: baseTotal + deliveryFee,
    depositBlockAED: car.depositType === 'no-deposit' ? 0 : (car.depositAmount ?? 0),
    insuranceIncluded: fees.insuranceIncluded,
    insuranceExcessAED: fees.insuranceExcessAED,
    kmIncludedTotal: fees.kmLimitDaily * d,
    extraKmFeeAED: fees.extraKmFeeAED,
    salikNoteAED: SALIK_PER_CROSSING_AED,
  }
}
