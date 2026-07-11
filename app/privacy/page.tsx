import type { Metadata } from 'next'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Privacy Policy — Rent Market AE',
  description:
    'Privacy policy for the Rent Market AE website and mobile app. Learn what data we collect, how we use it, and your rights.',
  alternates: {
    canonical: '/privacy',
  },
}

const sections = [
  {
    title: '1. Who We Are',
    body: [
      'Rent Market AE ("we", "us") is a car rental marketplace based in Dubai, United Arab Emirates. We connect customers with verified car rental providers through our website (rentmarketae.com) and our iOS mobile app.',
      'This policy explains what information we collect, how we use it, and the choices you have. It applies to both the website and the mobile app.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      'Browsing data (website): we use analytics tools (Google Tag Manager / Google Analytics) to understand how visitors use the site — pages viewed, device type, approximate location, and referral source. This data is aggregated and does not directly identify you.',
      'Inquiry details: if you contact us through the inquiry form, we receive the name, phone number, email, and message you choose to provide.',
      'App preferences: the mobile app stores your favorite cars locally on your device only. This information never leaves your phone and is not transmitted to our servers.',
      'We do NOT collect payment information. All bookings are arranged directly with rental providers via WhatsApp or phone.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: [
      'To respond to your rental inquiries and connect you with the right provider.',
      'To improve our website, app, and the selection of cars we feature.',
      'To measure the performance of our marketing.',
      'We do not sell your personal information to third parties.',
    ],
  },
  {
    title: '4. WhatsApp & Third-Party Services',
    body: [
      'When you tap "Book on WhatsApp", you are redirected to WhatsApp, which is operated by Meta and governed by its own privacy policy. Any conversation happens directly between you and us (or the provider) on that platform.',
      'Car inventory data is served from Supabase (our database provider). Website hosting is provided by Vercel. Analytics are provided by Google. Each of these services processes only the technical data required to deliver their function.',
    ],
  },
  {
    title: '5. Data Retention & Security',
    body: [
      'Inquiry details are kept only as long as needed to handle your request and any follow-up.',
      'Analytics data is retained according to the default retention settings of the analytics platform.',
      'Favorites saved in the app remain on your device until you remove them or uninstall the app.',
    ],
  },
  {
    title: '6. Your Rights',
    body: [
      'You may request access to, correction of, or deletion of any personal information we hold about you at any time.',
      'To make a request, contact us at hello@rentmarketae.com or via WhatsApp at +971 55 675 5532.',
    ],
  },
  {
    title: "7. Children's Privacy",
    body: [
      'Our services are intended for adults of legal driving age. We do not knowingly collect information from anyone under 18.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    body: [
      'We may update this policy from time to time. The latest version will always be available at rentmarketae.com/privacy with the effective date below.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-[#faf9f7]">
      <Header />

      <div className="md:max-w-2xl md:mx-auto">

      {/* Page header */}
      <div className="px-4 pt-5 pb-4">
        <h1 className="font-display text-2xl font-bold text-stone-900">Privacy Policy</h1>
        <p className="text-sm text-stone-500 mt-1 font-medium">
          Effective date: July 11, 2026
        </p>
      </div>

      {/* Sections */}
      <div className="px-4 space-y-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="glass rounded-2xl p-4"
          >
            <h2 className="font-bold text-stone-900 text-sm mb-2">{section.title}</h2>
            <div className="space-y-2">
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-xs text-stone-500 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact card */}
      <div className="mx-4 mt-5 bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-5 text-white">
        <h3 className="font-black text-base mb-1">Questions?</h3>
        <p className="text-stone-300 text-xs leading-relaxed mb-3">
          If you have any questions about this policy or your data, we&apos;re happy to help.
        </p>
        <a
          href="mailto:hello@rentmarketae.com"
          className="inline-flex items-center gap-1.5 bg-gold-gradient text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide"
        >
          hello@rentmarketae.com
        </a>
      </div>

      </div>
    </div>
  )
}
