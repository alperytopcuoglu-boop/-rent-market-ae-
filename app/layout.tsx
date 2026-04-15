import type { Metadata } from 'next'
import './globals.css'
import BottomNav from '@/components/layout/BottomNav'

export const metadata: Metadata = {
  title: 'Rent Market AE — Dubai Car Rental Marketplace',
  description: 'Browse and book from Dubai\'s top car rental providers. Sports cars, SUVs, luxury and exotic vehicles available with daily, weekly and monthly rates.',
  keywords: 'car rental dubai, rent car dubai, sports car rental, SUV rental dubai, luxury car rental UAE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 min-h-screen">
        <main className="max-w-[480px] mx-auto relative bg-stone-50 min-h-screen shadow-[0_0_40px_rgba(0,0,0,0.08)]">
          {children}
        </main>
        <div className="max-w-[480px] mx-auto">
          <BottomNav />
        </div>
      </body>
    </html>
  )
}
