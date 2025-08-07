'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowLeft, Share2, Bookmark, ThumbsUp, ArrowRight } from 'lucide-react'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'

// 博客文章数据
const blogPosts = [
  {
    id: 'how-to-choose-vps',
    title: '如何选择最适合您的VPS服务器？详细指南',
    excerpt: '在众多VPS提供商和配置选项中，如何选择最适合您需求的VPS服务器？本文将从性能、价格、地理位置等多个维度为您提供详细指导。',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    category: '指南',
    author: '张技术',
    authorAvatar: 'https://i.pravatar.cc/150?img=11',
    publishDate: '2023-10-15',
    readTime: '8分钟',
    tags: ['VPS选购', '云服务器', '性价比'],
    content: `
      <h2>选择VPS服务器的关键因素</h2>
      
      <p>在数字化时代，选择合适的VPS(虚拟专用服务器)对于网站性能、用户体验和业务成功至关重要。面对市场上众多的VPS提供商和各种配置选项，做出明智的选择可能会让人感到困惑。本文将从多个维度为您提供选择VPS的详细指南。</p>
      
      <h3>1. 确定您的需求</h3>
      
      <p>在开始比较不同的VPS选项之前，首先要明确您的具体需求：</p>
      
      <ul>
        <li><strong>用途</strong>：您计划用VPS做什么？是托管网站、运行应用程序、设置邮件服务器，还是其他用途？</li>
        <li><strong>流量预估</strong>：您预计会有多少访问量？流量高峰期是什么时候？</li>
        <li><strong>资源需求</strong>：您的应用需要多少CPU、内存和存储空间？</li>
        <li><strong>技术要求</strong>：您需要特定的操作系统、控制面板或软件支持吗？</li>
        <li><strong>预算限制</strong>：您每月可以投入多少资金用于VPS服务？</li>
      </ul>
      
      <h3>2. 性能考量</h3>
      
      <p>VPS的性能直接影响您的网站或应用的响应速度和用户体验。以下是几个关键的性能指标：</p>
      
      <h4>CPU性能</h4>
      
      <p>CPU是VPS的计算核心，影响服务器处理请求的速度。考虑以下因素：</p>
      
      <ul>
        <li>核心数量：更多的CPU核心意味着更好的多任务处理能力</li>
        <li>CPU类型：新一代处理器通常比旧型号提供更好的性能</li>
        <li>CPU频率：更高的频率通常意味着更快的单线程性能</li>
      </ul>
      
      <h4>内存(RAM)</h4>
      
      <p>RAM决定了VPS同时处理多少数据的能力。内存不足会导致系统频繁使用交换空间，显著降低性能。根据应用类型，推荐的最低内存配置：</p>
      
      <ul>
        <li>基本网站：1-2GB</li>
        <li>内容管理系统(如WordPress)：2-4GB</li>
        <li>电子商务网站：4-8GB</li>
        <li>数据库服务器：8GB+</li>
      </ul>
      
      <h4>存储类型和容量</h4>
      
      <p>存储类型对性能的影响比许多人想象的要大：</p>
      
      <ul>
        <li>SSD存储：提供更快的读写速度，适合大多数应用</li>
        <li>NVMe SSD：比传统SSD更快，适合高性能需求</li>
        <li>HDD：价格更低但速度较慢，适合大容量存储需求</li>
      </ul>
      
      <h4>网络性能</h4>
      
      <p>网络性能影响数据传输速度和网站加载时间：</p>
      
      <ul>
        <li>带宽：确保有足够的带宽处理预期流量</li>
        <li>网络质量：低延迟和高可靠性的网络连接至关重要</li>
        <li>DDoS保护：考虑提供商是否提供DDoS防护服务</li>
      </ul>
      
      <h3>3. 可靠性和正常运行时间</h3>
      
      <p>服务器的可靠性直接影响您的业务连续性。寻找提供以下保证的VPS提供商：</p>
      
      <ul>
        <li>服务水平协议(SLA)：至少99.9%的正常运行时间保证</li>
        <li>冗余基础设施：确保硬件故障不会导致服务中断</li>
        <li>备份选项：定期自动备份以防数据丢失</li>
      </ul>
      
      <h3>4. 地理位置考虑</h3>
      
      <p>服务器的物理位置对性能有显著影响：</p>
      
      <ul>
        <li>靠近目标受众：选择靠近大多数用户的数据中心位置</li>
        <li>法律合规性：考虑数据存储的法律要求和隐私法规</li>
        <li>多区域部署：对于全球业务，考虑在多个地区部署服务器</li>
      </ul>
      
      <h3>5. 可扩展性</h3>
      
      <p>随着业务增长，您的VPS需求也会增加。确保您选择的提供商支持：</p>
      
      <ul>
        <li>垂直扩展：轻松升级CPU、RAM和存储</li>
        <li>水平扩展：添加更多服务器实例的能力</li>
        <li>无缝升级：在不导致显著停机时间的情况下进行升级</li>
      </ul>
      
      <h3>6. 管理选项</h3>
      
      <p>根据您的技术专长和可用时间，选择适合的管理级别：</p>
      
      <ul>
        <li>非托管VPS：完全控制但需要技术知识</li>
        <li>托管VPS：提供商处理服务器维护和安全更新</li>
        <li>控制面板：用户友好的界面简化服务器管理</li>
      </ul>
      
      <h3>7. 安全功能</h3>
      
      <p>安全对于保护您的数据和维护服务可用性至关重要：</p>
      
      <ul>
        <li>防火墙保护：限制对服务器的未授权访问</li>
        <li>DDoS缓解：防御分布式拒绝服务攻击</li>
        <li>安全更新：定期的安全补丁和更新</li>
        <li>加密选项：数据传输和存储加密</li>
      </ul>
      
      <h3>8. 客户支持</h3>
      
      <p>当问题出现时，快速有效的支持至关重要：</p>
      
      <ul>
        <li>全天候支持：24/7全天候技术支持</li>
        <li>支持渠道：电话、聊天、电子邮件和工单系统</li>
        <li>响应时间：评估提供商的平均响应和解决时间</li>
      </ul>
      
      <h3>9. 价格和价值</h3>
      
      <p>VPS价格差异很大，但最便宜的选项并不总是最具成本效益的：</p>
      
      <ul>
        <li>总拥有成本：考虑所有费用，包括基本费用、附加服务和支持</li>
        <li>计费模式：月付、年付或按小时计费</li>
        <li>退款政策：了解取消和退款条款</li>
        <li>价格透明度：警惕隐藏费用和自动续订陷阱</li>
      </ul>
      
      <h3>10. 推荐的VPS提供商</h3>
      
      <p>根据不同需求，以下是一些值得考虑的VPS提供商：</p>
      
      <ul>
        <li><strong>最佳整体性能</strong>：Vultr、DigitalOcean、Linode</li>
        <li><strong>最佳预算选择</strong>：Contabo、Hetzner、BuyVM</li>
        <li><strong>最佳托管VPS</strong>：Kinsta、Cloudways、A2 Hosting</li>
        <li><strong>最佳企业级选择</strong>：AWS Lightsail、Google Cloud、Microsoft Azure</li>
      </ul>
      
      <h3>结论</h3>
      
      <p>选择合适的VPS需要平衡性能、可靠性、功能和成本。通过明确您的需求并仔细评估不同提供商的优缺点，您可以找到最适合您业务的VPS解决方案。记住，最便宜的选项并不总是最好的，投资于可靠、高性能的VPS通常会带来更好的长期回报。</p>
    `
  }
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // 在客户端加载数据
    const postData = blogPosts.find(p => p.id === params.id)
    
    if (postData) {
      setPost(postData)
    }
    
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!post) {
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
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>返回博客列表</span>
            </Link>
            
            <div className="mb-6">
              <span className="inline-block bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative">
                    <Image 
                      src={post.authorAvatar} 
                      alt={post.author} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 w-full rounded-xl overflow-hidden mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-6">
              {/* Social Share Sidebar */}
              <div className="hidden md:block">
                <div className="sticky top-24 space-y-4">
                  <button className="w-10 h-10 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1">
                <article className="cyber-card p-8">
                  <div className="prose prose-invert max-w-none prose-headings:text-primary-400 prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </article>
                
                {/* Tags */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white mb-4">标签</h3>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag: string, index: number) => (
                      <Link 
                        href={`/blog?tag=${tag}`} 
                        key={index}
                        className="bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-primary-400 px-3 py-1.5 rounded text-sm transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Author Bio */}
                <div className="mt-8">
                  <div className="cyber-card p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden relative">
                        <Image 
                          src={post.authorAvatar} 
                          alt={post.author} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{post.author}</h3>
                        <p className="text-gray-400">技术编辑</p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-300">
                      专注于云服务器技术和优化的技术编辑，拥有多年VPS管理和部署经验。致力于提供清晰、实用的技术指南，帮助用户充分利用云计算资源。
                    </p>
                  </div>
                </div>
                
                {/* Mobile Share Buttons */}
                <div className="md:hidden mt-8 flex justify-center gap-4">
                  <button className="w-12 h-12 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                    <ThumbsUp className="w-6 h-6" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Posts */}
        <section className="py-16 px-4 bg-dark-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient mb-8">相关文章</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <Link href="/blog/best-vps-for-wordpress" key={index}>
                  <div className="cyber-card p-0 overflow-hidden h-full flex flex-col transition-transform hover:scale-[1.02]">
                    <div className="relative h-40 w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1603322327561-7e14eee25b2c"
                        alt="WordPress VPS"
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="p-4 flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        2023年最佳WordPress VPS主机推荐
                      </h3>
                      
                      <p className="text-gray-400 text-sm line-clamp-2">
                        运行WordPress网站需要稳定、高效的VPS主机。本文评测了市场上最适合WordPress的VPS提供商。
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary-900/30 via-dark-800 to-purple-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              寻找最适合您的VPS服务器？
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              浏览我们精选的VPS优惠，找到性价比最高的云服务器方案
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
                href="/providers" 
                className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all duration-300 text-lg"
              >
                浏览服务商
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
