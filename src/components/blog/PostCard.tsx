import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  saveScrollPosition: () => void;
  featured?: boolean;
}

export function PostCard({ post, saveScrollPosition, featured = false }: PostCardProps) {
  return (
    <Link 
      href={`/posts/${post.id}`} 
      className={`block ${featured ? 'mb-8' : ''} group relative`}
      onClick={saveScrollPosition}
    >
      {featured && (
        <>
          {/* 装饰性元素 - 左侧垂直线 */}
          <div className="absolute left-[-20px] top-[30px] bottom-[30px] w-[3px] bg-gradient-to-b from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* 装饰性元素 - 右上角装饰点 */}
          <div className="absolute right-[-8px] top-[-8px] w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 shadow-lg"></div>
        </>
      )}
      
      {/* 卡片容器 - 添加精致边框效果 */}
      <div className={`bg-white dark:bg-gray-900 rounded-${featured ? 'xl' : 'lg'} overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-800 group-hover:border-blue-200 dark:group-hover:border-blue-900 h-full`}>
        {/* 渐变色背景封面图 */}
        <div className={`relative h-${featured ? '44 md:h-48' : '32'} overflow-hidden`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* 装饰性角标 - 分类标识 */}
          {featured && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-md text-xs font-medium shadow-sm border-l-2 border-blue-500">
              {post.category}
            </div>
          )}
          
          {/* 标题和描述覆盖在图片上 */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <h2 className={`${featured ? 'text-xl' : 'text-sm'} font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-300 font-['KuaiKanShiJieTi'] ${!featured && 'line-clamp-1'}`}>
              {post.title}
            </h2>
            <p className="text-white/90 text-xs">
              {featured ? (
                `${post.date} · ${post.author}`
              ) : (
                <span className="flex items-center gap-1 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.date}
                </span>
              )}
            </p>
          </div>
        </div>
        
        {/* 文章摘要 */}
        <div className="p-4 relative">
          {featured && (
            /* 装饰性引号 */
            <div className="absolute top-2 left-2 text-4xl text-blue-100 dark:text-gray-800 opacity-30 font-serif">"</div>
          )}
          
          <p className={`text-gray-700 dark:text-gray-300 mb-3 line-clamp-2 text-sm ${featured ? 'pl-3 relative z-10' : ''}`}>
            {post.description}
          </p>
          
          {/* 标签 */}
          {featured ? (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </span>
              <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded text-[10px]">
                {post.category}
              </span>
            </div>
          )}
          
          {/* 阅读更多 - 仅在特色文章中显示 */}
          {featured && (
            <div className="flex justify-end items-center">
              <span className="text-xs text-blue-500 dark:text-blue-400 group-hover:underline inline-flex items-center gap-1">
                阅读更多 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
      
      {featured && (
        /* 装饰性元素 - 右侧垂直线 */
        <div className="absolute right-[-20px] top-[30px] bottom-[30px] w-[3px] bg-gradient-to-b from-purple-500 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </Link>
  );
} 