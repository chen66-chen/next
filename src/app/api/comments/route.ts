import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// 创建评论
export async function POST(request: NextRequest) {
  try {
    // 验证用户是否已登录
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: '未授权，请先登录' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content, postId, postSlug, parentId } = body;

    // 验证请求数据
    if (!content || !postId || !postSlug) {
      return NextResponse.json(
        { message: '请提供所有必填字段' },
        { status: 400 }
      );
    }

    // 获取用户ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json(
        { message: '用户不存在' },
        { status: 404 }
      );
    }

    // 创建评论
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        postSlug,
        userId: user.id,
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: '评论发布成功',
        comment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('评论发布错误:', error);
    return NextResponse.json(
      { message: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
}

// 获取评论列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postSlug = searchParams.get('postSlug');
    
    if (!postSlug) {
      return NextResponse.json(
        { message: '请提供文章标识' },
        { status: 400 }
      );
    }

    // 获取顶级评论（没有父评论的评论）
    const comments = await prisma.comment.findMany({
      where: {
        postSlug,
        parentId: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('获取评论错误:', error);
    return NextResponse.json(
      { message: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
}