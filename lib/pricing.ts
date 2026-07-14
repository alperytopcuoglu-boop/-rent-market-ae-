import { Car } from './types'

// ── Sağlayıcı ücret matrisi ────────────────────────────────────────────────
//
// DURUM: DOĞRULANMAMIŞ. Aşağıdaki rakamlar Dubai pazarı varsayımlarıdır ve
// gerçek, isimli üçüncü taraf şirketlere atfedilmektedir. Teyit alınmadan
// müşteriye gösterilmezler — bunu FEES_VERIFIED bayrağı zorlar.
//
// Teyit alındığında yapılacak: rakamları güncelle, aşağıyı `true` yap.
// O anda ücret matrisi provider sayfalarında, True Price kartında ve
// concierge'de otomatik olarak geri gelir — başka hiçbir yeri değiştirmeye
// gerek yok.
//
// Sağlayıcılardan sorulacaklar: sigorta muafiyeti, günlük km limiti, aşım
// ücreti, kapıya teslim ücreti + kaç günden sonra bedava, Salik'te admin
// ücreti alıyorlar mı, depozito iade süresi.
export const FEES_VERIFIED = false

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

/** Doğrulanmış ücretler — teyit yoksa undefined döner ve hiçbir yerde gösterilmez. */
export function verifiedFees(providerId: string): ProviderFees | undefined {
  if (!FEES_VERIFIED) return undefined
  return PROVIDER_FEES[providerId]
}

// Salik, RTA'nın kamuya açık tarifesi — sağlayıcıdan teyit gerektirmez.
// (Sağlayıcıların üstüne admin ücreti ekleyip eklemediği AYRI bir soru ve teyit bekliyor.)
export const SALIK_PER_CROSSING_AED = 4

export interface TruePriceBreakdown {
  days: number
  rateLabel: 'daily' | 'weekly' | 'monthly'
  baseTotal: number
  /** Kiralama bedeli — sağlayıcı fiyat listesinden, doğrulanmış. */
  total: number
  /** Araç verisinden geliyor, doğrulanmış. */
  depositBlockAED: number
  salikNoteAED: number
  /** ↓ Ücret matrisinden türeyenler — teyit yoksa null, gösterilmez. */
  feesVerified: boolean
  deliveryFee: number | null
  insuranceIncluded: boolean | null
  insuranceExcessAED: number | null
  kmIncludedTotal: number | null
  extraKmFeeAED: number | null
}

export function computeTruePrice(car: Car, days: number): TruePriceBreakdown {
  const fees = verifiedFees(car.providerId)
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

  const deliveryFee = fees ? (d >= fees.minDaysForFreeDelivery ? 0 : fees.deliveryFeeAED) : null

  return {
    days: d,
    rateLabel,
    baseTotal,
    total: baseTotal + (deliveryFee ?? 0),
    depositBlockAED: car.depositType === 'no-deposit' ? 0 : (car.depositAmount ?? 0),
    salikNoteAED: SALIK_PER_CROSSING_AED,
    feesVerified: Boolean(fees),
    deliveryFee,
    insuranceIncluded: fees ? fees.insuranceIncluded : null,
    insuranceExcessAED: fees ? fees.insuranceExcessAED : null,
    kmIncludedTotal: fees ? fees.kmLimitDaily * d : null,
    extraKmFeeAED: fees ? fees.extraKmFeeAED : null,
  }
}
