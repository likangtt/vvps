import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">隐私政策</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-4">最后更新日期：{new Date().toLocaleDateString()}</p>
        
        <p className="mb-4">
          欢迎访问特价VPS（"我们"，"我们的"或"本网站"）。我们重视您的隐私，并致力于保护您的个人信息。
          本隐私政策旨在告知您我们如何收集、使用、披露和保护您的信息。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">我们收集的信息</h2>
        
        <p className="mb-4">我们可能收集以下类型的信息：</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>个人识别信息（如姓名、电子邮件地址、电话号码等），仅当您主动提供给我们时</li>
          <li>非个人识别信息（如浏览器类型、设备信息、IP地址、访问时间等）</li>
          <li>Cookie和类似技术收集的信息</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">我们如何使用您的信息</h2>
        
        <p className="mb-4">我们可能将收集的信息用于以下目的：</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>提供、维护和改进我们的服务</li>
          <li>处理您的请求和回应您的询问</li>
          <li>发送与我们服务相关的通知</li>
          <li>监控和分析网站使用情况和趋势</li>
          <li>检测、预防和解决技术问题</li>
          <li>遵守法律义务</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Cookie和类似技术</h2>
        
        <p className="mb-4">
          我们使用Cookie和类似技术来收集和存储信息。Cookie是存储在您设备上的小文本文件。
          我们使用Cookie来识别您的浏览器或设备，了解您的兴趣，记住您的偏好，并提供个性化体验。
          您可以通过浏览器设置拒绝或删除Cookie，但这可能会影响我们网站的某些功能。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">信息共享和披露</h2>
        
        <p className="mb-4">我们不会出售或出租您的个人信息给第三方。但在以下情况下，我们可能会共享您的信息：</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>经您同意</li>
          <li>与我们的服务提供商和合作伙伴共享，以帮助我们提供服务</li>
          <li>遵守法律要求，如法院命令或传票</li>
          <li>保护我们的权利、财产或安全，以及我们用户或公众的权利、财产或安全</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">数据安全</h2>
        
        <p className="mb-4">
          我们采取合理的措施保护您的个人信息不被未经授权的访问、使用或披露。
          然而，没有任何互联网传输或电子存储方法是100%安全的。
          因此，虽然我们努力使用商业上可接受的方式保护您的个人信息，但我们不能保证其绝对安全。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">第三方链接</h2>
        
        <p className="mb-4">
          我们的网站可能包含指向第三方网站的链接。我们对这些第三方网站的隐私政策或内容不负责任。
          我们建议您在提供任何个人信息之前阅读这些网站的隐私政策。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">儿童隐私</h2>
        
        <p className="mb-4">
          我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。
          如果您是父母或监护人，并且您认为您的孩子向我们提供了个人信息，
          请联系我们，我们将采取措施从我们的系统中删除这些信息。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">隐私政策的变更</h2>
        
        <p className="mb-4">
          我们可能会不时更新我们的隐私政策。我们会在本页面上发布任何更改，
          并在重大更改时通过网站通知或电子邮件通知您。我们建议您定期查看本隐私政策，
          以了解我们如何保护您的信息。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">联系我们</h2>
        
        <p className="mb-4">
          如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
        </p>
        
        <p className="mb-4">
          电子邮件：contact@vpsdeals.example.com<br />
          地址：中国，北京市，朝阳区，科技园区1号楼
        </p>
      </div>
    </div>
  );
}