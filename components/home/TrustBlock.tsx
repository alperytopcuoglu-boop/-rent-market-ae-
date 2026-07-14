// Güven bloğu — rakamlar, 3 adımda nasıl çalışır, gerçek iletişim.
const STEPS = [
  { n: '01', title: 'Leave a request', text: 'Dates, budget, car type — 60 seconds, one form.' },
  { n: '02', title: 'Offers come to you', text: 'We collect quotes from 5 verified providers.' },
  { n: '03', title: 'Get your car', text: 'Best true-total offer, delivered to your door.' },
]

export default function TrustBlock() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-8 pb-16">
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-7 md:p-12">
        {/* Rakam şeridi */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 pb-8 mb-8 border-b border-stone-100 max-w-2xl mx-auto">
          {[
            ['7', 'verified companies'],
            ['100+', 'cars listed'],
            ['24/7', 'WhatsApp support'],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="font-display font-extrabold text-stone-900 text-2xl md:text-4xl">{v}</p>
              <p className="text-stone-400 text-[10px] md:text-xs font-semibold uppercase tracking-wide mt-1">{l}</p>
            </div>
          ))}
        </div>

        {/* 3 adım */}
        <div className="text-center mb-8">
          <p className="section-label">How It Works</p>
          <h3 className="font-display font-bold text-stone-900 text-xl md:text-2xl mt-1">
            Three steps to your car
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-9">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-[#f8f7f4] rounded-2xl p-5">
              <p className="font-display font-extrabold text-amber-600 text-sm mb-2">{s.n}</p>
              <p className="font-bold text-stone-900 text-[14px] mb-1">{s.title}</p>
              <p className="text-stone-500 text-[12px] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Gerçek iletişim */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] text-stone-500">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Business Bay, Dubai
          </span>
          <a href="tel:+971556755532" className="flex items-center gap-1.5 hover:text-stone-900">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .21h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.06-1.06a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            +971 55 675 5532
          </a>
          <a href="mailto:hello@rentmarketae.com" className="flex items-center gap-1.5 hover:text-stone-900">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            hello@rentmarketae.com
          </a>
        </div>
      </div>
    </div>
  )
}
