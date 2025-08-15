'use client'

import { useState, useEffect } from 'react'
import { languages, getTranslation } from '../lib/i18n'

export default function SimpleHeader() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Listen for window size changes
    window.addEventListener('resize', checkIfMobile)
    
    // Clean up listener
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Load language settings from browser and localStorage
  useEffect(() => {
    // First check for saved language setting in localStorage
    const savedLanguage = localStorage.getItem('language')
    
    if (savedLanguage && languages[savedLanguage as keyof typeof languages]) {
      setCurrentLanguage(savedLanguage)
    } else {
      // If no saved language setting, detect browser language
      const browserLang = navigator.language || (navigator as any).userLanguage
      console.log('Detected browser language:', browserLang)
      
      // Default to English, no longer auto-select based on browser language
      setCurrentLanguage('en')
      
      // Save detected language
      localStorage.setItem('language', currentLanguage)
    }
  }, [])

  // Toggle language menu display state
  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu)
  }
  
  // Select specific language
  const selectLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    localStorage.setItem('language', lang)
    setShowLanguageMenu(false)
    
    // Refresh page to apply new language
    window.location.reload()
  }

  // Translation function
  const t = (key: string) => getTranslation(key, currentLanguage)

  // Multi-navigation method
  const handleNavClick = (url: string) => {
    console.log('Multilingual navigation click:', url, 'Current language:', currentLanguage)
    
    // If on mobile, close menu after click
    if (isMobile) {
      setMobileMenuOpen(false)
    }
    
    try {
      // Method 1: Directly set location.href
      window.location.href = url
    } catch (error) {
      console.log('Method 1 failed, trying method 2:', error)
      try {
        // Method 2: Use location.assign
        window.location.assign(url)
      } catch (error2) {
        console.log('Method 2 failed, trying method 3:', error2)
        // Method 3: Use history API
        window.history.pushState({}, '', url)
        window.location.reload()
      }
    }
  }

  // Hamburger menu icon
  const HamburgerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  // Close icon
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

        {/* Mobile hamburger menu button */}
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

        {/* Desktop navigation */}
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

            {/* Right side buttons */}
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

      {/* Mobile menu */}
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
