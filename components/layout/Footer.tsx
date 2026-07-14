import Link from 'next/link'

// İndekslenebilir landing sayfalarına giden iç linkler (query param sayfalarına değil).
const POPULAR_SEARCHES = [
  { label: 'No deposit car rental Dubai', href: '/car-rental-dubai/no-deposit' },
  { label: 'Monthly car rental Dubai', href: '/car-rental-dubai/monthly' },
  { label: 'SUV rental Dubai', href: '/car-rental-dubai/suv' },
  { label: 'Sports car rental Dubai', href: '/car-rental-dubai/sports' },
  { label: 'Luxury car rental Dubai', href: '/car-rental-dubai/luxury' },
  { label: 'Exotic car rental Dubai', href: '/car-rental-dubai/exotic' },
  { label: 'Cheap car rental Dubai', href: '/car-rental-dubai/economy' },
]

// SEO footer — şirket bilgisi, popüler aramalar iç linkleri.
export default function Footer() {
  return (
    <footer className="border-t border-stone-200/70 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-10 pb-24 md:pb-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display font-extrabold text-stone-900 text-base mb-2">
            Rent Market <span className="text-amber-600">AE</span>
          </p>
          <p className="text-stone-500 text-[12px] leading-relaxed max-w-xs">
            Dubai&apos;s curated car rental marketplace. One request, offers from 5
            verified providers, true-total pricing with no surprises.
          </p>
          <p className="text-stone-400 text-[11px] mt-3 leading-relaxed">
            Marasi Drive, Business Bay, Dubai, UAE
            <br />
            <a href="tel:+971556755532" className="hover:text-stone-600">+971 55 675 5532</a> ·{' '}
            <a href="mailto:hello@rentmarketae.com" className="hover:text-stone-600">hello@rentmarketae.com</a>
          </p>
        </div>

        <div>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Popular Searches</p>
          <ul className="space-y-1.5">
            {POPULAR_SEARCHES.map((s) => (
              <li key={s.label}>
                <Link href={s.href} className="text-[12px] text-stone-500 hover:text-amber-700">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Company</p>
          <ul className="space-y-1.5">
            <li><Link href="/shop" className="text-[12px] text-stone-500 hover:text-amber-700">Browse all cars</Link></li>
            <li><Link href="/request" className="text-[12px] text-stone-500 hover:text-amber-700">Get the best offer</Link></li>
            <li><Link href="/providers" className="text-[12px] text-stone-500 hover:text-amber-700">Compare rental providers</Link></li>
            <li><Link href="/contact" className="text-[12px] text-stone-500 hover:text-amber-700">Contact &amp; partner with us</Link></li>
            <li><Link href="/privacy" className="text-[12px] text-stone-500 hover:text-amber-700">Privacy policy</Link></li>
          </ul>
          <a
            href="https://wa.me/971556755532"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-emerald-500 text-white text-[11px] font-bold px-4 py-2.5 rounded-full"
          >
            WhatsApp — fastest reply
          </a>
        </div>
      </div>
      <div className="border-t border-stone-100">
        <p className="max-w-[1200px] mx-auto px-5 md:px-8 py-4 text-[10px] text-stone-400">
          © {new Date().getFullYear()} Rent Market AE. All providers are independently operated rental companies.
        </p>
      </div>
    </footer>
  )
}
