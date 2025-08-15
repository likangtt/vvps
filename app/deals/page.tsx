'use client'

import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'
import DealsGrid from '@/components/DealsGrid'

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <SimpleHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            所有优惠
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            发现全球最优质的VPS云服务器优惠，找到最适合您需求的解决方案
          </p>
        </div>

        {/* 优惠网格 */}
        <DealsGrid />
      </div>

      <Footer />
    </div>
  )
}