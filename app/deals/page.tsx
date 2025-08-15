'use client'

import DealsGrid from '@/components/DealsGrid'

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            All Deals
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the best VPS cloud server deals worldwide and find the solution that best fits your needs
          </p>
        </div>

        {/* Deals Grid */}
        <DealsGrid />
      </div>

    </div>
  )
}