import React from 'react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">服务条款</h1>
      
      <div className="max-w-3xl mx-auto bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 rounded-lg p-6 shadow-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 接受条款</h2>
          <p className="text-gray-300 mb-4">
            欢迎访问特价VPS网站。通过访问和使用本网站，您同意受这些服务条款的约束。如果您不同意这些条款，请不要使用本网站。
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 网站使用</h2>
          <p className="text-gray-300 mb-4">
            本网站提供VPS服务器优惠信息，仅供参考。我们不保证信息的准确性、完整性或及时性。您使用本网站获取的任何信息，风险自负。
          </p>
          <p className="text-gray-300 mb-4">
            您同意不会：
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
            <li>以任何方式干扰网站的正常运行</li>
            <li>尝试未经授权访问网站的任何部分、服务器或数据库</li>
            <li>使用自动程序、爬虫或其他方式大量收集网站内容</li>
            <li>复制、修改、分发、销售或出租网站的任何部分</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 知识产权</h2>
          <p className="text-gray-300 mb-4">
            本网站及其内容（包括但不限于文本、图像、标志、按钮图标、软件等）的所有权利均归特价VPS所有，受版权法和其他知识产权法保护。
          </p>
          <p className="text-gray-300 mb-4">
            未经我们明确书面许可，您不得复制、修改、创建衍生作品、公开展示、表演、重新发布、下载、存储或传输本网站的任何内容。
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 免责声明</h2>
          <p className="text-gray-300 mb-4">
            本网站按"原样"提供，不提供任何明示或暗示的保证。我们不保证网站将不间断、及时、安全或无错误，也不保证结果将准确或可靠。
          </p>
          <p className="text-gray-300 mb-4">
            我们不对您通过本网站访问的任何第三方网站或服务的内容、隐私政策或做法负责。
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 责任限制</h2>
          <p className="text-gray-300 mb-4">
            在任何情况下，特价VPS及其管理人员、董事、员工和代理人均不对因使用或无法使用本网站而导致的任何损害（包括但不限于数据丢失、利润损失或业务中断）承担责任。
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 适用法律</h2>
          <p className="text-gray-300 mb-4">
            这些条款受中华人民共和国法律管辖，并按其解释，不考虑法律冲突原则。
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 条款变更</h2>
          <p className="text-gray-300 mb-4">
            我们保留随时修改这些服务条款的权利。修改后的条款将在本网站上发布时立即生效。您继续使用本网站将视为接受修改后的条款。
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. 联系我们</h2>
          <p className="text-gray-300 mb-4">
            如果您对这些服务条款有任何疑问，请通过以下方式联系我们：
          </p>
          <p className="text-gray-300">
            电子邮件：contact@vpsdeals.example.com
          </p>
        </section>
      </div>
      
      <div className="text-center mt-8 text-gray-400">
        最后更新日期：{new Date().toISOString().split('T')[0]}
      </div>
    </div>
  );
}