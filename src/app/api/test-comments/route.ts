import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 直接从数据库获取所有评论
    const comments = await prisma.comment.findMany({
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

    // 获取所有评论数量
    const count = await prisma.comment.count();

    return NextResponse.json({
      success: true,
      message: '测试API返回所有评论',
      comments,
      count
    });
  } catch (error) {
    console.error('测试API错误:', error);
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
} 