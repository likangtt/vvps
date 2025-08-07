'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Info, AlertTriangle, HelpCircle } from 'lucide-react'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'
import { generateFAQSchema } from '@/lib/schema'

// FAQ数据
const faqs = [
  {
    question: "VPS和共享主机有什么区别？",
    answer: "VPS提供专用资源和更高的自由度，而共享主机则与其他用户共享资源。VPS让您可以完全控制服务器环境，安装任何兼容的软件，并且性能更加稳定，不受其他用户的影响。"
  },
  {
    question: "我需要多大的VPS配置？",
    answer: "这取决于您的具体需求。对于小型个人网站，1核2GB内存通常足够；对于中型网站或应用，建议2-4核4-8GB内存；对于大型网站或高流量应用，可能需要4核以上和8GB以上内存。存储需求则取决于您的数据量。"
  },
  {
    question: "如何判断VPS提供商的网络质量？",
    answer: "可以通过以下方法评估：查看提供商的SLA(服务级别协议)、阅读用户评价、测试从目标用户位置到数据中心的网络延迟、检查是否提供DDoS保护、了解网络带宽和流量限制。"
  },
  {
    question: "托管VPS和非托管VPS有什么区别？",
    answer: "托管VPS包括服务器维护、安全更新和技术支持，适合技术经验有限的用户；非托管VPS只提供基础设施，所有管理和维护工作由您自己负责，价格更低但需要一定的技术知识。"
  },
  {
    question: "VPS的备份策略应该如何规划？",
    answer: "理想的备份策略包括：定期自动备份(至少每日一次)、存储多个备份版本(至少保留7天)、将备份存储在不同的物理位置、定期测试备份恢复流程、考虑使用提供商的备份服务和自己实施的备份方案相结合。"
  }
]

