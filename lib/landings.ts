import { Car } from './types'
import { cars } from './data'
import { verifiedFees } from './pricing'
import { providers } from './data'

export interface FAQ {
  q: string
  a: string
}

/**
 * Bir landing'in filosundan türeyen rakamlar. Sayfa metinleri BUNLARDAN üretilir —
 * elle yazılmaz. Filo değişince metin de değişir; veriyle metin bir daha ayrışamaz.
 */
export interface LandingStats {
  count: number
  fromDaily: number
  toDaily: number
  fromMonthly: number
  noDepositCount: number
  /** Aylık kiralamanın günlük kiralamaya göre gün başına tasarrufu (%) */
  savingMinPct: number
  savingMaxPct: number
  savingAvgPct: number
  /**
   * Filodaki sağlayıcıların sigorta muafiyeti / km limiti aralığı.
   * Ücret matrisi doğrulanmadıysa null — metinler bu durumda rakam yerine
   * "sağlayıcı teyit ediyor" diline düşer.
   */
  excessMin: number | null
  excessMax: number | null
  kmMin: number | null
  kmMax: number | null
  cheapest?: Car
  dearest?: Car
}

export interface Landing {
  slug: string
  h1: string
  title: (s: LandingStats) => string
  description: (s: LandingStats) => string
  intro: (s: LandingStats) => string
  /** Bu landing'in filosunu seçen yordam */
  match: (car: Car) => boolean
  faqs: (s: LandingStats) => FAQ[]
}

function carName(c?: Car): string {
  return c ? `${c.brand} ${c.model}` : ''
}

const money = (n: number) => n.toLocaleString('en-US')

export function computeLandingStats(fleet: Car[]): LandingStats {
  if (!fleet.length) {
    return {
      count: 0, fromDaily: 0, toDaily: 0, fromMonthly: 0, noDepositCount: 0,
      savingMinPct: 0, savingMaxPct: 0, savingAvgPct: 0,
      excessMin: null, excessMax: null, kmMin: null, kmMax: null,
    }
  }

  const savings = fleet.map((c) => Math.round((1 - c.monthlyPrice / 30 / c.dailyPrice) * 100))
  const feeIds = Array.from(new Set(fleet.map((c) => c.providerId)))
  const fees = feeIds.map((id) => verifiedFees(id)).filter(Boolean) as NonNullable<
    ReturnType<typeof verifiedFees>
  >[]
  const sortedByDaily = [...fleet].sort((a, b) => a.dailyPrice - b.dailyPrice)

  return {
    count: fleet.length,
    fromDaily: Math.min(...fleet.map((c) => c.dailyPrice)),
    toDaily: Math.max(...fleet.map((c) => c.dailyPrice)),
    fromMonthly: Math.min(...fleet.map((c) => c.monthlyPrice)),
    noDepositCount: fleet.filter((c) => c.depositType === 'no-deposit').length,
    savingMinPct: Math.min(...savings),
    savingMaxPct: Math.max(...savings),
    savingAvgPct: Math.round(savings.reduce((a, b) => a + b, 0) / savings.length),
    excessMin: fees.length ? Math.min(...fees.map((f) => f.insuranceExcessAED)) : null,
    excessMax: fees.length ? Math.max(...fees.map((f) => f.insuranceExcessAED)) : null,
    kmMin: fees.length ? Math.min(...fees.map((f) => f.kmLimitDaily)) : null,
    kmMax: fees.length ? Math.max(...fees.map((f) => f.kmLimitDaily)) : null,
    cheapest: sortedByDaily[0],
    dearest: sortedByDaily[sortedByDaily.length - 1],
  }
}

/** Muafiyet aralığı cümlesi — doğrulanmamışsa rakam yerine dürüst dil. */
function excessPhrase(s: LandingStats): string {
  return s.excessMin !== null && s.excessMax !== null
    ? `AED ${money(s.excessMin)} to AED ${money(s.excessMax)} depending on the provider`
    : 'a figure the provider confirms with you before you book'
}

/** Km limiti cümlesi — doğrulanmamışsa rakam yerine dürüst dil. */
function kmPhrase(s: LandingStats): string {
  return s.kmMin !== null && s.kmMax !== null
    ? `${s.kmMin}–${s.kmMax} km per day depending on the provider`
    : 'confirmed by the provider before you book'
}

/** Depozitosuz araçları sağlayan firmaların adları — no-deposit metinlerinde kullanılıyor. */
function noDepositProviderNames(): string[] {
  const ids = Array.from(
    new Set(cars.filter((c) => c.depositType === 'no-deposit').map((c) => c.providerId))
  )
  return ids.map((id) => providers.find((p) => p.id === id)?.name ?? id)
}

