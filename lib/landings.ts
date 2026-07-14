import { Car } from './types'
import { cars } from './data'

export interface FAQ {
  q: string
  a: string
}

export interface Landing {
  slug: string
  h1: string
  title: string
  description: string
  intro: string
  /** Bu landing'in filosunu seçen yordam */
  match: (car: Car) => boolean
  faqs: FAQ[]
}

// İhtiyaç/kategori bazlı SEO landing'leri. Her biri gerçek filo + FAQ şeması taşır;
// /shop?category=X query sayfalarının indekslenebilir karşılığı bunlar.
export const landings: Landing[] = [
  {
    slug: 'no-deposit',
    h1: 'No deposit car rental in Dubai',
    title: 'No Deposit Car Rental Dubai — Zero Security Deposit | Rent Market AE',
    description:
      'Rent a car in Dubai with no security deposit. Nothing blocked on your card. Verified providers, insurance included, true total pricing with no hidden fees.',
    intro:
      'Most Dubai rentals block AED 1,000–5,000 on your credit card for the length of the rental. These cars do not. Nothing is held, nothing is frozen — you pay the rental and drive.',
    match: (c) => c.depositType === 'no-deposit',
    faqs: [
      {
        q: 'Is a security deposit really not required?',
        a: 'Correct. On the cars listed here no amount is blocked or charged on your card as a deposit. You pay the rental cost, insurance is already included, and that is the end of it.',
      },
      {
        q: 'What happens if I damage a no-deposit car?',
        a: 'Insurance is included, but you remain liable up to the insurance excess of that provider — typically AED 1,000 to AED 2,500. The exact excess for each provider is published on their page before you book.',
      },
      {
        q: 'Do I still need a credit card?',
        a: 'Yes. A credit card in the driver\'s name is still required for identification and for post-rental charges such as Salik tolls and traffic fines, even when no deposit is blocked.',
      },
      {
        q: 'Are no-deposit cars more expensive per day?',
        a: 'Not necessarily. Providers who compete on deposit-free terms often price close to the market. Send one request and all 5 providers quote you — that is the fastest way to see the real difference.',
      },
    ],
  },
  {
    slug: 'monthly',
    h1: 'Monthly car rental in Dubai',
    title: 'Monthly Car Rental Dubai — Long-Term Rates from AED 2,000 | Rent Market AE',
    description:
      'Monthly car rental in Dubai with the best long-term rates. Free delivery, insurance included, generous mileage. Cheaper than daily hire and simpler than leasing.',
    intro:
      'Renting for a month or longer changes the maths entirely. The monthly rate typically works out 40–60% cheaper per day than daily hire, delivery becomes free with every provider, and there is no lease contract to sign.',
    match: () => true, // her araçta aylık fiyat var — aylık fiyata göre sıralanıyor
    faqs: [
      {
        q: 'How much cheaper is monthly rental than daily?',
        a: 'Substantially. A car at AED 350/day is AED 10,500 over 30 days at the daily rate, but its monthly rate is closer to AED 7,500 — roughly AED 250/day. Every car on this page shows its true monthly total.',
      },
      {
        q: 'Is delivery free on monthly rentals?',
        a: 'Yes. All 5 providers waive the delivery fee on rentals long enough to qualify, and every monthly rental qualifies. The car is brought to your address in Dubai at no cost.',
      },
      {
        q: 'What is the mileage limit on a monthly rental?',
        a: 'Between 200 and 300 km per day depending on the provider, which accumulates across the month — so 250 km/day is roughly 7,500 km per month. Extra kilometres are charged at AED 0.50 to AED 2 each.',
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
    title: 'SUV Rental Dubai — 7-Seaters & 4x4s from AED 300/day | Rent Market AE',
    description:
      'Rent an SUV in Dubai. Family 7-seaters, premium 4x4s and desert-capable models. Insurance included, door delivery, no hidden fees. Compare all providers.',
    intro:
      'SUVs are the default choice in Dubai for a reason: high seating position in heavy traffic, boot space for airport runs, and the ground clearance to leave the tarmac if you want to.',
    match: (c) => c.category === 'SUV',
    faqs: [
      {
        q: 'Which SUV is best for a family in Dubai?',
        a: 'For 5 passengers plus luggage a mid-size SUV is ample. For 6 or more, filter for cars with 7 seats — the seat count is listed on every car page alongside its true total price.',
      },
      {
        q: 'Can I take a rental SUV into the desert?',
        a: 'Only with the provider\'s written permission, and only in a genuine 4x4. Off-road driving voids the insurance on most standard rental agreements. Ask before you book — the concierge or WhatsApp will get you an answer in minutes.',
      },
      {
        q: 'Do SUVs cost more in fuel?',
        a: 'Somewhat, but fuel in the UAE is inexpensive by international standards, so the difference over a week is usually small relative to the rental itself.',
      },
    ],
  },
  {
    slug: 'sports',
    h1: 'Sports car rental in Dubai',
    title: 'Sports Car Rental Dubai — Mustang, Camaro & More from AED 300/day | Rent Market AE',
    description:
      'Rent a sports car in Dubai. Mustang, Camaro, Porsche and more. Some available with no deposit. Insurance included, delivered to your door, no hidden fees.',
    intro:
      'Dubai is built for this — wide, immaculate roads and the Jebel Jais and Hatta runs within easy reach. Sports cars here are attainable rather than exotic, and several are available with no deposit at all.',
    match: (c) => c.category === 'Sports',
    faqs: [
      {
        q: 'What licence do I need to rent a sports car in Dubai?',
        a: 'A valid UAE licence, or a licence from an approved country together with an International Driving Permit if you are a visitor. Some providers also set a minimum age of 25 on higher-powered cars.',
      },
      {
        q: 'Can I rent a sports car without a deposit?',
        a: 'Yes — several sports cars on Rent Market carry no deposit at all, meaning nothing is blocked on your card. They are marked with a "No Deposit" badge.',
      },
      {
        q: 'How fast can I legally drive in Dubai?',
        a: 'Limits are strictly enforced by radar: typically 100–120 km/h on highways, with some stretches allowing more. Fines are automatic and get charged back to you after the rental — not worth it.',
      },
    ],
  },
  {
    slug: 'luxury',
    h1: 'Luxury car rental in Dubai',
    title: 'Luxury Car Rental Dubai — Mercedes, BMW, Range Rover | Rent Market AE',
    description:
      'Rent a luxury car in Dubai. Mercedes, BMW, Porsche, Range Rover and more from verified providers. Chauffeur-grade delivery, insurance included, transparent pricing.',
    intro:
      'The luxury tier is where hidden costs bite hardest — high insurance excess, tight mileage caps, delivery charges buried in the contract. Every one of those numbers is published upfront here.',
    match: (c) => c.category === 'Luxury',
    faqs: [
      {
        q: 'What is the insurance excess on a luxury rental?',
        a: 'Higher than on standard cars, typically AED 2,000 to AED 5,000 depending on the provider and the car. The exact figure is on each provider page — we publish it before you book, not after.',
      },
      {
        q: 'Is delivery to my hotel included?',
        a: 'With most providers, yes — either free outright or free on rentals of 3 days or more. The delivery fee for each provider is listed on their page.',
      },
      {
        q: 'Can I rent a luxury car for one day only?',
        a: 'Yes, though the daily rate is at its highest for a single day. Three days or longer usually unlocks a materially better rate and free delivery.',
      },
    ],
  },
  {
    slug: 'exotic',
    h1: 'Exotic & supercar rental in Dubai',
    title: 'Exotic Car Rental Dubai — Ferrari, Lamborghini, Rolls-Royce | Rent Market AE',
    description:
      'Rent an exotic supercar in Dubai. Ferrari, Lamborghini, Rolls-Royce and G63 from verified providers. VIP delivery, insurance included, honest total pricing.',
    intro:
      'Supercars in Dubai come with real conditions attached: deposits in the thousands, mileage caps around 200 km/day, and a driver age minimum. We publish all of it before you commit.',
    match: (c) => c.category === 'Exotic',
    faqs: [
      {
        q: 'What deposit is required for an exotic car?',
        a: 'Expect a meaningful deposit to be blocked on your credit card — the amount is shown on each car page. It is blocked, not charged, and released after the car is returned undamaged.',
      },
      {
        q: 'What is the mileage limit on a supercar?',
        a: 'Typically around 200 km per day, with extra kilometres charged at roughly AED 2 each. This is the number that catches people out on a Hatta or Abu Dhabi run — check it before you book.',
      },
      {
        q: 'Is there a minimum age for exotic rentals?',
        a: 'Usually 25, and providers will ask for a licence held for a minimum period. Confirm with the provider over WhatsApp before booking a specific car.',
      },
    ],
  },
  {
    slug: 'economy',
    h1: 'Cheap car rental in Dubai',
    title: 'Cheap Car Rental Dubai — Economy Cars from AED 100/day | Rent Market AE',
    description:
      'Affordable economy car rental in Dubai. Low daily rates, insurance included, generous mileage and free delivery on longer rentals. No hidden fees, ever.',
    intro:
      'The cheapest headline rate is rarely the cheapest rental. Delivery fees, low mileage caps and deposit blocks quietly add up. These cars are cheap on the total, not just the sticker.',
    match: (c) => c.category === 'Economy',
    faqs: [
      {
        q: 'What is the cheapest way to rent a car in Dubai?',
        a: 'Rent for longer. The weekly rate beats seven daily rates, and the monthly rate is cheaper again per day. Longer rentals also unlock free delivery with every provider.',
      },
      {
        q: 'Are there really no hidden fees?',
        a: 'The costs that exist — insurance excess, mileage cap, delivery, Salik tolls at AED 4 per crossing — are all published on the car and provider pages before you book. Nothing appears afterwards that was not shown first.',
      },
      {
        q: 'Is insurance included in the cheap rates?',
        a: 'Yes, with every provider on Rent Market. You remain liable up to the insurance excess in the event of damage, and that excess figure is published upfront.',
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
