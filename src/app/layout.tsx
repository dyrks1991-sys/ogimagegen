import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

const SITE_URL = 'https://ogimagegen.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OGImageGen — Free OG Image Generator. No Upload.',
    template: '%s | OGImageGen',
  },
  description: 'Generate beautiful 1200×630 Open Graph images instantly in your browser. 3 templates, custom colors, one-click PNG download. No upload. No signup. 100% free.',
  keywords: ['og image generator', 'open graph image', 'social media image', 'meta image generator', 'twitter card image', 'free og image', 'no upload'],
  authors: [{ name: 'DevOS' }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'OGImageGen — Free OG Image Generator',
    description: 'Generate beautiful 1200×630 Open Graph images instantly. No upload. No signup.',
    url: SITE_URL,
    siteName: 'OGImageGen',
    locale: 'en_US',
    type: 'website',
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: 'OGImageGen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OGImageGen — Free OG Image Generator',
    description: 'Generate beautiful 1200×630 Open Graph images instantly in your browser.',
    images: [`${SITE_URL}/og.png`],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon-32.png', sizes: '32x32' }],
    apple: '/apple-touch-icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'OGImageGen',
  url: SITE_URL,
  description: 'Free browser-based Open Graph image generator. 3 templates, custom colors, instant PNG download.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
