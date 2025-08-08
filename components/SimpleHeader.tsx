'use client'

import { useState, useEffect } from 'react'
import { languages, getTranslation } from '../lib/i18n'

export default function SimpleHeader() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  // 检测屏幕尺寸
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // 初始检查
    checkIfMobile()
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIfMobile)
    
    // 清理监听器
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

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
      
      // 默认使用英语，不再根据浏览器语言自动选择
      setCurrentLanguage('en')
      
      // 保存检测到的语言
      localStorage.setItem('language', currentLanguage)
    }
  }, [])

  // 切换语言菜单显示状态
  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu)
  }
  
  // 选择特定语言
  const selectLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    localStorage.setItem('language', lang)
    setShowLanguageMenu(false)
    
    // 刷新页面以应用新语言
    window.location.reload()
  }

  // 翻译函数
  const t = (key: string) => getTranslation(key, currentLanguage)

  // 多重导航方法
  const handleNavClick = (url: string) => {
    console.log('多语言导航点击:', url, '当前语言:', currentLanguage)
    
    // 如果是移动端，点击后关闭菜单
    if (isMobile) {
      setMobileMenuOpen(false)
    }
    
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

  // 汉堡菜单图标
  const HamburgerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  // 关闭图标
  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

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
      padding: isMobile ? '0.75rem 1rem' : '1rem 2rem'
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
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          fontWeight: 'bold',
          color: '#60a5fa !important'
        }}>
          ⚡ VPS Deals
        </div>

        {/* 移动端汉堡菜单按钮 */}
        {isMobile && (
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        )}

        {/* 桌面端导航 */}
        {!isMobile && (
          <>
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
                onClick={() => handleNavClick('/about')}
                className="nav-button"
              >
                {t('nav.about')}
              </button>
            </nav>

            {/* 右侧按钮 */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={toggleLanguageMenu}
                  className="lang-button"
                >
                  🌐 {languages[currentLanguage as keyof typeof languages]}
                </button>
                
                {showLanguageMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    zIndex: 1000,
                    minWidth: '150px'
                  }}>
                    {Object.entries(languages).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => selectLanguage(code)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.5rem 1rem',
                          backgroundColor: currentLanguage === code ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
                          borderRadius: '0.25rem',
                          marginBottom: '0.25rem',
                          cursor: 'pointer',
                          border: 'none',
                          color: currentLanguage === code ? '#60a5fa' : 'white'
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* 移动端菜单 */}
      {isMobile && mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #374151',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <button
            onClick={() => handleNavClick('/')}
            className="nav-button"
            style={{ textAlign: 'left', width: '100%', padding: '0.75rem 1rem' }}
          >
            {t('nav.home')}
          </button>
          
          <button
            onClick={() => handleNavClick('/deals')}
            className="nav-button"
            style={{ textAlign: 'left', width: '100%', padding: '0.75rem 1rem' }}
          >
            {t('nav.deals')}
          </button>
          
          <button
            onClick={() => handleNavClick('/providers')}
            className="nav-button"
            style={{ textAlign: 'left', width: '100%', padding: '0.75rem 1rem' }}
          >
            {t('nav.providers')}
          </button>
          
          <button
            onClick={() => handleNavClick('/about')}
            className="nav-button"
            style={{ textAlign: 'left', width: '100%', padding: '0.75rem 1rem' }}
          >
            {t('nav.about')}
          </button>

          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginTop: '0.5rem',
            flexDirection: 'column'
          }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                onClick={toggleLanguageMenu}
                className="lang-button"
                style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
              >
                🌐 {languages[currentLanguage as keyof typeof languages]}
              </button>
              
              {showLanguageMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '0.5rem',
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  zIndex: 1000
                }}>
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => selectLanguage(code)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem 1rem',
                        backgroundColor: currentLanguage === code ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
                        borderRadius: '0.25rem',
                        marginBottom: '0.25rem',
                        cursor: 'pointer',
                        border: 'none',
                        color: currentLanguage === code ? '#60a5fa' : 'white'
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
