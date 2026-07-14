import Anthropic from '@anthropic-ai/sdk'
import { cars } from '../data'
import { computeTruePrice } from '../pricing'

export const CONCIERGE_TOOLS: Anthropic.Tool[] = [
  {
    name: 'search_cars',
    description:
      'Filter the Rent Market fleet. Call when the visitor states criteria (budget, category, seats, deposit preference). Returns matching cars sorted by daily price.',
    input_schema: {
      type: 'object',
      properties: {
        maxDailyAED: { type: 'number', description: 'Max daily budget in AED' },
        category: {
          type: 'string',
          enum: ['Economy', 'SUV', 'Luxury', 'Sports', 'Exotic'],
          description: 'Car category',
        },
        noDeposit: { type: 'boolean', description: 'Only no-deposit cars' },
        minSeats: { type: 'number', description: 'Minimum seat count' },
        limit: { type: 'number', description: 'Max results, default 5' },
      },
    },
  },
  {
    name: 'quote_total',
    description:
      'Compute the True Total Price for a car over N days. ALWAYS use this for any total — never compute rental math yourself. Returns base total (best rate tier applied), delivery fee, grand total, deposit block, km allowance and insurance excess.',
    input_schema: {
      type: 'object',
      properties: {
        carId: { type: 'string', description: 'Car id from the fleet list' },
        days: { type: 'number', description: 'Rental length in days' },
      },
      required: ['carId', 'days'],
    },
  },
  {
    name: 'render_card',
    description:
      'Render a structured UI card to the visitor. Prefer this over long text for structured content. One idea per card, max 3 per turn.',
    input_schema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['car', 'quote', 'qualify', 'whatsapp'] },
        payload: {
          type: 'object',
          description:
            'car: {carId, note?} — quote: {carId, days, baseTotal, deliveryFee, total, depositBlock, kmIncluded, excess, rateLabel} — qualify: {question, options: [{label, value}]} — whatsapp: {headline, message} where message is the full prefilled WhatsApp text incl. visitor name, car, dates, total',
        },
      },
      required: ['type', 'payload'],
    },
  },
]

// Server-side tool handlers. render_card is client-rendered — the route
// collects its payloads and returns "rendered" as the tool result.
export function runSearchCars(input: {
  maxDailyAED?: number
  category?: string
  noDeposit?: boolean
  minSeats?: number
  limit?: number
}): string {
  let result = cars.filter((c) => c.availableNow)
  if (input.maxDailyAED) result = result.filter((c) => c.dailyPrice <= input.maxDailyAED!)
  if (input.category) result = result.filter((c) => c.category === input.category)
  if (input.noDeposit) result = result.filter((c) => c.depositType === 'no-deposit')
  if (input.minSeats) result = result.filter((c) => c.seats >= input.minSeats!)
  result.sort((a, b) => a.dailyPrice - b.dailyPrice)
  const limited = result.slice(0, input.limit ?? 5)
  if (limited.length === 0) return 'NO_MATCHES'
  return limited
    .map(
      (c) =>
        `${c.id}: ${c.year} ${c.brand} ${c.model}, ${c.category}, ${c.seats} seats, AED ${c.dailyPrice}/day, ${c.depositType === 'no-deposit' ? 'no deposit' : `deposit ${c.depositAmount}`}, ${c.providerName}`
    )
    .join('\n')
}

export function runQuoteTotal(input: { carId: string; days: number }): string {
  const car = cars.find((c) => c.id === input.carId)
  if (!car) return `ERROR: unknown carId ${input.carId}`
  const q = computeTruePrice(car, input.days)
  return JSON.stringify({
    carId: car.id,
    carName: `${car.brand} ${car.model}`,
    days: q.days,
    rateLabel: q.rateLabel,
    baseTotal: q.baseTotal,
    deliveryFee: q.deliveryFee,
    total: q.total,
    depositBlock: q.depositBlockAED,
    kmIncluded: q.kmIncludedTotal,
    extraKmFeeAED: q.extraKmFeeAED,
    insuranceExcessAED: q.insuranceExcessAED,
    salikPerCrossingAED: q.salikNoteAED,
  })
}
