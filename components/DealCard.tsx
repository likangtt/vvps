'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExternalLink, Clock, Star, Cpu, HardDrive, Wifi, Database } from 'lucide-react'

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

interface DealCardProps {
  deal: Deal
}

export default function DealCard({ deal }: DealCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN')
  }

  const isExpiringSoon = () => {
    if (!deal.expiryDate) return false
    const expiryDate = new Date(deal.expiryDate)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  return (
    <div className="cyber-card p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-white">{deal.title}</h3>
            {deal.featured && (
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            )}
          </div>
          <p className="text-sm text-gray-400">
            {typeof deal.provider === 'string' ? deal.provider : deal.provider.name}
          </p>
        </div>
        
        {isExpiringSoon() && (
          <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
            <Clock className="w-3 h-3" />
            即将到期
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-primary-400">
            {deal.currency || '$'}{deal.price}
          </span>
          {deal.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {deal.currency || '$'}{deal.originalPrice}
            </span>
          )}
          {deal.discount && (
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
              -{deal.discount}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400">{deal.location}</p>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Cpu className="w-4 h-4 text-primary-500" />
          <span>{deal.cpu || (deal.specs && deal.specs.cpu)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Database className="w-4 h-4 text-primary-500" />
          <span>{deal.ram || (deal.specs && deal.specs.ram)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <HardDrive className="w-4 h-4 text-primary-500" />
          <span>{deal.storage || (deal.specs && deal.specs.storage)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Wifi className="w-4 h-4 text-primary-500" />
          <span>{deal.bandwidth || (deal.specs && deal.specs.bandwidth)}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {deal.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-dark-700/50 text-gray-300 px-2 py-1 rounded text-xs border border-dark-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-3">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-2 px-4 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition-colors text-sm"
        >
          {showDetails ? '收起详情' : '查看详情'}
        </button>
        
        <a
          href={deal.link || deal.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-button w-full flex items-center justify-center gap-2 text-sm"
        >
          <span>立即购买</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Details Modal/Expandable */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{deal.title}</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {deal.description}
                </ReactMarkdown>
              </div>
              
              <div className="mt-6 pt-4 border-t border-dark-700">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>到期时间: {deal.expiryDate ? formatDate(deal.expiryDate) : '无限期'}</span>
                  <span>更新时间: {deal.updatedAt ? formatDate(deal.updatedAt) : '未知'}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <a
                  href={deal.link || deal.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-button w-full flex items-center justify-center gap-2"
                >
                  <span>立即购买</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}