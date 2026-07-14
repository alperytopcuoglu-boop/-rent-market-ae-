'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cars } from '@/lib/data'
import { carHref } from '@/lib/slugs'

// ── Types mirroring the API route ──────────────────────────────────
interface CardData { type: string; payload: Record<string, unknown> }
interface Part { type: 'text' | 'card'; text?: string; card?: CardData }
interface ChatItem { role: 'user' | 'assistant'; parts: Part[] }

const WA_NUMBER = '971556755532'

const SUGGESTIONS = [
  'Weekend sports car, no deposit',
  'SUV under AED 400/day',
  'Aylık kiralamada en iyi fiyat?',
  'What documents do I need?',
]

// ── Cards ───────────────────────────────────────────────────────────
function CarCardBlock({ payload }: { payload: Record<string, unknown> }) {
  const car = cars.find((c) => c.id === payload.carId)
  if (!car) return null
  return (
    <div className="glass rounded-2xl overflow-hidden animate-slide-up">
      <div className="relative h-36 bg-stone-200">
        <Image src={car.image} alt={`${car.brand} ${car.model}`} fill sizes="380px" className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {car.depositType === 'no-deposit' && (
          <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">0 Deposit</span>
        )}
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <p className="text-white font-bold text-sm drop-shadow">{car.brand} {car.model}</p>
          <p className="text-amber-300 font-display font-bold text-sm drop-shadow">AED {car.dailyPrice}<span className="text-[10px] text-white/80">/day</span></p>
        </div>
      </div>
      {typeof payload.note === 'string' && payload.note && (
        <p className="px-3.5 py-2.5 text-[12px] text-stone-600">{payload.note}</p>
      )}
      <a
        href={carHref(car)}
        className="block text-center text-[11px] font-bold uppercase tracking-wide text-amber-700 border-t border-stone-100 py-2.5 hover:bg-amber-50 transition-colors"
      >
        View details →
      </a>
    </div>
  )
}

function QuoteCardBlock({ payload }: { payload: Record<string, unknown> }) {
  const car = cars.find((c) => c.id === payload.carId)
  const rows: [string, string][] = [
    [`Rental (${payload.days} days, ${payload.rateLabel} rate)`, `AED ${Number(payload.baseTotal || 0).toLocaleString('en-US')}`],
    ['Delivery', Number(payload.deliveryFee) > 0 ? `AED ${payload.deliveryFee}` : 'Free'],
  ]
  return (
    <div className="glass rounded-2xl p-4 animate-slide-up">
      <p className="section-label mb-1">True Total Price</p>
      {car && <p className="font-display font-bold text-stone-900 text-sm mb-3">{car.brand} {car.model}</p>}
      <div className="space-y-1.5 mb-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between text-[12px]">
            <span className="text-stone-500">{label}</span>
            <span className="font-semibold text-stone-800">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-baseline border-t border-stone-200/70 pt-2.5 mb-3">
        <span className="text-[12px] font-bold text-stone-700">Total — no surprises</span>
        <span className="font-display font-bold text-amber-700 text-xl">AED {Number(payload.total || 0).toLocaleString('en-US')}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-stone-400">
        <span>{Number(payload.depositBlock) > 0 ? `Deposit block: AED ${Number(payload.depositBlock).toLocaleString('en-US')} (refunded)` : 'No deposit'}</span>
        <span>{Number(payload.kmIncluded).toLocaleString('en-US')} km included</span>
        <span>Insurance incl. (excess AED {Number(payload.excess ?? payload.insuranceExcessAED ?? 0).toLocaleString('en-US')})</span>
      </div>
    </div>
  )
}

function QualifyCardBlock({ payload, onPick }: { payload: Record<string, unknown>; onPick: (v: string) => void }) {
  const options = (payload.options as { label: string; value: string }[]) ?? []
  return (
    <div className="glass rounded-2xl p-4 animate-slide-up">
      <p className="text-[13px] font-semibold text-stone-800 mb-3">{String(payload.question ?? '')}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onPick(o.label)}
            className="text-[12px] font-semibold px-3.5 py-2 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-amber-700 transition-colors"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function WhatsAppCardBlock({ payload }: { payload: Record<string, unknown> }) {
  const msg = String(payload.message ?? "Hi, I'd like to book a car.")
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white animate-slide-up shadow-[0_8px_28px_rgba(16,185,129,0.3)]">
      <p className="font-display font-bold text-sm mb-1">{String(payload.headline ?? 'Ready to book')}</p>
      <p className="text-[11px] text-white/85 leading-relaxed mb-3 whitespace-pre-line">{msg}</p>
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white text-emerald-700 text-[11px] font-black uppercase tracking-wide px-4 py-2.5 rounded-full"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Send on WhatsApp
      </a>
    </div>
  )
}

