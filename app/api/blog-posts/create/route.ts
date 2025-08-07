import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 读取博客文章数据文件
    const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const blogPosts = JSON.parse(fileContents);
    
    // 创建新文章
    const newPost = {
      ...body,
      id: Date.now().toString() // 使用时间戳作为ID
    };
    
    // 添加到文章列表
    blogPosts.push(newPost);
    
    // 写回文件
    fs.writeFileSync(filePath, JSON.stringify(blogPosts, null, 2), 'utf8');
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('创建博客文章时出错:', error);
    return NextResponse.json(
      { error: '创建博客文章失败' },
      { status: 500 }
    );
  }
}