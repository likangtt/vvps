'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, ExternalLink, Globe, Server, Shield, Award, Clock } from 'lucide-react'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import DealCard from '@/components/DealCard'

// 导入JSON数据
import providersData from '@/data/providers.json'
import dealsData from '@/data/deals.json'

export default function ProviderPage({ params }: { params: { id: string } }) {
  const [provider, setProvider] = useState<any>(null)
  const [relatedDeals, setRelatedDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 在客户端加载数据
    const providerData = (providersData as any[]).find(p => p.id === params.id)
    
    if (!providerData) {
      notFound()
    }
    
    setProvider(providerData)
    
    // 获取相关优惠
    const deals = (dealsData as any[]).filter(
      deal => typeof deal.provider === 'object' 
        ? deal.provider.id === params.id 
        : deal.provider === params.id
    )
    
    setRelatedDeals(deals)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!provider) {
    return notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SimpleHeader />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-purple-900/20"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
                  VPS服务商详情
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gradient">{provider.name}</span>
                  <br />
                  <span className="text-white">云服务器提供商</span>
                </h1>
                
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  {provider.description || `${provider.name}是一家知名的云服务器提供商，提供高性能、可靠的VPS服务，满足各种应用场景需求。`}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {provider.tags && provider.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-dark-700/50 text-gray-300 px-3 py-1.5 rounded text-sm border border-dark-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a 
                    href={provider.website || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glow-button flex items-center space-x-2 text-lg px-8 py-4"
                  >
                    <span>访问官网</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  
                  <Link href={`/landing/${provider.id}`} className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all duration-300 text-lg">
                    查看优惠码
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="cyber-card p-8 w-full max-w-md">
                  {provider.logo ? (
                    <div className="w-full h-32 relative mb-6">
                      <Image 
                        src={provider.logo} 
                        alt={`${provider.name} Logo`} 
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-dark-700 rounded-lg mb-6 flex items-center justify-center">
                      <Server className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm text-gray-400">官方网站</p>
                        <p className="text-gray-300">{provider.website || '未提供'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Server className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm text-gray-400">数据中心</p>
                        <p className="text-gray-300">{provider.locations?.join(', ') || '全球多个数据中心'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm text-gray-400">安全认证</p>
                        <p className="text-gray-300">{provider.certifications?.join(', ') || 'ISO 27001, GDPR合规'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm text-gray-400">成立时间</p>
                        <p className="text-gray-300">{provider.foundedYear || '未提供'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                {provider.name}的优势
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                了解为什么{provider.name}是您云服务器需求的理想选择
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(provider.features || [
                {
                  title: "高性能基础设施",
                  description: "采用最新的硬件技术和网络架构，提供卓越的性能和稳定性",
                  icon: "server"
                },
                {
                  title: "全球数据中心",
                  description: "战略性布局的全球数据中心网络，确保低延迟和高可用性",
                  icon: "globe"
                },
                {
                  title: "安全保障",
                  description: "提供DDoS防护、防火墙和其他安全措施，保护您的数据和应用",
                  icon: "shield"
                }
              ]).map((feature: any, index: number) => (
                <div key={index} className="cyber-card p-6">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon === "server" && <Server className="w-6 h-6 text-primary-500" />}
                    {feature.icon === "globe" && <Globe className="w-6 h-6 text-primary-500" />}
                    {feature.icon === "shield" && <Shield className="w-6 h-6 text-primary-500" />}
                    {feature.icon === "award" && <Award className="w-6 h-6 text-primary-500" />}
                    {!feature.icon && <Check className="w-6 h-6 text-primary-500" />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* SEO Content Section */}
        <section className="py-16 px-4 bg-dark-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                关于{provider.name}
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                深入了解{provider.name}的服务和技术优势
              </p>
            </div>
            
            <div className="cyber-card p-8">
              <div className="prose prose-invert max-w-none">
                <p>
                  {provider.name}是一家领先的云服务提供商，专注于提供高性能、可靠的虚拟专用服务器(VPS)解决方案。
                  无论您是个人开发者、中小企业还是大型组织，{provider.name}都能为您提供满足需求的云计算资源。
                </p>
                
                <h3>技术基础设施</h3>
                <p>
                  {provider.name}采用最先进的硬件设备和网络架构，包括高性能的Intel/AMD处理器、NVMe SSD存储和
                  高带宽网络连接。这确保了您的应用程序能够获得卓越的性能和稳定性。
                </p>
                
                <h3>全球覆盖</h3>
                <p>
                  通过战略性布局的全球数据中心网络，{provider.name}能够为全球用户提供低延迟的服务。
                  无论您的目标用户在哪里，都能找到最接近他们的数据中心，优化访问速度和用户体验。
                </p>
                
                <h3>安全与合规</h3>
                <p>
                  {provider.name}高度重视安全性，提供多层次的安全保障，包括DDoS防护、网络防火墙、
                  数据加密和定期安全审计。同时，{provider.name}遵循严格的行业标准和合规要求，
                  确保您的数据和应用程序得到全面保护。
                </p>
                
                <h3>灵活的方案</h3>
                <p>
                  {provider.name}提供多种配置选项，从入门级到高性能企业级解决方案，满足不同规模和需求的客户。
                  您可以根据实际需求选择适合的CPU、内存、存储和带宽配置，并且可以随时升级。
                </p>
                
                <h3>客户支持</h3>
                <p>
                  {provider.name}提供专业的技术支持服务，帮助客户解决在使用过程中遇到的问题。
                  无论是技术咨询、故障排除还是优化建议，{provider.name}的支持团队都能提供及时、专业的帮助。
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Deals Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                {provider.name}最新优惠
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                发现{provider.name}当前提供的最具性价比的VPS方案
              </p>
            </div>
            
            {relatedDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedDeals.map((deal: any) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            ) : (
              <div className="cyber-card p-8 text-center">
                <p className="text-gray-400 text-lg">
                  目前没有{provider.name}的优惠信息，请稍后再查看。
                </p>
                <Link href="/deals" className="inline-block mt-4 px-6 py-3 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-colors">
                  查看所有优惠
                </Link>
              </div>
            )}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4 bg-dark-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                常见问题
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                关于{provider.name}的常见问题解答
              </p>
            </div>
            
            <div className="space-y-6">
              {(provider.faqs || [
                {
                  question: `${provider.name}的服务器位于哪些地区？`,
                  answer: `${provider.name}在全球多个战略位置设有数据中心，包括北美、欧洲、亚洲和大洋洲等地区。您可以根据目标用户的地理位置选择最合适的数据中心。`
                },
                {
                  question: `${provider.name}提供哪些类型的VPS？`,
                  answer: `${provider.name}提供多种类型的VPS，包括标准型、高性能型、存储优化型和计算优化型等。每种类型都针对不同的应用场景进行了优化。`
                },
                {
                  question: `如何获取${provider.name}的优惠码？`,
                  answer: `您可以通过我们网站上的专属优惠页面获取${provider.name}的最新优惠码。这些优惠码通常可以为您节省10%-30%的费用。`
                },
                {
                  question: `${provider.name}是否提供退款保证？`,
                  answer: `是的，${provider.name}通常提供30天的退款保证。如果您对服务不满意，可以在购买后的30天内申请退款。`
                }
              ]).map((faq: any, index: number) => (
                <div key={index} className="cyber-card p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary-900/30 via-dark-800 to-purple-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              开始使用{provider.name}云服务器
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              立即注册并享受我们提供的专属优惠
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={provider.website || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glow-button flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>访问官网</span>
                <ExternalLink className="w-5 h-5" />
              </a>
              
              <Link href={`/landing/${provider.id}`} className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all duration-300 text-lg">
                查看优惠码
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
