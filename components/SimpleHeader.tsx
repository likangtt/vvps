'use client'

import { useState, useEffect } from 'react'
import { languages, getTranslation } from '../lib/i18n'

export default function SimpleHeader() {
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
      console.log('检测到浏览器语言:', browserLang)
      
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

  // 多重导航方法
  const handleNavClick = (url: string) => {
    console.log('多语言导航点击:', url, '当前语言:', currentLanguage)
    
    try {
      // 方法1: 直接设置location.href
      window.location.href = url
    } catch (error) {
      console.log('方法1失败，尝试方法2:', error)
      try {
        // 方法2: 使用location.assign
        window.location.assign(url)
      } catch (error2) {
        console.log('方法2失败，尝试方法3:', error2)
        // 方法3: 使用history API
        window.history.pushState({}, '', url)
        window.location.reload()
      }
    }
  }

  return (
    <header style={{
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999999,
      backgroundColor: 'rgba(17, 24, 39, 0.8)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #374151',
      padding: '1rem 2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#60a5fa !important'
        }}>
          ⚡ 特价VPS
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <button
            onClick={() => handleNavClick('/')}
            className="nav-button"
          >
            {t('nav.home')}
          </button>
          
          <button
            onClick={() => handleNavClick('/deals')}
            className="nav-button"
          >
            {t('nav.deals')}
          </button>
          
          <button
            onClick={() => handleNavClick('/providers')}
            className="nav-button"
          >
            {t('nav.providers')}
          </button>
          
          <button
            onClick={() => handleNavClick('/blog')}
            className="nav-button"
          >
            {t('nav.blog')}
          </button>
          
          <button
            onClick={() => handleNavClick('/guides/vps-buying-guide')}
            className="nav-button"
          >
            {t('nav.guides')}
          </button>
          
          <button
            onClick={() => handleNavClick('/about')}
            className="nav-button"
          >
            {t('nav.about')}
          </button>
          
          <button
            onClick={() => handleNavClick('/contact')}
            className="nav-button"
          >
            {t('nav.contact')}
          </button>
        </nav>

        {/* Right side buttons */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={switchLanguage}
            className="lang-button"
          >
            🌐 {languages[currentLanguage as keyof typeof languages]}
          </button>
          
          <button
            onClick={() => alert('获取优惠功能')}
            className="deals-button"
          >
            🛡️ {t('nav.getDeals')}
          </button>
        </div>
      </div>
    </header>
  )
}