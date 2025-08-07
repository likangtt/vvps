'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
}

export default function BlogPostList() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // 在实际应用中，这里应该从API获取数据
        const response = await fetch('/api/blog-posts');
        if (!response.ok) {
          throw new Error('获取博客文章失败');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('加载博客文章时出错:', error);
        setError('加载博客文章时出错，请稍后再试');
        
        // 加载本地示例数据作为备用
        import('@/data/blog-posts.json')
          .then((module) => {
            setPosts(module.default);
          })
          .catch((err) => {
            console.error('加载本地博客文章时出错:', err);
          });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？此操作无法撤销。')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog-posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除文章失败');
      }

      // 从列表中移除已删除的文章
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('删除文章时出错:', error);
      alert('删除文章失败，请稍后再试');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          重试
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">暂无博客文章</p>
        <button 
          onClick={() => router.push('/admin/blog/new')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          创建第一篇文章
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">标题</th>
            <th className="py-3 px-6 text-left">作者</th>
            <th className="py-3 px-6 text-left">分类</th>
            <th className="py-3 px-6 text-left">发布日期</th>
            <th className="py-3 px-6 text-center">操作</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left">
                <div className="font-medium">{post.title}</div>
                <div className="text-xs text-gray-500">/blog/{post.slug}</div>
              </td>
              <td className="py-3 px-6 text-left">{post.author}</td>
              <td className="py-3 px-6 text-left">{post.category}</td>
              <td className="py-3 px-6 text-left">{new Date(post.date).toLocaleDateString('zh-CN')}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <Link href={`/blog/${post.slug}`} target="_blank" className="w-6 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                  <Link href={`/admin/blog/edit/${post.id}`} className="w-6 mr-2 transform hover:text-yellow-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>
                  <button onClick={() => handleDelete(post.id)} className="w-6 transform hover:text-red-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}