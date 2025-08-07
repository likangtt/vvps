'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap, Shield, Settings } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative bg-dark-900 border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary-500 group-hover:text-primary-400 transition-colors animate-pulse-slow" />
              <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg group-hover:bg-primary-400/30 transition-colors"></div>
            </div>
            <span className="text-xl font-bold text-gradient">VPS优惠</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-button">首页</Link>
            <Link href="/deals" className="nav-button">特价VPS</Link>
            <Link href="/providers" className="nav-button">提供商</Link>
            <Link href="/blog" className="nav-button">博客</Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/admin" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Settings className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-dark-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-700/50">
            <nav className="grid grid-cols-1 gap-2">
              <Link 
                href="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                href="/deals" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
                onClick={() => setIsMenuOpen(false)}
              >
                特价VPS
              </Link>
              <Link 
                href="/providers" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
                onClick={() => setIsMenuOpen(false)}
              >
                提供商
              </Link>
              <Link 
                href="/blog" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
                onClick={() => setIsMenuOpen(false)}
              >
                博客
              </Link>
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              <Link 
                href="/admin" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
                onClick={() => setIsMenuOpen(false)}
              >
                管理后台
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
