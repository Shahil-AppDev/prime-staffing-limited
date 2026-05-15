import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/providers'
import { SuspensionGate } from '@/components/SuspensionGate'
import { FloatingActionButton } from '@/components/ui/floating-action-button'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Prime Group Ltd - Diversified Business Solutions in Mauritius',
  description: 'Prime Group Ltd operates across six specialized sectors in Mauritius: decoration, cooling, logistics, renewable energy, blinds manufacturing and healthcare. Professional business solutions for all industries.',
  keywords: 'prime group mauritius, business solutions mauritius, decoration mauritius, hvac mauritius, logistics mauritius, renewable energy mauritius, blinds mauritius, healthcare mauritius',
  authors: [{ name: 'Prime Group Ltd' }],
  creator: 'Prime Group Ltd',
  publisher: 'Prime Group Ltd',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://primestaffingltd.com',
    title: 'Prime Group Ltd - Diversified Business Solutions in Mauritius',
    description: 'Prime Group Ltd operates across six specialized sectors in Mauritius: decoration, cooling, logistics, renewable energy, blinds manufacturing and healthcare.',
    siteName: 'Prime Group Ltd',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Group Ltd - Diversified Business Solutions',
    description: 'Professional business solutions across six specialized sectors in Mauritius.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <SuspensionGate>
            <ScrollProgress />
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <FloatingActionButton />
          </SuspensionGate>
        </Providers>
      </body>
    </html>
  )
}