export default function VPSBuyingGuidePage() {
  // 生成结构化数据
  const faqSchema = generateFAQSchema(faqs)
  
  return (
    <div className="min-h-screen flex flex-col">
      <SimpleHeader />
      
      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-purple-900/20"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
                  完整指南
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gradient">VPS选购指南</span>
                  <br />
                  <span className="text-white">如何选择最适合您的云服务器</span>
                </h1>
                
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  从性能配置到价格对比，从地理位置到技术支持，这份全面的VPS选购指南将帮助您做出明智的决策。
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-dark-700/50 text-gray-300 px-3 py-1.5 rounded text-sm border border-dark-600">
                    性价比分析
                  </span>
                  <span className="bg-dark-700/50 text-gray-300 px-3 py-1.5 rounded text-sm border border-dark-600">
                    配置选择
                  </span>
                  <span className="bg-dark-700/50 text-gray-300 px-3 py-1.5 rounded text-sm border border-dark-600">
                    提供商对比
                  </span>
                  <span className="bg-dark-700/50 text-gray-300 px-3 py-1.5 rounded text-sm border border-dark-600">
                    技术指导
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#comparison-table" 
                    className="glow-button flex items-center space-x-2 text-lg px-8 py-4"
                  >
                    <span>查看对比表</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  
                  <Link href="/deals" className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all duration-300 text-lg">
                    浏览VPS优惠
                  </Link>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="cyber-card p-6">
                  <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31" 
                      alt="VPS服务器" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-white mb-3">VPS选购核心要点</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-300">明确您的具体需求和预算</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-300">关注性能指标而非营销宣传</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-300">考虑数据中心位置与目标用户的距离</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-300">评估可扩展性和升级选项</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-300">检查客户支持质量和响应时间</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Understanding VPS Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                了解VPS服务器
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                在选择VPS之前，了解它的基本概念和工作原理至关重要
              </p>
            </div>
            
            <div className="cyber-card p-8">
              <div className="prose prose-invert max-w-none prose-headings:text-primary-400">
                <h3>什么是VPS？</h3>
                <p>
                  VPS（Virtual Private Server，虚拟专用服务器）是一种虚拟化技术，它将一台物理服务器划分为多个虚拟服务器。每个VPS都运行自己的操作系统副本，拥有专用的CPU、内存和存储资源，就像一台独立的物理服务器一样。
                </p>
                
                <h3>VPS与其他托管方案的区别</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>特性</th>
                        <th>共享主机</th>
                        <th>VPS</th>
                        <th>独立服务器</th>
                        <th>云服务器</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>资源分配</td>
                        <td>共享资源</td>
                        <td>专用资源</td>
                        <td>完全专用</td>
                        <td>可扩展资源</td>
                      </tr>
                      <tr>
                        <td>性能</td>
                        <td>受限</td>
                        <td>良好</td>
                        <td>最佳</td>
                        <td>可变</td>
                      </tr>
                      <tr>
                        <td>控制权限</td>
                        <td>有限</td>
                        <td>高</td>
                        <td>完全</td>
                        <td>高</td>
                      </tr>
                      <tr>
                        <td>价格</td>
                        <td>$</td>
                        <td>$$</td>
                        <td>$$$</td>
                        <td>$$-$$$</td>
                      </tr>
                      <tr>
                        <td>适用场景</td>
                        <td>小型网站</td>
                        <td>中小型网站/应用</td>
                        <td>大型网站/应用</td>
                        <td>需要弹性扩展的应用</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3>VPS的优势</h3>
                <ul>
                  <li><strong>成本效益</strong>：比独立服务器更经济，但提供类似的控制和性能</li>
                  <li><strong>资源隔离</strong>：不受同一服务器上其他用户的影响</li>
                  <li><strong>可定制性</strong>：可以安装任何兼容的操作系统和软件</li>
                  <li><strong>可扩展性</strong>：随着业务增长可以轻松升级资源</li>
                  <li><strong>root访问权限</strong>：完全控制服务器环境</li>
                </ul>
                
                <h3>VPS的局限性</h3>
                <ul>
                  <li><strong>技术要求</strong>：需要一定的服务器管理知识</li>
                  <li><strong>资源上限</strong>：受限于物理服务器的总资源</li>
                  <li><strong>潜在的邻居噪音</strong>：在某些提供商那里，可能会受到同一物理服务器上其他VPS的影响</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Considerations Section */}
        <section className="py-16 px-4 bg-dark-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                VPS选购关键考量因素
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                选择VPS时需要考虑的核心因素，帮助您做出明智的决策
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="cyber-card p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">性能配置</h3>
                <p className="text-gray-400 mb-4">
                  VPS的性能直接影响您的网站或应用的响应速度和用户体验。
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">CPU</p>
                      <p className="text-gray-400 text-sm">核心数量和频率决定处理能力，建议至少2核心</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">内存(RAM)</p>
                      <p className="text-gray-400 text-sm">影响多任务处理能力，网站建议至少2GB，应用程序建议4GB以上</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">存储</p>
                      <p className="text-gray-400 text-sm">优先选择SSD或NVMe存储，容量根据数据量决定</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">带宽</p>
                      <p className="text-gray-400 text-sm">影响数据传输速度，建议至少100Mbps，流量至少1TB/月</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="cyber-card p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">地理位置</h3>
                <p className="text-gray-400 mb-4">
                  服务器的物理位置对网站访问速度和SEO有显著影响。
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">靠近目标用户</p>
                      <p className="text-gray-400 text-sm">服务器应尽可能靠近您的主要用户群体</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">网络质量</p>
                      <p className="text-gray-400 text-sm">不同地区的网络质量和连接稳定性可能有很大差异</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">法律法规</p>
                      <p className="text-gray-400 text-sm">考虑数据存储和隐私法规对服务器位置的要求</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">CDN整合</p>
                      <p className="text-gray-400 text-sm">考虑是否需要使用CDN来补充单一位置的局限性</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="cyber-card p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">价格与价值</h3>
                <p className="text-gray-400 mb-4">
                  在预算范围内获得最佳性价比是选择VPS的关键。
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">计费模式</p>
                      <p className="text-gray-400 text-sm">按小时、月付或年付，长期付款通常有折扣</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">隐藏费用</p>
                      <p className="text-gray-400 text-sm">注意备份、额外带宽、IP地址等可能产生的额外费用</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">退款政策</p>
                      <p className="text-gray-400 text-sm">了解提供商的退款和取消政策</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">性价比评估</p>
                      <p className="text-gray-400 text-sm">不要只看价格，要结合性能、可靠性和支持质量综合评估</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="cyber-card p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">技术支持</h3>
                <p className="text-gray-400 mb-4">
                  当问题出现时，快速有效的技术支持至关重要。
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">支持渠道</p>
                      <p className="text-gray-400 text-sm">检查是否提供24/7全天候支持，以及支持渠道(电话、聊天、邮件)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">响应时间</p>
                      <p className="text-gray-400 text-sm">了解平均响应时间和解决问题的时间</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">技术文档</p>
                      <p className="text-gray-400 text-sm">评估提供商的知识库、教程和文档质量</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-1">
                      <span className="text-primary-500 text-xs">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">社区支持</p>
                      <p className="text-gray-400 text-sm">检查是否有活跃的用户社区和论坛</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Comparison Table Section */}
        <section id="comparison-table" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                主流VPS提供商对比
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                我们对比了市场上主要的VPS提供商，帮助您快速找到最适合的选择
              </p>
            </div>
            
            <div className="cyber-card p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-700">
                    <tr>
                      <th className="p-4 text-left">提供商</th>
                      <th className="p-4 text-left">入门价格</th>
                      <th className="p-4 text-left">性能</th>
                      <th className="p-4 text-left">可靠性</th>
                      <th className="p-4 text-left">支持质量</th>
                      <th className="p-4 text-left">适用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-dark-700">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">Vultr</span>
                        </div>
                      </td>
                      <td className="p-4">$5/月</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">全能型，适合大多数用途</td>
                    </tr>
                    
                    <tr className="border-t border-dark-700">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">DigitalOcean</span>
                        </div>
                      </td>
                      <td className="p-4">$5/月</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">开发者友好，适合应用部署</td>
                    </tr>
                    
                    <tr className="border-t border-dark-700">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">Linode</span>
                        </div>
                      </td>
                      <td className="p-4">$5/月</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">稳定可靠，适合长期项目</td>
                    </tr>
                    
                    <tr className="border-t border-dark-700">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">Hetzner</span>
                        </div>
                      </td>
                      <td className="p-4">€3/月</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★</span><span className="text-gray-600">★★</span>
                        </div>
                      </td>
                      <td className="p-4">超高性价比，适合欧洲用户</td>
                    </tr>
                    
                    <tr className="border-t border-dark-700">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">Contabo</span>
                        </div>
                      </td>
                      <td className="p-4">€5/月</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★</span><span className="text-gray-600">★★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★</span><span className="text-gray-600">★★</span>
                        </div>
                      </td>
                      <td className="p-4">大内存配置，适合资源密集型应用</td>
                    </tr>
                    
                    <tr className="border-t border-dark-700">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">AWS Lightsail</span>
                        </div>
                      </td>
                      <td className="p-4">$5/月</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★★</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★</span><span className="text-gray-600">★</span>
                        </div>
                      </td>
                      <td className="p-4">AWS生态系统，适合企业应用</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-dark-700 border-t border-dark-600">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Info className="w-4 h-4" />
                  <span>评分基于用户反馈和我们的测试，可能会随时间变化</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 cyber-card p-6 bg-yellow-500/10 border-yellow-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">选择提示</h3>
                  <p className="text-gray-300">
                    不要仅仅根据价格做决定。考虑您的具体需求、技术要求和长期成本。最便宜的选项并不总是最具成本效益的，尤其是当您考虑到可靠性、性能和支持质量时。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-16 px-4 bg-dark-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                不同场景的VPS选择建议
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                根据您的具体需求，我们提供针对性的VPS选择建议
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">个人网站/博客</h3>
                <p className="text-gray-400 mb-4">
                  适合个人网站、博客或小型项目的VPS配置和提供商推荐。
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">推荐配置</span>
                    <span className="text-primary-400">1-2核 / 2GB内存 / 25GB SSD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">月预算</span>
                    <span className="text-primary-400">$5-10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">推荐提供商</span>
                    <span className="text-primary-400">Vultr, DigitalOcean, Hetzner</span>
                  </div>
                </div>
                
                <div className="bg-dark-700 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-primary-500 mt-0.5" />
                    <p className="text-gray-300 text-sm">
                      对于个人网站，优先考虑易用性和成本效益。如果您是初学者，选择提供用户友好控制面板的提供商。
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">电子商务网站</h3>
                <p className="text-gray-400 mb-4">
                  适合在线商店和电子商务平台的VPS配置和提供商推荐。
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">推荐配置</span>
                    <span className="text-primary-400">2-4核 / 4-8GB内存 / 80GB SSD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">月预算</span>
                    <span className="text-primary-400">$20-40</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">推荐提供商</span>
                    <span className="text-primary-400">Linode, DigitalOcean, AWS Lightsail</span>
                  </div>
                </div>
                
                <div className="bg-dark-700 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-primary-500 mt-0.5" />
                    <p className="text-gray-300 text-sm">
                      电子商务网站需要更高的可靠性和安全性。考虑提供商的正常运行时间保证、备份选项和安全功能。
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">应用程序/API服务</h3>
                <p className="text-gray-400 mb-4">
                  适合运行应用程序、API服务或后端系统的VPS配置和提供商推荐。
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">推荐配置</span>
                    <span className="text-primary-400">4核+ / 8GB+内存 / 100GB+ SSD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">月预算</span>
                    <span className="text-primary-400">$40-80</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">推荐提供商</span>
                    <span className="text-primary-400">AWS Lightsail, Linode, Vultr</span>
                  </div>
                </div>
                
                <div className="bg-dark-700 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-primary-500 mt-0.5" />
                    <p className="text-gray-300 text-sm">
                      应用程序服务器需要稳定的性能和可扩展性。考虑提供商的API支持、自动扩展选项和开发者工具。
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">游戏服务器</h3>
                <p className="text-gray-400 mb-4">
                  适合运行游戏服务器的VPS配置和提供商推荐。
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">推荐配置</span>
                    <span className="text-primary-400">4-8核 / 8-16GB内存 / 100GB+ SSD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">月预算</span>
                    <span className="text-primary-400">$40-100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">推荐提供商</span>
                    <span className="text-primary-400">Vultr, OVH, Linode</span>
                  </div>
                </div>
                
                <div className="bg-dark-700 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-primary-500 mt-0.5" />
                    <p className="text-gray-300 text-sm">
                      游戏服务器需要低延迟和高带宽。选择靠近玩家的数据中心，并确保提供商允许游戏服务器流量。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                常见问题解答
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                关于VPS选购的常见问题和解答
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
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
              准备选择您的VPS了吗？
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              浏览我们精选的VPS优惠，找到最适合您需求的云服务器
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/deals" 
                className="glow-button flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>查看VPS优惠</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/blog" 
                className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all duration-300 text-lg"
              >
                阅读更多指南
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
