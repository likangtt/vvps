import React from 'react';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">关于我们</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-6">
          欢迎来到特价VPS - 您寻找全球优质VPS服务器优惠的首选平台。我们致力于为用户提供最新、最全面的VPS主机优惠信息，帮助您以最优惠的价格获得高质量的服务器资源。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">我们的使命</h2>
        
        <p className="mb-6">
          我们的使命是简化VPS服务器的选择过程，通过收集、整理和比较全球各地的VPS优惠信息，为用户提供透明、客观的参考数据，帮助用户根据自己的需求做出明智的决策。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">我们的价值观</h2>
        
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2"><strong>客观公正</strong>：我们提供的所有信息都基于事实，不偏向任何特定服务提供商。</li>
          <li className="mb-2"><strong>用户至上</strong>：我们的一切工作都以用户需求为中心，致力于提供最有价值的信息。</li>
          <li className="mb-2"><strong>持续更新</strong>：我们不断更新我们的数据库，确保用户能够获取到最新的优惠信息。</li>
          <li className="mb-2"><strong>专业可靠</strong>：我们的团队由IT专业人士组成，具有丰富的服务器和云计算经验。</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">我们的团队</h2>
        
        <p className="mb-6">
          特价VPS由一群热爱技术、专注于云计算和服务器领域的专业人士创建。我们的团队成员拥有多年的IT行业经验，深入了解各类VPS服务的特点和优势。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">我们的服务</h2>
        
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2"><strong>VPS优惠信息聚合</strong>：我们收集全球各地的VPS优惠信息，并进行分类整理，方便用户快速找到适合自己的服务。</li>
          <li className="mb-2"><strong>服务商评测</strong>：我们对各大VPS服务提供商进行客观评测，包括性能、稳定性、客户服务等方面。</li>
          <li className="mb-2"><strong>技术指南</strong>：我们提供各类VPS使用指南和技术文章，帮助用户更好地利用他们的服务器资源。</li>
          <li className="mb-2"><strong>优惠推送</strong>：用户可以订阅我们的通知服务，第一时间获取最新的VPS优惠信息。</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">我们的承诺</h2>
        
        <p className="mb-6">
          我们承诺：
        </p>
        
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">提供准确、及时的VPS优惠信息</li>
          <li className="mb-2">保持内容的客观公正，不偏向任何服务提供商</li>
          <li className="mb-2">尊重用户隐私，保护用户数据安全</li>
          <li className="mb-2">不断改进我们的平台，提供更好的用户体验</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">联系我们</h2>
        
        <p className="mb-6">
          如果您有任何问题、建议或合作意向，欢迎随时联系我们：
        </p>
        
        <p className="mb-4">
          电子邮件：contact@vpsdeals.example.com<br />
          地址：中国，北京市，朝阳区，科技园区1号楼<br />
          工作时间：周一至周五，9:00 - 18:00
        </p>
        
        <p className="mt-8">
          感谢您访问特价VPS，我们期待为您提供最优质的VPS优惠信息服务！
        </p>
      </div>
    </div>
  );
}