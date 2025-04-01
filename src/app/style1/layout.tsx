import { Inter } from "next/font/google";
import { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import dynamic from "next/dynamic";

// 动态导入以避免SSR问题
const DynamicBackground = dynamic(
  () => import("@/components/DynamicBackground"),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "技术支持 | 简约星空风格",
  description: "简约设计，星空背景主题的技术支持页面",
};

export default function Style1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 