import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FloatingActionButton } from '@/components/ui/floating-action-button'
import { ScrollProgress } from '@/components/ui/scroll-progress'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Prime Staffing Ltd - Professional Staffing & Recruitment Solutions',
  description: 'Transform your workforce with Prime Staffing Ltd. Award-winning staffing and recruitment services for businesses of all sizes. Professional talent acquisition, temporary staffing, and permanent placement solutions.',
  keywords: 'staffing agency, recruitment services, talent acquisition, temporary staffing, permanent placement, workforce solutions, hiring solutions, employment agency, job placement, prime staffing ltd',
  authors: [{ name: 'Prime Staffing Ltd' }],
  creator: 'Prime Staffing Ltd',
  publisher: 'Prime Staffing Ltd',
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
    url: 'http://localhost:3000',
    title: 'Prime Staffing Ltd - Professional Staffing & Recruitment Solutions',
    description: 'Transform your workforce with Prime Staffing Ltd. Award-winning staffing and recruitment services for businesses of all sizes. Professional talent acquisition, temporary staffing, and permanent placement solutions.',
    siteName: 'Prime Staffing Ltd',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Staffing Ltd - Professional Staffing Solutions',
    description: 'Transform your workforce with expert staffing and recruitment services.',
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
          <ScrollProgress />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingActionButton />
        </Providers>
      </body>
    </html>
  )
}
