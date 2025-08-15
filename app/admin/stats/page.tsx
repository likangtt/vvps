'use client'

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import deals from '@/data/deals.json';

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDeals: 0,
    featuredDeals: 0,
    totalProviders: 0,
    regionStats: [] as any[],
    providerStats: [] as any[],
    tagStats: [] as any[]
  });

  useEffect(() => {
    // 计算统计数据
    const calculateStats = () => {
      try {
        // 基础统计
        const totalDeals = deals.length;
        // 将原价比当前价格高20%以上的优惠视为精选优惠
        const featuredDeals = deals.filter(deal => 
          deal.originalPrice && 
          deal.price && 
          deal.originalPrice > deal.price * 1.2
        ).length;
        
        // 提供商统计
        const providers = new Map();
        deals.forEach(deal => {
          const provider = deal.provider;
          if (!providers.has(provider)) {
            providers.set(provider, 1);
          } else {
            providers.set(provider, providers.get(provider) + 1);
          }
        });
        
        const providerStats = Array.from(providers.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);
        
        // 地区统计
        const regions = new Map();
        deals.forEach(deal => {
          const location = deal.location;
          const locationRegions = location.split('/');
          
          locationRegions.forEach(region => {
            const trimmedRegion = region.trim();
            if (!regions.has(trimmedRegion)) {
              regions.set(trimmedRegion, 1);
            } else {
              regions.set(trimmedRegion, regions.get(trimmedRegion) + 1);
            }
          });
        });
        
        const regionStats = Array.from(regions.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
        
        // 标签统计
        const tags = new Map();
        deals.forEach(deal => {
          if (Array.isArray(deal.tags)) {
            deal.tags.forEach(tag => {
              if (!tags.has(tag)) {
                tags.set(tag, 1);
              } else {
                tags.set(tag, tags.get(tag) + 1);
              }
            });
          }
        });
        
        const tagStats = Array.from(tags.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 15);
        
        setStats({
          totalDeals,
          featuredDeals,
          totalProviders: providers.size,
          regionStats,
          providerStats,
          tagStats
        });
        
        setLoading(false);
      } catch (error) {
        console.error('计算统计数据时出错:', error);
        setLoading(false);
      }
    };
    
    calculateStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">数据统计</h1>
          <p className="text-gray-400">VPS优惠数据分析</p>
        </div>
      </div>
      
      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">总优惠数</p>
              <p className="text-2xl font-bold text-white">{stats.totalDeals}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 text-xl">📊</span>
            </div>
          </div>
        </div>
        
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">精选优惠</p>
              <p className="text-2xl font-bold text-white">{stats.featuredDeals}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400 text-xl">⭐</span>
            </div>
          </div>
        </div>
        
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">提供商数量</p>
              <p className="text-2xl font-bold text-white">{stats.totalProviders}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-purple-400 text-xl">🏢</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 提供商分布 */}
        <div className="cyber-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">提供商优惠分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.providerStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12, fill: '#aaa' }}
                />
                <YAxis tick={{ fill: '#aaa' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#aaa' }} />
                <Bar dataKey="count" name="优惠数量" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* 地区分布 */}
        <div className="cyber-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">地区分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.regionStats}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                >
                  {stats.regionStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [`${value} 个优惠`, props.payload.name]}
                  contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#aaa' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* 标签分布 */}
        <div className="cyber-card p-6 col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">标签分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.tagStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" tick={{ fill: '#aaa' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150}
                  tick={{ fontSize: 12, fill: '#aaa' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#aaa' }} />
                <Bar dataKey="count" name="使用次数" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
