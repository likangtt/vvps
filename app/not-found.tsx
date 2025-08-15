import Link from 'next/link'
import SimpleHeader from '@/components/SimpleHeader'
import Footer from '@/components/Footer'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900">
      <SimpleHeader />
      
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-8xl md:text-9xl font-bold text-gradient opacity-20 mb-8">
            404
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            页面未找到
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            抱歉，您访问的页面不存在或已被移动。
            <br />
            请检查URL是否正确，或返回首页浏览其他内容。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/" className="glow-button flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>返回首页</span>
            </Link>
            
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span>搜索优惠</span>
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>如果您认为这是一个错误，请联系我们的技术支持团队。</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}