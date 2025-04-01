import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById, updateUser, deleteUser, UserUpdateData } from '../actions';

// 获取单个用户
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

    const userId = params.id;
    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '获取用户信息失败' },
      { status: 500 }
    );
  }
}

// 更新用户
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

    const userId = params.id;
    const data: UserUpdateData = await req.json();
    
    // 验证至少有一个更新字段
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: '至少提供一个要更新的字段' },
        { status: 400 }
      );
    }
    
    const user = await updateUser(userId, data);
    
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '更新用户失败' },
      { status: 500 }
    );
  }
}

// 删除用户
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

    const userId = params.id;
    await deleteUser(userId);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '删除用户失败' },
      { status: 500 }
    );
  }
} 