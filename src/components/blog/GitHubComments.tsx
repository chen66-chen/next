"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

interface GitHubCommentsProps {
  postId: string;
  postSlug: string;
}

export function GitHubComments({ postId, postSlug }: GitHubCommentsProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [giscusRepo, setGiscusRepo] = useState<`${string}/${string}`>("username/repo");
  const [giscusRepoId, setGiscusRepoId] = useState("");
  const [giscusCategory, setGiscusCategory] = useState("Announcements");
  const [giscusCategoryId, setGiscusCategoryId] = useState("");

  // 检查Giscus配置是否完成
  useEffect(() => {
    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
    
    if (repo && repo.includes('/')) {
      setGiscusRepo(repo as `${string}/${string}`);
    }
    if (repoId) setGiscusRepoId(repoId);
    if (category) setGiscusCategory(category);
    if (categoryId) setGiscusCategoryId(categoryId);
    
    if (repo && repoId && categoryId && 
        !repo.includes("你的GitHub用户名") && 
        !repoId.includes("你的仓库ID")) {
      setSetupComplete(true);
    }
  }, []);

  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-md"></div>;
  }

  // 如果Giscus未设置完成，显示设置指南
  if (!setupComplete) {
    return (
      <div className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="relative pb-2 mb-6">
          <h2 className="text-2xl font-bold font-['KuaiKanShiJieTi']">评论区设置指南</h2>
          <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
        
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>需要完成以下步骤来设置GitHub风格评论区：</p>
          
          <ol className="list-decimal pl-5 space-y-4 mt-4">
            <li>
              <strong>创建GitHub仓库</strong>
              <p>如果没有，请先创建一个公开的GitHub仓库用于存放评论</p>
            </li>
            
            <li>
              <strong>启用Discussions功能</strong>
              <p>在GitHub仓库页面，点击"Settings" → "Features" → 启用"Discussions"</p>
            </li>
            
            <li>
              <strong>安装Giscus应用</strong>
              <p>访问 <a href="https://github.com/apps/giscus" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://github.com/apps/giscus</a> 安装Giscus应用到你的仓库</p>
            </li>
            
            <li>
              <strong>获取配置信息</strong>
              <p>访问 <a href="https://giscus.app/zh-CN" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://giscus.app/zh-CN</a> 填写表单获取配置信息</p>
            </li>
            
            <li>
              <strong>添加环境变量</strong>
              <p>在项目根目录创建或编辑 <code>.env.local</code> 文件，添加以下内容：</p>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto text-xs">
{`NEXT_PUBLIC_GISCUS_REPO=你的用户名/仓库名
NEXT_PUBLIC_GISCUS_REPO_ID=你的仓库ID
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=你的分类ID`}
              </pre>
            </li>
            
            <li>
              <strong>重启开发服务器</strong>
              <p>完成上述步骤后，重启开发服务器即可看到评论区</p>
            </li>
          </ol>
          
          <p className="mt-6 text-yellow-600 dark:text-yellow-400">
            当前评论区未设置完成，请按照上述步骤进行配置。
          </p>
        </div>
      </div>
    );
  }

  // 判断是否有足够的信息来渲染Giscus
  if (!giscusRepo.includes('/') || !giscusRepoId || !giscusCategoryId) {
    return (
      <div className="mt-12 py-6 text-center text-red-500">
        评论区配置不完整，请检查环境变量设置。
      </div>
    );
  }

  return (
    <div className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="relative pb-2 mb-6">
        <h2 className="text-2xl font-bold font-['KuaiKanShiJieTi']">评论区</h2>
        <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      <Giscus
        id={`comments-${postSlug}`}
        repo={giscusRepo}
        repoId={giscusRepoId}
        category={giscusCategory}
        categoryId={giscusCategoryId}
        mapping="pathname"
        term={postSlug}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p className="text-center">
          此评论区基于GitHub Discussions，需要GitHub账号才能评论。
          <a 
            href="https://github.com/signup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            注册GitHub
          </a>
        </p>
      </div>
    </div>
  );
} 