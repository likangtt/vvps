'use client'

import { ArrowRight, Zap, Globe, Shield, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-purple-900/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Discover the Best VPS Deals
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gradient">World's Best</span>
            <br />
            <span className="text-white">VPS Deals</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Aggregating the latest VPS server deals worldwide to help you find the most cost-effective cloud server solutions
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="/about" className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all duration-300 text-lg">
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="cyber-card p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-primary-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">21+</div>
            <div className="text-gray-400">Quality Providers</div>
          </div>
          
          <div className="cyber-card p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-primary-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">99%</div>
            <div className="text-gray-400">User Satisfaction</div>
          </div>
          
          <div className="cyber-card p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Real-time Updates</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
