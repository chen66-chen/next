import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white/70 dark:bg-gray-900/70 shadow-inner py-6 mt-10 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © 2025 小臣の Web · 基于 Next.js 构建
        </p>
        <div className="mt-4">
          <Link href="/demo" className="text-blue-500 hover:text-blue-600 transition-colors">
            查看内容展示创新演示 &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
} 