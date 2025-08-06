'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import DealForm from '@/components/admin/DealForm';
import { Deal, Provider } from '@/types';
import deals from '@/data/deals.json';
import providersData from '@/data/providers.json';

// 类型断言确保providers是Provider[]类型
const providers = providersData as Provider[];

export default function AdminDealsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (dealData: Deal) => {
    setIsLoading(true);
    try {
      // 这里应该是API调用，但现在我们只是模拟
      console.log('提交的优惠数据:', dealData);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 添加成功提示
      toast.success('优惠添加成功！');
      
      // 成功后重定向到管理面板
      router.push('/admin');
    } catch (error) {
      console.error('提交优惠失败:', error);
      toast.error('提交失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">添加新优惠</h1>
      <DealForm 
        providers={providers} 
        initialData={{}} 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
      />
    </div>
  );
}