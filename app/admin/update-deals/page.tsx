'use client';

import React, { useState, useEffect } from 'react';
import { Deal } from '@/types/index';

export default function UpdateDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [editedDeal, setEditedDeal] = useState<Deal | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 加载所有交易数据
    setTimeout(() => {
      import('@/data/deals.json')
        .then(module => {
          const dealsData = module.default as Deal[];
          setDeals(dealsData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading deals:', error);
          setLoading(false);
        });
    }, 500);
  }, []);

  const handleSelectDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setEditedDeal({ ...deal });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editedDeal) return;
    
    const { name, value } = e.target;
    
    // 处理嵌套属性，如 specs.cpu
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedDeal(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof Deal],
            [child]: value
          }
        };
      });
    } else {
      setEditedDeal(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value
        };
      });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedDeal) return;
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setEditedDeal(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tags
      };
    });
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!editedDeal) return;
    const features = e.target.value.split('\n').map(feature => feature.trim()).filter(feature => feature);
    setEditedDeal(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        features
      };
    });
  };

  const handleSave = async () => {
    if (!editedDeal) return;
    
    setSaveStatus('saving');
    
    try {
      // 在实际应用中，这里应该是一个API调用
      // 现在我们只是更新本地状态
      setDeals(prev => prev.map(deal => 
        deal.id === editedDeal.id ? editedDeal : deal
      ));
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving deal:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.provider?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Update VPS Deals</h1>
          <p className="text-gray-400">Modify existing VPS deals information</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Deal list */}
        <div className="lg:col-span-1">
          <div className="cyber-card p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search deals..."
                className="cyber-input w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-2 text-gray-400">Loading...</p>
              </div>
            ) : filteredDeals.length === 0 ? (
              <p className="text-center py-8 text-gray-400">No deals found</p>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {filteredDeals.map(deal => (
                  <div 
                    key={deal.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedDeal?.id === deal.id 
                        ? 'bg-primary-500/20 border border-primary-500/50' 
                        : 'bg-dark-800/50 hover:bg-dark-700/50 border border-dark-700/50'
                    }`}
                    onClick={() => handleSelectDeal(deal)}
                  >
                    <div className="font-medium text-white">{deal.title}</div>
                    <div className="text-sm text-gray-400 flex justify-between">
                      <span>{deal.provider?.name}</span>
                      <span className="text-primary-400">{deal.price} {deal.currency}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - Edit form */}
        <div className="lg:col-span-2">
          {!selectedDeal ? (
            <div className="cyber-card p-6 text-center">
              <p className="text-gray-400">Select a deal from the list to edit</p>
            </div>
          ) : (
            <div className="cyber-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Edit Deal</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-300">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editedDeal?.title || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">ID</label>
                    <input
                      type="text"
                      name="id"
                      value={editedDeal?.id || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                      disabled
                    />
                  </div>
                </div>
                
                <div>
                    <label className="block mb-1 text-gray-300">Description</label>
                  <textarea
                    name="description"
                    value={editedDeal?.description || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="cyber-input w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-300">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={editedDeal?.price || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">Original Price</label>
                    <input
                      type="text"
                      name="originalPrice"
                      value={editedDeal?.originalPrice || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">Currency</label>
                    <input
                      type="text"
                      name="currency"
                      value={editedDeal?.currency || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                </div>
                
                <div>
                    <label className="block mb-1 text-gray-300">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editedDeal?.location || ''}
                    onChange={handleInputChange}
                    className="cyber-input w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-300">Link</label>
                    <input
                      type="url"
                      name="link"
                      value={editedDeal?.link || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">Coupon Code</label>
                    <input
                      type="text"
                      name="couponCode"
                      value={editedDeal?.couponCode || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-300">Expiry Date</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={editedDeal?.expiryDate ? editedDeal.expiryDate.split('T')[0] : ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={editedDeal?.featured || false}
                        onChange={(e) => {
                          if (!editedDeal) return;
                          setEditedDeal({
                            ...editedDeal,
                            featured: e.target.checked
                          });
                        }}
                        className="form-checkbox h-5 w-5 text-primary-500"
                      />
                      <span className="text-gray-300">Featured</span>
                    </label>
                  </div>
                </div>
                
                <div>
                    <label className="block mb-1 text-gray-300">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={editedDeal?.tags?.join(', ') || ''}
                      onChange={handleTagsChange}
                      className="cyber-input w-full"
                      placeholder="e.g. High Performance, SSD, Hourly Billing"
                    />
                </div>
                
                <div>
                    <label className="block mb-1 text-gray-300">Features (one per line)</label>
                    <textarea
                      value={editedDeal?.features?.join('\n') || ''}
                      onChange={handleFeaturesChange}
                      rows={4}
                      className="cyber-input w-full"
                      placeholder="e.g. Global Data Centers&#10;DDoS Protection&#10;IPv6 Support"
                    />
                </div>
                
                <h3 className="text-lg font-medium text-white mt-2">Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-300">CPU</label>
                    <input
                      type="text"
                      name="specs.cpu"
                      value={editedDeal?.specs?.cpu || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">RAM</label>
                    <input
                      type="text"
                      name="specs.ram"
                      value={editedDeal?.specs?.ram || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">Storage</label>
                    <input
                      type="text"
                      name="specs.storage"
                      value={editedDeal?.specs?.storage || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">Bandwidth</label>
                    <input
                      type="text"
                      name="specs.bandwidth"
                      value={editedDeal?.specs?.bandwidth || ''}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDeal(null);
                      setEditedDeal(null);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    className={`glow-button ${saveStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
                
                {saveStatus === 'success' && (
                  <div className="mt-2 text-green-400 text-center">
                    Changes saved successfully!
                  </div>
                )}
                
                {saveStatus === 'error' && (
                  <div className="mt-2 text-red-400 text-center">
                    Error saving changes. Please try again.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}