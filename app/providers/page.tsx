'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import providersData from '@/data/providers.json';
import { Provider } from '@/types';

export default function ProvidersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('全部');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 根据筛选条件过滤提供商
    let filtered = [...providersData];
    
    if (filter !== '全部') {
      filtered = filtered.filter(provider => {
        const location = provider.location.toLowerCase();
        if (filter === '北美') return location.includes('美国') || location.includes('加拿大');
        if (filter === '欧洲') return location.includes('欧洲') || location.includes('德国') || location.includes('法国') || location.includes('英国');
        if (filter === '亚太') return location.includes('亚洲') || location.includes('日本') || location.includes('新加坡') || location.includes('香港') || location.includes('中国');
        return true;
      });
    }

    // 搜索过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(term) || 
        provider.description.toLowerCase().includes(term) ||
        provider.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setProviders(filtered);
  }, [filter, searchTerm]);

  // 区域筛选选项
  const regions = ['全部', '北美', '欧洲', '亚太'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">VPS提供商</h1>
      <p className="mb-8">发现全球优质的VPS云服务器提供商，比较服务特色和优惠方案</p>
      
      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex space-x-2">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setFilter(region)}
              className={`px-4 py-2 rounded-md ${
                filter === region 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="搜索提供商..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* 提供商列表 */}
      {providers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mr-3">
                  {provider.logo ? (
                    <img 
                      src={provider.logo} 
                      alt={`${provider.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-400">{provider.name.charAt(0)}</span>
                  )}
                </div>
                <h2 className="text-xl font-semibold">{provider.name}</h2>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{provider.description}</p>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {provider.tags?.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-medium">{provider.rating}</span>
                </div>
                
                <button 
                  onClick={() => router.push(`/providers/${provider.id}`)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  查看详情
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">没有找到匹配的提供商</p>
          <button 
            onClick={() => {setFilter('全部'); setSearchTerm('');}}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            清除筛选条件
          </button>
        </div>
      )}
    </div>
  );
}