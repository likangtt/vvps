'use client';

import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  content: string;
}

export default function NewBlogPost() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    author: 'VPS优惠团队',
    date: new Date().toISOString().split('T')[0],
    category: '',
    tags: [],
    coverImage: '',
    excerpt: '',
    content: ''
  });
  const [tagsInput, setTagsInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSlugGeneration = () => {
    if (formData.title) {
      // 简单的slug生成逻辑，将标题转换为小写，替换空格为连字符，移除特殊字符
      const slug = formData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 生成一个新的ID（在实际应用中，这通常由后端处理）
    const newPost = {
      ...formData,
      id: Date.now().toString()
    };
    
    // 在实际应用中，这里应该调用API保存数据
    alert('在实际应用中，这里会将数据保存到后端API');
    console.log('Form data to save:', newPost);
    
    // 模拟保存成功后返回列表页
    router.push('/admin/blog');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="添加新博客文章" />
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">添加新博客文章</h1>
            <button 
              onClick={() => router.push('/admin/blog')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              返回列表
            </button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  标题
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSlugGeneration}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                  >
                    生成Slug
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                  作者
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  发布日期
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  分类
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                  标签 (用逗号分隔)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tagsInput}
                  onChange={handleTagsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                  封面图片URL
                </label>
                <input
                  type="text"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excerpt">
                  摘要
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt || ''}
                  onChange={handleChange}
                  rows={3}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                  内容 (Markdown格式)
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content || ''}
                  onChange={handleChange}
                  rows={15}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/admin/blog')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
              >
                取消
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                创建文章
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}