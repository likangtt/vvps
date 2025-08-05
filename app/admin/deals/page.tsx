'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import DealForm from '../../../components/admin/DealForm';

export default function AdminDealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDeal, setEditingDeal] = useState(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    // 这里我们从本地JSON文件加载数据作为示例
    const loadData = async () => {
      try {
        // 模拟API调用
        const dealsModule = await import('../../../data/deals.json');
        const dealsData = dealsModule.default;
        
        // 提取唯一的提供商
        const uniqueProviders = [];
        const providerIds = new Set();
        
        dealsData.forEach(deal => {
          if (!providerIds.has(deal.provider.id)) {
            providerIds.add(deal.provider.id);
            uniqueProviders.push(deal.provider);
          }
        });
        
        setDeals(dealsData);
        setProviders(uniqueProviders);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddDeal = (newDeal) => {
    // 在实际应用中，这里会调用API保存数据
    const dealWithId = {
      ...newDeal,
      id: `deal-${Date.now()}`
    };
    setDeals(prev => [...prev, dealWithId]);
  };

  const handleUpdateDeal = (updatedDeal) => {
    // 在实际应用中，这里会调用API更新数据
    setDeals(prev => 
      prev.map(deal => 
        deal.id === updatedDeal.id ? updatedDeal : deal
      )
    );
    setEditingDeal(null);
  };

  const handleDeleteDeal = (id) => {
    if (window.confirm('确定要删除这个特价VPS吗？')) {
      // 在实际应用中，这里会调用API删除数据
      setDeals(prev => prev.filter(deal => deal.id !== id));
    }
  };

  const handleEditDeal = (deal) => {
    setEditingDeal(deal);
  };

  const handleCancelEdit = () => {
    setEditingDeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">特价VPS管理</h1>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingDeal ? '编辑特价VPS' : '添加新特价VPS'}
            </h2>
            <DealForm 
              providers={providers}
              initialData={editingDeal || {}}
              onSubmit={editingDeal ? handleUpdateDeal : handleAddDeal}
              onCancel={editingDeal ? handleCancelEdit : null}
            />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">特价VPS列表</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2">加载中...</p>
              </div>
            ) : deals.length === 0 ? (
              <p className="text-center py-8 text-gray-400">暂无特价VPS数据</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">提供商</th>
                      <th className="py-2 px-4 text-left">标题</th>
                      <th className="py-2 px-4 text-left">价格</th>
                      <th className="py-2 px-4 text-left">位置</th>
                      <th className="py-2 px-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map(deal => (
                      <tr key={deal.id} className="border-b border-gray-700">
                        <td className="py-3 px-4">{deal.id}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {deal.provider.logo && (
                              <img 
                                src={deal.provider.logo} 
                                alt={deal.provider.name} 
                                className="h-6 w-auto mr-2"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/150x50?text=Logo';
                                }}
                              />
                            )}
                            {deal.provider.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">{deal.title}</td>
                        <td className="py-3 px-4">
                          <span className="text-green-400">${deal.price}/月</span>
                          {deal.originalPrice && (
                            <span className="text-gray-400 line-through ml-2">
                              ${deal.originalPrice}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">{deal.location}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleEditDeal(deal)}
                            className="bg-yellow-600 text-white px-3 py-1 rounded text-sm mr-2"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDeleteDeal(deal.id)}
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