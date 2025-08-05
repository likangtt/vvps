'use client'

import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'
import { Shield, Users, Zap, Globe, Award, Heart, Target, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: '可信赖的信息',
      description: '我们严格筛选每一个优惠信息，确保真实有效，让您放心选择。'
    },
    {
      icon: Users,
      title: '专业团队',
      description: '由资深云计算专家组成的团队，为您提供专业的VPS选择建议。'
    },
    {
      icon: Zap,
      title: '实时更新',
      description: '24/7监控各大VPS提供商的最新优惠，第一时间为您推送。'
    },
    {
      icon: Globe,
      title: '全球覆盖',
      description: '涵盖北美、欧洲、亚洲等全球主要地区的优质VPS服务商。'
    }
  ]

  const stats = [
    { number: '50+', label: 'VPS提供商' },
    { number: '200+', label: '优惠信息' },
    { number: '10万+', label: '用户信赖' },
    { number: '99%', label: '满意度' }
  ]

  const team = [
    {
      name: '张明',
      role: '创始人 & CEO',
      description: '10年云计算行业经验，曾任职于阿里云、腾讯云',
      avatar: '👨‍💼'
    },
    {
      name: '李华',
      role: '技术总监',
      description: '资深全栈工程师，专注于云服务架构设计',
      avatar: '👨‍💻'
    },
    {
      name: '王芳',
      role: '产品经理',
      description: '用户体验专家，致力于打造最佳产品体验',
      avatar: '👩‍💼'
    },
    {
      name: '刘强',
      role: '运营总监',
      description: '市场营销专家，深度了解VPS行业动态',
      avatar: '👨‍🎯'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <SimpleHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            关于我们
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            致力于为用户提供最优质的VPS优惠信息，帮助您找到最适合的云服务器解决方案
          </p>
        </div>

        {/* 使命愿景 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="cyber-card p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">我们的使命</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              让每个人都能轻松找到性价比最高的VPS服务。我们相信，优质的云服务不应该是奢侈品，
              而应该是每个开发者、企业都能负担得起的基础设施。通过汇聚全球最优质的VPS优惠信息，
              我们帮助用户节省成本，提升效率。
            </p>
          </div>

          <div className="cyber-card p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">我们的愿景</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              成为全球最受信赖的VPS优惠信息平台。我们希望通过专业的服务和可靠的信息，
              成为用户在选择云服务时的首选参考平台。让技术创新不再受限于成本，
              让每个想法都有实现的可能。
            </p>
          </div>
        </div>

        {/* 核心特色 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            为什么选择我们
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="cyber-card p-6 text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 数据统计 */}
        <div className="mb-20">
          <div className="cyber-card p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              平台数据
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 团队介绍 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            核心团队
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="cyber-card p-6 text-center">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <div className="text-primary-400 text-sm mb-3">{member.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 发展历程 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            发展历程
          </h2>
          <div className="cyber-card p-8">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-primary-400 font-semibold mb-1">2024年1月</div>
                  <div className="text-white font-medium mb-2">平台正式上线</div>
                  <div className="text-gray-400 text-sm">
                    VPS优惠网正式上线，开始为用户提供优质的VPS优惠信息服务
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-primary-400 font-semibold mb-1">2024年3月</div>
                  <div className="text-white font-medium mb-2">合作伙伴突破20家</div>
                  <div className="text-gray-400 text-sm">
                    与全球20多家知名VPS提供商建立合作关系，优惠信息更加丰富
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-primary-400 font-semibold mb-1">2024年6月</div>
                  <div className="text-white font-medium mb-2">用户数量达到5万</div>
                  <div className="text-gray-400 text-sm">
                    平台用户数量快速增长，获得用户广泛认可和好评
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-primary-400 font-semibold mb-1">2024年9月</div>
                  <div className="text-white font-medium mb-2">推出移动端应用</div>
                  <div className="text-gray-400 text-sm">
                    发布移动端应用，用户可以随时随地查看最新的VPS优惠信息
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-primary-400 font-semibold mb-1">2024年12月</div>
                  <div className="text-white font-medium mb-2">国际化服务启动</div>
                  <div className="text-gray-400 text-sm">
                    开始提供多语言服务，为全球用户提供本地化的VPS优惠信息
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 联系我们 */}
        <div className="text-center">
          <div className="cyber-card p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              感谢您的信任与支持
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              如果您有任何问题、建议或合作意向，欢迎随时与我们联系。
              我们将竭诚为您服务，共同打造更好的VPS优惠信息平台。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="glow-button">
                联系我们
              </a>
              <a href="mailto:contact@vpsdeals.com" className="border border-gray-600 hover:border-primary-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg transition-colors">
                发送邮件
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}