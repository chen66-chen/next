import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// 文章数据的存储路径
const POSTS_DIR = path.join(process.cwd(), 'data/posts');

// 确保posts目录存在
try {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    console.log('创建目录成功:', POSTS_DIR);
  }
} catch (err) {
  console.error('创建目录失败:', err);
}

// 创建新文章
export async function POST(request: NextRequest) {
  try {
    // 先尝试解析请求体
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('无法解析请求体:', e);
      return NextResponse.json(
        { message: '无效的请求格式' },
        { status: 400 }
      );
    }
    
    // 验证必要字段
    if (!body.title || !body.content) {
      return NextResponse.json(
        { message: '标题和内容不能为空' },
        { status: 400 }
      );
    }

    // 生成唯一ID
    const postId = uuidv4();
    
    // 创建新文章对象
    const newPost = {
      id: postId,
      title: body.title,
      description: body.description || '',
      content: body.content,
      published: true,
      coverImage: body.coverImage || '/images/default-cover.jpg',
      author: body.author || '匿名',
      // 标签处理 - 确保是数组
      tags: Array.isArray(body.tags) ? body.tags : [],
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // 将文章保存到文件系统
    try {
      const filePath = path.join(POSTS_DIR, `${postId}.json`);
      // 确保中文字符正确编码 - 修复编码问题
      const jsonContent = JSON.stringify(newPost, null, 2);
      // 使用utf8编码写入文件
      fs.writeFileSync(filePath, jsonContent, 'utf8');
      console.log('文章保存成功:', filePath);
    } catch (err) {
      console.error('保存文章到文件失败:', err);
      return NextResponse.json(
        { message: '无法保存文章，请检查服务器存储权限' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: '文章发布成功',
        id: postId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('发布文章时出错:', error);
    return NextResponse.json(
      { message: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
}

// 获取所有文章
export async function GET() {
  try {
    // 读取文章目录中的所有文件
    const files = fs.readdirSync(POSTS_DIR);
    const posts = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        try {
          const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
          const post = JSON.parse(content);
          // 确保标签是数组
          if (typeof post.tags === 'string') {
            try {
              post.tags = JSON.parse(post.tags);
            } catch (e) {
              post.tags = [];
            }
          }
          return post;
        } catch (error) {
          console.error(`读取文件 ${file} 失败:`, error);
          return null;
        }
      })
      .filter(Boolean) // 过滤掉无法解析的文件
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('获取文章失败:', error);
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    );
  }
} 