import Image from "next/image";

interface AuthorProps {
  name: string;
  avatarUrl: string;
  role: string;
  description: string;
}

export function Author({ name, avatarUrl, role, description }: AuthorProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4 border-b pb-2 font-['KuaiKanShiJieTi']">关于博主</h3>
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image
            src={avatarUrl}
            alt={`${name}的头像`}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
} 