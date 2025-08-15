'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  ExternalLink, 
  Clock, 
  MapPin, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Star,
  Shield,
  CheckCircle,
  AlertCircle,
  Share2,
  Heart,
  Copy
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Deal {
  id: string
  title: string
  provider: string | { id?: string; name: string; logo?: string }
  price: string | number
  originalPrice?: string | number
  currency?: string
  discount?: string
  location: string
  cpu?: string
  ram?: string
  storage?: string
  bandwidth?: string
  specs?: {
    cpu?: string
    ram?: string
    storage?: string
    bandwidth?: string
  }
  tags: string[]
  features?: string[]
  link?: string
  couponCode?: string
  affiliateLink?: string
  logo?: string
  featured?: boolean
  expiryDate?: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export default function DealDetailPage() {
  const params = useParams()
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  useEffect(() => {
    const loadDeal = async () => {
      try {
        const response = await fetch('/data/deals.json')
        const deals = await response.json()
        const foundDeal = deals.find((d: Deal) => d.id === params.id)
        
        if (foundDeal) {
          setDeal(foundDeal)
        }
        setLoading(false)
      } catch (error) {
        console.error('加载优惠详情失败:', error)
        setLoading(false)
      }
    }

    if (params.id) {
      loadDeal()
    }
  }, [params.id])

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 2000)
    } catch (error) {
      console.error('复制链接失败:', error)
    }
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    // 这里可以添加保存到本地存储或发送到服务器的逻辑
  }

  const calculateDaysLeft = (expiryDate?: string) => {
    if (!expiryDate) return 0
    const expiry = new Date(expiryDate)
    const now = new Date()
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-white mb-4">优惠不存在</h1>
            <p className="text-gray-400 mb-6">抱歉，您查找的优惠信息不存在或已被删除。</p>
            <a href="/" className="glow-button">
              返回首页
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const daysLeft = calculateDaysLeft(deal.expiryDate)

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-primary-400 transition-colors">首页</a>
          <span>/</span>
          <a href="/deals" className="hover:text-primary-400 transition-colors">优惠</a>
          <span>/</span>
          <span className="text-white">{deal.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 优惠标题和基本信息 */}
            <div className="cyber-card p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-4">{deal.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {deal.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {daysLeft > 0 ? `${daysLeft}天后到期` : '已过期'}
                    </div>
                    {deal.featured && (
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1" />
                        热门推荐
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className={`p-2 rounded-lg transition-colors ${
                      isFavorited 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-gray-700/50 text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-gray-700/50 text-gray-400 hover:text-primary-400 rounded-lg transition-colors relative"
                  >
                    <Share2 className="w-5 h-5" />
                    {showCopySuccess && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        已复制
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* 价格信息 */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl font-bold text-gradient">{deal.price}</div>
                <div className="text-xl text-gray-400 line-through">{deal.originalPrice}</div>
                <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                  省 {deal.discount}
                </div>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {deal.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-500/20 text-primary-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 到期提醒 */}
              {daysLeft <= 7 && daysLeft > 0 && (
                <div className="flex items-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
                  <div className="text-yellow-300">
                    <strong>即将到期：</strong>此优惠将在 {daysLeft} 天后结束，请尽快行动！
                  </div>
                </div>
              )}

              {/* 购买按钮 */}
              <a
                href={deal.link || deal.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button w-full flex items-center justify-center space-x-2 py-4 text-lg"
              >
                <ExternalLink className="w-5 h-5" />
                <span>立即购买</span>
              </a>
            </div>

              {/* 配置详情 */}
            <div className="cyber-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">配置详情</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Cpu className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="text-sm text-gray-400 mb-1">处理器</div>
                  <div className="text-white font-medium">{deal.cpu || (deal.specs && deal.specs.cpu)}</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <HardDrive className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="text-sm text-gray-400 mb-1">内存</div>
                  <div className="text-white font-medium">{deal.ram || (deal.specs && deal.specs.ram)}</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <HardDrive className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="text-sm text-gray-400 mb-1">存储</div>
                  <div className="text-white font-medium">{deal.storage || (deal.specs && deal.specs.storage)}</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Wifi className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="text-sm text-gray-400 mb-1">带宽</div>
                  <div className="text-white font-medium">{deal.bandwidth || (deal.specs && deal.specs.bandwidth)}</div>
                </div>
              </div>
            </div>

            {/* 详细描述 */}
            <div className="cyber-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">详细介绍</h2>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 className="text-2xl font-bold text-white mb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-bold text-white mb-3 mt-6">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-bold text-white mb-2 mt-4">{children}</h3>,
                    p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-1">{children}</ol>,
                    li: ({children}) => <li className="text-gray-300">{children}</li>,
                    strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                    code: ({children}) => <code className="bg-gray-800 text-primary-300 px-2 py-1 rounded text-sm">{children}</code>,
                    pre: ({children}) => <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-400 mb-4">{children}</blockquote>,
                    table: ({children}) => <table className="w-full border-collapse border border-gray-600 mb-4">{children}</table>,
                    th: ({children}) => <th className="border border-gray-600 px-4 py-2 bg-gray-800 text-white font-semibold">{children}</th>,
                    td: ({children}) => <td className="border border-gray-600 px-4 py-2 text-gray-300">{children}</td>,
                  }}
                >
                  {deal.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 提供商信息 */}
            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">服务商信息</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">提供商</div>
                  <div className="text-white font-medium">
                    {typeof deal.provider === 'string' ? deal.provider : deal.provider.name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">机房位置</div>
                  <div className="text-white font-medium">{deal.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">优惠到期</div>
                  <div className="text-white font-medium">
                    {deal.expiryDate ? new Date(deal.expiryDate).toLocaleDateString('zh-CN') : '无限期'}
                  </div>
                </div>
              </div>
              
              <a
                href={deal.link || deal.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>访问官网</span>
              </a>
            </div>

            {/* 安全提醒 */}
            <div className="cyber-card p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-green-400 mr-2" />
                <h3 className="text-lg font-bold text-white">安全提醒</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">所有链接均为官方正版</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">优惠信息实时验证</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">支持官方退款政策</span>
                </div>
              </div>
            </div>

            {/* 相关优惠 */}
            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">相关优惠</h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-colors">
                  <div className="text-white font-medium text-sm mb-1">Vultr 新用户优惠</div>
                  <div className="text-primary-400 text-sm">$2.50/月</div>
                </a>
                <a href="#" className="block p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-colors">
                  <div className="text-white font-medium text-sm mb-1">DigitalOcean 开发者</div>
                  <div className="text-primary-400 text-sm">$4.00/月</div>
                </a>
                <a href="#" className="block p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-colors">
                  <div className="text-white font-medium text-sm mb-1">Linode 企业级</div>
                  <div className="text-primary-400 text-sm">$5.00/月</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}