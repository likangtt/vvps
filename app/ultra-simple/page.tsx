export default function UltraSimplePage() {
  return (
    <div>
      <h1>超简单测试页面</h1>
      <p>如果您能看到这行文字，说明页面可以正常显示。</p>
      
      <h2>导航测试</h2>
      <p>请点击下面的链接：</p>
      
      <div>
        <a href="/">回到首页</a>
      </div>
      <div>
        <a href="/deals">优惠页面</a>
      </div>
      <div>
        <a href="/about">关于页面</a>
      </div>
      
      <h2>当前状态</h2>
      <p>页面已加载完成</p>
    </div>
  )
}