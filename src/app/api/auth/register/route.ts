/**
 * 用户注册API
 * 
 * 功能:
 * - 用户数据验证
 * - 密码加密
 * - 用户创建
 * - 邮箱唯一性检查
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { z } from 'zod';

// 初始化Prisma客户端
const prisma = new PrismaClient();

// 每秒最大请求次数
const MAX_REQUESTS_PER_MINUTE = 5;
// IP请求计数器
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * 用户注册数据验证模式
 */
const UserSchema = z.object({
  name: z.string()
    .min(2, { message: '用户名长度至少为2个字符' })
    .max(50, { message: '用户名长度不能超过50个字符' })
    .trim(),
  
  email: z.string()
    .email({ message: '请提供有效的邮箱地址' })
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(6, { message: '密码长度至少为6个字符' })
    .max(100, { message: '密码长度不能超过100个字符' })
    .regex(/[a-zA-Z]/, { message: '密码需要包含至少一个字母' })
    .regex(/[0-9]/, { message: '密码需要包含至少一个数字' })
});

// 定义用户验证模式的类型
type UserSchemaType = z.infer<typeof UserSchema>;

/**
 * 限制请求频率，防止暴力注册
 * @param ip - 客户端IP地址
 * @returns 是否超过限制
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const minute = 60 * 1000; // 毫秒
  
  // 获取IP的请求计数
  const ipData = ipRequestCounts.get(ip) || { count: 0, resetTime: now + minute };
  
  // 如果超过重置时间，重置计数
  if (now > ipData.resetTime) {
    ipData.count = 1;
    ipData.resetTime = now + minute;
  } else {
    ipData.count += 1;
  }
  
  // 更新IP计数
  ipRequestCounts.set(ip, ipData);
  
  // 判断是否超过频率限制
  return ipData.count > MAX_REQUESTS_PER_MINUTE;
}

/**
 * 处理注册POST请求
 */
export async function POST(request: NextRequest) {
  // 确保Prisma连接在finally块中关闭
  let localPrisma = prisma;
  
  try {
    console.log('开始处理注册请求');
    
    // 获取客户端IP地址
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    console.log('客户端IP:', ip);
    
    // 检查请求频率
    if (isRateLimited(ip)) {
      console.log('请求频率过高，已限制');
      return NextResponse.json(
        { message: '请求过于频繁，请稍后再试' },
        { status: 429 }
      );
    }
    
    // 解析请求体
    const body = await request.json();
    console.log('请求体数据:', { name: body.name, email: body.email });
    
    // 验证请求数据
    const result = UserSchema.safeParse(body);
    
    if (!result.success) {
      // 格式化验证错误信息
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join('; ');
      
      console.log('数据验证失败:', errorMessage);
      return NextResponse.json(
        { message: errorMessage },
        { status: 400 }
      );
    }
    
    // 使用验证通过的数据
    const { name, email, password } = result.data;
    console.log('数据验证通过，尝试连接数据库');

    // 尝试创建新的Prisma连接以测试连接是否正常
    try {
      // 测试数据库连接
      await localPrisma.$connect();
      console.log('数据库连接成功');
    } catch (dbError) {
      console.error('数据库连接失败:', dbError);
      return NextResponse.json(
        { message: '无法连接到数据库，请稍后再试' },
        { status: 500 }
      );
    }

    // 检查邮箱是否已被使用
    console.log('检查邮箱是否已被使用:', email);
    let existingUser;
    try {
      existingUser = await localPrisma.user.findUnique({
        where: { email },
      });
    } catch (dbError) {
      console.error('查询邮箱时出错:', dbError);
      return NextResponse.json(
        { message: '查询用户信息时出错，请稍后再试' },
        { status: 500 }
      );
    }

    if (existingUser) {
      console.log('邮箱已被注册:', email);
      return NextResponse.json(
        { message: '该邮箱已被注册' },
        { status: 409 }
      );
    }

    // 密码加密（使用高成本因子增加安全性）
    console.log('开始密码加密');
    let hashedPassword;
    try {
      hashedPassword = await hash(password, 12);
    } catch (hashError) {
      console.error('密码加密失败:', hashError);
      return NextResponse.json(
        { message: '注册过程中出现错误，请稍后再试' },
        { status: 500 }
      );
    }

    // 创建新用户
    console.log('创建新用户:', name, email);
    let user;
    try {
      user = await localPrisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          // 设置默认头像（如果没有提供）
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        },
      });
    } catch (createError) {
      console.error('创建用户失败:', createError);
      return NextResponse.json(
        { message: '创建用户失败，请稍后再试' },
        { status: 500 }
      );
    }

    console.log('注册成功:', user.id);
    // 返回成功响应，不包含密码
    return NextResponse.json(
      {
        message: '注册成功',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('注册过程中发生未处理的错误:', error);
    
    // 区分不同类型的错误
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: '提交的数据无效，请检查并重试' },
        { status: 400 }
      );
    }
    
    // 数据库连接错误
    if (error.code === 'P1001' || error.code === 'P1000') {
      return NextResponse.json(
        { message: '数据库连接失败，请检查数据库配置' },
        { status: 500 }
      );
    }
    
    // 提供更详细的错误信息用于调试
    return NextResponse.json(
      { 
        message: '服务器错误，请稍后再试',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    // 确保Prisma连接正确关闭
    try {
      await localPrisma.$disconnect();
      console.log('数据库连接已关闭');
    } catch (disconnectError) {
      console.error('关闭数据库连接时出错:', disconnectError);
    }
  }
}