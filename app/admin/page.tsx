'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, TrendingUp, Users, Server, Clock } from 'lucide-react'
import DealForm from '@/components/admin/DealForm'

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
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
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

export default function AdminDashboard() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDeals()
  }, [])

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
          link: deal.affiliateLink || '',  // 将affiliateLink映射到link
          features: deal.features || []
        }
      }) : []
      
      setDeals(dealsData)
    } catch (error) {
      console.error('加载优惠信息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDeal = () => {
    setEditingDeal(null)
    setShowForm(true)
  }

  const handleEditDeal = (deal: Deal) => {
    setEditingDeal(deal)
    setShowForm(true)
  }

  const handleDeleteDeal = (dealId: string) => {
    if (confirm('确定要删除这个优惠信息吗？')) {
      setDeals(deals.filter(deal => deal.id !== dealId))
    }
  }

  const handleSaveDeal = (dealData: any) => {
    if (editingDeal) {
      // 编辑现有优惠
      setDeals(deals.map(deal => 
        deal.id === editingDeal.id 
          ? { ...deal, ...dealData, updatedAt: new Date().toISOString() }
          : deal
      ))
    } else {
      // 添加新优惠
      const newDeal = {
        ...dealData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setDeals([newDeal, ...deals])
    }
    setShowForm(false)
    setEditingDeal(null)
  }

  const stats = {
    totalDeals: deals.length,
    featuredDeals: deals.filter(deal => deal.featured).length,
    expiringSoon: deals.filter(deal => {
      const expiryDate = new Date(deal.expiryDate)
      const today = new Date()
      const diffTime = expiryDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 7 && diffDays > 0
    }).length,
    recentDeals: deals.filter(deal => {
      const createdDate = new Date(deal.createdAt)
      const today = new Date()
      const diffTime = today.getTime() - createdDate.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 7
    }).length
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">管理面板</h1>
          <p className="text-gray-400">管理VPS优惠信息</p>
        </div>
        <button
          onClick={handleAddDeal}
          className="glow-button flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>添加优惠</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">总优惠数</p>
              <p className="text-2xl font-bold text-white">{stats.totalDeals}</p>
            </div>
            <Server className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">热门推荐</p>
              <p className="text-2xl font-bold text-white">{stats.featuredDeals}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">即将到期</p>
              <p className="text-2xl font-bold text-white">{stats.expiringSoon}</p>
            </div>
            <Clock className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">最近添加</p>
              <p className="text-2xl font-bold text-white">{stats.recentDeals}</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="cyber-card">
        <div className="p-6 border-b border-dark-700">
          <h2 className="text-lg font-semibold text-white">优惠信息列表</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  标题
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  服务商
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  价格
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  到期时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-dark-800/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-white">{deal.title}</div>
                        <div className="text-sm text-gray-400">{deal.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {typeof deal.provider === 'object' ? deal.provider.name : deal.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary-400 font-medium">
                      {deal.currency || '$'}{deal.price}
                    </div>
                    {deal.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {deal.currency || '$'}{deal.originalPrice}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {deal.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                          热门
                        </span>
                      )}
                      {deal.discount && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          -{deal.discount}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {deal.expiryDate ? new Date(deal.expiryDate).toLocaleDateString('zh-CN') : '无限期'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditDeal(deal)}
                        className="text-primary-400 hover:text-primary-300 p-1 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDeal(deal.id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deal Form Modal */}
      {showForm && (
        <DealForm
          providers={[]}
          initialData={editingDeal || {}}
          onSubmit={handleSaveDeal}
          onCancel={() => {
            setShowForm(false)
            setEditingDeal(null)
          }}
        />
      )}
    </div>
  )
}