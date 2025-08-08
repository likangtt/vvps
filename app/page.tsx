'use client'

import { Suspense } from 'react'
import Hero from '@/components/Hero'
import DealsGrid from '@/components/DealsGrid'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Featured VPS Deals
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Carefully selected global VPS providers offering the most cost-effective cloud server solutions
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <DealsGrid />
          </Suspense>
        </div>
      </section>
    </>
  )
}
