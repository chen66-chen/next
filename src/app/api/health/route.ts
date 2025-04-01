/**
 * 健康检查API - 用于监控服务状态
 */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// 初始化Prisma客户端
const prisma = new PrismaClient();

/**
 * 检查应用是否健康
 */
export async function GET() {
  try {
    // 验证数据库连接
    // 对于SQLite，使用简单查询检查连接
    await prisma.user.findFirst({ 
      select: { id: true },
      take: 1 
    });
    
    // 返回健康状态
    return NextResponse.json(
      { 
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    
    // 返回错误状态
    return NextResponse.json(
      { 
        status: 'error',
        message: '健康检查失败',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 