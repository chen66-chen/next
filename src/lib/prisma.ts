import { PrismaClient } from '@prisma/client';

// 为全局变量添加类型声明
declare global {
  var prisma: PrismaClient | undefined;
}

// PrismaClient是一个重量级对象，应该在整个应用中只创建一次
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // 在开发环境中，使用全局变量保存PrismaClient实例，避免热重载时创建多个实例
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error']
    });
  }
  prisma = global.prisma;
}

export default prisma; 