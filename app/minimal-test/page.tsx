export default function MinimalTestPage() {
  return (
    <div>
      <div style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '20px',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        这是一个红色的测试标题 - 如果您能看到这个，说明页面可以正常显示
      </div>
      
      <div style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '20px',
        margin: '10px 0'
      }}>
        <h2>导航测试</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a 
            href="/" 
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block'
            }}
          >
            首页
          </a>
          <a 
            href="/deals" 
            style={{
              backgroundColor: 'orange',
              color: 'white',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block'
            }}
          >
            优惠页面
          </a>
          <a 
            href="/about" 
            style={{
              backgroundColor: 'purple',
              color: 'white',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block'
            }}
          >
            关于页面
          </a>
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'yellow',
        color: 'black',
        padding: '20px',
        margin: '10px 0'
      }}>
        <h2>测试说明</h2>
        <p><strong>如果您能看到这个页面：</strong></p>
        <ul>
          <li>红色区域 - 页面渲染正常</li>
          <li>蓝色区域 - CSS样式工作正常</li>
          <li>黄色区域 - 文本显示正常</li>
          <li>彩色按钮 - 导航链接应该可以点击</li>
        </ul>
        <p><strong>请尝试点击上面的彩色按钮，看看是否能跳转到对应页面。</strong></p>
      </div>
      
      <div style={{
        backgroundColor: 'gray',
        color: 'white',
        padding: '20px',
        margin: '10px 0'
      }}>
        <h2>浏览器信息</h2>
        <p>当前URL: {typeof window !== 'undefined' ? window.location.href : '服务器端渲染'}</p>
        <p>用户代理: {typeof navigator !== 'undefined' ? navigator.userAgent : '未知'}</p>
      </div>
    </div>
  )
}