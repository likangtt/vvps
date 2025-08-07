import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 读取博客文章数据文件
    const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const blogPosts = JSON.parse(fileContents);
    
    // 查找指定ID的博客文章
    const post = blogPosts.find((post: any) => post.id === params.id);
    
    if (!post) {
      return NextResponse.json(
        { error: '未找到博客文章' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('读取博客文章时出错:', error);
    return NextResponse.json(
      { error: '获取博客文章失败' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // 读取博客文章数据文件
    const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const blogPosts = JSON.parse(fileContents);
    
    // 查找并更新指定ID的博客文章
    const postIndex = blogPosts.findIndex((post: any) => post.id === params.id);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: '未找到博客文章' },
        { status: 404 }
      );
    }
    
    // 更新文章
    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      ...body,
      id: params.id // 确保ID不变
    };
    
    // 写回文件
    fs.writeFileSync(filePath, JSON.stringify(blogPosts, null, 2), 'utf8');
    
    return NextResponse.json(blogPosts[postIndex]);
  } catch (error) {
    console.error('更新博客文章时出错:', error);
    return NextResponse.json(
      { error: '更新博客文章失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 读取博客文章数据文件
    const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const blogPosts = JSON.parse(fileContents);
    
    // 查找指定ID的博客文章
    const postIndex = blogPosts.findIndex((post: any) => post.id === params.id);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: '未找到博客文章' },
        { status: 404 }
      );
    }
    
    // 删除文章
    blogPosts.splice(postIndex, 1);
    
    // 写回文件
    fs.writeFileSync(filePath, JSON.stringify(blogPosts, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除博客文章时出错:', error);
    return NextResponse.json(
      { error: '删除博客文章失败' },
      { status: 500 }
    );
  }
}