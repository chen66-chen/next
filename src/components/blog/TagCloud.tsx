import { Post } from "@/types";

interface TagCloudProps {
  posts: Post[];
  onTagClick: (tag: string) => void;
}

export function TagCloud({ posts, onTagClick }: TagCloudProps) {
  // 获取所有标签的唯一列表
  const uniqueTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  );
  
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4 border-b pb-2 font-['KuaiKanShiJieTi']">标签云</h3>
      <div className="flex flex-wrap gap-2">
        {uniqueTags.map((tag, i) => (
          <span 
            key={i}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
} 