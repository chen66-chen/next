import { Post } from "@/types";

interface CategoryListProps {
  posts: Post[];
  onCategoryClick: (category: string) => void;
}

export function CategoryList({ posts, onCategoryClick }: CategoryListProps) {
  // 获取唯一分类列表和每个分类的数量
  const categoriesWithCount = Array.from(
    posts.reduce((acc, post) => {
      if (!acc.has(post.category)) {
        acc.set(post.category, 0);
      }
      acc.set(post.category, acc.get(post.category)! + 1);
      return acc;
    }, new Map<string, number>())
  );

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4 border-b pb-2 font-['KuaiKanShiJieTi']">文章分类</h3>
      <ul className="space-y-2">
        {categoriesWithCount.map(([category, count], i) => (
          <li key={i} className="flex justify-between items-center">
            <span 
              className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
              {count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 