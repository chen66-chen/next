import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // 风格配置
  const styles = [
    {
      id: 'style1',
      name: '技术支持',
      titleStyle: "font-['KuaiKanShiJieTi'] text-site1-primary",
      textStyle: "text-site1-secondary",
      hoverStyle: "hover:text-site1-blue",
    },
    {
      id: 'style2',
      name: '小臣のWeb',
      titleStyle: "font-['NotoSerifSC'] text-site2-primary",
      textStyle: "text-site2-secondary",
      hoverStyle: "hover:text-site2-teal",
    },
    {
      id: 'style3',
      name: 'Chryssolion Chen安全小窝',
      titleStyle: "font-['HanTang'] text-site3-primary dark:text-site3-light",
      textStyle: "text-site3-secondary",
      hoverStyle: "hover:text-site3-blue",
    },
    {
      id: 'style4',
      name: 'Chryssolion Chen',
      titleStyle: "font-kuaikan text-site4-primary",
      textStyle: "text-site4-text",
      hoverStyle: "hover:text-site4-blue",
    },
    {
      id: 'style5',
      name: 'Chryssolion Chen.0',
      titleStyle: "font-noto text-[#213b53]",
      textStyle: "text-[#2c3e50]",
      hoverStyle: "hover:text-[#40a9a9]",
    }
  ];

  return (
    <footer className="border-t py-10 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/80 dark:to-slate-800/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {styles.map((style) => (
            <div key={style.id} className="text-center space-y-3">
              <h3 className={cn("text-lg mb-2", style.titleStyle)}>
                {style.name}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${style.id}`} className={cn(style.textStyle, style.hoverStyle, "transition-colors")}>
                    风格首页
                  </Link>
                </li>
                <li>
                  <Link href={`/about?style=${style.id}`} className={cn(style.textStyle, style.hoverStyle, "transition-colors")}>
                    关于设计
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={(e) => e.preventDefault()} className={cn(style.textStyle, style.hoverStyle, "transition-colors")}>
                    文章归档
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground mb-1">
              小臣 (Blog) © {currentYear} - 博客
            </p>
            <p className="text-xs text-muted-foreground/70">
              由 Next.js 和 Tailwind CSS 强力驱动
            </p>
          </div>

          <div className="flex gap-6">
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              使用条款
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              隐私政策
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
