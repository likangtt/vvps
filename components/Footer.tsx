'use client'

import { Github, Mail, Globe, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-800/50 border-t border-dark-700/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">VPS优惠</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              汇聚全球最新VPS服务器优惠信息，帮您找到性价比最高的云服务器方案
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="联系我们"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="VPS优惠"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="/deals" className="text-gray-400 hover:text-primary-400 transition-colors">
                  优惠
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  关于
                </a>
              </li>
              <li>
                <a href="/admin" className="text-gray-400 hover:text-primary-400 transition-colors">
                  管理
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">支持</h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  帮助
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  联系我们
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  意见反馈
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  隐私政策
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 VPS优惠. 保留所有权利.
          </p>
          <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
            <span>用</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>制作</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
