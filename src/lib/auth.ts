/**
 * 集中式认证配置
 * 
 * 将所有NextAuth认证逻辑集中到一个文件中，以便在整个应用中重用
 */

import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

// 初始化Prisma客户端
const prisma = new PrismaClient();

/**
 * 登录尝试失败后的冷却时间 (毫秒)
 * 防止暴力破解攻击
 */
const COOLDOWN_TIME = 2000; // 2秒

/**
 * NextAuth配置选项
 */
export const authOptions: NextAuthOptions = {
  // 使用Prisma作为数据库适配器
  adapter: PrismaAdapter(prisma),
  
  // 认证提供者配置
  providers: [
    CredentialsProvider({
      name: "credentials",
      
      // 定义凭证表单字段
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      
      /**
       * 验证用户凭证
       * @param credentials - 用户提交的凭证
       * @returns 验证成功返回用户对象，失败返回null
       */
      async authorize(credentials) {
        // 验证请求中是否包含必要字段
        if (!credentials?.email || !credentials?.password) {
          throw new Error("请提供邮箱和密码");
        }

        try {
          // 根据邮箱查找用户
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase().trim()
            }
          });

          // 用户不存在
          if (!user || !user.password) {
            // 添加延迟以防止用户枚举攻击
            await new Promise(resolve => setTimeout(resolve, COOLDOWN_TIME));
            throw new Error("邮箱或密码错误");
          }

          // 验证密码
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          // 密码不正确
          if (!isPasswordValid) {
            // 添加延迟以防止暴力破解
            await new Promise(resolve => setTimeout(resolve, COOLDOWN_TIME));
            throw new Error("邮箱或密码错误");
          }

          // 身份验证成功，返回用户信息（不包含密码）
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            // @ts-ignore - User模型现在应该有role字段
            role: user.role || 'user', // 添加用户角色
          };
        } catch (error) {
          console.error("登录验证错误:", error);
          // 传递具体的错误信息
          throw error instanceof Error 
            ? error 
            : new Error("登录时发生错误，请稍后再试");
        }
      }
    })
  ],
  
  // 自定义页面路径
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/auth/error",
  },
  
  // 会话配置
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  
  // JWT配置
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  
  // 安全密钥
  secret: process.env.NEXTAUTH_SECRET,
  
  // 调试模式（仅在开发环境启用）
  debug: process.env.NODE_ENV === "development",
  
  // 回调函数
  callbacks: {
    /**
     * JWT回调 - 自定义JWT内容
     */
    async jwt({ token, user }) {
      // 当用户登录时添加额外信息到token
      if (user) {
        token.id = user.id;
        // @ts-ignore - 添加role字段
        token.role = user.role || 'user'; // 添加用户角色到token
      }
      return token;
    },
    
    /**
     * 会话回调 - 自定义会话内容
     */
    async session({ session, token }) {
      // 将token中的信息添加到session中
      if (token && session.user) {
        session.user.id = token.id as string;
        // @ts-ignore - 添加role字段
        session.user.role = token.role as string; // 添加用户角色到session
      }
      return session;
    }
  },
}; 