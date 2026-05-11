import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import BottomNav from '@/components/layout/BottomNav'

export const metadata: Metadata = {
  title: 'Rent Market AE — Dubai Car Rental Marketplace',
  description: 'Browse and book from Dubai\'s top car rental providers. Sports cars, SUVs, luxury and exotic vehicles — daily, weekly and monthly rates.',
  keywords: 'car rental dubai, rent car dubai, sports car rental, SUV rental dubai, luxury car rental UAE',
  applicationName: 'Rent Market AE',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WDXGWFBV');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="bg-stone-50 min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WDXGWFBV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
