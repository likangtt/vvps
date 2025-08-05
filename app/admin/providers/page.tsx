'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';

// 将接口定义移到组件外部
interface Provider {
  id?: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  tags?: string[];
}

interface Specs {
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
}

interface Deal {
  id: string;
  title: string;
  provider: string | Provider;
  price: string | number;
  originalPrice?: string | number;
  discount: string;
  location: string;
  specs: Specs;
  tags: string[];
  affiliateLink: string;
  logo?: string;
  featured: boolean;
  expiryDate?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

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
    // 在实际应用中，这里会从API获取数据
    // 这里我们从本地JSON文件加载数据作为示例
    const loadProviders = async () => {
      try {
        const response = await fetch('/api/providers');
        if (response.ok) {
          const data = await response.json();
          setProviders(data);
        } else {
          console.error('Failed to load providers');
        }
      } catch (error) {
        console.error('Error loading providers:', error);
      } finally {
        setLoading(false);
      }
    };

    // 模拟API调用
    setTimeout(() => {
      import('../../../data/deals.json')
        .then(module => {
          // 从deals.json中提取唯一的提供商
          const rawData = module.default;
          const dealsData = Array.isArray(rawData) ? rawData as Deal[] : [];
          const uniqueProviders: Provider[] = [];
          const providerNames = new Set<string>();
          
          dealsData.forEach((deal: Deal) => {
            const providerName = typeof deal.provider === 'string' ? deal.provider : deal.provider.name;
            if (!providerNames.has(providerName)) {
              providerNames.add(providerName);
              
              // 创建Provider对象
              const provider: Provider = {
                id: typeof deal.provider === 'string' ? deal.provider : (deal.provider.id || providerName),
                name: providerName,
                logo: typeof deal.provider === 'object' && deal.provider.logo ? deal.provider.logo : (deal.logo || ''),
                website: deal.affiliateLink || '',
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
    setEditingId(provider.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个提供商吗？')) {
      setProviders(prev => prev.filter(provider => provider.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">提供商管理</h1>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? '编辑提供商' : '添加新提供商'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">提供商ID</label>
                <input
                  type="text"
                  name="id"
                  value={newProvider.id}
                  onChange={handleInputChange}
                  placeholder="自动生成，可选填"
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">名称 *</label>
                <input
                  type="text"
                  name="name"
                  value={newProvider.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">Logo URL *</label>
                <input
                  type="url"
                  name="logo"
                  value={newProvider.logo}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">官网 *</label>
                <input
                  type="url"
                  name="website"
                  value={newProvider.website}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">描述 *</label>
                <textarea
                  name="description"
                  value={newProvider.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">标签（用逗号分隔）</label>
                <input
                  type="text"
                  name="tags"
                  value={newProvider.tags.join(', ')}
                  onChange={handleTagsChange}
                  placeholder="例如: 高性价比, 亚洲优化, 支持支付宝"
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              
              <div className="flex justify-end">
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
                    className="bg-gray-600 px-4 py-2 rounded mr-2"
                  >
                    取消
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  {editingId ? '更新提供商' : '添加提供商'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">提供商列表</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2">加载中...</p>
              </div>
            ) : providers.length === 0 ? (
              <p className="text-center py-8 text-gray-400">暂无提供商数据</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Logo</th>
                      <th className="py-2 px-4 text-left">名称</th>
                      <th className="py-2 px-4 text-left">官网</th>
                      <th className="py-2 px-4 text-left">标签</th>
                      <th className="py-2 px-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map(provider => (
                      <tr key={provider.id} className="border-b border-gray-700">
                        <td className="py-3 px-4">{provider.id}</td>
                        <td className="py-3 px-4">
                          {provider.logo && (
                            <img 
                              src={provider.logo} 
                              alt={provider.name} 
                              className="h-8 w-auto"
                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                const img = e.target as HTMLImageElement;
                                img.onerror = null;
                                img.src = 'https://via.placeholder.com/150x50?text=Logo';
                              }}
                            />
                          )}
                        </td>
                        <td className="py-3 px-4">{provider.name}</td>
                        <td className="py-3 px-4">
                          <a 
                            href={provider.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {provider.website}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {provider.tags && provider.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="bg-gray-700 text-xs px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleEdit(provider)}
                            className="bg-yellow-600 text-white px-3 py-1 rounded text-sm mr-2"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDelete(provider.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}