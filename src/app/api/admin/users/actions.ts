import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// 用户创建接口
export interface UserCreateData {
  name: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
}

// 用户更新接口
export interface UserUpdateData {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  image?: string;
}

/**
 * 获取所有用户
 */
export async function getAllUsers(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // 不返回密码
        password: false,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    }),
    prisma.user.count()
  ]);
  
  return {
    users,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit
    }
  };
}

/**
 * 获取单个用户
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      // 不返回密码
      password: false,
    }
  });
}

/**
 * 创建新用户
 */
export async function createUser(data: UserCreateData) {
  const { name, email, password, role = 'user', image } = data;
  
  // 检查邮箱是否已存在
  const existingUser = await prisma.user.findUnique({ 
    where: { email } 
  });
  
  if (existingUser) {
    throw new Error('邮箱已被注册');
  }

  // 密码加密
  const hashedPassword = await hash(password, 12);
  
  // 生成默认头像（如果未提供）
  const defaultImage = image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  
  // 创建用户
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      image: defaultImage
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      // 不返回密码
      password: false,
    }
  });
  
  return user;
}

/**
 * 更新用户
 */
export async function updateUser(id: string, data: UserUpdateData) {
  const { name, email, password, role, image } = data;
  
  // 构建更新数据
  const updateData: any = {};
  
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (role) updateData.role = role;
  if (image) updateData.image = image;
  
  // 如果更新密码，需要加密
  if (password) {
    updateData.password = await hash(password, 12);
  }
  
  // 如果更新邮箱，需要检查是否已存在
  if (email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: id }
      }
    });
    
    if (existingUser) {
      throw new Error('邮箱已被其他用户使用');
    }
  }
  
  // 更新用户
  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      // 不返回密码
      password: false,
    }
  });
  
  return user;
}

/**
 * 删除用户
 */
export async function deleteUser(id: string) {
  // 检查用户是否存在
  const user = await prisma.user.findUnique({
    where: { id }
  });
  
  if (!user) {
    throw new Error('用户不存在');
  }
  
  // 删除用户
  await prisma.user.delete({
    where: { id }
  });
  
  return { success: true };
} 