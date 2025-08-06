'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import providersData from '@/data/providers.json';
import dealsData from '@/data/deals.json';

export default function ProviderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<any>(null);
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      // 查找提供商数据
      const foundProvider = providersData.find(p => p.id === params.id);
      
      if (foundProvider) {
        setProvider(foundProvider);
        
        // 查找该提供商的所有优惠
        const providerDeals = dealsData.filter(deal => {
          if (typeof deal.provider === 'object' && deal.provider !== null) {
            return deal.provider.id === params.id;
          }
          // Deal类型中没有providerId属性，所以我们只检查provider对象
          return false;
        });
        
        setDeals(providerDeals);
      }
      
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">提供商未找到</h1>
          <p className="mb-8">抱歉，我们找不到您请求的提供商信息。</p>
          <Link href="/providers" className="text-blue-500 hover:text-blue-700">
            返回提供商列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回提供商列表
        </button>
      </div>
      
      {/* 提供商头部信息 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mr-6 mb-4 md:mb-0">
            {provider.logo ? (
              <img 
                src={provider.logo} 
                alt={`${provider.name} logo`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <span className="text-3xl font-bold text-gray-400">{provider.name.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-medium">4.5</span>
                <span className="text-gray-500 ml-1">/5</span>
              </div>
              <div className="text-gray-600">
                成立于 2010
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {provider.tags?.map((tag: string, index: number) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <a 
              href={provider.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              访问官网
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* 提供商详细信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">关于 {provider.name}</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {provider.description}
            </p>
            
            <h3 className="text-lg font-medium mb-3">主要特点</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {provider.features?.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 优惠列表 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{provider.name} 的优惠</h2>
            
            {deals.length > 0 ? (
              <div className="space-y-4">
                {deals.map((deal) => (
                  <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{deal.title}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-green-600 font-bold text-lg">${deal.price}/月</span>
                      {deal.originalPrice && (
                        <span className="text-gray-500 line-through ml-2">${deal.originalPrice}</span>
                      )}
                      {deal.originalPrice && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2">
                          省 {Math.round((1 - parseFloat(deal.price) / parseFloat(deal.originalPrice)) * 100)}%
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{deal.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {deal.location}
                      </div>
                      <Link 
                        href={`/deals/${deal.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        查看详情
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                暂无该提供商的优惠信息
              </div>
            )}
          </div>
        </div>
        
        {/* 侧边栏信息 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">提供商信息</h2>
            
            <div className="space-y-3">
              <div>
                <div className="text-gray-500 text-sm">位置</div>
                <div>全球</div>
              </div>
              
              <div>
                <div className="text-gray-500 text-sm">成立时间</div>
                <div>2010</div>
              </div>
              
              <div>
                <div className="text-gray-500 text-sm">优惠数量</div>
                <div>{deals.length}</div>
              </div>
              
              <div>
                <div className="text-gray-500 text-sm">用户评分</div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${star <= Math.round(4.5) ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-700">4.5/5</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">为什么选择 {provider.name}?</h2>
            <ul className="space-y-2">
              {provider.features?.slice(0, 5).map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-lg font-semibold mb-2 text-blue-800">寻找最佳优惠?</h2>
            <p className="text-blue-700 mb-4">
              我们为您收集了{provider.name}的最新优惠和折扣码。
            </p>
            <Link 
              href={`/deals?provider=${provider.id}`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition-colors"
            >
              查看所有优惠
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}