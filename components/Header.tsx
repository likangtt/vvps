'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap, Shield, Settings } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative bg-red-500 border-b border-dark-700/50">
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
            <Link 
              href="/" 
              className="text-gray-300 hover:text-primary-400 transition-colors font-medium"
            >
              首页
            </Link>
            <Link 
              href="/deals" 
              className="text-gray-300 hover:text-primary-400 transition-colors font-medium"
            >
              优惠
            </Link>
            <Link 
              href="/providers" 
              className="text-gray-300 hover:text-primary-400 transition-colors font-medium"
            >
              提供商
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-primary-400 transition-colors font-medium"
            >
              关于
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-primary-400 transition-colors font-medium"
            >
              联系
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center space-x-1 text-gray-300 hover:text-primary-400 transition-colors font-medium"
            >
              <Settings className="h-4 w-4" />
              <span>管理</span>
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <button className="glow-button flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>获取优惠</span>
            </button>
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
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-primary-400 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                href="/deals" 
                className="text-gray-300 hover:text-primary-400 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                优惠
              </Link>
              <Link 
                href="/providers" 
                className="text-gray-300 hover:text-primary-400 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                提供商
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-primary-400 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                关于
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-primary-400 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                联系
              </Link>
              <Link 
                href="/admin" 
                className="flex items-center space-x-1 text-gray-300 hover:text-primary-400 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="h-4 w-4" />
                <span>管理</span>
              </Link>
              <div className="px-2 py-1">
                <LanguageSwitcher />
              </div>
              <button className="glow-button flex items-center justify-center space-x-2 mt-4">
                <Shield className="h-4 w-4" />
                <span>获取优惠</span>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-purple-600/5 opacity-50"></div>
    </header>
  )
}
