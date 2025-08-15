'use client'

import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">导航测试页面</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Next.js Link 测试:</h2>
          <div className="space-x-4">
            <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              首页
            </Link>
            <Link href="/deals" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              优惠页面
            </Link>
            <Link href="/about" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              关于页面
            </Link>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">普通 a 标签测试:</h2>
          <div className="space-x-4">
            <a href="/" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              首页 (a标签)
            </a>
            <a href="/deals" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              优惠页面 (a标签)
            </a>
            <a href="/about" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              关于页面 (a标签)
            </a>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">JavaScript 导航测试:</h2>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              首页 (JS)
            </button>
            <button 
              onClick={() => window.location.href = '/deals'}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            >
              优惠页面 (JS)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}