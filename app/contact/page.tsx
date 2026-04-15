'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    carInterest: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pb-20">
      <Header />

      {/* Page header */}
      <div className="px-4 pt-5 pb-4">
        <h1 className="text-xl font-bold text-stone-900">Get in Touch</h1>
        <p className="text-sm text-stone-500 mt-1">
          We're here to help you find the perfect rental.
        </p>
      </div>

      {/* WhatsApp — primary CTA */}
      <div className="mx-4 mb-4">
        <a
          href="https://wa.me/971501234567?text=Hi, I'd like to inquire about a car rental."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-green-500 text-white rounded-2xl p-4 shadow-sm hover:bg-green-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-base leading-tight">Chat on WhatsApp</p>
              <p className="text-green-100 text-xs">Fastest response · Usually within minutes</p>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </div>

      {/* Quick actions */}
      <div className="px-4 mb-5 grid grid-cols-2 gap-3">
        {/* Call */}
        <a
          href="tel:+971501234567"
          className="flex items-center gap-3 bg-white rounded-2xl p-3.5 border border-stone-100 shadow-sm"
        >
          <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .21h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.06-1.06a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-stone-900 text-sm">Call Now</p>
            <p className="text-[11px] text-stone-400">+971 50 123 4567</p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:hello@rentmarketae.com"
          className="flex items-center gap-3 bg-white rounded-2xl p-3.5 border border-stone-100 shadow-sm"
        >
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-stone-900 text-sm">Email Us</p>
            <p className="text-[11px] text-stone-400">hello@rentmarketae.com</p>
          </div>
        </a>
      </div>

      {/* Location & Hours */}
      <div className="mx-4 mb-5 bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="p-4">
          <h3 className="font-bold text-stone-900 text-sm mb-3">Location & Hours</h3>

          <div className="flex gap-3 mb-3">
            <div className="w-8 h-8 bg-stone-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-500">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-800">Business Bay, Dubai</p>
              <p className="text-[11px] text-stone-400">Marasi Drive, Tower B, Office 1204</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-stone-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-500">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-800">Working Hours</p>
              <p className="text-[11px] text-stone-400">Sun – Thu: 9am – 8pm</p>
              <p className="text-[11px] text-stone-400">Fri – Sat: 10am – 6pm</p>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="h-28 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-1">📍</div>
            <p className="text-[11px] text-stone-500 font-medium">Business Bay, Dubai</p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="mx-4 mb-5 bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
        <h3 className="font-bold text-stone-900 text-sm mb-1">Send an Inquiry</h3>
        <p className="text-[11px] text-stone-400 mb-4">We'll get back to you within 2 hours.</p>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">✅</div>
            <p className="font-bold text-stone-900 text-sm">Inquiry Sent!</p>
            <p className="text-xs text-stone-500 mt-1">
              We'll reach out within 2 hours. You can also chat on WhatsApp for a faster response.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs text-amber-600 font-semibold"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-stone-600 mb-1 block">
                Your Name *
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ahmed Al Rashidi"
                className="w-full bg-stone-50 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 border border-stone-200 outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 mb-1 block">
                Phone / WhatsApp *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+971 50 000 0000"
                className="w-full bg-stone-50 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 border border-stone-200 outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 mb-1 block">
                Email (optional)
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-stone-50 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 border border-stone-200 outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 mb-1 block">
                Car You're Interested In
              </label>
              <input
                type="text"
                value={form.carInterest}
                onChange={(e) => setForm({ ...form, carInterest: e.target.value })}
                placeholder="e.g. Ford Mustang, Nissan Patrol…"
                className="w-full bg-stone-50 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 border border-stone-200 outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 mb-1 block">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us your rental dates, preferences, or any questions…"
                rows={3}
                className="w-full bg-stone-50 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 border border-stone-200 outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </div>

      {/* List Your Fleet */}
      <div className="mx-4 mb-6 bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-4 text-white">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <h3 className="font-bold text-base mb-1">List Your Fleet</h3>
            <p className="text-stone-300 text-xs leading-relaxed mb-3">
              Are you a car rental company in Dubai? Join Rent Market AE and reach thousands of customers through our platform.
            </p>
            <a
              href="mailto:partners@rentmarketae.com"
              className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-400 transition-colors"
            >
              Partner With Us
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Trust note */}
      <div className="px-4 pb-2 text-center">
        <p className="text-[11px] text-stone-400 leading-relaxed">
          Rent Market AE is a Dubai-based car rental marketplace.<br />
          All providers are verified and fully insured.
        </p>
      </div>
    </div>
  )
}
