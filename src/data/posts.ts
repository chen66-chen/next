export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  coverImage: string;
  category: string;
  tags: string[];
}

// Mock data for posts
export const posts: Post[] = [
  {
    id: "linux-1",
    title: "Linux基础入门指南",
    description: "从零开始学习Linux的基础知识，包括常用命令、文件系统和基本操作。",
    date: "2025-03-18",
    author: "Chryssolion Chen",
    coverImage: "/images/4.jpg",
    category: "Linux",
    tags: ["Linux", "入门", "命令行"]
  },
  {
    id: "linux-2",
    title: "Linux文件系统详解",
    description: "深入理解Linux文件系统的结构、类型和管理方法，掌握文件操作的核心概念。",
    date: "2025-03-20",
    author: "Chryssolion Chen",
    coverImage: "/images/7.jpg",
    category: "Linux",
    tags: ["Linux", "文件系统", "存储"]
  },
  {
    id: "linux-3",
    title: "Linux Shell脚本编程精通",
    description: "学习Shell脚本编程的核心概念和技巧，提高自动化能力和工作效率。",
    date: "2025-03-22",
    author: "Chryssolion Chen",
    coverImage: "/images/9.jpg",
    category: "Linux",
    tags: ["Linux", "Shell", "Bash", "脚本编程"]
  },
  {
    id: "post11",
    title: "操作系统学习总结",
    description: "本文涵盖操作系统安全核心知识、实战案例及关键命令，给出密码管理、权限控制等安全建议。",
    date: "2025-03-25",
    author: "Chryssolion Chen2",
    coverImage: "/images/7.png",
    category: "网络安全",
    tags: ["操作系统", "网络安全", "配置"]
  },
  {
    id: "post1",
    title: "2025年的某一天",
    description: "2025年的某一天，天空格外湛蓝，仿佛被水洗过一般",
    date: "2025-1-15",
    author: "Chryssolion Chen",
    coverImage: "/images/2774141023.jpeg",
    category: "思考",
    tags: ["天空", "随笔", "生活", "感悟"]
  },
  {
    id: "post2",
    title: "局域网",
    description: "局域网（LAN）拓扑与网络基础概念总结",
    date: "2025-03-19",
    author: "Chryssolion Chen",
    coverImage: "/images/6.png",
    category: "网工笔记",
    tags: ["ACL", "网络配置"]
  },
  {
    id: "post3",
    title: "安全运营中心（SOC）核心要素解析",
    description: "详细介绍SOC的核心职责、数据源体系和服务矩阵，帮助企业构建高效安全防御体系。",
    date: "2022-11-08",
    author: "Chryssolion Chen",
    coverImage: "/images/5.jpg",
    category: "安全",
    tags: ["SOC", "网络安全"]
  },
  {
    id: "post4",
    title: "渗透测试实战总结",
    description: "详细介绍SSH登录提权流程、NMAP扫描+FTP提权流程、防火墙实战案例等渗透测试技术",
    date: "2025-03-03",
    author: "Chryssolion Chen",
    coverImage: "/images/3.jpg",
    category: "渗透",
    tags: ["网络"]
  },
  {
    id: "post5",
    title: "网络安全入门",
    description: "网络安全Namp",
    date: "2025-01-13",
    author: "Chryssolion Chen",
    coverImage: "/images/1.webp",
    category: "网络安全",
    tags: ["网络安全", "入门","Nmap"]
  },
  {
    id: "post6",
    title: "WordPress博客主题Kratos",
    description: "一个简洁优雅的WordPress主题",
    date: "2024-09-28",
    author: "Echo",
    coverImage: "https://ext.same-assets.com/1727594840/896323414.png",
    category: "Learn",
    tags: ["WordPress", "主题"]
  },
  {
    id: "post7",
    title: "minio使用指南",
    description: "MinIO 是一款高性能、分布式的对象存储系统",
    date: "2025-02-15",
    author: "昆昆鱼",
    coverImage: "https://ext.same-assets.com/1310289913/40117092.png",
    category: "技术",
    tags: ["minio", "教程"]
  },
  {
    id: "post8",
    title: "2021年的某一天",
    description: "2021年的某一天，天空格外湛蓝，仿佛被水洗过一般",
    date: "2023-12-10",
    author: "昆昆鱼",
    coverImage: "https://ext.same-assets.com/2189857954/3060987925.webp",
    category: "生活随笔",
    tags: ["天空", "随笔"]
  },
  {
    id: "post10",
    title: "TCP/IP网络协议详解",
    description: "TCP/IP是互联网的基础协议，本文深入剖析TCP/IP的工作原理及其在网络中的核心作用。",
    date: "2025-03-22",
    author: "Chryssolion Chen2",
    coverImage: "https://ext.same-assets.com/279446216/849153819.webp",
    category: "网络协议",
    tags: ["TCP/IP", "网络"]
  }
]; 