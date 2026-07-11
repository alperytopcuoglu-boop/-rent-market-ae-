import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import BottomNav from '@/components/layout/BottomNav'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Rent Market AE — Dubai Car Rental Marketplace',
  description: 'Browse and book from Dubai\'s top car rental providers. Sports cars, SUVs, luxury and exotic vehicles — daily, weekly and monthly rates. No deposit options available.',
  keywords: 'car rental dubai, rent car dubai, sports car rental, SUV rental dubai, luxury car rental UAE, no deposit car rental, monthly car rental dubai, exotic car rental, cheapest car rental dubai',
  applicationName: 'Rent Market AE',
  authors: [{ name: 'Rent Market AE' }],
  metadataBase: new URL('https://rentmarketae.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rent Market AE — Dubai Car Rental Marketplace',
    description: 'Browse and book from Dubai\'s top car rental providers. Sports cars, SUVs, luxury and exotic vehicles.',
    siteName: 'Rent Market AE',
    locale: 'en_AE',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent Market AE — Dubai Car Rental Marketplace',
    description: 'Browse and book from Dubai\'s top car rental providers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rent Market AE',
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#f8f7f4',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
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
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} bg-[#faf9f7] min-h-screen`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WDXGWFBV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <main className="relative bg-[#faf9f7] min-h-screen">
          {children}
          <BottomNav />
        </main>
      </body>
    </html>
  )
}
