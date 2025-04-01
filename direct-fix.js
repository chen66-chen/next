const fs = require('fs');

// 直接创建HTTP.json文件的内容
const httpPost = {
  "id": "HTTP",
  "title": "HTTP协议完全图解指南",
  "description": " 🌐 HTTP与HTTPS...",
  "content": "# HTTP协议完全图解指南\n\n## 🌐 HTTP与HTTPS\n\n|          | HTTP                            | HTTPS                           |\n|----------|--------------------------------|--------------------------------|\n| **全称**  | 超文本传输协议                    | 安全超文本传输协议                 |\n| **特点**  | 明文传输，无加密                   | 加密传输，防止窃听                 |\n| **端口**  | 80                              | 443                             |\n| **比喻**  | 寄明信片（内容公开）              | 寄挂号信（带密码锁）               |\n\n> 小测试：访问 `https://example.com` 时遇到证书错误：显示什么？  \n> **答案**：`THM{INVALID_HTTP_CERT}`\n\n---\n\n## 📦 URL解剖学\n\n1. **协议**：`http`/`https`/`ftp`\n2. **认证**：`user:pass@`（可选）\n3. **域名**：`tryhackme.com`\n4. **端口**：`:8080`（默认隐藏）\n5. **路径**：`/blog`（网站位置）\n6. **参数**：`?id=1`（搜索条件）\n7. **锚点**：`#comments`（页面定位）\n\n## 📠 HTTP请求与响应\n\n### 典型请求示例\n\n```http\nGET / HTTP/1.1\nHost: tryhackme.com\nUser-Agent: Chrome/91.0\nCookie: session=abc123\n```\n\n- **请求行**：方法(GET) + 路径(/) + 协议版本(HTTP/1.1)\n    \n- **头部**：Host指定网站，User-Agent说明浏览器\n    \n- **空行**：表示头部结束\n    \n\n### 典型响应示例\n\n```http\nHTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 1024\n<html>...</html>\n```\n\n- **状态行**：协议版本 + 状态码(200) + 状态消息(OK)\n    \n- **头部**：Content-Type声明内容类型，Content-Length数据大小\n    \n- **空行**：分隔头部与数据\n    \n- **数据体**：返回的实际内容\n\n## 📋 HTTP方法大全\n\n| 方法     | 用途     | 示例场景     |\n| ------ | ------ | -------- |\n| GET    | 获取资源   | 查看网页     |\n| POST   | 提交数据   | 用户注册     |\n| PUT    | 更新数据   | 修改个人资料   |\n| DELETE | 删除数据   | 删除帖子     |\n| HEAD   | 获取头部信息 | 检查资源是否存在 |\n\n实战演练：\n\n> 1. 发送`GET /room` → 获得`THM{YOU'RE_IN_THE_ROOM}`    \n> 2. 发送`GET /blog?id=1` → 获得`THM{YOU_FOUND_THE_BLOG}` \n\n## 🔴 HTTP状态码速查\n\n|状态码|类别|常见示例|\n|---|---|---|\n|2xx|成功|200 OK（成功）|\n|3xx|重定向|301 永久跳转|\n|4xx|客户端错误|404 页面不存在|\n|5xx|服务器错误|503 服务不可用|\n\n**经典场景**：\n- 创建新用户 → **201 Created**\n- 未登录访问私密内容 → **401 Unauthorized**\n- 服务器数据库崩溃 → **503 Service Unavailable**\n\n## 📌 关键头部字段\n\n### 请求头\n\n| 头部         | 作用      |\n| ---------- | ------- |\n| Host       | 指定访问的域名 |\n| User-Agent | 浏览器身份标识 |\n| Cookie     | 携带登录凭证  |\n\n### 响应头\n\n|头部|作用|\n|---|---|\n|Set-Cookie|服务器下发身份凭证|\n|Content-Type|声明返回数据类型|\n|Location|重定向目标地址|\n\n> 实验：使用浏览器开发者工具查看`Cookie`选项卡，观察登录后的会话信息\n\n1. **首次访问**：无Cookie → 服务器下发`Set-Cookie`\n    \n2. **后续请求**：自动携带Cookie → 维持登录状态\n    \n3. **典型应用**：购物车商品保存，个性化设置\n\n## 🔧 实战技巧\n\n### 开发者工具使用\n\n1. 按`F12`打开开发者工具\n    \n2. 切换到**Network**标签\n    \n3. 刷新页面查看所有请求\n    \n4. 点击请求查看详细头信息\n\n### 模拟请求练习\n\n1. **DELETE请求**：发送到`/user/1` → 获得`THM{USER_IS_DELETED}`\n    \n2. **PUT请求**：修改`/user/2`用户名为admin → 获得`THM{USER_HAS_UPDATED}`\n    \n3. **POST登录**：提交用户名`thm`和密码`letmein`到`/login`\n\n> 总结：HTTP就像快递系统，URL是地址，方法是寄件类型，状态码是快递通知，Cookie是取件码，HTTPS是装甲运输。理解这些要素，就能玩转网络通信！",
  "published": true,
  "coverImage": "/images/HTTP.jpg",
  "author": "Chryssolion Chen",
  "tags": [
    "HTTP",
    "网络安全"
  ],
  "date": "2025-03-31T22:20:21.300Z",
  "createdAt": "2025-03-31T22:20:21.300Z",
  "updatedAt": "2025-03-31T22:20:21.300Z"
};

// 写入文件
try {
  fs.writeFileSync('../data/posts/HTTP.json', JSON.stringify(httpPost, null, 2), { encoding: 'utf8' });
  console.log('成功修复并写入HTTP.json文件！');
  
  // 检查是否包含中文
  const content = fs.readFileSync('../data/posts/HTTP.json', 'utf8');
  console.log('中文字符检查：', content.includes('协议') ? '成功' : '失败');
} catch (error) {
  console.error('文件写入失败：', error);
} 