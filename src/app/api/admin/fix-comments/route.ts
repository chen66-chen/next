import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

/**
 * 获取所有评论 - 修复版
 */
export async function GET(request: NextRequest) {
  try {
    // 获取会话信息并验证权限
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '20');

    // 构建查询条件 - 使用any绕过类型检查
    const where: any = {};
    if (status) {
      where.status = status;
    }
    
    // 直接查询评论
    const comments = await prisma.comment.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 统计评论数量
    const count = await prisma.comment.count({ where });

    return NextResponse.json({
      comments,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('获取评论失败:', error);
    return NextResponse.json({ 
      error: '获取评论失败',
      details: String(error)
    }, { status: 500 });
  }
} 