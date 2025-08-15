'use client';

import React, { useState, useEffect } from 'react';
import { Provider, Deal } from '@/types/index';

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProvider, setNewProvider] = useState<Provider>({
    id: '',
    name: '',
    logo: '',
    website: '',
    description: '',
    tags: []
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      import('@/data/deals.json')
        .then(module => {
          // 从deals.json中提取唯一的提供商
          const rawData = module.default;
          const dealsData = Array.isArray(rawData) ? rawData as unknown as Deal[] : [];
          const uniqueProviders: Provider[] = [];
          const providerNames = new Set<string>();
          
          dealsData.forEach((deal: Deal) => {
            // 确保deal.provider存在
            if (!deal.provider) {
              return; // 跳过没有provider信息的deal
            }
            const providerName = typeof deal.provider === 'string' ? deal.provider : deal.provider.name;
            if (!providerNames.has(providerName)) {
              providerNames.add(providerName);
              
              // 创建Provider对象
              const provider: Provider = {
                id: typeof deal.provider === 'string' ? deal.provider : (deal.provider?.id || providerName),
                name: providerName,
                logo: typeof deal.provider === 'object' && deal.provider.logo ? deal.provider.logo : '',
                website: deal.link || '',
                description: '',
                tags: deal.tags || []
              };
              
              uniqueProviders.push(provider);
            }
          });
          
          setProviders(uniqueProviders);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading providers:', error);
          setLoading(false);
        });
    }, 500);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProvider(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map((tag: string) => tag.trim());
    setNewProvider(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      // 更新现有提供商
      setProviders(prev => 
        prev.map(provider => 
          provider.id === editingId ? { ...newProvider, id: editingId } : provider
        )
      );
      setEditingId(null);
    } else {
      // 添加新提供商
      const id = newProvider.id || `provider-${Date.now()}`;
      setProviders(prev => [...prev, { ...newProvider, id }]);
    }
    
    // 重置表单
    setNewProvider({
      id: '',
      name: '',
      logo: '',
      website: '',
      description: '',
      tags: []
    });
  };

  const handleEdit = (provider: Provider) => {
    setNewProvider({
      ...provider,
      tags: provider.tags || []
    });
    setEditingId(provider.id || null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      setProviders(prev => prev.filter(provider => provider.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Provider Management</h1>
          <p className="text-gray-400">Manage VPS service provider information</p>
        </div>
      </div>
      
      <div className="cyber-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {editingId ? 'Edit Provider' : 'Add New Provider'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300">Provider ID</label>
            <input
              type="text"
              name="id"
              value={newProvider.id}
              onChange={handleInputChange}
              placeholder="Auto-generated, optional"
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-gray-300">Name *</label>
            <input
              type="text"
              name="name"
              value={newProvider.name}
              onChange={handleInputChange}
              required
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-gray-300">Logo URL</label>
            <input
              type="url"
              name="logo"
              value={newProvider.logo}
              onChange={handleInputChange}
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-gray-300">Website</label>
            <input
              type="url"
              name="website"
              value={newProvider.website}
              onChange={handleInputChange}
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              value={newProvider.description}
              onChange={handleInputChange}
              rows={4}
              className="cyber-input w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-gray-300">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={newProvider.tags?.join(', ') || ''}
              onChange={handleTagsChange}
              placeholder="Example: High Value, Asia Optimized, Alipay Support"
              className="cyber-input w-full"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setNewProvider({
                    id: '',
                    name: '',
                    logo: '',
                    website: '',
                    description: '',
                    tags: []
                  });
                }}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="glow-button"
            >
              {editingId ? 'Update Provider' : 'Add Provider'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="cyber-card">
        <div className="p-6 border-b border-dark-700">
          <h2 className="text-lg font-semibold text-white">Provider List</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-2 text-gray-400">Loading...</p>
          </div>
        ) : providers.length === 0 ? (
          <p className="text-center py-8 text-gray-400">No provider data available</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full table-fixed">
              <thead className="bg-dark-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-1/12">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-1/12">Logo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-2/12">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-3/12">Website</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-4/12">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-1/12">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {providers.map(provider => (
                  <tr key={provider.id} className="hover:bg-dark-800/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 truncate">{provider.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-8 flex items-center justify-center">
                        {provider.logo ? (
                          <div className="bg-dark-700/50 rounded p-1 h-8 w-24 flex items-center justify-center">
                            <img 
                              src={provider.logo} 
                              alt={provider.name} 
                              className="h-6 w-auto max-w-[80px] object-contain"
                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                const img = e.target as HTMLImageElement;
                                img.style.display = 'none';
                                const parent = img.parentElement;
                                if (parent) {
                                  const span = document.createElement('span');
                                  span.className = 'text-xs text-gray-400';
                                  span.textContent = 'No Logo';
                                  parent.appendChild(span);
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="bg-dark-700/50 rounded p-1 h-8 w-24 flex items-center justify-center">
                            <span className="text-xs text-gray-400">No Logo</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white truncate">{provider.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm truncate">
                      <a 
                        href={provider.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 truncate block"
                        title={provider.website}
                      >
                        {provider.website}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-full">
                        {provider.tags && provider.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-primary-500/20 text-primary-400 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡
                            e.preventDefault(); // 阻止默认行为
                            console.log('Edit button clicked', provider); // 添加调试日志
                            handleEdit(provider);
                          }}
                          className="text-yellow-400 hover:text-yellow-300 p-1 rounded bg-dark-700/50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡
                            handleDelete(provider.id || '');
                          }}
                          className="text-red-400 hover:text-red-300 p-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
