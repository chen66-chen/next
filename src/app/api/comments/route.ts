import { NextRequest, NextResponse } from 'next/server';
import { commentService } from '@/services/commentService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sensitiveWordFilter } from '@/services/sensitiveWordFilter';

/**
 * 获取评论列表
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const postSlug = searchParams.get('postSlug');
    const includeAll = searchParams.get('includeAll') === 'true';
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';

    if (!postId && !postSlug) {
      return NextResponse.json(
        { error: '必须提供 postId 或 postSlug 参数' },
        { status: 400 }
      );
    }

    // 管理员可以看到所有评论，普通用户只能看到已批准的评论
    const status = (isAdmin && includeAll) ? undefined : 'approved';
    
    const comments = await commentService.getComments(
      postId || '',
      postSlug || undefined,
      status
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
    const isAdmin = session?.user?.role === 'admin';

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
    
    // 检查敏感词
    const containsSensitiveWords = sensitiveWordFilter.containsSensitiveWords(data.content);
    
    // 过滤敏感词
    const filteredContent = sensitiveWordFilter.filterText(data.content);
    
    // 设置评论状态：管理员评论自动通过，包含敏感词的评论自动拒绝，其他待审核
    let status = 'pending';
    if (isAdmin) {
      status = 'approved';
    } else if (containsSensitiveWords) {
      status = 'rejected';
    }

    // 准备评论数据
    const commentData = {
      content: filteredContent,
      postId: data.postId,
      postSlug: data.postSlug || data.postId,
      parentId: data.parentId,
      status,
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

    // 根据敏感词检查结果返回不同的消息
    if (containsSensitiveWords && !isAdmin) {
      return NextResponse.json({
        ...comment,
        message: '您的评论包含敏感词，已被标记为需要审核。'
      }, { status: 201 });
    } else if (!isAdmin) {
      return NextResponse.json({
        ...comment,
        message: '评论已提交，等待管理员审核后显示。'
      }, { status: 201 });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('创建评论失败:', error);
    return NextResponse.json(
      { error: '创建评论失败' },
      { status: 500 }
    );
  }
}