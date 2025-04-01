/**
 * 管理员用户API
 * 
 * 功能:
 * - 列出所有用户
 * - 获取用户总数
 * - 权限验证
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllUsers, createUser, UserCreateData } from './actions';

/**
 * 获取所有用户（需要管理员权限）
 */
export async function GET(req: NextRequest) {
  try {
    // 检查权限
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      );
    }

    // 获取分页参数
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // 获取用户列表
    const result = await getAllUsers(page, limit);
    
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '获取用户列表失败' },
      { status: 500 }
    );
  }
}

// 创建用户
export async function POST(req: NextRequest) {
  try {
    // 检查权限
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      );
    }

    // 获取请求数据
    const data: UserCreateData = await req.json();
    
    // 验证必填字段
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { error: '用户名、邮箱和密码为必填项' },
        { status: 400 }
      );
    }
    
    // 创建用户
    const user = await createUser(data);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '创建用户失败' },
      { status: 500 }
    );
  }
} 