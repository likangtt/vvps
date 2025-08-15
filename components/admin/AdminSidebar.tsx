'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Server, 
  Settings, 
  BarChart3, 
  Users, 
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  
  // 当侧边栏状态改变时，更新主内容区域的边距
  useEffect(() => {
    const mainContent = document.querySelector('.admin-main-content') as HTMLElement;
    if (mainContent) {
      mainContent.style.marginLeft = collapsed ? '4rem' : '16rem'; // 64px or 256px
    }
  }, [collapsed]);

  const menuItems = [
    {
      name: '仪表板',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin'
    },
    {
      name: '特价VPS管理',
      href: '/admin/deals',
      icon: Server,
      active: pathname === '/admin/deals'
    },
    {
      name: '提供商管理',
      href: '/admin/providers',
      icon: Server,
      active: pathname === '/admin/providers'
    },
    {
      name: '数据统计',
      href: '/admin/stats',
      icon: BarChart3,
      active: pathname === '/admin/stats'
    },
    {
      name: '内容管理',
      href: '/admin/content',
      icon: FileText,
      active: pathname === '/admin/content'
    },
    {
      name: '系统设置',
      href: '/admin/settings',
      icon: Settings,
      active: pathname === '/admin/settings'
    }
  ]

  return (
    <div className={`bg-dark-800 border-r border-dark-700 transition-all duration-300 h-screen fixed top-0 left-0 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gradient">管理面板</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-dark-700 transition-colors"
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="font-medium">{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-dark-700">
          {!collapsed && (
            <div className="text-xs text-gray-500 text-center">
              VPS优惠站管理系统 v1.0
            </div>
          )}
        </div>
      </div>
    </div>
  )
}