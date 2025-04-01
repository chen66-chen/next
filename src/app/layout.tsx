import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import MobileNav from "@/components/MobileNav";
import LayoutClient from "@/components/LayoutClient";
import SessionProvider from "@/components/SessionProvider";
import dynamic from "next/dynamic";

// 动态导入以避免SSR问题
const DynamicBackground = dynamic(
  () => import("@/components/DynamicBackground"),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "小臣の | Web",
  description: "一个不同风格的网站,展示精美的技术网站",
  keywords: "Web,设计,wordpress,nextjs,设计系统,多风格",
  metadataBase: new URL('https://your-domain.com'), // 替换为您的实际域名
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                
                // 检查是否是风格页面
                const isStylePage = window.location.pathname.startsWith('/style');
                if (isStylePage) {
                  document.documentElement.classList.add('style-page');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className}`}>
        <div className="relative min-h-screen overflow-hidden">
          {/* 3D动态背景 */}
          <DynamicBackground />
          
          {/* 半透明覆盖层，使内容更易读 */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/60 -z-5"></div>
          
          <SessionProvider>
            <LayoutClient>
              {children}
            </LayoutClient>
          </SessionProvider>
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
