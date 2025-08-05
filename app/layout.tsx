import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VPS优惠 | 全球最佳VPS服务器优惠信息',
  description: '发现全球最优质的VPS云服务器优惠，找到最适合您需求的解决方案。汇聚21家北美和欧洲顶级VPS提供商。',
  keywords: 'VPS, 云服务器, 优惠, 服务器托管, 虚拟专用服务器, 云计算, 服务器租赁',
  authors: [{ name: 'VPS优惠团队' }],
  creator: 'VPS优惠',
  publisher: 'VPS优惠',
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
    title: 'VPS优惠 | 全球最佳VPS服务器优惠信息',
    description: '发现全球最优质的VPS云服务器优惠，找到最适合您需求的解决方案。汇聚21家北美和欧洲顶级VPS提供商。',
    url: 'https://www.vpsdeals.example.com',
    siteName: 'VPS优惠',
    locale: 'zh_CN',
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
    title: 'VPS优惠 | 全球最佳VPS服务器优惠信息',
    description: '发现全球最优质的VPS云服务器优惠，找到最适合您需求的解决方案。汇聚21家北美和欧洲顶级VPS提供商。',
  },
  verification: {
    google: 'google-site-verification-code', // 部署后需要替换为实际的验证码
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
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}