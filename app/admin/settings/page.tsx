'use client'

import { useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
        siteName: '特价VPS网',
        siteDescription: '发现全球最优特价VPS服务器',
    contactEmail: 'contact@vpsdeals.com',
    defaultLanguage: 'en',
    enabledLanguages: ['en', 'zh', 'ja', 'hi', 'pt', 'es'],
    featuredDealsCount: 6,
    dealsPerPage: 12,
    enableCache: true,
    cacheTime: 3600,
    theme: 'cyberpunk',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico'
  })
  
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement
      setSettings({
        ...settings,
        [name]: checked
      })
    } else if (name === 'enabledLanguages') {
      // 处理多选语言
      const options = (e.target as HTMLSelectElement).options
      const selectedLanguages = []
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedLanguages.push(options[i].value)
        }
      }
      setSettings({
        ...settings,
        enabledLanguages: selectedLanguages
      })
    } else if (type === 'number') {
      setSettings({
        ...settings,
        [name]: parseInt(value)
      })
    } else {
      setSettings({
        ...settings,
        [name]: value
      })
    }
  }
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // 模拟保存设置
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage('设置已成功保存！')
      
      // 3秒后清除消息
      setTimeout(() => {
        setSaveMessage('')
      }, 3000)
    }, 1000)
  }
  
  const handleReset = () => {
    if (confirm('确定要重置所有设置吗？这将恢复默认值。')) {
      setSettings({
        siteName: '特价VPS网',
        siteDescription: '发现全球最优特价VPS服务器',
        contactEmail: 'contact@vpsdeals.com',
        defaultLanguage: 'en',
        enabledLanguages: ['en', 'zh', 'ja', 'hi', 'pt', 'es'],
        featuredDealsCount: 6,
        dealsPerPage: 12,
        enableCache: true,
        cacheTime: 3600,
        theme: 'cyberpunk',
        logoUrl: '/logo.png',
        faviconUrl: '/favicon.ico'
      })
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">网站设置</h1>
          <p className="text-gray-400">管理网站的全局设置和配置</p>
        </div>
      </div>
      
      {/* Settings Form */}
      <form onSubmit={handleSave} className="cyber-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 基本设置 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-primary-500 pb-2 mb-4">基本设置</h2>
            
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-300 mb-1">
                网站名称
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="cyber-input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-300 mb-1">
                网站描述
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="cyber-input w-full h-20"
                required
              />
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">
                联系邮箱
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="cyber-input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-300 mb-1">
                Logo URL
              </label>
              <input
                type="text"
                id="logoUrl"
                name="logoUrl"
                value={settings.logoUrl}
                onChange={handleChange}
                className="cyber-input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-300 mb-1">
                Favicon URL
              </label>
              <input
                type="text"
                id="faviconUrl"
                name="faviconUrl"
                value={settings.faviconUrl}
                onChange={handleChange}
                className="cyber-input w-full"
              />
            </div>
          </div>
          
          {/* 高级设置 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-primary-500 pb-2 mb-4">高级设置</h2>
            
            <div>
              <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-300 mb-1">
                默认语言
              </label>
              <select
                id="defaultLanguage"
                name="defaultLanguage"
                value={settings.defaultLanguage}
                onChange={handleChange}
                className="cyber-input w-full"
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="hi">हिन्दी</option>
                <option value="pt">Português</option>
                <option value="es">Español</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="enabledLanguages" className="block text-sm font-medium text-gray-300 mb-1">
                启用的语言 (按住Ctrl多选)
              </label>
              <select
                id="enabledLanguages"
                name="enabledLanguages"
                value={settings.enabledLanguages}
                onChange={handleChange}
                className="cyber-input w-full"
                multiple
                size={6}
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="hi">हिन्दी</option>
                <option value="pt">Português</option>
                <option value="es">Español</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-1">
                网站主题
              </label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="cyber-input w-full"
              >
                <option value="cyberpunk">赛博朋克</option>
                <option value="dark">暗黑</option>
                <option value="light">明亮</option>
                <option value="neon">霓虹</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="featuredDealsCount" className="block text-sm font-medium text-gray-300 mb-1">
                首页推荐特价VPS数量
              </label>
              <input
                type="number"
                id="featuredDealsCount"
                name="featuredDealsCount"
                value={settings.featuredDealsCount}
                onChange={handleChange}
                className="cyber-input w-full"
                min="1"
                max="12"
              />
            </div>
            
            <div>
              <label htmlFor="dealsPerPage" className="block text-sm font-medium text-gray-300 mb-1">
                每页显示特价VPS数量
              </label>
              <input
                type="number"
                id="dealsPerPage"
                name="dealsPerPage"
                value={settings.dealsPerPage}
                onChange={handleChange}
                className="cyber-input w-full"
                min="6"
                max="24"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableCache"
                name="enableCache"
                checked={settings.enableCache}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="enableCache" className="text-sm font-medium text-gray-300">
                启用缓存
              </label>
            </div>
            
            {settings.enableCache && (
              <div>
                <label htmlFor="cacheTime" className="block text-sm font-medium text-gray-300 mb-1">
                  缓存时间 (秒)
                </label>
                <input
                  type="number"
                  id="cacheTime"
                  name="cacheTime"
                  value={settings.cacheTime}
                  onChange={handleChange}
                  className="cyber-input w-full"
                  min="60"
                  max="86400"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* 保存按钮 */}
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-dark-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重置设置
          </button>
          
          <div className="flex items-center">
            {saveMessage && (
              <span className="text-green-400 mr-4">{saveMessage}</span>
            )}
            <button
              type="submit"
              className="glow-button flex items-center"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  保存中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}