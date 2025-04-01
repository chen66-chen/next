/**
 * 创建管理员用户脚本
 * 
 * 用法: npx ts-node scripts/create-admin.ts <email> <password>
 * 
 * 此脚本将:
 * 1. 检查用户是否存在
 * 2. 如果存在，将其角色设置为'admin'
 * 3. 如果不存在，创建一个带有admin角色的新用户
 */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

// 初始化Prisma客户端
const prisma = new PrismaClient();

async function main() {
  // 获取命令行参数
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || '管理员';

  if (!email || !password) {
    console.error('错误: 必须提供邮箱和密码');
    console.log('用法: npx ts-node scripts/create-admin.ts <email> <password> [name]');
    process.exit(1);
  }

  try {
    // 检查用户是否存在
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    // 密码加密
    const hashedPassword = await hash(password, 12);

    if (existingUser) {
      // 更新现有用户为管理员
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          role: 'admin',
          // 如果提供了新密码，则更新密码
          ...(password && { password: hashedPassword })
        }
      });
      console.log(`已将用户 ${updatedUser.email} 设置为管理员`);
    } else {
      // 创建新管理员用户
      const newAdmin = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'admin',
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        }
      });
      console.log(`已创建新管理员用户 ${newAdmin.email}`);
    }

    console.log('操作成功完成');
  } catch (error) {
    console.error('创建管理员时发生错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 执行主函数
main(); 