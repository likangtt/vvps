'use client'

import { Suspense } from 'react'
import SimpleHeader from '@/components/SimpleHeader'
import Hero from '@/components/Hero'
import DealsGrid from '@/components/DealsGrid'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
export default function Home() {

  return (
    <main className="min-h-screen">
      <SimpleHeader />
      <Hero />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              热门VPS优惠
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              精选全球优质VPS服务商，为您提供最具性价比的云服务器方案
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <DealsGrid />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  )
}
