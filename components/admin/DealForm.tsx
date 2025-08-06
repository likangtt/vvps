'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, AlertCircle, Info, Check, Calendar, Globe, Tag, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Deal, Provider } from '@/types';

interface DealFormProps {
  providers: Provider[];
  initialData: Partial<Deal>;
  onSubmit: (data: Deal) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function DealForm({ providers, initialData, onSubmit, onCancel, isLoading = false }: DealFormProps) {
  // 表单验证状态
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState(false);
  
  // 表单数据状态
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    description: string;
    price: string | number;
    originalPrice: string | number;
    currency: string;
    location: string;
    specs: {
      cpu: string;
      ram: string;
      storage: string;
      bandwidth: string;
    };
    providerId: string;
    tags: string[];
    features: string[];
    link: string;
    couponCode: string;
    expiryDate: string;
  }>({
    id: '',
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    currency: 'USD',
    location: '',
    specs: {
      cpu: '',
      ram: '',
      storage: '',
      bandwidth: ''
    },
    providerId: '',
    tags: [],
    features: [],
    link: '',
    couponCode: '',
    expiryDate: ''
  });

  // 标签和特性状态
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  
  // 预设标签和特性选项
  const commonTags = ['高性能', '性价比', 'SSD', '无限流量', '按小时计费', '特价'];
  const commonFeatures = ['免费备份', '24/7客服', '99.9%可用性', 'DDoS防护', '快速部署', '全球CDN'];

