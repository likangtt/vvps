import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VPS Deals | Best VPS Server Deals Worldwide',
  description: 'Discover the best VPS cloud server deals worldwide and find the solution that best fits your needs. Featuring 21 top VPS providers from North America and Europe.',
  keywords: 'VPS, cloud server, deals, server hosting, virtual private server, cloud computing, server rental',
  authors: [{ name: 'VPS Deals Team' }],
  creator: 'VPS Deals',
  publisher: 'VPS Deals',
  alternates: {
    canonical: 'https://www.vpsdeals.example.com',
    languages: {
      'en-US': 'https://www.vpsdeals.example.com/en',
      'zh-CN': 'https://www.vpsdeals.example.com/zh',
      'ja-JP': 'https://www.vpsdeals.example.com/ja',
      'hi-IN': 'https://www.vpsdeals.example.com/hi',
      'pt-BR': 'https://www.vpsdeals.example.com/pt',
      'es-ES': 'https://www.vpsdeals.example.com/es',
    },
  },
  openGraph: {
    title: 'VPS Deals | Best VPS Server Deals Worldwide',
    description: 'Discover the best VPS cloud server deals worldwide and find the solution that best fits your needs. Featuring 21 top VPS providers from North America and Europe.',
    url: 'https://www.vpsdeals.example.com',
    siteName: 'VPS Deals',
    locale: 'en_US',
    type: 'website',
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
  twitter: {
    card: 'summary_large_image',
    title: 'VPS Deals | Best VPS Server Deals Worldwide',
    description: 'Discover the best VPS cloud server deals worldwide and find the solution that best fits your needs. Featuring 21 top VPS providers from North America and Europe.',
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code after deployment
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-900 text-white min-h-screen flex flex-col`}>
        <SimpleHeader />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
