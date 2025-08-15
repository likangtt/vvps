'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    // 检查是否已登录
    const token = localStorage.getItem('admin_token')
    if (token === 'admin_authenticated') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 简单的密码验证（实际项目中应该使用更安全的方式）
    if (password === 'admin123') {
      localStorage.setItem('admin_token', 'admin_authenticated')
      setIsAuthenticated(true)
    } else {
      alert('密码错误！')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setPassword('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="cyber-card p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gradient mb-2">管理员登录</h1>
            <p className="text-gray-400">请输入管理员密码</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                密码
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input w-full"
                placeholder="请输入管理员密码"
                required
              />
            </div>
            
            <button
              type="submit"
              className="glow-button w-full"
            >
              登录
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              默认密码：admin123
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <AdminSidebar />
      <div className="admin-main-content ml-64 transition-all duration-300">
        <AdminHeader onLogout={handleLogout} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}