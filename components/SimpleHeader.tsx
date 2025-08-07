'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Globe, Zap } from 'lucide-react'
import { languages, getTranslation } from '../lib/i18n'

export default function SimpleHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('zh-CN')

  // 从浏览器语言和localStorage加载语言设置
  useEffect(() => {
    // 首先检查localStorage中保存的语言设置
    const savedLanguage = localStorage.getItem('language')
    
    if (savedLanguage && languages[savedLanguage as keyof typeof languages]) {
      setCurrentLanguage(savedLanguage)
    } else {
      // 如果没有保存的语言设置，则检测浏览器语言
      const browserLang = navigator.language || (navigator as any).userLanguage
      
      // 匹配支持的语言
      if (browserLang.startsWith('zh')) {
        setCurrentLanguage('zh-CN')
      } else if (browserLang.startsWith('ja')) {
        setCurrentLanguage('ja')
      } else if (browserLang.startsWith('hi')) {
        setCurrentLanguage('hi')
      } else if (browserLang.startsWith('pt')) {
        setCurrentLanguage('pt')
      } else if (browserLang.startsWith('es')) {
        setCurrentLanguage('es')
      } else {
        // 默认使用英语
        setCurrentLanguage('en')
      }
      
      // 保存检测到的语言
      localStorage.setItem('language', currentLanguage)
    }
  }, [])

  // 切换语言
  const switchLanguage = () => {
    const langKeys = Object.keys(languages)
    const currentIndex = langKeys.indexOf(currentLanguage)
    const nextIndex = (currentIndex + 1) % langKeys.length
    const nextLanguage = langKeys[nextIndex]
    
    setCurrentLanguage(nextLanguage)
    localStorage.setItem('language', nextLanguage)
    
    // 刷新页面以应用新语言
    window.location.reload()
  }

  // 翻译函数
  const t = (key: string) => getTranslation(key, currentLanguage)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-sm border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-yellow-400 text-2xl">⚡</span>
            <div>
              <span className="text-blue-400 font-bold text-xl">特价</span>
              <span className="text-blue-500 font-bold text-xl">VPS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/deals" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.deals')}
            </Link>
            <Link href="/providers" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.providers')}
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.blog')}
            </Link>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={switchLanguage}
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>{languages[currentLanguage as keyof typeof languages]}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-dark-700/50">
          <nav className="grid grid-cols-1 gap-2 px-4">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/deals" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.deals')}
            </Link>
            <Link 
              href="/providers" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.providers')}
            </Link>
            <Link 
              href="/blog" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <div className="px-3 py-2">
              <button 
                onClick={switchLanguage}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{languages[currentLanguage as keyof typeof languages]}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
