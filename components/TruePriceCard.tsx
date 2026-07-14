'use client'

import { useState } from 'react'
import { Car } from '@/lib/types'
import { computeTruePrice } from '@/lib/pricing'

const DAY_OPTIONS = [1, 3, 7, 30]

export default function TruePriceCard({ car }: { car: Car }) {
  const [days, setDays] = useState(3)
  const q = computeTruePrice(car, days)

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">True Total Price</p>
          <p className="text-[10px] text-emerald-600 font-bold mt-0.5">✓ No surprises — this is what you pay</p>
        </div>
        <div className="flex gap-1">
          {DAY_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`text-[11px] font-bold px-2.5 py-1.5 rounded-full border transition-colors ${
                days === d
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-500 border-stone-200 hover:text-stone-900'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex justify-between text-[12px]">
          <span className="text-stone-500">
            Rental — {q.days} day{q.days > 1 ? 's' : ''} ({q.rateLabel} rate)
          </span>
          <span className="font-semibold text-stone-800">AED {q.baseTotal.toLocaleString('en-US')}</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-stone-500">Door delivery</span>
          <span className="font-semibold text-stone-800">{q.deliveryFee > 0 ? `AED ${q.deliveryFee}` : 'Free'}</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-stone-500">Comprehensive insurance</span>
          <span className="font-semibold text-emerald-600">Included</span>
        </div>
      </div>

      <div className="flex justify-between items-baseline border-t border-stone-200/70 pt-3 mb-3">
        <span className="text-[13px] font-bold text-stone-800">Total</span>
        <span className="font-display font-bold text-amber-700 text-2xl">AED {q.total.toLocaleString('en-US')}</span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-stone-400">
        <span>
          {q.depositBlockAED > 0
            ? `Deposit block: AED ${q.depositBlockAED.toLocaleString('en-US')} (refunded on return)`
            : 'No deposit required'}
        </span>
        <span>{q.kmIncludedTotal.toLocaleString('en-US')} km included · extra AED {q.extraKmFeeAED}/km</span>
        <span>Insurance excess: AED {q.insuranceExcessAED.toLocaleString('en-US')}</span>
        <span>Salik AED {q.salikNoteAED}/crossing billed after</span>
      </div>
    </div>
  )
}
