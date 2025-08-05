'use client'

import { useState, useEffect } from 'react'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'
import { Globe, MapPin, Star, ExternalLink, Filter, Search } from 'lucide-react'

interface Provider {
  id: string
  name: string
  logo?: string
  description: string
  location: string
  founded: string
  rating: number
  totalDeals: number
  features: string[]
  website: string
  tags: string[]
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('全部')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从deals数据中提取提供商信息
    const loadProviders = async () => {
      try {
        const response = await fetch('/data/deals.json')
        const deals = await response.json()
        
        // 统计每个提供商的信息
        const providerMap = new Map()
        
        deals.forEach((deal: any) => {
          if (!providerMap.has(deal.provider)) {
            providerMap.set(deal.provider, {
              id: deal.provider.toLowerCase().replace(/\s+/g, '-'),
              name: deal.provider,
              description: `${deal.provider} 提供高质量的VPS云服务器解决方案`,
              location: deal.location.split('/')[0],
              founded: '2010+',
              rating: 4.2 + Math.random() * 0.8,
              totalDeals: 0,
              features: deal.tags.slice(0, 3),
              website: deal.affiliateLink,
              tags: deal.tags
            })
          }
          
          const provider = providerMap.get(deal.provider)
          provider.totalDeals += 1
          
          // 合并特性标签
          deal.tags.forEach((tag: string) => {
            if (!provider.features.includes(tag) && provider.features.length < 5) {
              provider.features.push(tag)
            }
          })
        })
        
        const providersArray = Array.from(providerMap.values())
        setProviders(providersArray)
        setFilteredProviders(providersArray)
        setLoading(false)
      } catch (error) {
        console.error('加载提供商数据失败:', error)
        setLoading(false)
      }
    }

    loadProviders()
  }, [])

  useEffect(() => {
    let filtered = providers

    // 搜索筛选
    if (searchQuery) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 地区筛选
    if (selectedRegion !== '全部') {
      filtered = filtered.filter(provider => {
        if (selectedRegion === '北美') {
          return provider.location.includes('美国') || provider.location.includes('加拿大')
        } else if (selectedRegion === '欧洲') {
          return provider.location.includes('德国') || provider.location.includes('法国') || 
                 provider.location.includes('英国') || provider.location.includes('荷兰') ||
                 provider.location.includes('芬兰') || provider.location.includes('立陶宛')
        } else if (selectedRegion === '亚洲') {
          return provider.location.includes('日本') || provider.location.includes('新加坡')
        }
        return true
      })
    }

    setFilteredProviders(filtered)
  }, [providers, searchQuery, selectedRegion])

  const regions = ['全部', '北美', '欧洲', '亚洲']

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900">
      <SimpleHeader />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <SimpleHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            VPS 提供商
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            发现全球优质的VPS云服务器提供商，比较服务特色和优惠方案
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8 space-y-4">
          {/* 搜索栏 */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索提供商..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
            />
          </div>

          {/* 地区筛选 */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 bg-gray-800/30 rounded-lg p-1">
              <Filter className="w-4 h-4 text-gray-400 ml-2" />
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedRegion === region
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 结果统计 */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            找到 <span className="text-primary-400 font-semibold">{filteredProviders.length}</span> 个提供商
          </p>
        </div>

        {/* 提供商网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="cyber-card p-6 hover:scale-105 transition-transform">
              {/* 提供商头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{provider.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {provider.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {provider.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-400">{provider.totalDeals}</div>
                  <div className="text-xs text-gray-400">个优惠</div>
                </div>
              </div>

              {/* 描述 */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {provider.description}
              </p>

              {/* 特性标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {provider.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  查看优惠
                </button>
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏢</div>
            <div className="text-gray-400 text-lg mb-4">
              没有找到符合条件的提供商
            </div>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedRegion('全部')
              }}
              className="text-primary-400 hover:text-primary-300 underline"
            >
              查看全部提供商
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}