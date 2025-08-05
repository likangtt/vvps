'use client'

import { useState } from 'react'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'
import { Mail, MessageCircle, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟提交过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // 重置表单
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <SimpleHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            联系我们
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            有任何问题或建议？我们很乐意听到您的声音。请通过以下方式与我们联系
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 联系方式 */}
          <div className="space-y-6">
            <div className="cyber-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">邮箱联系</h3>
                  <p className="text-gray-400">contact@vpsdeals.com</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                我们通常在24小时内回复邮件
              </p>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">在线客服</h3>
                  <p className="text-gray-400">微信: VPSDeals2024</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                工作时间: 周一至周五 9:00-18:00
              </p>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">电话咨询</h3>
                  <p className="text-gray-400">+86 400-123-4567</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                紧急问题可直接电话联系
              </p>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">办公地址</h3>
                  <p className="text-gray-400">北京市朝阳区</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                欢迎预约到访交流
              </p>
            </div>
          </div>

          {/* 联系表单 */}
          <div className="lg:col-span-2">
            <div className="cyber-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">发送消息</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">消息发送成功！</h3>
                  <p className="text-gray-400 mb-6">
                    感谢您的留言，我们会尽快回复您。
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="glow-button"
                  >
                    发送新消息
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        邮箱 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="请输入您的邮箱"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      主题 *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-primary-500 focus:outline-none transition-colors"
                    >
                      <option value="">请选择主题</option>
                      <option value="general">一般咨询</option>
                      <option value="technical">技术支持</option>
                      <option value="partnership">商务合作</option>
                      <option value="feedback">意见反馈</option>
                      <option value="other">其他</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      消息内容 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                      placeholder="请详细描述您的问题或建议..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="glow-button w-full flex items-center justify-center space-x-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>发送中...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>发送消息</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            常见问题
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-3">如何确保优惠信息的真实性？</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                我们的团队会定期验证所有优惠信息，确保链接有效且价格准确。所有推荐的VPS提供商都是经过严格筛选的知名品牌。
              </p>
            </div>

            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-3">是否收取任何费用？</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                我们的服务完全免费。我们通过与VPS提供商的合作伙伴关系获得收入，但这不会影响我们推荐的客观性。
              </p>
            </div>

            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-3">如何选择适合的VPS？</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                建议根据您的具体需求选择，包括预算、地理位置、性能要求等。我们的筛选工具可以帮助您快速找到合适的选项。
              </p>
            </div>

            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-3">优惠过期了怎么办？</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                如果您发现优惠已过期，请及时联系我们。我们会立即更新信息，并为您推荐其他类似的优惠方案。
              </p>
            </div>

            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-3">可以申请添加新的VPS提供商吗？</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                当然可以！如果您知道优质的VPS提供商，欢迎通过联系表单向我们推荐。我们会评估后考虑添加。
              </p>
            </div>

            <div className="cyber-card p-6">
              <h3 className="text-lg font-bold text-white mb-3">如何获得最新优惠通知？</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                您可以关注我们的微信公众号或加入我们的QQ群，我们会第一时间推送最新的优惠信息和行业动态。
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}