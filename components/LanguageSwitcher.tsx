'use client'

import { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('简体中文')

  const languages = [
    { code: 'zh-cn', name: '简体中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' }
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLang}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-dark-800 border border-dark-700 rounded-lg shadow-lg z-50 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLang(lang.name)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-dark-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                currentLang === lang.name ? 'text-primary-400 bg-dark-700/50' : 'text-gray-300'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}

      {/* 点击外部关闭下拉菜单 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}