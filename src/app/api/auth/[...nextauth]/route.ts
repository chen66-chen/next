/**
 * NextAuth API路由处理程序
 * 
 * 使用lib/auth.ts中的配置来处理认证请求
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// 创建NextAuth处理程序
const handler = NextAuth(authOptions);

// 导出处理程序
export { handler as GET, handler as POST };