'use client'

import { useState, useEffect } from 'react'
import { X, Save, Eye } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Deal {
  id: string
  title: string
  provider: string
  price: string
  originalPrice: string
  discount: string
  location: string
  specs: {
    cpu: string
    ram: string
    storage: string
    bandwidth: string
  }
  tags: string[]
  affiliateLink: string
  featured: boolean
  expiryDate: string
  description: string
  createdAt: string
  updatedAt: string
}

interface DealFormProps {
  deal: Deal | null
  onSave: (deal: Partial<Deal>) => void
  onCancel: () => void
}

export default function DealForm({ deal, onSave, onCancel }: DealFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    price: '',
    originalPrice: '',
    discount: '',
    location: '',
    specs: {
      cpu: '',
      ram: '',
      storage: '',
      bandwidth: ''
    },
    tags: [] as string[],
    affiliateLink: '',
    featured: false,
    expiryDate: '',
    description: ''
  })
  const [tagInput, setTagInput] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title,
        provider: deal.provider,
        price: deal.price,
        originalPrice: deal.originalPrice,
        discount: deal.discount,
        location: deal.location,
        specs: deal.specs,
        tags: deal.tags,
        affiliateLink: deal.affiliateLink,
        featured: deal.featured,
        expiryDate: deal.expiryDate.split('T')[0], // 转换为日期格式
        description: deal.description
      })
    }
  }, [deal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      expiryDate: new Date(formData.expiryDate).toISOString()
    })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {deal ? '编辑优惠信息' : '添加优惠信息'}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{showPreview ? '编辑' : '预览'}</span>
              </button>
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-white text-2xl p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {showPreview ? (
            /* Preview Mode */
            <div className="space-y-6">
              <div className="cyber-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{formData.title}</h3>
                      {formData.featured && (
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">热门</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{formData.provider}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-primary-400">{formData.price}</span>
                    <span className="text-sm text-gray-500 line-through">{formData.originalPrice}</span>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                      -{formData.discount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{formData.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-sm text-gray-300">CPU: {formData.specs.cpu}</div>
                  <div className="text-sm text-gray-300">内存: {formData.specs.ram}</div>
                  <div className="text-sm text-gray-300">存储: {formData.specs.storage}</div>
                  <div className="text-sm text-gray-300">带宽: {formData.specs.bandwidth}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-dark-700/50 text-gray-300 px-2 py-1 rounded text-xs border border-dark-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.description}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            /* Form Mode */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 基本信息 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-dark-700 pb-2">基本信息</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">标题</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="cyber-input w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">服务商</label>
                    <input
                      type="text"
                      value={formData.provider}
                      onChange={(e) => setFormData({...formData, provider: e.target.value})}
                      className="cyber-input w-full"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">现价</label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="cyber-input w-full"
                        placeholder="$5.00/月"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">原价</label>
                      <input
                        type="text"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                        className="cyber-input w-full"
                        placeholder="$10.00/月"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">折扣</label>
                      <input
                        type="text"
                        value={formData.discount}
                        onChange={(e) => setFormData({...formData, discount: e.target.value})}
                        className="cyber-input w-full"
                        placeholder="50%"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">机房位置</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="cyber-input w-full"
                      placeholder="美国/日本/新加坡"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">推广链接</label>
                    <input
                      type="url"
                      value={formData.affiliateLink}
                      onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                      className="cyber-input w-full"
                      placeholder="https://example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">到期时间</label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="cyber-input w-full"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-300">设为热门推荐</label>
                  </div>
                </div>

                {/* 配置信息 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-dark-700 pb-2">配置信息</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">CPU</label>
                    <input
                      type="text"
                      value={formData.specs.cpu}
                      onChange={(e) => setFormData({
                        ...formData,
                        specs: {...formData.specs, cpu: e.target.value}
                      })}
                      className="cyber-input w-full"
                      placeholder="1 vCPU"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">内存</label>
                    <input
                      type="text"
                      value={formData.specs.ram}
                      onChange={(e) => setFormData({
                        ...formData,
                        specs: {...formData.specs, ram: e.target.value}
                      })}
                      className="cyber-input w-full"
                      placeholder="1GB"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">存储</label>
                    <input
                      type="text"
                      value={formData.specs.storage}
                      onChange={(e) => setFormData({
                        ...formData,
                        specs: {...formData.specs, storage: e.target.value}
                      })}
                      className="cyber-input w-full"
                      placeholder="25GB SSD"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">带宽</label>
                    <input
                      type="text"
                      value={formData.specs.bandwidth}
                      onChange={(e) => setFormData({
                        ...formData,
                        specs: {...formData.specs, bandwidth: e.target.value}
                      })}
                      className="cyber-input w-full"
                      placeholder="1TB"
                      required
                    />
                  </div>

                  {/* 标签 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">标签</label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="cyber-input flex-1"
                        placeholder="输入标签后按回车"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
                      >
                        添加
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-dark-700 text-gray-300 px-2 py-1 rounded text-sm flex items-center space-x-1"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 详细描述 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">详细描述 (支持Markdown)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="cyber-input w-full h-40 resize-none"
                  placeholder="支持Markdown格式，可以添加标题、列表、代码块等..."
                  required
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-dark-700">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="glow-button flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>保存</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}