'use client'

import { useState, useEffect } from 'react'
import DealCard from './DealCard'
import FilterTabs from './FilterTabs'
import SearchBar from './SearchBar'

interface Provider {
  id?: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  tags?: string[];
}

interface Deal {
  id: string;
  title: string;
  provider: string | Provider;
  price: string | number;
  originalPrice?: string | number;
  currency?: string;
  discount?: string;
  location: string;
  specs?: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  cpu?: string;
  ram?: string;
  storage?: string;
  bandwidth?: string;
  tags: string[];
  features?: string[];
  link?: string;
  couponCode?: string;
  affiliateLink?: string;
  logo?: string;
  featured?: boolean;
  expiryDate?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function DealsGrid() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilters, setSearchFilters] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟从API或JSON文件加载数据
    const loadDeals = async () => {
      try {
        // 模拟API调用
        const dealsModule = await import('../data/deals.json')
        // 使用类型断言，但先进行类型检查和转换
        const rawData = dealsModule.default
        const dealsData = Array.isArray(rawData) ? rawData.map((deal: any) => {
          // 处理specs对象，将其扁平化
          const specs = deal.specs || {}
          return {
            ...deal,
            cpu: specs.cpu || '',
            ram: specs.ram || '',
            storage: specs.storage || '',
            bandwidth: specs.bandwidth || '',
            link: deal.link || deal.affiliateLink || '',  // 保留原始link，如果没有则使用affiliateLink
            features: deal.features || []
          };
        }) : [];
        
        setDeals(dealsData)
        setFilteredDeals(dealsData)
      } catch (error) {
        console.error('Failed to load deals:', error)
        // 如果无法加载JSON文件，使用默认数据
        const defaultDeals: Deal[] = [
          {
            id: "1",
            title: "Vultr High Performance Cloud Server",
            provider: "Vultr",
            price: "2.50",
            originalPrice: "5.00",
            currency: "$",
            discount: "50%",
            location: "USA/Japan/Singapore",
            cpu: "1 vCPU",
            ram: "512MB",
            storage: "10GB SSD",
            bandwidth: "500GB",
            tags: ["US Datacenter", "SSD", "Hourly Billing"],
            link: "https://vultr.com",
            affiliateLink: "https://vultr.com",
            featured: true,
            expiryDate: "2024-12-31",
            description: "Vultr limited time promotion",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
          }
        ]
        setDeals(defaultDeals)
        setFilteredDeals(defaultDeals)
      } finally {
        setLoading(false)
      }
    }

    loadDeals()
  }, [])

  useEffect(() => {
    let filtered = deals

    // 应用搜索查询
    if (searchQuery) {
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof deal.provider === 'string' 
          ? deal.provider.toLowerCase().includes(searchQuery.toLowerCase())
          : deal.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        deal.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // 应用筛选条件
    if (searchFilters.length > 0) {
      filtered = filtered.filter(deal => {
        return searchFilters.some(filter => {
          switch (filter) {
            case 'featured':
              return deal.featured
            case 'north-america':
              return deal.location.includes('USA') || deal.location.includes('Canada') || deal.tags.some(tag => tag.includes('North America'))
            case 'europe':
              return deal.location.includes('Germany') || deal.location.includes('France') || deal.location.includes('UK') || deal.tags.some(tag => tag.includes('Europe'))
            case 'ssd':
              return deal.tags.some(tag => tag.includes('SSD')) || 
                     (deal.specs && deal.specs.storage && deal.specs.storage.includes('SSD')) || 
                     (deal.storage && deal.storage.includes('SSD'))
            case 'high-performance':
              return deal.tags.some(tag => tag.includes('High Performance') || tag.includes('High Speed'))
            case 'budget':
              return deal.tags.some(tag => tag.includes('Budget') || tag.includes('Value'))
            default:
              return false
          }
        })
      })
    }

    // 应用标签筛选
    if (activeFilter === '全部') {
      // 已经应用了搜索和筛选
    } else if (activeFilter === 'Featured') {
      filtered = filtered.filter(deal => deal.featured)
    } else {
      filtered = filtered.filter(deal => 
        deal.tags.some(tag => tag.includes(activeFilter)) ||
        deal.location.includes(activeFilter)
      )
    }

    setFilteredDeals(filtered)
  }, [activeFilter, deals, searchQuery, searchFilters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = (filters: string[]) => {
    setSearchFilters(filters)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 搜索栏 */}
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      
      {/* 筛选标签 */}
      <FilterTabs 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
      />
      
      {/* 结果统计 */}
      <div className="flex items-center justify-between">
        <div className="text-gray-400">
          Found <span className="text-primary-400 font-semibold">{filteredDeals.length}</span> deals
          {searchQuery && (
            <span className="ml-2">
              for "<span className="text-white">{searchQuery}</span>"
            </span>
          )}
        </div>
        
        {(searchQuery || searchFilters.length > 0) && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSearchFilters([])
              setActiveFilter('全部')
            }}
            className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
          >
            Clear Search
          </button>
        )}
      </div>
      
      {/* 优惠卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      {/* 无结果提示 */}
      {filteredDeals.length === 0 && !loading && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-gray-400 text-lg mb-4">
            {searchQuery || searchFilters.length > 0 
              ? 'No deals found matching your criteria' 
              : 'No deals available at the moment'
            }
          </div>
          <div className="space-x-4">
            <button 
              onClick={() => {
                setSearchQuery('')
                setSearchFilters([])
                setActiveFilter('全部')
              }}
              className="text-primary-400 hover:text-primary-300 underline"
            >
              View All Deals
            </button>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-white underline"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}