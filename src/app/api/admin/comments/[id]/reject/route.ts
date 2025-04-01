import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { commentService } from '@/services/commentService';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 获取会话信息并验证权限
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: '评论ID不能为空' }, { status: 400 });
    }

    // 拒绝评论
    const updatedComment = await commentService.rejectComment(id);
    
    return NextResponse.json({
      message: '评论已拒绝',
      comment: updatedComment
    });
  } catch (error) {
    console.error('拒绝评论失败:', error);
    return NextResponse.json({ error: '拒绝评论失败' }, { status: 500 });
  }
} 