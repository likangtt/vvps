'use client'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">VPS优惠信息</h1>
      <p className="text-xl mb-8">精选全球优质VPS服务商，为您提供最具性价比的云服务器方案</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <h2 className="text-xl font-bold mb-2">VPS优惠 #{item}</h2>
            <p className="text-gray-400 mb-4">示例VPS优惠信息</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-400 font-bold">$5.99/月</span>
              <a 
                href="#" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                查看详情
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
