import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 读取博客文章数据文件
    const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const blogPosts = JSON.parse(fileContents);
    
    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}