  // 初始化表单数据
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        providerId: initialData.provider?.id || ''
      }));
      setSelectedTags(initialData.tags || []);
      setSelectedFeatures(initialData.features || []);
    }
  }, [initialData]);

  // 表单验证函数
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // 必填字段验证
    if (!formData.title.trim()) newErrors.title = '标题不能为空';
    if (!formData.description.trim()) newErrors.description = '描述不能为空';
    if (!formData.price) newErrors.price = '价格不能为空';
    if (formData.price && parseFloat(formData.price.toString()) <= 0) newErrors.price = '价格必须大于0';
    if (!formData.providerId) newErrors.providerId = '请选择提供商';
    if (!formData.location.trim()) newErrors.location = '位置不能为空';
    if (!formData.link.trim()) newErrors.link = '购买链接不能为空';
    
    // 规格验证
    if (!formData.specs.cpu.trim()) newErrors['specs.cpu'] = 'CPU配置不能为空';
    if (!formData.specs.ram.trim()) newErrors['specs.ram'] = '内存配置不能为空';
    if (!formData.specs.storage.trim()) newErrors['specs.storage'] = '存储配置不能为空';
    if (!formData.specs.bandwidth.trim()) newErrors['specs.bandwidth'] = '带宽配置不能为空';
    
    // URL格式验证
    if (formData.link && !/^https?:\/\/.+/.test(formData.link)) {
      newErrors.link = '请输入有效的URL（以http://或https://开头）';
    }
    
    // 价格比较验证
    if (formData.originalPrice && formData.originalPrice !== '' && 
        parseFloat(formData.originalPrice.toString()) > 0 && 
        parseFloat(formData.price.toString()) >= parseFloat(formData.originalPrice.toString())) {
      newErrors.originalPrice = '原价应该高于特价';
    }
    
    // 日期验证
    if (formData.expiryDate) {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (expiryDate < today) {
        // 这里只是警告，不阻止提交
        console.warn('过期日期已经过去');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 标记表单已被触碰
    if (!formTouched) setFormTouched(true);
    
    // 清除当前字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData((prev) => {
      // 处理specs对象内的属性
      if (['cpu', 'ram', 'storage', 'bandwidth'].includes(name)) {
        // 清除specs相关错误
        if (errors[`specs.${name}`]) {
          setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[`specs.${name}`];
            return newErrors;
          });
        }
        
        return {
          ...prev,
          specs: {
            ...prev.specs,
            [name]: value
          }
        };
      }
      // 处理其他属性
      return {
        ...prev,
        [name]: value
      };
    });
  };

  // 标签处理函数
  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags((prev) => [...prev, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter(t => t !== tag));
  };

  const handleAddCommonTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  // 特性处理函数
  const handleAddFeature = () => {
    if (newFeature && !selectedFeatures.includes(newFeature)) {
      setSelectedFeatures((prev) => [...prev, newFeature]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setSelectedFeatures((prev) => prev.filter(f => f !== feature));
  };
  
  const handleAddCommonFeature = (feature: string) => {
    if (!selectedFeatures.includes(feature)) {
      setSelectedFeatures((prev) => [...prev, feature]);
    }
  };
  
  // 按回车键添加标签或特性
  const handleKeyPress = (e: React.KeyboardEvent, type: 'tag' | 'feature') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'tag') {
        handleAddTag();
      } else {
        handleAddFeature();
      }
    }
  };

  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!validateForm()) {
      // 显示错误提示
      toast.error('请填写所有必填字段');
      
      // 滚动到第一个错误
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    try {
      // 找到选中的提供商
      const selectedProvider = providers.find(p => p.id === formData.providerId);
      
      // 准备提交的数据
      const submitData: Deal = {
        ...formData,
        id: formData.id || '',
        title: formData.title,
        description: formData.description,
        tags: selectedTags,
        features: selectedFeatures,
        provider: selectedProvider ? {
          id: selectedProvider.id || '',
          name: selectedProvider.name,
          logo: selectedProvider.logo
        } : undefined,
        price: typeof formData.price === 'string' ? parseFloat(formData.price || '0') : formData.price,
        originalPrice: formData.originalPrice && formData.originalPrice !== '' 
          ? (typeof formData.originalPrice === 'string' ? parseFloat(formData.originalPrice) : formData.originalPrice) 
          : undefined,
        currency: formData.currency,
        location: formData.location,
        link: formData.link,
        specs: {
          cpu: formData.specs?.cpu || '',
          ram: formData.specs?.ram || '',
          storage: formData.specs?.storage || '',
          bandwidth: formData.specs?.bandwidth || ''
        }
      };
      
      // 提交数据
      onSubmit(submitData);
      
      // 显示成功提示
      toast.success(initialData.id ? '特价VPS更新成功！' : '特价VPS添加成功！');
      
      // 如果不是编辑模式，重置表单
      if (!initialData || !initialData.id) {
        resetForm();
      }
    } catch (error) {
      console.error('提交表单时出错:', error);
      toast.error('提交失败，请稍后重试');
    }
  };
  
  // 重置表单
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      currency: 'USD',
      location: '',
      specs: {
        cpu: '',
        ram: '',
        storage: '',
        bandwidth: ''
      },
      providerId: '',
      tags: [],
      features: [],
      link: '',
      couponCode: '',
      expiryDate: ''
    });
    setSelectedTags([]);
    setSelectedFeatures([]);
    setErrors({});
    setFormTouched(false);
  };

  // 渲染错误提示
  const renderError = (fieldName: string) => {
    if (!errors[fieldName]) return null;
    return (
      <div className="text-red-400 text-sm mt-1 flex items-center animate-fadeIn">
        <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
        {errors[fieldName]}
      </div>
    );
  };
  
  // 复制优惠码到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('已复制到剪贴板');
      })
      .catch((err) => {
        console.error('复制失败:', err);
        toast.error('复制失败');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
      {/* 表单标题 */}
      <div className="border-b border-gray-700 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-white">
          {initialData.id ? '编辑特价VPS' : '添加新特价VPS'}
        </h2>
        <p className="text-gray-400 mt-1">填写以下信息以{initialData.id ? '更新' : '创建'}VPS特价信息</p>
      </div>
      
      {/* 基本信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-error={!!errors.providerId}>
          <label className="block mb-1 font-medium">提供商 <span className="text-red-400">*</span></label>
          <select
            name="providerId"
            value={formData.providerId}
            onChange={handleInputChange}
            className={`w-full bg-gray-700 p-2 rounded border ${errors.providerId ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
          >
            <option value="">选择提供商</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
          {renderError('providerId')}
        </div>
        
        <div data-error={!!errors.title}>
          <label className="block mb-1 font-medium">标题 <span className="text-red-400">*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="例如：2核4G高性能VPS"
            className={`w-full bg-gray-700 p-2 rounded border ${errors.title ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
          />
          {renderError('title')}
        </div>
      </div>
      
      {/* 描述 */}
      <div data-error={!!errors.description}>
        <label className="block mb-1 font-medium">描述 <span className="text-red-400">*</span></label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          placeholder="详细描述这个特价VPS的优势和特点"
          className={`w-full bg-gray-700 p-3 rounded border ${errors.description ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
        />
        {renderError('description')}
        <div className="text-gray-400 text-xs mt-1">
          建议包含产品亮点、适用场景和技术规格等信息
        </div>
      </div>
      
      {/* 价格信息 */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-white font-medium mb-3">价格信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div data-error={!!errors.price}>
            <label className="block mb-1 font-medium">价格 <span className="text-red-400">*</span></label>
            <div className="relative">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                placeholder="5.99"
                className={`w-full bg-gray-700 p-2 pl-8 rounded border ${errors.price ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                {formData.currency === 'USD' ? '$' : 
                 formData.currency === 'CNY' ? '¥' : 
                 formData.currency === 'EUR' ? '€' : 
                 formData.currency === 'GBP' ? '£' : 
                 formData.currency === 'JPY' ? '¥' : '$'}
              </div>
            </div>
            {renderError('price')}
          </div>
          
          <div>
            <label className="block mb-1 font-medium">原价</label>
            <div className="relative">
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                placeholder="9.99"
                className="w-full bg-gray-700 p-2 pl-8 rounded border border-gray-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                {formData.currency === 'USD' ? '$' : 
                 formData.currency === 'CNY' ? '¥' : 
                 formData.currency === 'EUR' ? '€' : 
                 formData.currency === 'GBP' ? '£' : 
                 formData.currency === 'JPY' ? '¥' : '$'}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block mb-1 font-medium">货币 <span className="text-red-400">*</span></label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="USD">美元 (USD)</option>
              <option value="CNY">人民币 (CNY)</option>
              <option value="EUR">欧元 (EUR)</option>
              <option value="GBP">英镑 (GBP)</option>
              <option value="JPY">日元 (JPY)</option>
            </select>
          </div>
        </div>
        
        {formData.price && formData.originalPrice && formData.originalPrice !== '' && parseFloat(formData.price.toString()) < parseFloat(formData.originalPrice.toString()) && (
          <div className="mt-3 bg-green-900/30 text-green-400 p-2 rounded text-sm flex items-center">
            <span className="font-medium">
              折扣: {Math.round((1 - parseFloat(formData.price.toString()) / parseFloat(formData.originalPrice.toString())) * 100)}% 优惠
            </span>
          </div>
        )}
      </div>
      
      {/* 位置和链接 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-error={!!errors.location}>
          <label className="block mb-1 font-medium">位置 <span className="text-red-400">*</span></label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="例如：美国洛杉矶"
            className={`w-full bg-gray-700 p-2 rounded border ${errors.location ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
          />
          {renderError('location')}
        </div>
        
      <div data-error={!!errors.link}>
          <label className="block mb-1 font-medium">购买链接 <span className="text-red-400">*</span></label>
          <div className="relative">
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com/deal"
              className={`w-full bg-gray-700 p-2 pl-9 rounded border ${errors.link ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Globe className="h-4 w-4" />
            </div>
            {formData.link && (
              <button
                type="button"
                onClick={() => window.open(formData.link, '_blank')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-blue-400"
                title="在新标签页中打开链接"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            )}
          </div>
          {renderError('link')}
          <div className="text-gray-400 text-xs mt-1">
            输入完整的URL，包括http://或https://
          </div>
        </div>
      </div>
      
      {/* 服务器规格 */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-white font-medium mb-3">服务器规格</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div data-error={!!errors['specs.cpu']}>
            <label className="block mb-1 font-medium">CPU <span className="text-red-400">*</span></label>
            <input
              type="text"
              name="cpu"
              value={formData.specs?.cpu || ''}
              onChange={handleInputChange}
              placeholder="例如：2核"
              className={`w-full bg-gray-700 p-2 rounded border ${errors['specs.cpu'] ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
            />
            {renderError('specs.cpu')}
          </div>
          
          <div data-error={!!errors['specs.ram']}>
            <label className="block mb-1 font-medium">内存 <span className="text-red-400">*</span></label>
            <input
              type="text"
              name="ram"
              value={formData.specs?.ram || ''}
              onChange={handleInputChange}
              placeholder="例如：4GB"
              className={`w-full bg-gray-700 p-2 rounded border ${errors['specs.ram'] ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
            />
            {renderError('specs.ram')}
          </div>
          
          <div data-error={!!errors['specs.storage']}>
            <label className="block mb-1 font-medium">存储 <span className="text-red-400">*</span></label>
            <input
              type="text"
              name="storage"
              value={formData.specs?.storage || ''}
              onChange={handleInputChange}
              placeholder="例如：80GB SSD"
              className={`w-full bg-gray-700 p-2 rounded border ${errors['specs.storage'] ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
            />
            {renderError('specs.storage')}
          </div>
          
          <div data-error={!!errors['specs.bandwidth']}>
            <label className="block mb-1 font-medium">带宽 <span className="text-red-400">*</span></label>
            <input
              type="text"
              name="bandwidth"
              value={formData.specs?.bandwidth || ''}
              onChange={handleInputChange}
              placeholder="例如：1TB/月"
              className={`w-full bg-gray-700 p-2 rounded border ${errors['specs.bandwidth'] ? 'border-red-400' : 'border-gray-600'} focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
            />
            {renderError('specs.bandwidth')}
          </div>
        </div>
      </div>
      
      {/* 标签 */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-white font-medium mb-3">标签</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map(tag => (
            <span 
              key={tag} 
              className="bg-blue-600/30 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button 
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 hover:text-red-300 focus:outline-none"
                aria-label={`移除标签 ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedTags.length === 0 && (
            <span className="text-gray-400 text-sm">尚未添加标签</span>
          )}
        </div>
        
        <div className="flex mb-3">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'tag')}
            placeholder="添加自定义标签"
            className="flex-1 bg-gray-700 p-2 rounded-l border-y border-l border-gray-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition-colors"
          >
            添加
          </button>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-2">常用标签:</p>
          <div className="flex flex-wrap gap-2">
            {commonTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddCommonTag(tag)}
                disabled={selectedTags.includes(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-blue-600/30 hover:text-blue-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 特性 */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-white font-medium mb-3">特性</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedFeatures.map(feature => (
            <span 
              key={feature} 
              className="bg-green-600/30 text-green-400 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {feature}
              <button 
                type="button"
                onClick={() => handleRemoveFeature(feature)}
                className="ml-2 hover:text-red-300 focus:outline-none"
                aria-label={`移除特性 ${feature}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedFeatures.length === 0 && (
            <span className="text-gray-400 text-sm">尚未添加特性</span>
          )}
        </div>
        
        <div className="flex mb-3">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'feature')}
            placeholder="添加自定义特性"
            className="flex-1 bg-gray-700 p-2 rounded-l border-y border-l border-gray-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r transition-colors"
          >
            添加
          </button>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-2">常用特性:</p>
          <div className="flex flex-wrap gap-2">
            {commonFeatures.map(feature => (
              <button
                key={feature}
                type="button"
                onClick={() => handleAddCommonFeature(feature)}
                disabled={selectedFeatures.includes(feature)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedFeatures.includes(feature)
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-green-600/30 hover:text-green-400'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 优惠码和过期日期 */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-white font-medium mb-3">促销信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">优惠码</label>
            <div className="relative">
              <input
                type="text"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleInputChange}
                placeholder="例如：SAVE20"
                className="w-full bg-gray-700 p-2 pl-9 rounded border border-gray-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Tag className="h-4 w-4" />
              </div>
              {formData.couponCode && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(formData.couponCode)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-blue-400"
                  title="复制优惠码"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              如果有优惠码，请在此处填写（点击右侧图标可复制）
            </div>
          </div>
          
          <div>
            <label className="block mb-1 font-medium">过期日期</label>
            <div className="relative">
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full bg-gray-700 p-2 pl-9 rounded border border-gray-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
            <div className="text-gray-400 text-xs mt-1">
              特价有效期截止日期
            </div>
          </div>
        </div>
        
        {formData.expiryDate && (
          <div className="mt-3 bg-blue-900/30 text-blue-400 p-2 rounded text-sm flex items-center">
            <Info className="h-4 w-4 mr-2" />
            <span>
              此特价将于 {new Date(formData.expiryDate).toLocaleDateString('zh-CN')} 过期
              {new Date(formData.expiryDate) < new Date() && " (已过期)"}
            </span>
          </div>
        )}
      </div>
      
      {/* 提交按钮区域 */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/50"
          >
            取消
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              处理中...
            </>
          ) : (
            <>{initialData.id ? '更新特价VPS' : '添加特价VPS'}</>
          )}
        </button>
      </div>
    </form>
  );
}
