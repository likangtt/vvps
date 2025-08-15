'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import providersData from '@/data/providers.json';
import { Provider } from '@/types';

export default function ProvidersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 根据筛选条件过滤提供商
    let filtered = [...providersData];
    
      if (filter !== 'All') {
        filtered = filtered.filter(provider => {
          // 由于Provider接口中没有location属性，我们暂时返回true显示所有提供商
          return true;
        });
      }

    // 搜索过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(term) || 
        provider.description?.toLowerCase().includes(term) ||
        provider.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setProviders(filtered);
  }, [filter, searchTerm]);

  // Region filter options
  const regions = ['All', 'North America', 'Europe', 'Asia Pacific'];

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            VPS Providers
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover quality VPS cloud server providers worldwide, compare service features and deals
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex space-x-2">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setFilter(region)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === region 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
          
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search providers..."
              className="cyber-input w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Provider List */}
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div key={provider.id} className="cyber-card p-6 hover:scale-105 transition-transform">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-dark-700 rounded-md flex items-center justify-center overflow-hidden mr-3">
                    {provider.logo ? (
                      <img 
                        src={provider.logo} 
                        alt={`${provider.name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-xl font-bold text-primary-400">{provider.name.charAt(0)}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-white">{provider.name}</h2>
                </div>
                
                <p className="text-gray-400 mb-4 line-clamp-2">{provider.description}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {provider.tags?.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-primary-500/20 text-primary-400 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium text-white">4.5</span>
                  </div>
                  
                  <button 
                    onClick={() => router.push(`/providers/${provider.id}`)}
                    className="text-primary-400 hover:text-primary-300 flex items-center transition-colors"
                  >
                    View Details
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
            <p className="text-gray-400 text-lg">No matching providers found</p>
            <button 
              onClick={() => {setFilter('All'); setSearchTerm('');}}
              className="mt-4 text-primary-400 hover:text-primary-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
