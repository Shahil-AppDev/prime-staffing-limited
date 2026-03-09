import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Prime Concept Decor - Expert Interior Design & Decoration Services',
  description: 'Transform your space with Prime Concept Decor. Award-winning interior design and decoration services for residential and commercial projects. Professional 3D visualization, space planning, and custom design solutions.',
  keywords: 'interior design, interior decoration, home decor, commercial design, residential design, space planning, 3D visualization, interior designer, home renovation, office design, restaurant design, prime concept decor',
  authors: [{ name: 'Prime Concept Decor' }],
  creator: 'Prime Concept Decor',
  publisher: 'Prime Concept Decor',
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
    title: 'Prime Concept Decor - Expert Interior Design & Decoration',
    description: 'Transform your space with expert interior design services. Residential & commercial projects.',
    siteName: 'Prime Concept Decor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Concept Decor - Expert Interior Design',
    description: 'Transform your space with expert interior design services.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
