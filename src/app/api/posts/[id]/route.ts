import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 文章数据的存储路径
const POSTS_DIR = path.join(process.cwd(), 'data/posts');

// 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const filePath = path.join(POSTS_DIR, `${id}.json`);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: '文章不存在' },
        { status: 404 }
      );
    }
    
    // 删除文件
    fs.unlinkSync(filePath);
    
    return NextResponse.json(
      { success: true, message: '文章删除成功' },
      { status: 200 }
    );
  } catch (error) {
    console.error('删除文章失败:', error);
    return NextResponse.json(
      { message: '删除文章失败，请稍后再试' },
      { status: 500 }
    );
  }
}

// 获取单篇文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const filePath = path.join(POSTS_DIR, `${id}.json`);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: '文章不存在' },
        { status: 404 }
      );
    }
    
    // 读取文章内容
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(fileContent);
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('获取文章失败:', error);
    return NextResponse.json(
      { message: '获取文章失败，请稍后再试' },
      { status: 500 }
    );
  }
} 