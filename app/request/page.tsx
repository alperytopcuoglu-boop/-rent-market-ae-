'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'

const WA_NUMBER = '971556755532'

// ── Adımlar: Tarih → Süre → Kategori → Bütçe → İletişim ──────────
type Answers = {
  startDate: string
  duration: string
  category: string
  budget: string
  deposit: string
  name: string
  phone: string
}

const STEPS = ['When', 'How long', 'What vibe', 'Budget', 'You'] as const

const DURATION_OPTIONS = ['1-2 days', '3-6 days', '1-2 weeks', '1 month+']
const CATEGORY_OPTIONS = [
  { label: '🏎️ Sports', value: 'Sports' },
  { label: '🚙 SUV', value: 'SUV' },
  { label: '💼 Luxury', value: 'Luxury' },
  { label: '✨ Exotic', value: 'Exotic' },
  { label: '🚗 Economy', value: 'Economy' },
  { label: '🤷 Surprise me', value: 'Open to suggestions' },
]
const BUDGET_OPTIONS = ['Under AED 200/day', 'AED 200–400/day', 'AED 400–800/day', 'AED 800+/day']
const DEPOSIT_OPTIONS = ['No-deposit only', 'Deposit is fine']

function refCode(): string {
  return 'RM-' + Math.random().toString(36).slice(2, 6).toUpperCase()
}

export default function RequestPage() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [ref] = useState(refCode)
  const [a, setA] = useState<Answers>({
    startDate: '',
    duration: '',
    category: '',
    budget: '',
    deposit: '',
    name: '',
    phone: '',
  })

  const progress = done ? 100 : Math.round((step / STEPS.length) * 100)

  const waMessage = useMemo(() => {
    return (
      `🚗 New rental request ${ref}\n` +
      `Name: ${a.name}\n` +
      `Phone: ${a.phone}\n` +
      `Start: ${a.startDate || 'flexible'}\n` +
      `Duration: ${a.duration}\n` +
      `Category: ${a.category}\n` +
      `Budget: ${a.budget}\n` +
      `Deposit: ${a.deposit}\n` +
      `— sent via rentmarketae.com/request`
    )
  }, [a, ref])

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1)
    else setDone(true)
  }
  function pick(field: keyof Answers, value: string) {
    setA((prev) => ({ ...prev, [field]: value }))
    setTimeout(next, 180) // mikro-gecikme: seçim hissi
  }

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      <Header />

      <div className="max-w-xl mx-auto px-5 pt-8">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1.5 bg-stone-200/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-gradient rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-stone-400 tabular-nums">
            {done ? '✓' : `${step + 1} / ${STEPS.length}`}
          </span>
        </div>

        {done ? (
          /* ── Başarı ekranı ── */
          <div className="text-center animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-display font-extrabold text-stone-900 text-2xl mb-2">
              Your request is ready, {a.name.split(' ')[0] || 'friend'}!
            </h1>
            <p className="text-stone-500 text-[13px] leading-relaxed max-w-sm mx-auto mb-2">
              Send it with one tap — it goes to our concierge team and reaches{' '}
              <strong className="text-stone-700">5 verified providers</strong>. Best offers
              come back to you on WhatsApp.
            </p>
            <p className="text-[11px] font-bold text-stone-400 tracking-wide mb-7">
              Reference: {ref}
            </p>

            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full max-w-xs bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-full text-sm transition-colors shadow-[0_8px_28px_rgba(16,185,129,0.3)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Send my request
            </a>

            <p className="text-[11px] text-stone-400 mt-4">
              Prefer browsing?{' '}
              <Link href="/shop" className="font-bold text-amber-700">
                See all cars →
              </Link>
            </p>
          </div>
        ) : (
          /* ── Adım kartı ── */
          <div key={step} className="animate-slide-up">
            {step === 0 && (
              <StepCard title="When do you need the car?" sub="Pick a start date — or skip if flexible.">
                <input
                  type="date"
                  value={a.startDate}
                  onChange={(e) => setA({ ...a, startDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-900 focus:border-amber-400 mb-4"
                />
                <div className="flex gap-2">
                  <button onClick={next} disabled={!a.startDate} className="flex-1 bg-gold-gradient text-white font-bold py-3.5 rounded-full text-sm disabled:opacity-40">
                    Continue
                  </button>
                  <button onClick={() => pick('startDate', '')} className="px-5 text-[12px] font-semibold text-stone-500 hover:text-stone-900">
                    Flexible
                  </button>
                </div>
              </StepCard>
            )}

            {step === 1 && (
              <StepCard title="How long will you drive?" sub="Longer rentals unlock weekly & monthly rates.">
                <OptionGrid options={DURATION_OPTIONS} onPick={(v) => pick('duration', v)} />
              </StepCard>
            )}

            {step === 2 && (
              <StepCard title="What's the vibe?" sub="We'll match the fleet to your plan.">
                <div className="grid grid-cols-2 gap-2.5">
                  {CATEGORY_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => pick('category', o.value)}
                      className="bg-white border border-stone-200 rounded-2xl px-4 py-4 text-[13px] font-semibold text-stone-700 hover:border-amber-400 hover:shadow-sm transition-all text-left"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </StepCard>
            )}

            {step === 3 && (
              <StepCard title="Daily budget?" sub="True totals — the number you see is what you pay.">
                <OptionGrid options={BUDGET_OPTIONS} onPick={(v) => pick('budget', v)} />
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wide mt-5 mb-2">Deposit preference</p>
                <OptionGrid options={DEPOSIT_OPTIONS} onPick={(v) => setA({ ...a, deposit: v })} selected={a.deposit} instant />
              </StepCard>
            )}

            {step === 4 && (
              <StepCard title="Where should offers go?" sub="Providers reply on WhatsApp — usually within the hour.">
                <input
                  type="text"
                  placeholder="Your name"
                  value={a.name}
                  onChange={(e) => setA({ ...a, name: e.target.value })}
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-400 mb-3"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp number (+971...)"
                  value={a.phone}
                  onChange={(e) => setA({ ...a, phone: e.target.value })}
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-400 mb-4"
                />
                <button
                  onClick={next}
                  disabled={!a.name.trim() || a.phone.trim().length < 7}
                  className="w-full bg-gold-gradient gold-glow text-white font-bold py-4 rounded-full text-sm disabled:opacity-40 transition-opacity"
                >
                  Get my offers →
                </button>
              </StepCard>
            )}

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-5 text-[12px] font-semibold text-stone-400 hover:text-stone-700">
                ← Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StepCard({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="font-display font-extrabold text-stone-900 text-2xl md:text-3xl leading-tight mb-1.5">{title}</h1>
      <p className="text-stone-500 text-[13px] mb-6">{sub}</p>
      {children}
    </div>
  )
}

function OptionGrid({
  options,
  onPick,
  selected,
  instant,
}: {
  options: string[]
  onPick: (v: string) => void
  selected?: string
  instant?: boolean
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onPick(o)}
          className={`rounded-2xl px-4 py-4 text-[13px] font-semibold transition-all text-left border ${
            selected === o
              ? 'bg-stone-900 text-white border-stone-900'
              : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400 hover:shadow-sm'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
