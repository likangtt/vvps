'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import BlogPostList from '@/components/admin/BlogPostList';
import Link from 'next/link';

export default function AdminBlogPage() {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="博客管理" />
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">博客文章管理</h1>
            <Link 
              href="/admin/blog/new" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              添加新文章
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <BlogPostList />
          </div>
        </main>
      </div>
    </div>
  );
}