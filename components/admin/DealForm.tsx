'use client';

import React, { useState, useEffect } from 'react';

interface Provider {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  tags?: string[];
}

interface DealFormProps {
  providers: Provider[];
  initialData: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

export default function DealForm({ providers, initialData, onSubmit, onCancel }: DealFormProps) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    currency: 'USD',
    location: '',
    cpu: '',
    ram: '',
    storage: '',
    bandwidth: '',
    providerId: '',
    tags: [],
    features: [],
    link: '',
    couponCode: '',
    expiryDate: '',
    ...initialData
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(initialData.tags || []);
  const [newTag, setNewTag] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialData.features || []);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        providerId: initialData.provider?.id || ''
      });
      setSelectedTags(initialData.tags || []);
      setSelectedFeatures(initialData.features || []);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags((prev: string[]) => [...prev, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prev: string[]) => prev.filter(t => t !== tag));
  };

  const handleAddFeature = () => {
    if (newFeature && !selectedFeatures.includes(newFeature)) {
      setSelectedFeatures((prev: string[]) => [...prev, newFeature]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setSelectedFeatures((prev: string[]) => prev.filter(f => f !== feature));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 找到选中的提供商
    const selectedProvider = providers.find(p => p.id === formData.providerId);
    
    // 准备提交的数据
    const submitData = {
      ...formData,
      tags: selectedTags,
      features: selectedFeatures,
      provider: selectedProvider,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined
    };
    
    onSubmit(submitData);
    
    // 如果不是编辑模式，重置表单
    if (!initialData.id) {
      setFormData({
        id: '',
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        currency: 'USD',
        location: '',
        cpu: '',
        ram: '',
        storage: '',
        bandwidth: '',
        providerId: '',
        tags: [],
        features: [],
        link: '',
        couponCode: '',
        expiryDate: ''
      });
      setSelectedTags([]);
      setSelectedFeatures([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">提供商 *</label>
          <select
            name="providerId"
            value={formData.providerId}
            onChange={handleInputChange}
            required
            className="w-full bg-gray-700 p-2 rounded"
          >
            <option value="">选择提供商</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1">标题 *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="例如：2核4G高性能VPS"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-1">描述 *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={3}
          placeholder="详细描述这个特价VPS的优势和特点"
          className="w-full bg-gray-700 p-2 rounded"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">价格 *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            step="0.01"
            min="0"
            placeholder="5.99"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">原价</label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            placeholder="9.99"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">货币 *</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            required
            className="w-full bg-gray-700 p-2 rounded"
          >
            <option value="USD">美元 (USD)</option>
            <option value="CNY">人民币 (CNY)</option>
            <option value="EUR">欧元 (EUR)</option>
            <option value="GBP">英镑 (GBP)</option>
            <option value="JPY">日元 (JPY)</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">位置 *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="例如：美国洛杉矶"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">购买链接 *</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            required
            placeholder="https://example.com/deal"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-1">CPU *</label>
          <input
            type="text"
            name="cpu"
            value={formData.cpu}
            onChange={handleInputChange}
            required
            placeholder="例如：2核"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">内存 *</label>
          <input
            type="text"
            name="ram"
            value={formData.ram}
            onChange={handleInputChange}
            required
            placeholder="例如：4GB"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">存储 *</label>
          <input
            type="text"
            name="storage"
            value={formData.storage}
            onChange={handleInputChange}
            required
            placeholder="例如：80GB SSD"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">带宽 *</label>
          <input
            type="text"
            name="bandwidth"
            value={formData.bandwidth}
            onChange={handleInputChange}
            required
            placeholder="例如：1TB/月"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-1">标签</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map(tag => (
            <span 
              key={tag} 
              className="bg-blue-600 text-white px-2 py-1 rounded text-sm flex items-center"
            >
              {tag}
              <button 
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-white hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="添加标签"
            className="flex-1 bg-gray-700 p-2 rounded-l"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-600 px-4 py-2 rounded-r"
          >
            添加
          </button>
        </div>
      </div>
      
      <div>
        <label className="block mb-1">特性</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedFeatures.map(feature => (
            <span 
              key={feature} 
              className="bg-purple-600 text-white px-2 py-1 rounded text-sm flex items-center"
            >
              {feature}
              <button 
                type="button"
                onClick={() => handleRemoveFeature(feature)}
                className="ml-2 text-white hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="添加特性"
            className="flex-1 bg-gray-700 p-2 rounded-l"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="bg-purple-600 px-4 py-2 rounded-r"
          >
            添加
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">特价码</label>
          <input
            type="text"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleInputChange}
            placeholder="例如：SAVE20"
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">过期日期</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full bg-gray-700 p-2 rounded"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            取消
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          {initialData.id ? '更新特价VPS' : '添加特价VPS'}
        </button>
      </div>
    </form>
  );
}