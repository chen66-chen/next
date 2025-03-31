import { NextRequest, NextResponse } from 'next/server';
import { commentService } from '@/services/commentService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * 获取评论列表
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const postSlug = searchParams.get('postSlug');

    if (!postId && !postSlug) {
      return NextResponse.json(
        { error: '必须提供 postId 或 postSlug 参数' },
        { status: 400 }
      );
    }

    const comments = await commentService.getComments(
      postId || '',
      postSlug || undefined
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error('获取评论失败:', error);
    return NextResponse.json(
      { error: '获取评论失败' },
      { status: 500 }
    );
  }
}

/**
 * 创建新评论
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const data = await request.json();

    // 验证必需字段
    if (!data.content) {
      return NextResponse.json(
        { error: '评论内容不能为空' },
        { status: 400 }
      );
    }

    if (!data.postId) {
      return NextResponse.json(
        { error: '必须提供文章ID' },
        { status: 400 }
      );
    }

    // 准备评论数据
    const commentData = {
      content: data.content,
      postId: data.postId,
      postSlug: data.postSlug || data.postId,
      parentId: data.parentId,
      // 如果用户已登录，使用登录用户信息
      ...(session?.user?.id && { userId: session.user.id }),
      // 如果用户未登录，使用提供的访客信息
      ...(!session?.user?.id && {
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorImage: data.authorImage
      })
    };

    // 验证访客信息
    if (!session?.user?.id && (!data.authorName || !data.authorEmail)) {
      return NextResponse.json(
        { error: '必须提供姓名和邮箱' },
        { status: 400 }
      );
    }

    // 创建评论
    const comment = await commentService.createComment(commentData);

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('创建评论失败:', error);
    return NextResponse.json(
      { error: '创建评论失败' },
      { status: 500 }
    );
  }
}