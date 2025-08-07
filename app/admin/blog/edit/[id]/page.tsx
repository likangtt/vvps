'use client';

import { useState, useEffect } from 'react';
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

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // 在实际应用中，这里应该从API获取数据
        // 这里我们模拟从本地JSON文件加载数据
        const response = await fetch('/api/blog-posts/' + params.id);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setPost(data);
        setFormData(data);
        setTagsInput(data.tags.join(', '));
      } catch (error) {
        console.error('Error loading blog post:', error);
        // 加载本地示例数据作为备用
        import('@/data/blog-posts.json')
          .then((module) => {
            const posts = module.default;
            const post = posts.find(p => p.id === params.id);
            if (post) {
              setPost(post);
              setFormData(post);
              setTagsInput(post.tags.join(', '));
            } else {
              router.push('/admin/blog');
            }
          })
          .catch((err) => {
            console.error('Error loading local blog posts:', err);
          });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 在实际应用中，这里应该调用API保存数据
    alert('在实际应用中，这里会将数据保存到后端API');
    console.log('Form data to save:', formData);
    
    // 模拟保存成功后返回列表页
    router.push('/admin/blog');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="编辑博客文章" />
          <main className="p-6">
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">加载中...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="编辑博客文章" />
          <main className="p-6">
            <div className="text-center py-10">
              <p className="text-red-500">文章未找到</p>
              <button 
                onClick={() => router.push('/admin/blog')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                返回文章列表
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="编辑博客文章" />
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">编辑博客文章</h1>
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
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
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
                  value={formData.date ? formData.date.substring(0, 10) : ''}
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
                保存更改
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