function CardBlock({ card, onPick }: { card: CardData; onPick: (v: string) => void }) {
  switch (card.type) {
    case 'car': return <CarCardBlock payload={card.payload} />
    case 'quote': return <QuoteCardBlock payload={card.payload} />
    case 'qualify': return <QualifyCardBlock payload={card.payload} onPick={onPick} />
    case 'whatsapp': return <WhatsAppCardBlock payload={card.payload} />
    default: return null
  }
}

// ── Stage ───────────────────────────────────────────────────────────
export default function ConciergeStage() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<ChatItem[]>([])
  const [history, setHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [items, busy])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    setError(null)
    setInput('')
    const nextHistory = [...history, { role: 'user' as const, content: trimmed }]
    setItems((prev) => [...prev, { role: 'user', parts: [{ type: 'text', text: trimmed }] }])
    setHistory(nextHistory)
    setBusy(true)
    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory, entryPage: pathname }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(
          res.status === 429
            ? 'Too many messages — please continue on WhatsApp below.'
            : data.error === 'concierge_unconfigured'
              ? 'The concierge is warming up. Please use WhatsApp below.'
              : 'Something went wrong. Please try again or use WhatsApp.'
        )
        return
      }
      const data: { parts: Part[]; historyText: string } = await res.json()
      setItems((prev) => [...prev, { role: 'assistant', parts: data.parts }])
      setHistory((prev) => [...prev, { role: 'assistant', content: data.historyText || '...' }])
    } catch {
      setError('Connection problem. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Launcher — edge pill */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask Rent Market AI"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60] flex items-center gap-2 bg-gold-gradient gold-glow text-white pl-3.5 pr-4 py-3 rounded-full transition-transform hover:scale-[1.04]"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
        <span className="text-[12px] font-black uppercase tracking-wide">Ask AI</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />

          {/* Stage */}
          <div className="absolute inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[680px] md:max-h-[85vh] md:rounded-3xl bg-[#f8f7f4] flex flex-col overflow-hidden animate-slide-up shadow-[0_32px_80px_rgba(28,25,23,0.25)]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200/70 bg-white/70 backdrop-blur">
              <div>
                <p className="font-display font-bold text-stone-900 text-[15px]">Ask Rent Market</p>
                <p className="text-[10px] text-stone-400 font-semibold tracking-[0.14em] uppercase">No asking. No waiting. No surprises.</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {items.length === 0 && (
                <div className="pt-6">
                  <p className="font-display font-bold text-stone-900 text-xl leading-snug mb-2">
                    Hi — tell me your dates and budget,<br />I&apos;ll find your car in seconds.
                  </p>
                  <p className="text-[12px] text-stone-500 mb-5">TR · EN · AR · RU — instant true-total quotes from 30+ verified cars.</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-[12px] font-semibold px-3.5 py-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-700 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {items.map((item, i) =>
                item.role === 'user' ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] bg-stone-900 text-white text-[13px] leading-relaxed px-4 py-2.5 rounded-2xl rounded-br-md">
                      {item.parts[0]?.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="space-y-3 max-w-[92%]">
                    {item.parts.map((p, j) =>
                      p.type === 'text' ? (
                        <p key={j} className="text-[13px] leading-relaxed text-stone-700 whitespace-pre-line">{p.text}</p>
                      ) : p.card ? (
                        <CardBlock key={j} card={p.card} onPick={send} />
                      ) : null
                    )}
                  </div>
                )
              )}

              {busy && (
                <div className="flex items-center gap-2 text-stone-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-dot" />
                  <span className="text-[11px] font-semibold tracking-wide uppercase">Finding the answer…</span>
                </div>
              )}

              {error && (
                <div className="glass rounded-2xl p-4">
                  <p className="text-[12px] text-stone-600 mb-2">{error}</p>
                  <a
                    href={`https://wa.me/${WA_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold uppercase tracking-wide text-emerald-600"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-5 pt-3 pb-4 border-t border-stone-200/70 bg-white/70 backdrop-blur">
              <form
                onSubmit={(e) => { e.preventDefault(); send(input) }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Dates, budget, category… anything"
                  maxLength={1000}
                  className="flex-1 bg-white border border-stone-200 rounded-full px-4 py-3 text-[13px] text-stone-900 placeholder-stone-400 focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-gold-gradient text-white disabled:opacity-40 transition-opacity"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </form>
              <p className="text-center text-[9px] text-stone-400 mt-2 tracking-wide">
                AI concierge by{' '}
                <a href="https://orpheasociety.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-500 hover:text-amber-700">
                  Orphéa
                </a>{' '}
                · quotes are true totals, booking confirmed on WhatsApp
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
