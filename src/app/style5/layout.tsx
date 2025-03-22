import { Metadata } from "next";

export const metadata: Metadata = {
  title: "小臣のWeb 2.0 | 小臣",
  description: "全屏动漫背景，文章内容卡片式布局，清新自然的UI设计",
  keywords: "Chryssolion Chen,博客,动漫,卡片式,清新,UI,设计,blog",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
