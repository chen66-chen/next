import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPostById, updatePost, deletePost, PostUpdateData } from '../actions';

// 获取单个文章
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 检查权限
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      );
    }

    const postId = params.id;
    const post = await getPostById(postId);
    
    if (!post) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '获取文章信息失败' },
      { status: 500 }
    );
  }
}

// 更新文章
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 检查权限
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      );
    }

    const postId = params.id;
    const data: PostUpdateData = await req.json();
    
    // 验证至少有一个更新字段
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: '至少提供一个要更新的字段' },
        { status: 400 }
      );
    }
    
    const post = await updatePost(postId, data);
    
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '更新文章失败' },
      { status: 500 }
    );
  }
}

// 删除文章
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 检查权限
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      );
    }

    const postId = params.id;
    await deletePost(postId);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '删除文章失败' },
      { status: 500 }
    );
  }
} 