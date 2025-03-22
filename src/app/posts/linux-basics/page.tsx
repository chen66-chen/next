'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function LinuxBasicsArticle() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 导航栏 */}
      <nav className="bg-white dark:bg-gray-800 shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Chryssolion Chenの Blog
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              首页
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              分类
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              标签
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              关于
            </Link>
          </div>
        </div>
      </nav>

      {/* 文章内容 */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link href="/posts/linux">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回Linux专题
            </Button>
          </Link>
        </div>

        {/* 文章标题区 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Linux 基础入门指南</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              2025-04-01
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Chryssolion Chen
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-blue-600 dark:text-blue-400">Linux</span>
              <span className="text-blue-600 dark:text-blue-400">入门</span>
            </div>
          </div>
          
          {/* 特色图片 */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src="https://ext.same-assets.com/279446216/849153819.webp"
              alt="Linux基础入门"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 文章内容 */}
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 prose prose-blue max-w-none dark:prose-invert">
          <h2>Linux系统简介</h2>
          <p>
            Linux是一种自由和开源的类UNIX操作系统，其内核由Linus Torvalds在1991年首次发布。与其他操作系统不同，Linux是完全免费的，任何人都可以运行、研究、分享和修改软件。这也是为什么Linux被广泛应用于服务器、超级计算机、嵌入式系统等领域的原因之一。
          </p>

          <h2>Linux的主要特点</h2>
          <ul>
            <li><strong>开源免费</strong>：Linux是自由软件，用户可以自由使用、复制、分发和修改</li>
            <li><strong>多用户多任务</strong>：Linux支持多个用户同时登录系统，每个用户可以同时运行多个程序</li>
            <li><strong>安全稳定</strong>：Linux有良好的安全机制和权限设计，系统稳定性高</li>
            <li><strong>可移植性强</strong>：可以在多种硬件平台上运行，从嵌入式设备到超级计算机</li>
            <li><strong>标准化</strong>：遵循POSIX标准，具有良好的兼容性</li>
          </ul>

          <h2>Linux发行版介绍</h2>
          <p>
            Linux有众多发行版，每个发行版都有其特点和适用场景。以下是一些流行的Linux发行版：
          </p>

          <h3>Ubuntu</h3>
          <p>
            Ubuntu是最流行的Linux发行版之一，特别适合Linux新手。它提供了友好的用户界面和大量的软件包，使用户能够轻松地完成日常任务。Ubuntu每六个月发布一次新版本，每两年发布一次长期支持（LTS）版本。
          </p>
          
          <h3>Debian</h3>
          <p>
            Debian是最古老和最稳定的Linux发行版之一，以其严格的软件包管理和稳定性著称。Ubuntu就是基于Debian开发的。Debian适合那些需要高度稳定和安全性的服务器环境。
          </p>
          
          <h3>CentOS/RHEL</h3>
          <p>
            CentOS是基于Red Hat Enterprise Linux（RHEL）源代码构建的免费企业级发行版。它被广泛用于企业服务器环境，提供长期的稳定性和安全更新。
          </p>
          
          <h3>Fedora</h3>
          <p>
            Fedora是由Red Hat赞助的前沿社区发行版，常常使用最新的软件和技术。它是测试新功能的平台，这些功能最终可能会出现在RHEL中。
          </p>
          
          <h3>Arch Linux</h3>
          <p>
            Arch Linux是一个轻量级和灵活的Linux发行版，遵循KISS原则（保持简单和愚蠢）。它是为有经验的用户设计的，提供了一个最小化的基础系统，用户可以根据自己的需要定制。
          </p>

          <h2>Linux基本命令入门</h2>

          <h3>文件系统导航</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm my-4">
            <p><span className="text-blue-400">$</span> pwd                # 显示当前工作目录</p>
            <p><span className="text-blue-400">$</span> ls                 # 列出目录内容</p>
            <p><span className="text-blue-400">$</span> ls -l              # 详细列出目录内容</p>
            <p><span className="text-blue-400">$</span> ls -a              # 列出所有文件，包括隐藏文件</p>
            <p><span className="text-blue-400">$</span> cd /path/to/dir    # 切换目录</p>
            <p><span className="text-blue-400">$</span> cd ..              # 返回上一级目录</p>
            <p><span className="text-blue-400">$</span> cd ~               # 切换到用户主目录</p>
          </div>

          <h3>文件操作</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm my-4">
            <p><span className="text-blue-400">$</span> touch file.txt     # 创建空文件</p>
            <p><span className="text-blue-400">$</span> mkdir dirname      # 创建目录</p>
            <p><span className="text-blue-400">$</span> cp source dest     # 复制文件</p>
            <p><span className="text-blue-400">$</span> mv source dest     # 移动或重命名文件</p>
            <p><span className="text-blue-400">$</span> rm filename        # 删除文件</p>
            <p><span className="text-blue-400">$</span> rm -r dirname      # 递归删除目录</p>
            <p><span className="text-blue-400">$</span> cat filename       # 显示文件内容</p>
            <p><span className="text-blue-400">$</span> less filename      # 分页查看文件内容</p>
          </div>

          <h3>权限管理</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm my-4">
            <p><span className="text-blue-400">$</span> chmod 755 file     # 修改文件权限</p>
            <p><span className="text-blue-400">$</span> chown user file    # 修改文件所有者</p>
            <p><span className="text-blue-400">$</span> chgrp group file   # 修改文件所属组</p>
            <p><span className="text-blue-400">$</span> sudo command       # 以管理员权限执行命令</p>
          </div>

          <h3>系统信息</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm my-4">
            <p><span className="text-blue-400">$</span> uname -a           # 显示系统信息</p>
            <p><span className="text-blue-400">$</span> df -h              # 显示磁盘使用情况</p>
            <p><span className="text-blue-400">$</span> free -m            # 显示内存使用情况</p>
            <p><span className="text-blue-400">$</span> top                # 显示进程信息</p>
          </div>

          <h2>Linux文件系统结构</h2>
          <p>
            Linux文件系统遵循文件系统层次结构标准（FHS），主要目录及其用途如下：
          </p>
          <ul>
            <li><strong>/bin</strong>：包含系统启动和运行所需的基本命令</li>
            <li><strong>/boot</strong>：包含启动Linux所需的文件</li>
            <li><strong>/dev</strong>：包含设备文件</li>
            <li><strong>/etc</strong>：包含系统配置文件</li>
            <li><strong>/home</strong>：用户主目录</li>
            <li><strong>/lib</strong>：包含系统和应用程序所需的库文件</li>
            <li><strong>/media</strong>：用于挂载可移动媒体</li>
            <li><strong>/mnt</strong>：用于临时挂载文件系统</li>
            <li><strong>/opt</strong>：用于安装可选软件包</li>
            <li><strong>/proc</strong>：包含系统信息的虚拟文件系统</li>
            <li><strong>/root</strong>：root用户的主目录</li>
            <li><strong>/sbin</strong>：包含系统管理命令</li>
            <li><strong>/tmp</strong>：用于存储临时文件</li>
            <li><strong>/usr</strong>：包含用户程序和数据</li>
            <li><strong>/var</strong>：包含经常变化的数据，如日志文件</li>
          </ul>

          <h2>开始使用Linux的步骤</h2>
          <ol>
            <li>
              <strong>选择合适的发行版</strong>：根据自己的经验水平和使用目的选择合适的Linux发行版。初学者可以考虑Ubuntu或Linux Mint。
            </li>
            <li>
              <strong>安装Linux</strong>：可以选择多种安装方式，包括单独安装、双系统安装或使用虚拟机安装。
            </li>
            <li>
              <strong>熟悉基本命令</strong>：掌握基本的Linux命令是使用Linux的关键，可以帮助你更高效地完成任务。
            </li>
            <li>
              <strong>学习软件管理</strong>：了解如何使用包管理器（如apt、yum或pacman）安装、更新和删除软件。
            </li>
            <li>
              <strong>配置系统</strong>：学习如何配置Linux系统，包括网络设置、用户管理和安全配置。
            </li>
          </ol>

          <h2>结论</h2>
          <p>
            Linux是一个功能强大、安全稳定的操作系统，广泛应用于各种环境中。通过学习和实践，你可以逐渐掌握Linux的使用技巧，享受它带来的自由和灵活性。本文介绍的基础知识只是Linux世界的一小部分，如果你想深入学习，可以参考更多的资源和进行实际操作。
          </p>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
            <h3>参考资源</h3>
            <ul>
              <li><a href="https://www.linux.org/" target="_blank" rel="noopener noreferrer">Linux官方网站</a></li>
              <li><a href="https://linuxjourney.com/" target="_blank" rel="noopener noreferrer">Linux Journey</a></li>
              <li><a href="https://linuxcommand.org/" target="_blank" rel="noopener noreferrer">Linux Command</a></li>
              <li><a href="https://www.ubuntu.com/" target="_blank" rel="noopener noreferrer">Ubuntu官方网站</a></li>
            </ul>
          </div>
        </article>

        {/* 相关推荐 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">相关文章推荐</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/posts/linux-file-system" className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Linux 文件系统详解</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">深入了解Linux文件系统的结构和工作原理</p>
            </Link>
            <Link href="/posts/linux-commands" className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Linux 常用命令大全</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">最常用的Linux命令详解及实战应用</p>
            </Link>
          </div>
        </div>

        {/* 评论区 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-8">
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">留言区</h3>
          
          {/* 评论表单 */}
          <form className="mb-8">
            <div className="mb-4">
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none dark:bg-gray-700 dark:text-white"
                rows={4}
                placeholder="写下你的评论..."
              ></textarea>
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                提交评论
              </Button>
            </div>
          </form>
          
          {/* 没有评论的提示 */}
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p>还没有评论，快来发表第一条评论吧！</p>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 mt-10">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 小臣の Web · 基于 Next.js 构建</p>
        </div>
      </footer>
    </div>
  )
} 