// İhtiyaç/kategori bazlı SEO landing'leri. Her biri gerçek filo + FAQ şeması taşır;
// /shop?category=X query sayfalarının indekslenebilir karşılığı bunlar.
export const landings: Landing[] = [
  {
    slug: 'no-deposit',
    h1: 'No deposit car rental in Dubai',
    title: (s) =>
      `No Deposit Car Rental Dubai — ${s.count} Cars, Zero Security Deposit | Rent Market AE`,
    description: (s) =>
      `Rent a car in Dubai with no security deposit. ${s.count} cars from AED ${money(s.fromDaily)}/day with nothing blocked on your card. Insurance included, true total pricing, no hidden fees.`,
    intro: (s) =>
      `A standard Dubai rental blocks money on your credit card and holds it for weeks after you return the car. The common workaround is a "deposit waiver" — a non-refundable fee you pay to make the block go away, rarely shown until checkout. These ${s.count} cars do neither: no block, no waiver fee. They start at AED ${money(s.fromDaily)}/day, from ${noDepositProviderNames().join(' and ')}.`,
    match: (c) => c.depositType === 'no-deposit',
    faqs: (s) => [
      {
        q: 'Is a security deposit really not required?',
        a: `Correct. On these ${s.count} cars no amount is blocked or charged on your card as a deposit. You pay the rental cost, insurance is already included, and that is the end of it.`,
      },
      {
        q: 'What happens if I damage a no-deposit car?',
        a: `Insurance is included, but you remain liable up to that provider's insurance excess — ${excessPhrase(s)}. Damage below that figure is on you; above it, the insurer pays. Ask for the exact excess before you book; the provider states it in writing.`,
      },
      {
        q: 'Do I still need a credit card?',
        a: "Yes. A credit card in the driver's name is still required for identification and for costs billed after the rental, such as Salik tolls and traffic fines, even when no deposit is blocked.",
      },
      {
        q: 'How long do Dubai rental companies normally hold a deposit?',
        a: 'Typically up to 30 days, because Salik tolls and traffic fines take weeks to post against the vehicle. On these cars nothing is held at all — tolls and fines are simply billed to your card afterwards instead.',
      },
    ],
  },
  {
    slug: 'monthly',
    h1: 'Monthly car rental in Dubai',
    title: (s) =>
      `Monthly Car Rental Dubai — Long-Term Rates from AED ${money(s.fromMonthly)}/month | Rent Market AE`,
    description: (s) =>
      `Monthly car rental in Dubai from AED ${money(s.fromMonthly)}/month — about ${s.savingAvgPct}% cheaper per day than daily hire. Insurance included, no lease contract, no early-termination penalty.`,
    intro: (s) =>
      `Renting monthly in Dubai costs about ${s.savingAvgPct}% less per day than renting daily. Across the ${s.count} cars here the monthly rate works out ${s.savingMinPct}% to ${s.savingMaxPct}% cheaper per day, starting at AED ${money(s.fromMonthly)}/month. It is a rental, not a lease — no contract, no credit check, no early-termination penalty.`,
    match: () => true, // her araçta aylık fiyat var — aylık fiyata göre sıralanıyor
    faqs: (s) => [
      {
        q: 'How much cheaper is monthly car rental than daily in Dubai?',
        a: `About ${s.savingAvgPct}% cheaper per day. Across these ${s.count} cars the monthly rate runs ${s.savingMinPct}% to ${s.savingMaxPct}% below the daily rate on a per-day basis. It is a real saving, but nowhere near the 50–60% some listings claim.`,
      },
      {
        q: 'How is a monthly rental different from a lease or a subscription?',
        a: 'A lease runs 12 to 36 months, is credit-checked, and carries an early-termination penalty. A subscription bundles servicing into an app-managed fee and usually locks you to one car class. A monthly rental is neither: take the car for 30 days, extend month by month, walk away when you are done.',
      },
      {
        q: 'What is the mileage limit on a monthly car rental in Dubai?',
        a: `A monthly rental includes a daily mileage allowance — ${kmPhrase(s)} — which accumulates across the month. Beyond it, extra kilometres are charged per km. Get the number in writing before you sign: it is the single most common way a good monthly rate turns expensive.`,
      },
      {
        q: 'Can I extend the rental month by month?',
        a: 'Yes. Monthly rentals roll over on agreement with the provider. There is no long-term lease contract, no early termination penalty, and no bank finance involved.',
      },
    ],
  },
  {
    slug: 'suv',
    h1: 'SUV rental in Dubai',
    title: (s) =>
      `SUV Rental Dubai — ${s.count} SUVs & 4x4s from AED ${money(s.fromDaily)}/day | Rent Market AE`,
    description: (s) =>
      `Rent an SUV in Dubai from AED ${money(s.fromDaily)}/day. Family 7-seaters, premium 4x4s and desert-capable models. Insurance included, door delivery, no hidden fees.`,
    intro: (s) =>
      `SUV rental in Dubai starts at AED ${money(s.fromDaily)}/day (${carName(s.cheapest)}) and runs to AED ${money(s.toDaily)}/day (${carName(s.dearest)}). Insurance is included on all ${s.count}. The mileage allowance and insurance excess are ${excessPhrase(s) === 'a figure the provider confirms with you before you book' ? 'confirmed by the provider before you book' : 'published on each provider page'}.`,
    match: (c) => c.category === 'SUV',
    faqs: (s) => [
      {
        q: 'Which SUV is best for a family in Dubai?',
        a: 'For 5 passengers plus luggage a mid-size SUV is ample. For 6 or more, check the seat count listed on each car page alongside its true total price. Boot space matters most on airport runs.',
      },
      {
        q: 'Can I take a rental SUV into the desert?',
        a: "Only with the provider's written permission, and only in a genuine 4x4. Off-road driving voids the insurance on most standard rental agreements in Dubai. Ask before you book — WhatsApp will get you an answer in minutes.",
      },
      {
        q: 'How much mileage is included on an SUV rental?',
        a: `Every rental includes a daily mileage allowance — ${kmPhrase(s)}. For context, a return trip to Abu Dhabi is about 300 km and to Hatta about 260 km, so a single long day out can use up most of an allowance. Confirm the number before you book.`,
      },
    ],
  },
  {
    slug: 'sports',
    h1: 'Sports car rental in Dubai',
    title: (s) =>
      `Sports Car Rental Dubai — ${s.count} Cars from AED ${money(s.fromDaily)}/day | Rent Market AE`,
    description: (s) =>
      `Rent a sports car in Dubai from AED ${money(s.fromDaily)}/day. Mustang, Camaro, Porsche and more. ${s.noDepositCount} available with no deposit. Insurance included, delivered to your door.`,
    intro: (s) =>
      `Sports car rental in Dubai starts at AED ${money(s.fromDaily)}/day (${carName(s.cheapest)}) and runs to AED ${money(s.toDaily)}/day (${carName(s.dearest)}). ${s.noDepositCount > 0 ? `${s.noDepositCount} of these ${s.count} cars require no deposit at all — nothing is blocked on your card.` : ''}`,
    match: (c) => c.category === 'Sports',
    faqs: (s) => [
      {
        q: 'What licence do I need to rent a sports car in Dubai?',
        a: 'A valid UAE licence, or a licence from an approved country together with an International Driving Permit if you are a visitor. Some providers also set a minimum driver age of 25 on higher-powered cars.',
      },
      {
        q: 'Can I rent a sports car in Dubai without a deposit?',
        a:
          s.noDepositCount > 0
            ? `Yes. ${s.noDepositCount} of the ${s.count} sports cars here carry no deposit at all, meaning nothing is blocked on your card. They are marked with a "No Deposit" badge.`
            : 'Not currently on this page, though deposit-free cars are available in other categories.',
      },
      {
        q: 'How fast can I legally drive in Dubai?',
        a: 'Limits are strictly enforced by radar: typically 100–120 km/h on highways, with some stretches allowing more. Fines are automatic and are charged back to you after the rental.',
      },
    ],
  },
  {
    slug: 'luxury',
    h1: 'Luxury car rental in Dubai',
    title: (s) =>
      `Luxury Car Rental Dubai — Mercedes, BMW & More from AED ${money(s.fromDaily)}/day | Rent Market AE`,
    description: (s) =>
      `Rent a luxury car in Dubai from AED ${money(s.fromDaily)}/day. Mercedes, BMW, Range Rover and more from verified providers. Insurance excess and mileage caps published upfront.`,
    intro: (s) =>
      `Luxury car rental in Dubai starts at AED ${money(s.fromDaily)}/day (${carName(s.cheapest)}) and runs to AED ${money(s.toDaily)}/day (${carName(s.dearest)}). The luxury tier is where the excess and the mileage cap bite hardest — get both in writing before you book, not at the counter. We will get them for you.`,
    match: (c) => c.category === 'Luxury',
    faqs: (s) => [
      {
        q: 'What is the insurance excess on a luxury car rental in Dubai?',
        a: `The excess is the maximum you are liable for if the car is damaged — the insurer covers anything above it. On the luxury tier it is materially higher than on an economy car. It is ${excessPhrase(s)}, and it should be stated in writing before you book.`,
      },
      {
        q: 'Is delivery to my hotel included?',
        a: 'With most providers, yes — either free outright or free on rentals of 3 days or more. The delivery fee for each provider is published on their page, and no provider charges an airport surcharge.',
      },
      {
        q: 'Can I rent a luxury car for one day only?',
        a: 'Yes, though the daily rate is at its highest for a single day and a delivery fee may apply. Three days or longer usually unlocks a materially better rate.',
      },
    ],
  },
  {
    slug: 'exotic',
    h1: 'Exotic & supercar rental in Dubai',
    title: (s) =>
      `Exotic Car Rental Dubai — Ferrari, Lamborghini & Rolls-Royce | Rent Market AE`,
    description: (s) =>
      `Rent an exotic supercar in Dubai from AED ${money(s.fromDaily)}/day. Ferrari, Lamborghini and Rolls-Royce. Deposit, insurance excess and mileage cap all published before you book.`,
    intro: (s) =>
      `Exotic car rental in Dubai starts at AED ${money(s.fromDaily)}/day (${carName(s.cheapest)}) and reaches AED ${money(s.toDaily)}/day (${carName(s.dearest)}). Supercars come with real conditions attached: a substantial deposit blocked on your card, a high insurance excess, and a tight daily mileage cap. Every one of those is confirmed with you before you commit.`,
    match: (c) => c.category === 'Exotic',
    faqs: (s) => [
      {
        q: 'What deposit is required for an exotic car in Dubai?',
        a: 'A substantial one, blocked on your credit card — the exact amount is shown on each car page. It is blocked, not charged, and released after the car is returned undamaged.',
      },
      {
        q: 'What is the mileage limit on a supercar rental?',
        a: `Supercar rentals carry the tightest mileage caps of any category, and extra kilometres are charged at a premium. This is the number that catches people out: a return run to Abu Dhabi is roughly 300 km and can exceed a full day's allowance on its own. Confirm the cap before you book.`,
      },
      {
        q: 'Is there a minimum age for exotic rentals?',
        a: 'Usually 25, and the provider will ask for a licence held for a minimum period. Confirm with the provider over WhatsApp before booking a specific car.',
      },
    ],
  },
  {
    slug: 'economy',
    h1: 'Cheap car rental in Dubai',
    title: (s) =>
      `Cheap Car Rental Dubai — Economy Cars from AED ${money(s.fromDaily)}/day | Rent Market AE`,
    description: (s) =>
      `Affordable car rental in Dubai from AED ${money(s.fromDaily)}/day. Insurance included, deposit-free options, and every cost confirmed in writing before you book.`,
    intro: (s) =>
      `The cheapest car rental in Dubai on Rent Market AE is the ${carName(s.cheapest)} at AED ${money(s.fromDaily)}/day, or AED ${money(s.fromMonthly)}/month, with insurance included. But the cheapest headline rate is rarely the cheapest rental — delivery fees, low mileage caps and deposit blocks are where the real cost hides, and they are what we get in writing for you before you book.`,
    match: (c) => c.category === 'Economy',
    faqs: (s) => [
      {
        q: 'What is the cheapest way to rent a car in Dubai?',
        a: `Rent for longer. The weekly rate beats seven daily rates, and the monthly rate is cheaper again — about 30% less per day. Longer rentals also tend to soften or remove the delivery fee.`,
      },
      {
        q: 'Are there really no hidden fees?',
        a: 'The costs that exist — insurance excess, mileage cap, delivery, and Salik tolls at AED 4 per crossing — are all published on the car and provider pages before you book. Nothing appears afterwards that was not shown first.',
      },
      {
        q: 'Is insurance included in the cheap rates?',
        a: `Yes, with every provider here. You remain liable up to the insurance excess if the car is damaged — ${excessPhrase(s)} — and you should have that figure in writing before you drive away.`,
      },
    ],
  },
]

export function getLanding(slug: string): Landing | undefined {
  return landings.find((l) => l.slug === slug)
}

export function landingCars(landing: Landing): Car[] {
  const matched = cars.filter(landing.match)
  // Aylık landing'i aylık fiyata göre sırala, diğerlerini günlük fiyata göre.
  return landing.slug === 'monthly'
    ? [...matched].sort((a, b) => a.monthlyPrice - b.monthlyPrice)
    : [...matched].sort((a, b) => a.dailyPrice - b.dailyPrice)
}

export function allLandingSlugs(): string[] {
  return landings.map((l) => l.slug)
}
