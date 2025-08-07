'use client'

import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'

export default function VultrLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SimpleHeader />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-purple-900/20"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
                  限时优惠 - 2023最新
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gradient">Vultr优惠码</span>
                  <br />
                  <span className="text-white">高达$100美元赠金</span>
                </h1>
                
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  使用我们的专属优惠码，在Vultr云服务器上获得高达$100美元的账户赠金，适用于所有新用户和现有用户。
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a 
                    href="https://www.vultr.com/?ref=YOUR_AFFILIATE_ID" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glow-button flex items-center space-x-2 text-lg px-8 py-4"
                  >
                    <span>立即领取</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  
                  <Link href="/deals" className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all duration-300 text-lg">
                    查看更多优惠
                  </Link>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>新用户可用</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>无需信用卡</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>全球17个数据中心</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="cyber-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative">
                        <Image 
                          src="https://www.vultr.com/media/logo_onwhite.svg" 
                          alt="Vultr Logo" 
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Vultr优惠码</h3>
                        <p className="text-gray-400">云服务器专属折扣</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">优惠码</span>
                      <span className="text-xs text-gray-500">点击复制</span>
                    </div>
                    <div className="bg-dark-800 p-3 rounded border border-dark-600 text-center cursor-pointer hover:border-primary-500 transition-colors">
                      <code className="text-primary-400 text-xl font-mono">VULTRSAVE100</code>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                        <span className="text-primary-500 text-xs">1</span>
                      </div>
                      <p className="text-gray-300">注册或登录您的Vultr账户</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                        <span className="text-primary-500 text-xs">2</span>
                      </div>
                      <p className="text-gray-300">进入Billing页面，找到"Redeem Credit"选项</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                        <span className="text-primary-500 text-xs">3</span>
                      </div>
                      <p className="text-gray-300">输入优惠码VULTRSAVE100并点击兑换</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                        <span className="text-primary-500 text-xs">4</span>
                      </div>
                      <p className="text-gray-300">您的账户将立即获得$100美元赠金</p>
                    </div>
                  </div>
                  
                  <a 
                    href="https://www.vultr.com/?ref=YOUR_AFFILIATE_ID" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glow-button w-full flex items-center justify-center gap-2"
                  >
                    <span>立即领取优惠</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
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
                为什么选择Vultr云服务器
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Vultr提供高性能、全球部署的云计算服务，满足各种应用场景需求
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="cyber-card p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">全球17个数据中心</h3>
                <p className="text-gray-400">
                  从东京到迈阿密，从新加坡到伦敦，Vultr在全球17个战略位置设有数据中心，确保您的应用程序靠近用户。
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">高性能NVMe存储</h3>
                <p className="text-gray-400">
                  所有Vultr高性能实例均配备NVMe SSD存储，提供卓越的I/O性能，适合数据库和高负载应用。
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">DDoS保护</h3>
                <p className="text-gray-400">
                  Vultr提供免费的DDoS保护，帮助您的服务器抵御分布式拒绝服务攻击，确保业务连续性。
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 px-4 bg-dark-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                Vultr云服务器套餐
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                从入门级到高性能配置，Vultr提供多种套餐满足不同需求
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="cyber-card p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">入门型</h3>
                  <p className="text-gray-400">适合个人网站和轻量应用</p>
                </div>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-primary-400">$5</span>
                  <span className="text-gray-400">/月</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">1 vCPU</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">1GB 内存</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">25GB SSD存储</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">1TB 流量</span>
                  </li>
                </ul>
                
                <a 
                  href="https://www.vultr.com/?ref=YOUR_AFFILIATE_ID" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition-colors text-center"
                >
                  选择套餐
                </a>
              </div>
              
              <div className="cyber-card p-6 border-2 border-primary-500/50 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  最受欢迎
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">标准型</h3>
                  <p className="text-gray-400">适合中小型网站和应用</p>
                </div>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-primary-400">$10</span>
                  <span className="text-gray-400">/月</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">2 vCPU</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">2GB 内存</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">55GB SSD存储</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">2TB 流量</span>
                  </li>
                </ul>
                
                <a 
                  href="https://www.vultr.com/?ref=YOUR_AFFILIATE_ID" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glow-button w-full flex items-center justify-center"
                >
                  选择套餐
                </a>
              </div>
              
              <div className="cyber-card p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">高性能型</h3>
                  <p className="text-gray-400">适合企业应用和高流量网站</p>
                </div>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-primary-400">$24</span>
                  <span className="text-gray-400">/月</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">4 vCPU</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">8GB 内存</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">160GB NVMe SSD</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">4TB 流量</span>
                  </li>
                </ul>
                
                <a 
                  href="https://www.vultr.com/?ref=YOUR_AFFILIATE_ID" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition-colors text-center"
                >
                  选择套餐
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                常见问题
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                关于Vultr优惠码的常见问题解答
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-3">优惠码有效期是多久？</h3>
                <p className="text-gray-400">
                  Vultr优惠码VULTRSAVE100通常有效期为30天，但具体时间可能会根据Vultr的促销活动而变化。我们建议您尽快使用以确保不会错过此优惠。
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-3">新用户和老用户都可以使用吗？</h3>
                <p className="text-gray-400">
                  是的，Vultr的大多数优惠码对新用户和现有用户都有效。但某些特定的促销活动可能仅限新用户使用，请在使用前查看具体的优惠条款。
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-3">优惠金额如何使用？</h3>
                <p className="text-gray-400">
                  兑换优惠码后，赠金将直接添加到您的Vultr账户余额中。系统会优先使用这些赠金支付您的服务费用，直到赠金用完为止。
                </p>
              </div>
              
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-3">我可以与其他优惠叠加使用吗？</h3>
                <p className="text-gray-400">
                  通常情况下，Vultr不允许多个优惠码叠加使用。如果您已经使用了一个优惠码，可能需要等到该优惠结束后才能使用新的优惠码。
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary-900/30 via-dark-800 to-purple-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              立即使用Vultr优惠码，享受高达$100美元赠金
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              不要错过这个限时优惠，立即注册Vultr并兑换您的专属优惠码
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.vultr.com/?ref=YOUR_AFFILIATE_ID" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glow-button flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>立即领取优惠</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <Link href="/deals" className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all duration-300 text-lg">
                查看更多VPS优惠
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}