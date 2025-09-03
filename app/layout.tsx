import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/google-analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gramstr - Bridge Instagram to Nostr',
  description: 'Download your Instagram content and share it with the decentralized world. Own your content, own your audience.',
  keywords: 'instagram, nostr, download, content, decentralized, social media',
  icons: {
    icon: '/gramstr-icon.png',
    apple: '/gramstr-icon.png',
  },
  openGraph: {
    title: 'Gramstr - Bridge Instagram to Nostr',
    description: 'Download your Instagram content and share it with the decentralized world.',
    url: 'https://gramstr.com',
    siteName: 'Gramstr',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gramstr - Bridge Instagram to Nostr',
    description: 'Download your Instagram content and share it with the decentralized world.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {children}
      </body>
    </html>
  )
}