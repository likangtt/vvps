'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag, ChevronRight } from 'lucide-react'
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
    publishDate: '2023-10-15',
    readTime: '8分钟',
    tags: ['VPS选购', '云服务器', '性价比']
  },
  {
    id: 'vps-vs-dedicated-server',
    title: 'VPS与独立服务器：哪个更适合您的业务？',
    excerpt: 'VPS和独立服务器各有优缺点，本文将详细比较两者在性能、价格、管理难度等方面的差异，帮助您做出明智的选择。',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
    category: '对比',
    author: '李云',
    publishDate: '2023-10-08',
    readTime: '10分钟',
    tags: ['VPS', '独立服务器', '对比分析']
  },
  {
    id: 'best-vps-for-wordpress',
    title: '2023年最佳WordPress VPS主机推荐',
    excerpt: '运行WordPress网站需要稳定、高效的VPS主机。本文评测了市场上最适合WordPress的VPS提供商，并提供详细的性能测试结果。',
    coverImage: 'https://images.unsplash.com/photo-1603322327561-7e14eee25b2c',
    category: '评测',
    author: '王博客',
    publishDate: '2023-09-25',
    readTime: '12分钟',
    tags: ['WordPress', 'VPS主机', '性能测试']
  },
  {
    id: 'optimize-vps-performance',
    title: '10个提升VPS服务器性能的实用技巧',
    excerpt: '通过系统优化、服务配置和监控工具，显著提升您VPS服务器的性能。这些技巧适用于各种Linux发行版和常见应用场景。',
    coverImage: 'https://images.unsplash.com/photo-1551703599-6b3e8397d188',
    category: '技术',
    author: '赵优化',
    publishDate: '2023-09-18',
    readTime: '15分钟',
    tags: ['性能优化', 'Linux', '服务器管理']
  },
  {
    id: 'vps-security-guide',
    title: 'VPS安全防护完全指南：保护您的服务器免受攻击',
    excerpt: '服务器安全至关重要。本文提供全面的VPS安全配置指南，包括防火墙设置、SSH加固、入侵检测等多方面内容。',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
    category: '安全',
    author: '陈安全',
    publishDate: '2023-09-10',
    readTime: '18分钟',
    tags: ['服务器安全', '防火墙', 'SSH']
  },
  {
    id: 'cheap-vps-providers',
    title: '2023年十大高性价比VPS提供商详细对比',
    excerpt: '预算有限但需要高质量VPS？本文对比了十家提供最佳性价比的VPS服务商，帮助您在有限预算内获得最佳服务。',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',
    category: '对比',
    author: '刘省钱',
    publishDate: '2023-08-28',
    readTime: '14分钟',
    tags: ['性价比', 'VPS对比', '预算方案']
  }
]

// 分类列表
const categories = [
  { name: '全部', slug: 'all' },
  { name: '指南', slug: 'guide' },
  { name: '对比', slug: 'comparison' },
  { name: '评测', slug: 'review' },
  { name: '技术', slug: 'tech' },
  { name: '安全', slug: 'security' }
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // 过滤文章
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || 
      post.category.toLowerCase() === activeCategory.toLowerCase()
    
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <SimpleHeader />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 bg-dark-800">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-purple-900/20"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">VPS优惠资讯</span>
              <br />
              <span className="text-white">技术博客</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              探索VPS服务器的最新资讯、技术指南和优化技巧，帮助您做出明智的选择并充分利用您的云服务器
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索文章..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-5 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
                <svg
                  className="absolute right-4 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.slug
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id}>
                    <div className="cyber-card p-0 overflow-hidden h-full flex flex-col transition-transform hover:scale-[1.02]">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {post.category}
                        </div>
                      </div>
                      
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-400 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-dark-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-dark-700 p-4">
                        <div className="flex items-center justify-between text-sm text-gray-400">
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
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="cyber-card p-8 text-center">
                <p className="text-gray-400 text-lg">
                  没有找到匹配的文章，请尝试其他搜索关键词。
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary-900/30 via-dark-800 to-purple-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              订阅VPS优惠资讯
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              获取最新的VPS优惠、技术指南和行业动态，直接发送到您的邮箱
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="您的邮箱地址"
                  className="flex-grow py-3 px-5 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
                <button className="glow-button px-6 py-3">
                  订阅
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                我们尊重您的隐私，不会向第三方分享您的邮箱地址
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}