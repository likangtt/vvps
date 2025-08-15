'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Filter } from 'lucide-react'

interface Provider {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
}

interface Deal {
  id: string;
  title: string;
  provider: string | Provider;
  price: string | number;
  originalPrice?: string | number;
  currency?: string;
  description?: string;
  features?: string[];
  tags?: string[];
  location?: string;
  specs?: {
    cpu?: string;
    ram?: string;
    storage?: string;
    bandwidth?: string;
  };
  cpu?: string;
  ram?: string;
  storage?: string;
  bandwidth?: string;
  link?: string;
  affiliateLink?: string;
  discount?: number;
  expiryDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilter: (filters: string[]) => void
}

export default function SearchBar({ onSearch, onFilter }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<Deal[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const filterOptions = [
    { id: 'featured', label: 'Featured', color: 'bg-red-500/20 text-red-400' },
    { id: 'north-america', label: 'North America', color: 'bg-blue-500/20 text-blue-400' },
    { id: 'europe', label: 'Europe', color: 'bg-green-500/20 text-green-400' },
    { id: 'ssd', label: 'SSD Storage', color: 'bg-purple-500/20 text-purple-400' },
    { id: 'high-performance', label: 'High Performance', color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'budget', label: 'Budget Friendly', color: 'bg-pink-500/20 text-pink-400' }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length > 1) {
      // 模拟搜索建议
      const mockSuggestions: Deal[] = [
        { 
          id: '1', 
          title: 'Vultr High Performance Cloud Server', 
          provider: 'Vultr', 
          price: '$2.50/month', 
          location: 'USA', 
          tags: ['SSD'] 
        },
        { 
          id: '2', 
          title: 'DigitalOcean Developer Choice', 
          provider: 'DigitalOcean', 
          price: '$4.00/month', 
          location: 'USA', 
          tags: ['Developer Friendly'] 
        }
      ].filter(deal => 
        deal.title.toLowerCase().includes(query.toLowerCase()) ||
        (typeof deal.provider === 'string' 
          ? deal.provider.toLowerCase().includes(query.toLowerCase())
          : deal.provider && typeof deal.provider === 'object' && deal.provider !== null && 'name' in deal.provider 
            ? (deal.provider as Provider).name.toLowerCase().includes(query.toLowerCase())
            : false)
      )
      setSuggestions(mockSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch(searchQuery)
    setShowSuggestions(false)
  }

  const handleFilterToggle = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(f => f !== filterId)
      : [...selectedFilters, filterId]
    
    setSelectedFilters(newFilters)
    onFilter(newFilters)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
    setShowSuggestions(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* 搜索输入框 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder="Search VPS providers, specs or locations..."
          className="w-full pl-12 pr-20 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
        />

        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
          {query && (
            <button
              onClick={clearSearch}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isFilterOpen || selectedFilters.length > 0
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 搜索建议 */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50">
          <div className="p-2">
            <div className="text-xs text-gray-400 px-3 py-2">Search Suggestions</div>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSearch(suggestion.title)}
                className="w-full text-left px-3 py-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <div className="text-white font-medium">{suggestion.title}</div>
                <div className="text-sm text-gray-400">
                  {typeof suggestion.provider === 'string' 
                    ? suggestion.provider 
                    : suggestion.provider?.name || 'Unknown Provider'} • {suggestion.price}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 筛选面板 */}
      {isFilterOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50">
          <div className="p-4">
            <div className="text-sm font-medium text-white mb-3">Filter Options</div>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleFilterToggle(option.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFilters.includes(option.id)
                      ? option.color
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {selectedFilters.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <button
                  onClick={() => {
                    setSelectedFilters([])
                    onFilter([])
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 已选筛选标签 */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedFilters.map((filterId) => {
            const option = filterOptions.find(opt => opt.id === filterId)
            return option ? (
              <span
                key={filterId}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${option.color}`}
              >
                {option.label}
                <button
                  onClick={() => handleFilterToggle(filterId)}
                  className="ml-2 hover:bg-black/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ) : null
          })}
        </div>
      )}
    </div>
  )
}