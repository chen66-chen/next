import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * 扩展NextAuth Session类型
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  /**
   * 用户类型扩展
   */
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * 扩展JWT类型
   */
  interface JWT {
    id: string;
    role: string;
  }
} 