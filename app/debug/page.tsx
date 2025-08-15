export default function DebugPage() {
  return (
    <html>
      <head>
        <title>调试页面</title>
        <style>{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
          }
          .header {
            background-color: red;
            color: white;
            padding: 20px;
            margin-bottom: 20px;
          }
          .nav-link {
            display: inline-block;
            background-color: blue;
            color: white;
            padding: 10px 20px;
            margin: 5px;
            text-decoration: none;
            border-radius: 5px;
          }
          .nav-link:hover {
            background-color: darkblue;
          }
          .test-section {
            background-color: white;
            padding: 20px;
            margin: 10px 0;
            border: 1px solid #ccc;
          }
        `}</style>
      </head>
      <body>
        <div className="header">
          <h1>调试页面 - 如果您能看到这个红色标题，说明页面可以正常渲染</h1>
        </div>
        
        <div className="test-section">
          <h2>导航测试</h2>
          <p>请点击下面的链接测试导航是否工作：</p>
          <a href="/" className="nav-link">回到首页</a>
          <a href="/deals" className="nav-link">优惠页面</a>
          <a href="/about" className="nav-link">关于页面</a>
        </div>
        
        <div className="test-section">
          <h2>当前问题诊断</h2>
          <p>如果您能看到这个页面，说明：</p>
          <ul>
            <li>✅ Next.js 服务器正常运行</li>
            <li>✅ 页面可以正常渲染</li>
            <li>✅ 基本的HTML和CSS工作正常</li>
          </ul>
          <p>如果导航链接不工作，问题可能在于：</p>
          <ul>
            <li>🔍 Next.js 路由配置</li>
            <li>🔍 JavaScript 执行问题</li>
            <li>🔍 浏览器兼容性问题</li>
          </ul>
        </div>
        
        <div className="test-section">
          <h2>浏览器信息</h2>
          <p>请检查浏览器控制台是否有错误信息</p>
          <p>按F12打开开发者工具，查看Console标签页</p>
        </div>
      </body>
    </html>
  )
}