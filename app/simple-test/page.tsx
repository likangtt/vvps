'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function SimpleTestPage() {
  const [clickCount, setClickCount] = useState(0)
  
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      <h1>简单导航测试</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p>点击计数器测试: {clickCount}</p>
        <button 
          onClick={() => setClickCount(clickCount + 1)}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'blue', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          点击我 (+1)
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Next.js Link 测试:</h2>
        <Link 
          href="/" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px', 
            backgroundColor: 'green', 
            color: 'white', 
            textDecoration: 'none',
            marginRight: '10px'
          }}
        >
          回到首页
        </Link>
        <Link 
          href="/deals" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px', 
            backgroundColor: 'red', 
            color: 'white', 
            textDecoration: 'none',
            marginRight: '10px'
          }}
        >
          优惠页面
        </Link>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>普通 a 标签测试:</h2>
        <a 
          href="/" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px', 
            backgroundColor: 'orange', 
            color: 'white', 
            textDecoration: 'none',
            marginRight: '10px'
          }}
        >
          回到首页 (a标签)
        </a>
        <a 
          href="/deals" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px', 
            backgroundColor: 'purple', 
            color: 'white', 
            textDecoration: 'none',
            marginRight: '10px'
          }}
        >
          优惠页面 (a标签)
        </a>
      </div>
      
      <div>
        <h2>JavaScript 导航测试:</h2>
        <button 
          onClick={() => {
            console.log('点击了JavaScript导航按钮')
            window.location.href = '/'
          }}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'brown', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          回到首页 (JS)
        </button>
        <button 
          onClick={() => {
            console.log('点击了优惠页面按钮')
            window.location.href = '/deals'
          }}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'navy', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          优惠页面 (JS)
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <p><strong>测试说明:</strong></p>
        <ol>
          <li>首先测试点击计数器是否工作 - 这测试基本的React事件处理</li>
          <li>然后测试Next.js Link组件 - 绿色和红色按钮</li>
          <li>测试普通a标签 - 橙色和紫色按钮</li>
          <li>最后测试JavaScript导航 - 棕色和深蓝色按钮</li>
        </ol>
        <p>请告诉我哪些按钮可以点击，哪些不能点击。</p>
      </div>
    </div>
  )
}