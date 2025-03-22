//博客文章的数据库
import { notFound } from 'next/navigation';
import { PostClient } from './PostClient';
import fs from 'fs';
import path from 'path';

// 定义文章类型接口
interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  coverImage: string;
  category: string; // 不使用可选属性，确保一致性
  tags: string[];
  content: string;
  style: string; // 不使用可选属性，确保一致性
}

// 文章数据的存储路径
const POSTS_DIR = path.join(process.cwd(), 'data/posts');

// 从文件系统获取文章
async function getPostFromFile(id: string): Promise<Post | null> {
  try {
    const filePath = path.join(POSTS_DIR, `${id}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(fileContent);
    
    // 确保返回的对象符合Post接口
    return {
      id: post.id,
      title: post.title,
      description: post.description || '',
      date: post.date,
      author: post.author,
      coverImage: post.coverImage,
      category: post.category || '未分类',
      tags: post.tags || [],
      content: post.content,
      style: post.style || 'style1'
    };
  } catch (error) {
    console.error(`获取文章失败: ${id}`, error);
    return null;
  }
}

// 模拟文章数据库(作为备用)
const postsDatabase: Record<string, Post> = {
  "post1": {
    id: "post1",
    title: "2025年的某一天",
    description: "今天的天气很不错！！！",
    date: "2025-1-10",
    author: "Chryssolion Chen",
    coverImage: "/images/2774141023.jpeg",
    category: "scene",
    tags: ["天空"],
    content: `
      <h1>云端漫步：我的博客主题设计之旅</h1>
      
      <p>2025年1月的一个清晨，我站在智能玻璃幕墙前，看着AI气候调节系统生成的完美蓝天，突然意识到：数字世界的视觉体验也应该拥有这样令人心旷神怡的呼吸感。这个念头如同种子落入心田，开始生根发芽</p>
      
      <h2>灵感萌芽</h2>
      <p>在量子搜索引擎中输入"蓝天白云主题设计"，海量信息流中几个关键点抓住了我的注意力：</p>
      
      <p>于是我展开了我的设计之旅</p>
      
      <ul>
        <li>自然渐变：采用CSS3的线性渐变模拟天空的层次感，从浅空蓝(#87CEEB)到深穹蓝(#4682B4)的过渡</li>
        <li>动态云层：通过Canvas实现云朵的自主运动算法，每片云都有独特的飘移轨迹和速度</li>
        <li>光影交互：利用WebGL实现阳光角度与访问时间的智能同步，营造真实的光影变化</li>
      </ul>
      
      <h2>技术实现</h2>
      <p>选择Vue3+Three.js的技术栈后，我开始了编码之旅：</p>
      
      <h2>视觉优化</h2>
      <p>在字体选择上，我创造了"云迹体"——一种笔画末端带有柔和云朵轮廓的定制字体。通过Variable Fonts技术，字重会随着滚动深度从Light渐变到Regular，模拟云层远近的视觉差异</p>
      
      <h2>用户体验</h2>
      <p>采用神经网络的A/B测试系统，实时分析用户的：</p>

      <ul>
        <li>自页面停留时间</li>
        <li>滚动速度模式</li>
        <li>瞳孔聚焦热区 动态调整云层密度和运动频率，确保阅读专注度与视觉舒适度的完美平衡 </li>
      </ul>
      
      <blockquote>
        <p>好了，我的构思基本完成了，接下来就是实现它了。</p>
      </blockquote>
      
      <h2>未来构想</h2>
      <p>接入气象API，实时同步所在地的真实天空状态
      开发AR模式，将网站内容投影到真实天空
      创建气味模块，配合内容释放清新草香
      </p>
      
      <p>这个设计旅程让我明白：数字空间的呼吸感不在于元素的多少，而在于每个细节都能唤起人们对美好自然的感知。期待与更多设计师探讨如何让虚拟世界拥有更真实的生命律动</p>
    `,
    style: 'style1'
  },
  "post2": {
    id: "post2",
    title: "局域网（LAN）拓扑与网络基础概念总结",
    description: "详细介绍各种局域网拓扑类型、网络设备功能、子网划分原理与关键协议，附带常见问题解答。",
    date: "2025-03-19",
    author: "Chryssolion Chen",
    coverImage: "/images/6.jpg",
    category: "网络基础",
    tags: ["局域网", "网络拓扑", "网络协议"],
    content: `
      <h2>局域网（LAN）拓扑与网络基础概念总结</h2>
      
      <h3>局域网拓扑类型</h3>
      
      <h4>1. 星形拓扑</h4>
      <p><img src="/images/star-topology.png" alt="星形拓扑" /></p>
      <h5>优点</h5>
      <ul>
        <li><strong>高可靠性</strong>（单点故障影响范围小）</li>
        <li><strong>易于扩展和维护</strong></li>
        <li><strong>集中式管理</strong></li>
      </ul>
      
      <h5>缺点</h5>
      <ul>
        <li>依赖中央设备（交换机/集线器）</li>
        <li>布线成本高</li>
        <li>网络规模扩大时维护复杂度增加</li>
      </ul>
      
      <h4>2. 总线拓扑</h4>
      <p><img src="/images/bus-topology.png" alt="总线拓扑" /></p>
      <h5>优点</h5>
      <ul>
        <li><strong>低成本</strong>（布线量少）</li>
        <li><strong>简单易部署</strong></li>
      </ul>
      
      <h5>缺点</h5>
      <ul>
        <li>单点故障（主干电缆断裂导致全网瘫痪）</li>
        <li>性能瓶颈（共享带宽）</li>
        <li>故障诊断困难</li>
      </ul>
      
      <h4>3. 环形拓扑</h4>
      <p><img src="/images/ring-topology.png" alt="环形拓扑" /></p>
      <h5>优点</h5>
      <ul>
        <li><strong>布线简单</strong></li>
        <li><strong>无网络冲突</strong></li>
        <li><strong>可预测性能</strong></li>
      </ul>
      
      <h5>缺点</h5>
      <ul>
        <li>单点故障敏感</li>
        <li>扩展困难</li>
        <li>数据传输效率低（单向传输）</li>
      </ul>
      
      <h3>网络设备</h3>
      
      <h4>交换机 (Switch)</h4>
      <ul>
        <li><strong>功能</strong>：在数据链路层转发帧，通过MAC地址表定向传输</li>
        <li><strong>特点</strong>：
          <ul>
            <li>8-64个端口</li>
            <li>支持全双工通信</li>
            <li>减少网络拥塞（对比集线器）</li>
          </ul>
        </li>
      </ul>
      
      <h4>路由器 (Router)</h4>
      <ul>
        <li><strong>功能</strong>：在网络层路由数据包，连接不同网络</li>
        <li><strong>关键能力</strong>：
          <ul>
            <li>路径选择（Routing）</li>
            <li>NAT转换</li>
            <li>提供网络冗余</li>
          </ul>
        </li>
      </ul>
      
      <h3>子网划分</h3>
      
      <h4>核心概念</h4>
      <ul>
        <li><strong>网络地址</strong>：标识网络起点（如192.168.1.0）</li>
        <li><strong>主机地址</strong>：标识具体设备（如192.168.1.100）</li>
        <li><strong>默认网关</strong>：连接不同网络的出口（如192.168.1.254）</li>
      </ul>
      
      <h4>子网优势</h4>
      <ol>
        <li>提高网络效率</li>
        <li>增强安全性</li>
        <li>优化流量管理</li>
      </ol>
      
      <h4>子网掩码结构</h4>
      <ul>
        <li>32位二进制数（4个八位组）</li>
        <li>示例：255.255.255.0 → /24</li>
      </ul>
      
      <h3>关键协议</h3>
      
      <h4>ARP（地址解析协议）</h4>
      <ul>
        <li><strong>功能</strong>：IP地址 → MAC地址映射</li>
        <li><strong>工作流程</strong>：
          <ol>
            <li>ARP Request（广播询问）</li>
            <li>ARP Reply（单播回应）</li>
          </ol>
        </li>
        <li><strong>缓存机制</strong>：维护IP-MAC映射表</li>
      </ul>
      
      <h4>DHCP（动态主机配置协议）</h4>
      <ul>
        <li><strong>分配流程</strong>：
          <ol>
            <li>Discover</li>
            <li>Offer</li>
            <li>Request</li>
            <li>ACK</li>
          </ol>
        </li>
        <li><strong>优势</strong>：自动IP分配，减少配置错误</li>
      </ul>
      
      <h3>常见问题解答</h3>
      
      <h4>拓扑相关</h4>
      <p><strong>Q: 哪种拓扑设置成本最低？</strong><br>
      A: 总线拓扑</p>
      
      <p><strong>Q: 哪种拓扑维护成本最高？</strong><br>
      A: 星形拓扑</p>
      
      <h4>网络基础</h4>
      <p><strong>Q: LAN全称是什么？</strong><br>
      A: Local Area Network</p>
      
      <p><strong>Q: 路由器的核心功能动词是什么？</strong><br>
      A: Routing</p>
      
      <h4>协议相关</h4>
      <p><strong>Q: ARP请求的类型是什么？</strong><br>
      A: ARP Request</p>
      
      <p><strong>Q: DHCP最终确认数据包是？</strong><br>
      A: DHCP ACK</p>
      
      <div class="info-box">
        <h4>小贴士</h4>
        <p>设计局域网拓扑时，应根据实际需求、预算和可扩展性综合考虑。大多数现代企业网络采用层次化星形拓扑，兼顾可靠性和可扩展性。</p>
      </div>
    `,
    style: 'style2'
  },
  "post3": {
    id: "post3",
    title: "安全运营中心（SOC）核心要素解析",
    description: "详细介绍SOC的核心职责、数据源体系和服务矩阵，帮助企业构建高效安全防御体系。",
    date: "2022-11-08",
    author: "Chryssolion Chen",
    coverImage: "/images/5.jpg",
    category: "安全",
    tags: ["SOC", "网络安全"],
    content: `
      <h2>安全运营中心（SOC）核心要素解析</h2>
      
      <h3>一、SOC 核心职责</h3>
      <p><strong>安全运营中心</strong>（Security Operations Center）是网络安全防御体系的中枢神经，主要承担以下关键任务：</p>
      
      <h4>1. 实时监控与威胁检测</h4>
      <ul>
        <li><strong>7×24 小时网络监控</strong>：持续扫描全网流量、日志与设备状态</li>
        <li><strong>入侵识别</strong>：通过行为分析发现异常活动（如非常规时间登录、高频DNS查询）</li>
        <li><strong>漏洞预警</strong>：识别未修复的系统/应用漏洞（如过期的Windows补丁）</li>
      </ul>
      
      <h4>2. 事件响应与处置</h4>
      <ul>
        <li><strong>分级响应机制</strong>：
          <ul>
            <li>一级事件：关键系统入侵（如域控服务器被控）</li>
            <li>二级事件：策略违规（员工外发机密文件）</li>
            <li>三级事件：扫描探测行为</li>
          </ul>
        </li>
        <li><strong>取证分析</strong>：通过日志溯源攻击路径（如恶意进程启动时间线）</li>
      </ul>
      
      <h4>3. 安全防御体系建设</h4>
      <ul>
        <li><strong>防火墙策略优化</strong>：动态调整规则阻断攻击流量</li>
        <li><strong>威胁情报整合</strong>：对接外部情报源更新防护策略</li>
        <li><strong>安全培训</strong>：开展钓鱼演练、密码管理培训等</li>
      </ul>
      
      <h3>二、SOC 数据源体系</h3>
      <table>
        <thead>
          <tr>
            <th>数据源类型</th>
            <th>监控价值</th>
            <th>典型应用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>服务器日志</strong></td>
            <td>记录用户登录、文件访问等行为</td>
            <td>检测暴力破解、异常文件操作</td>
          </tr>
          <tr>
            <td><strong>DNS查询</strong></td>
            <td>解析内部主机访问的域名</td>
            <td>发现C2通信（如每分钟固定域名解析）</td>
          </tr>
          <tr>
            <td><strong>防火墙日志</strong></td>
            <td>记录网络流量放行/拦截情况</td>
            <td>识别端口扫描、DDoS攻击</td>
          </tr>
          <tr>
            <td><strong>DHCP日志</strong></td>
            <td>追踪设备入网IP分配记录</td>
            <td>定位非法接入设备</td>
          </tr>
        </tbody>
      </table>
      
      <p><em>SIEM系统聚合多源数据实现关联分析</em></p>
      
      <h3>三、SOC 服务矩阵</h3>
      
      <h4>反应式服务（事件驱动）</h4>
      <ul>
        <li><strong>安全事件处置</strong>：针对已发生的安全入侵进行分析与处置</li>
        <li><strong>安全漏洞修复</strong>：协调IT团队部署补丁或更新配置</li>
        <li><strong>恶意代码清除</strong>：隔离和清除感染系统中的木马、勒索软件等</li>
      </ul>
      
      <h4>主动式服务（预防为主）</h4>
      <ul>
        <li><strong>威胁狩猎</strong>：主动搜索网络中潜在威胁的活动痕迹</li>
        <li><strong>安全基线检查</strong>：定期评估系统配置符合性</li>
        <li><strong>红蓝对抗演练</strong>：模拟攻击识别防御体系薄弱环节</li>
      </ul>
      
      <h3>四、SOC 技术架构</h3>
      
      <h4>1. 数据采集层</h4>
      <ul>
        <li><strong>日志收集器</strong>：部署在各网络区域的采集代理</li>
        <li><strong>网络镜像</strong>：核心交换机流量复制</li>
        <li><strong>API集成</strong>：对接云服务商安全日志</li>
      </ul>
      
      <h4>2. 分析处理层</h4>
      <ul>
        <li><strong>SIEM</strong>（安全信息与事件管理）：集中存储与分析安全数据</li>
        <li><strong>UEBA</strong>（用户行为分析）：建立基线识别异常行为</li>
        <li><strong>沙箱</strong>：隔离环境分析可疑文件</li>
      </ul>
      
      <h4>3. 响应处置层</h4>
      <ul>
        <li><strong>SOAR</strong>（安全编排自动化与响应）：自动化处置流程</li>
        <li><strong>EDR</strong>（终端检测与响应）：实时阻断终端威胁</li>
        <li><strong>防火墙/WAF</strong>：动态调整拦截规则</li>
      </ul>
      
      <h3>五、SOC 运行挑战与对策</h3>
      
      <h4>1. 常见挑战</h4>
      <ul>
        <li><strong>误报过多</strong>：分析人员疲劳导致真实威胁被忽略</li>
        <li><strong>人才短缺</strong>：高素质安全分析师难招难留</li>
        <li><strong>技术割裂</strong>：多个安全产品独立运行缺乏联动</li>
      </ul>
      
      <h4>2. 优化策略</h4>
      <ul>
        <li><strong>分级预警</strong>：建立风险评分机制，优先处理高风险警报</li>
        <li><strong>自动化提升</strong>：将重复性任务自动化，减轻人工负担</li>
        <li><strong>持续优化</strong>：定期回顾安全事件，优化检测规则准确率</li>
      </ul>
      
      <h3>六、SOC 成熟度评估</h3>
      
      <h4>1. 基础级（L1）</h4>
      <ul>
        <li>初步建立安全监控能力</li>
        <li>主要依靠工具默认规则</li>
        <li>事件响应被动且流程简单</li>
      </ul>
      
      <h4>2. 规范级（L2）</h4>
      <ul>
        <li>形成完整监控覆盖</li>
        <li>建立标准响应流程</li>
        <li>定期威胁情报更新</li>
      </ul>
      
      <h4>3. 优化级（L3）</h4>
      <ul>
        <li>高度自动化的检测分析</li>
        <li>威胁狩猎常态化</li>
        <li>持续的安全态势感知</li>
      </ul>
      
      <h4>4. 智能级（L4）</h4>
      <ul>
        <li>AI驱动的异常检测</li>
        <li>预测性安全防御</li>
        <li>全自动化响应编排</li>
      </ul>
      
      <p>通过构建高效的安全运营中心，企业能够显著提升安全防御能力，降低安全事件造成的业务影响，并确保关键资产的持续可用性与完整性。</p>
    `,
    style: 'style3'
  },
  "post5": {
    id: "post5",
    title: "网络安全学习总结", // 可根据实际情况调整标题
    description: "涵盖网络安全目标、解决方案、攻击方法论、实战案例、关键工具与命令，以及总结建议。", // 可根据实际情况调整描述
    date: "2025-01-3", // 可根据实际情况调整日期
    author: "Chryssolion Chen",
    coverImage: "/images/1.webp",
    category: "Tech", // 可根据实际情况调整分类
    tags: ["网络安全"], // 可根据实际情况调整标签
    content: `
      <h2>网络安全学习总结</h2>
      <h3>二、网络安全</h3>
      <h4>1. 网络安全目标</h4>
      <p>- <strong>保护对象</strong>：网络设备、连接链路、数据</p>
      <p>- <strong>核心目标</strong>：确保机密性、完整性、可用性</p>
      <h4>2. 安全解决方案</h4>
      <table>
        <thead>
          <tr>
            <th>类型</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>硬件</strong></td>
            <td>防火墙、IDS/IPS、VPN集中器</td>
          </tr>
          <tr>
            <td><strong>软件</strong></td>
            <td>防病毒软件（如Norton）、主机防火墙（Windows Defender）</td>
          </tr>
        </tbody>
      </table>
      <h4>3. 攻击方法论：Cyber Kill Chain</h4>
      <ol>
        <li><strong>侦察（Recon）</strong>：收集目标信息（IP、服务、用户）</li>
        <li><strong>武器化</strong>：制作恶意文件（如木马）</li>
        <li><strong>投递</strong>：通过邮件/USB传播</li>
        <li><strong>漏洞利用</strong>：触发漏洞执行恶意代码</li>
        <li><strong>安装</strong>：部署后门程序</li>
        <li><strong>命令与控制（C2）</strong>：建立远程控制</li>
        <li><strong>目标操作</strong>：数据窃取或破坏</li>
      </ol>
      <h3>三、实战案例分析</h3>
      <h4>案例1：FTP服务器入侵</h4>
      <p>- <strong>攻击流程</strong>：</p>
      <ol>
        <li><strong>Nmap扫描</strong>：发现开放FTP/SSH/HTTP服务（<code>nmap 10.10.XX.XX</code>）。</li>
        <li><strong>匿名FTP登录</strong>：下载<code>secret.txt</code>获取root密码<code>ABC789xyz123</code>。</li>
        <li><strong>SSH登录root</strong>：访问敏感文件：</li>
        <ul>
          <li><code>/root/flag.txt</code> → <code>THM{FTP_SERVER_OWNED}</code></li>
          <li><code>/home/librarian/flag.txt</code> → <code>THM{LIBRARIAN_ACCOUNT_COMPROMISED}</code></li>
        </ul>
      </ol>
      <h3>四、关键工具与命令</h3>
      <table>
        <thead>
          <tr>
            <th>工具/命令</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><code>nmap</code></strong></td>
            <td>扫描开放端口和服务（如<code>nmap 10.10.XX.XX</code>）</td>
          </tr>
          <tr>
            <td><strong><code>ssh</code></strong></td>
            <td>远程安全登录（<code>ssh user@IP</code>）</td>
          </tr>
          <tr>
            <td><strong><code>ftp</code></strong></td>
            <td>文件传输（匿名登录：用户名<code>anonymous</code>）</td>
          </tr>
          <tr>
            <td><strong><code>ls/cat</code></strong></td>
            <td>列出/查看文件内容</td>
          </tr>
          <tr>
            <td><strong><code>history</code></strong></td>
            <td>查看命令历史记录</td>
          </tr>
        </tbody>
      </table>
      <h3>五、总结与建议</h3>
      <ul>
        <li><strong>密码管理</strong>：使用密码管理器生成复杂唯一密码，避免重复使用。</li>
        <li><strong>权限控制</strong>：遵循最小权限原则，定期审查文件权限。</li>
        <li><strong>系统更新</strong>：及时安装补丁，修复已知漏洞。</li>
        <li><strong>安全意识</strong>：警惕钓鱼攻击，避免下载未知文件。</li>
      </ul>
    `,
    style: 'style1'
  },
  "post6": {
    id: "post6",
    title: "WordPress博客主题Kratos",
    description: "一个简洁优雅的WordPress主题，具有良好的响应式设计和丰富的功能。",
    date: "2024-09-28",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/1026743771/1979474500.webp",
    category: "WordPress",
    tags: ["博客", "主题"],
    content: `
      <h2>WordPress博客主题Kratos详细介绍</h2>
      
      <p>作为一名博客爱好者，我一直在寻找既美观又实用的WordPress主题。最近发现了Kratos这款主题，使用后感觉相当不错，今天就来详细介绍一下这款主题的特点和使用体验。</p>
      
      <h3>主题概述</h3>
      
      <p>Kratos是由Vtrois设计并开发的一款简洁优雅的WordPress主题，目前已有数万用户使用。它以希腊神话中的力量之神克拉托斯命名，寓意着强大而灵活的特性。</p>
      
      <p>这款主题的设计理念是"大道至简"，去除了冗余的设计元素，专注于内容的呈现，同时保留了必要的美观度和功能性。</p>
      
      <h3>外观设计</h3>
      
      <h4>首页布局</h4>
      <p>Kratos采用了经典的博客布局，顶部是导航栏和banner图，中间是文章列表，右侧是侧边栏。这种布局直观易用，访客可以快速找到感兴趣的内容。</p>
      
      <p>首页文章卡片设计简洁大方，包含：</p>
      <ul>
        <li>文章特色图片（支持懒加载）</li>
        <li>文章标题</li>
        <li>发布日期和分类</li>
        <li>简短的文章摘要</li>
      </ul>
      
      <h4>文章页面</h4>
      <p>文章页面采用了宽大的内容区域和清晰的排版，阅读体验非常舒适。文章顶部会显示特色图片、标题、发布信息等元素，正文部分则使用了合适的行高和字号，长时间阅读也不会感到疲劳。</p>
      
      <h4>响应式设计</h4>
      <p>Kratos在移动设备上的表现同样出色。当屏幕宽度变小时，布局会自动调整，侧边栏会移至底部，导航菜单会变成汉堡菜单，确保在各种设备上都有良好的浏览体验。</p>
      
      <h3>主要功能特点</h3>
      
      <h4>1. 丰富的自定义选项</h4>
      <p>Kratos提供了丰富的主题自定义选项，你可以在WordPress后台轻松设置：</p>
      <ul>
        <li>网站颜色方案</li>
        <li>首页轮播图</li>
        <li>社交媒体链接</li>
        <li>侧边栏小工具</li>
        <li>页脚信息</li>
        <li>广告位设置</li>
      </ul>
      
      <h4>2. SEO友好</h4>
      <p>Kratos内置了基础的SEO优化功能，包括：</p>
      <ul>
        <li>优化的HTML结构</li>
        <li>自动生成的Open Graph标签</li>
        <li>面包屑导航</li>
        <li>适当的heading标签使用</li>
      </ul>
      <p>这些功能有助于提升网站在搜索引擎中的表现。</p>
      
      <h4>3. 代码高亮</h4>
      <p>对于技术博客来说，代码高亮是必不可少的功能。Kratos集成了Prism.js，支持多种编程语言的代码高亮显示，使代码块更加美观易读。</p>
      
      <h4>4. 图片灯箱效果</h4>
      <p>点击文章中的图片时，会自动弹出灯箱效果，便于查看大图，特别适合展示摄影作品或截图教程。</p>
      
      <h4>5. 页面加载优化</h4>
      <p>Kratos在性能优化方面做了不少工作，包括：</p>
      <ul>
        <li>图片懒加载</li>
        <li>CSS和JavaScript的合理加载</li>
        <li>静态资源压缩</li>
      </ul>
      <p>这些优化措施使得网站加载速度更快，用户体验更好。</p>
      
      <h3>安装与配置</h3>
      
      <h4>安装步骤</h4>
      <ol>
        <li>从<a href="https://github.com/vtrois/kratos" target="_blank">GitHub</a>下载最新版本的Kratos主题</li>
        <li>登录WordPress后台，进入"外观" → "主题" → "添加"</li>
        <li>点击"上传主题"，选择下载好的zip文件</li>
        <li>上传完成后点击"启用"即可</li>
      </ol>
      
      <h4>基础配置建议</h4>
      <p>安装完成后，建议进行以下配置：</p>
      <ol>
        <li>设置网站Logo和Favicon</li>
        <li>配置首页轮播图（至少3张图）</li>
        <li>添加必要的菜单项</li>
        <li>设置侧边栏小工具</li>
        <li>自定义页脚信息</li>
      </ol>
      
      <h3>使用心得与建议</h3>
      
      <p>使用Kratos主题一段时间后，我总结了一些使用心得和建议：</p>
      
      <h4>适合人群</h4>
      <p>Kratos特别适合以下类型的博主：</p>
      <ul>
        <li>喜欢简约风格的个人博主</li>
        <li>技术博客作者（得益于良好的代码展示）</li>
        <li>内容创作为主，不需要过多花哨功能的用户</li>
      </ul>
      
      <h4>优化建议</h4>
      <ul>
        <li>搭配使用WP Super Cache等缓存插件，进一步提升性能</li>
        <li>为所有文章设置特色图片，使首页更加美观</li>
        <li>合理使用分类和标签，便于内容组织</li>
        <li>定期更新主题到最新版本，获取新功能和安全修复</li>
      </ul>
      
      <h3>总结</h3>
      
      <p>Kratos是一款平衡了美观、功能和性能的WordPress主题，适合大多数个人博客使用。它的简约设计理念使网站内容成为真正的主角，同时提供了足够的自定义空间，让用户能够打造出独具特色的博客。</p>
      
      <p>如果你正在寻找一款不过于复杂，又不失个性的WordPress主题，Kratos绝对值得一试。</p>
      
      <p>你有使用过Kratos主题吗？欢迎在评论区分享你的使用体验！</p>
    `,
    style: 'style3'
  },
  "post7": {
    id: "post7",
    title: "Halo主题定制指南",
    description: "如何根据个人喜好定制你的Halo博客主题，包括颜色、字体、布局等方面的调整。",
    date: "2025-02-20",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/215159204/3145156357.webp",
    category: "Theme",
    tags: ["Halo", "定制", "教程"],
    content: `
      <h2>Halo博客主题定制入门</h2>
      
      <p>Halo是一款优秀的开源博客系统，它不仅提供了丰富的主题选择，还允许用户根据个人喜好进行深度定制。本文将详细介绍如何定制你的Halo博客主题。</p>
      
      <h3>基础设置调整</h3>
      
      <p>在开始深入定制之前，我们先来了解Halo后台提供的基础设置选项：</p>
      
      <ol>
        <li><strong>主题选择</strong>：在控制台的"外观"→"主题"中，你可以浏览并安装各种不同风格的主题</li>
        <li><strong>主题设置</strong>：每个主题通常都有自己的设置选项，包括颜色、布局、显示元素等</li>
        <li><strong>菜单管理</strong>：在"外观"→"菜单"中，你可以自定义导航菜单的结构和内容</li>
        <li><strong>小工具</strong>：许多主题支持在侧边栏或页脚添加各种小工具</li>
      </ol>
      
      <h3>颜色定制</h3>
      
      <p>大多数Halo主题都支持颜色定制，你可以通过以下方式调整：</p>
      
      <ul>
        <li>使用主题自带的颜色方案选择器</li>
        <li>修改主题的CSS变量（如果主题支持）</li>
        <li>使用自定义CSS覆盖默认样式</li>
      </ul>
      
      <p>以Xingdu主题为例，在主题设置中，你可以找到"颜色设置"选项，在那里可以调整主色调、次要色调、背景色等。</p>
      
      <h3>字体定制</h3>
      
      <p>字体对博客的整体感觉有很大影响。你可以通过以下方式定制字体：</p>
      
      <ol>
        <li>使用主题提供的字体选择器（如果有）</li>
        <li>通过自定义CSS引入Web字体：</li>
      </ol>
      
       /* 自定义CSS示例 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap');

body {
  font-family: 'Noto Serif SC', serif;
}

h1, h2, h3 {
  font-family: 'Noto Sans SC', sans-serif;
}  
      
      <h3>高级定制：主题模板修改</h3>
      
      <p>如果你有编程基础，可以进行更深入的定制：</p>
      
      <ol>
        <li><strong>克隆主题</strong>：将喜欢的主题源码克隆到本地</li>
        <li><strong>修改模板</strong>：Halo主题通常使用Freemarker模板引擎，你可以修改.ftl文件</li>
        <li><strong>自定义JS/CSS</strong>：在主题的static目录中添加或修改资源文件</li>
        <li><strong>重新打包</strong>：修改完成后，将主题打包并上传到Halo</li>
      </ol>
      
      <div class="warning">
        <p><strong>注意</strong>：修改主题源码前，请先备份原文件，并确保理解代码的功能，避免造成不可逆的错误。</p>
      </div>
      
      <h3>响应式设计调整</h3>
      
      <p>确保你的博客在各种设备上都能良好显示是很重要的。可以通过以下方式优化响应式设计：</p>
      
      <ul>
        <li>使用媒体查询调整不同屏幕尺寸下的显示效果</li>
        <li>测试博客在手机、平板和桌面设备上的显示</li>
        <li>确保图片和视频能够自适应屏幕宽度</li>
      </ul>
      
      <h3>总结</h3>
      
      <p>通过以上方法，你可以将Halo博客主题打造成完全符合个人风格的独特设计。记住，好的设计既美观又实用，应该在视觉吸引力和用户体验之间找到平衡。</p>
      
      <p>如果你有任何关于Halo主题定制的问题，欢迎在评论区留言讨论！</p>
    `,
    style: 'style1'
  },
  "post8": {
    id: "post8",
    title: "云上的日子",
    description: "记录一个普通的日子，天空中的云朵变幻莫测，像是在讲述着无声的故事。",
    date: "2025-03-01",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/2548152323/3103727191.webp",
    category: "随笔",
    tags: ["生活", "随想"],
    content: `
      <p>今天是个寻常的日子，没有特别的事情发生，也没有值得纪念的日期。但就是这样的普通日子，却让我在仰望天空时有了一些想法。</p>
      
      <h2>云的变幻</h2>
      
      <p>清晨起床，推开窗户，第一眼看到的是那片湛蓝的天空和飘浮的白云。云朵像是被看不见的手轻轻拉扯，缓慢地变换着形状。一会儿像是奔跑的马，一会儿又像是静卧的狮子，它们无声地讲述着属于自己的故事。</p>
      
      <p>我想，生活是不是也像这云朵一样，看似平静，实则一直在变化。我们常常忽略了那些微小的变化，直到某一天回头看时，才发现自己已经走了很远。</p>
      
      <h2>午后时光</h2>
      
      <p>中午时分，阳光正好，我坐在阳台的藤椅上，捧着一本书，不时抬头看看天空。云朵渐渐变得厚重，从纯白转变为带着些许灰色的白。它们聚集在一起，像是在召开一场无声的会议。</p>
      
      <blockquote>
        <p>云是行走的诗，是会呼吸的画。 —— 泰戈尔</p>
      </blockquote>
      
      <p>确实，云朵有着诗人的灵魂和画家的天赋，它们随意勾勒出的形状，比任何艺术作品都更令人着迷。在这个数字化的时代，我们习惯了快节奏的生活，但云依然保持着它们从古至今的节奏，不急不缓，不悲不喜。</p>
      
      <h2>傍晚的thought</h2>
      
      <p>太阳西沉，云朵被染成了金红色，像是燃烧的火焰在天际蔓延。我站在楼顶，感受着微凉的风，看着这幅大自然的杰作，内心不由得平静下来。</p>
      
      <p>我想到了那句话："人生如白驹过隙，忽然而已。"在宇宙的时间尺度上，我们的一生不过是转瞬即逝的一刻，就像天空中的云，存在过，变化过，最终消散。但正因为短暂，才更应该珍惜每一个平凡的日子，感受其中的美好。</p>
      
      <h2>夜幕降临</h2>
      
      <p>夜晚，云朵隐入了黑暗中，只能隐约看到它们遮住了几颗星星。我关上窗户，回thinking看到今天看到的云，心中涌起一种奇妙的感觉。或许明天的云会是另一副模样，或许明天的我也会有些许不同。</p>
      
      <p>生活在云上的日子，就是这样。平凡中有着无限的可能，静默中蕴含着深刻的变化。我们都是行走在时间长河中的旅人，而云，则是我们永恒的伴侣。</p>
      
      <p>今天就写到这里，愿你我都能在平凡的日子里，发现不平凡的美。</p>
    `,
    style: 'style1'
  },
  "post9": {
    id: "post9",
    title: "OSPF与RIP协议对比分析",
    description: "详细对比两种常用路由协议的优缺点，帮助网络工程师选择合适的协议。",
    date: "2025-03-15",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/400199818/1223356591.webp",
    category: "网工笔记",
    tags: ["OSPF", "RIP", "路由协议"],
    content: `
      <h2>OSPF与RIP协议对比分析</h2>
      
      <p>在网络架构设计中，选择合适的路由协议至关重要。本文将详细对比两种常用的内部网关协议(IGP)：开放最短路径优先协议(OSPF)和路由信息协议(RIP)，帮助网络工程师根据实际需求做出选择。</p>
      
      <h3>基本概念</h3>
      
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>OSPF</th>
            <th>RIP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>类型</td>
            <td>链路状态路由协议</td>
            <td>距离矢量路由协议</td>
          </tr>
          <tr>
            <td>算法</td>
            <td>Dijkstra最短路径优先</td>
            <td>Bellman-Ford算法</td>
          </tr>
          <tr>
            <td>RFC标准</td>
            <td>RFC 2328(OSPFv2)</td>
            <td>RFC 2453(RIPv2)</td>
          </tr>
          <tr>
            <td>管理距离</td>
            <td>110</td>
            <td>120</td>
          </tr>
        </tbody>
      </table>
      
      <h3>工作原理对比</h3>
      
      <h4>OSPF工作原理</h4>
      
      <p>OSPF是一种基于链路状态的路由协议，其工作原理如下：</p>
      
      <ol>
        <li>路由器通过Hello包建立邻居关系</li>
        <li>邻居之间交换链路状态数据库(LSDB)</li>
        <li>每个路由器独立运行Dijkstra算法，计算到各目标网络的最短路径</li>
        <li>当网络拓扑变化时，仅发送变化的部分，减少带宽消耗</li>
      </ol>
      
      <h4>RIP工作原理</h4>
      
      <p>RIP是一种基于距离矢量的路由协议：</p>
      
      <ol>
        <li>路由器周期性(默认30秒)向相邻路由器广播整个路由表</li>
        <li>路由器根据收到的路由信息更新自己的路由表</li>
        <li>跳数作为唯一度量标准，最大跳数限制为15(16表示不可达)</li>
        <li>使用毒性逆转和水平分割等机制防止路由环路</li>
      </ol>
      
      <h3>优劣势对比</h3>
      
      <h4>OSPF优势</h4>
      
      <ul>
        <li>收敛速度快，通常在秒级内完成</li>
        <li>无跳数限制，适合大型网络</li>
        <li>支持变长子网掩码(VLSM)和无类域间路由(CIDR)</li>
        <li>支持区域划分，提高可扩展性和降低CPU负担</li>
        <li>考虑带宽因素，能够计算出真正的最优路径</li>
      </ul>
      
      <h4>OSPF劣势</h4>
      
      <ul>
        <li>配置复杂，学习曲线陡峭</li>
        <li>需要更多的内存和CPU资源</li>
        <li>设计和维护需要更深入的专业知识</li>
      </ul>
      
      <h4>RIP优势</h4>
      
      <ul>
        <li>配置简单，易于实施</li>
        <li>占用资源少，适合低性能设备</li>
        <li>几乎所有路由设备都支持</li>
      </ul>
      
      <h4>RIP劣势</h4>
      
      <ul>
        <li>收敛速度慢，可能需要几分钟</li>
        <li>15跳的限制使其不适合大型网络</li>
        <li>周期性广播整个路由表浪费带宽</li>
        <li>仅以跳数作为度量标准，可能选择次优路径</li>
      </ul>
      
      <h3>应用场景选择</h3>
      
      <table>
        <thead>
          <tr>
            <th>网络特点</th>
            <th>推荐协议</th>
            <th>原因</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>小型网络(少于10台路由器)</td>
            <td>RIP</td>
            <td>配置简单，资源消耗少，跳数限制不构成问题</td>
          </tr>
          <tr>
            <td>中大型企业网络</td>
            <td>OSPF</td>
            <td>可扩展性好，收敛快，路径选择更优</td>
          </tr>
          <tr>
            <td>复杂拓扑结构</td>
            <td>OSPF</td>
            <td>支持区域划分，更好地控制路由信息流动</td>
          </tr>
          <tr>
            <td>带宽受限环境</td>
            <td>OSPF</td>
            <td>仅传输变化信息，节省带宽</td>
          </tr>
          <tr>
            <td>性能受限设备</td>
            <td>RIP</td>
            <td>资源消耗低，计算简单</td>
          </tr>
        </tbody>
      </table>
      
      <h3>配置示例对比</h3>
      
      <h4>OSPF基本配置(思科设备)</h4>
      
       router ospf 1
 router-id 1.1.1.1
 network 192.168.1.0 0.0.0.255 area 0
 network 192.168.2.0 0.0.0.255 area 0
 default-information originate  
      
      <h4>RIP基本配置(思科设备)</h4>
      
       router rip
 version 2
 no auto-summary
 network 192.168.1.0
 network 192.168.2.0  
      
      <h3>结论</h3>
      
      <p>OSPF和RIP各有优缺点，选择合适的协议应基于网络规模、复杂性、设备性能和管理能力等因素。对于现代企业网络，OSPF通常是更好的选择；而对于简单的小型网络或资源受限的环境，RIP可能更为适合。</p>
      
      <p>随着网络规模的扩大，也可以考虑将它们结合使用，如在边缘使用RIP，在核心使用OSPF，并通过路由重分发实现互通。</p>
    `,
    style: 'style2'
  },
  "post10": {
    id: "post10",
    title: "网络安全基础教程",
    description: "介绍网络安全基础知识，包括常见攻击方式和防御策略。",
    date: "2025-02-25",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/1824305649/3628065475.webp",
    category: "安全",
    tags: ["网络安全", "防御"],
    content: `
      <h2>网络安全基础教程</h2>
      
      <p>随着信息技术的飞速发展，网络安全问题日益突出。本文将为读者介绍网络安全的基础知识，包括常见的攻击方式和相应的防御策略。</p>
      
      <h3>网络安全三要素</h3>
      
      <p>网络安全的核心目标可以概括为CIA三原则：</p>
      
      <ul>
        <li><strong>机密性(Confidentiality)</strong>：确保信息不被未授权的人访问</li>
        <li><strong>完整性(Integrity)</strong>：确保信息不被未授权的修改</li>
        <li><strong>可用性(Availability)</strong>：确保授权用户能够访问信息和系统</li>
      </ul>
      
      <h3>常见网络攻击方式</h3>
      
      <h4>1. 恶意软件攻击</h4>
      
      <p>恶意软件是指设计用于未经授权访问或损害系统的软件。常见类型包括：</p>
      
      <ul>
        <li><strong>病毒</strong>：附加到合法程序上，当程序运行时激活并自我复制</li>
        <li><strong>蠕虫</strong>：能够自主传播，不需要用户交互</li>
        <li><strong>特洛伊木马</strong>：伪装成合法程序，诱导用户安装</li>
        <li><strong>勒索软件</strong>：加密用户数据，要求支付赎金解锁</li>
        <li><strong>后门</strong>：提供对系统的未授权访问</li>
      </ul>
      
      <h4>2. 社会工程学攻击</h4>
      
      <p>利用人类心理弱点而非技术漏洞进行的攻击：</p>
      
      <ul>
        <li><strong>钓鱼攻击</strong>：伪装成可信实体，诱导用户提供敏感信息</li>
        <li><strong>鱼叉式钓鱼</strong>：针对特定个人或组织的定向钓鱼</li>
        <li><strong>假冒CEO诈骗</strong>：假冒高管发送紧急资金转账请求</li>
        <li><strong>预置攻击</strong>：在公共场所放置带有恶意软件的USB驱动器</li>
      </ul>
      
      <h4>3. 网络攻击</h4>
      
      <ul>
        <li><strong>DDoS攻击</strong>：通过大量请求使目标服务不可用</li>
        <li><strong>中间人攻击</strong>：拦截并可能修改双方通信</li>
        <li><strong>SQL注入</strong>：向数据库查询中插入恶意代码</li>
        <li><strong>跨站脚本(XSS)</strong>：向网页注入恶意脚本</li>
        <li><strong>跨站请求伪造(CSRF)</strong>：诱导用户执行非预期操作</li>
      </ul>
      
      <h3>网络安全防御策略</h3>
      
      <h4>1. 技术防御措施</h4>
      
      <ul>
        <li><strong>防火墙</strong>：根据安全规则过滤网络流量</li>
        <li><strong>入侵检测/防御系统(IDS/IPS)</strong>：识别并阻止可疑活动</li>
        <li><strong>防病毒软件</strong>：检测并移除恶意软件</li>
        <li><strong>数据加密</strong>：保护数据机密性和完整性</li>
        <li><strong>多因素认证(MFA)</strong>：通过多种方式验证用户身份</li>
        <li><strong>VPN</strong>：通过加密通道保护远程通信</li>
      </ul>
      
      <h4>2. 管理防御措施</h4>
      
      <ul>
        <li><strong>安全策略制定</strong>：建立明确的安全规范和流程</li>
        <li><strong>定期风险评估</strong>：识别和评估潜在威胁</li>
        <li><strong>安全意识培训</strong>：提高员工安全意识</li>
        <li><strong>事件响应计划</strong>：制定安全事件处理流程</li>
        <li><strong>访问控制</strong>：实施最小权限原则</li>
        <li><strong>变更管理</strong>：控制系统变更的风险</li>
      </ul>
      
      <h4>3. 日常安全实践</h4>
      
      <ul>
        <li><strong>强密码管理</strong>：使用复杂密码并定期更换</li>
        <li><strong>定期备份</strong>：确保数据可恢复性</li>
        <li><strong>系统更新</strong>：及时应用安全补丁</li>
        <li><strong>网络分段</strong>：限制攻击范围</li>
        <li><strong>安全日志分析</strong>：监控并分析可疑活动</li>
      </ul>
      
      <h3>安全防御深度策略</h3>
      
      <p>有效的网络安全防御应采用深度防御策略，构建多层防御体系：</p>
      
       外部防御层 → 网络防御层 → 主机防御层 → 应用防御层 → 数据防御层  
      
      <p>即使一层防御被突破，其他层仍可提供保护，显著增加攻击难度。</p>
      
      <h3>安全事件响应流程</h3>
      
      <ol>
        <li><strong>准备</strong>：建立响应团队和流程</li>
        <li><strong>识别</strong>：检测并确认安全事件</li>
        <li><strong>遏制</strong>：限制事件影响范围</li>
        <li><strong>清除</strong>：移除攻击来源</li>
        <li><strong>恢复</strong>：恢复系统和数据</li>
        <li><strong>总结</strong>：分析事件，改进防御</li>
      </ol>
      
      <h3>结论</h3>
      
      <p>网络安全是一个持续的过程，而非一次性的工作。随着技术的发展，攻击方式也在不断演变。组织和个人需要保持警惕，不断更新安全知识和防御措施，才能有效应对不断变化的安全威胁。</p>
      
      <blockquote>
        <p>安全不是产品，而是过程。— Bruce Schneier</p>
      </blockquote>
    `,
    style: 'style2'
  },
  "post11": {
    id: "post11",
    title: "操作系统学习总结",
    description: "本文涵盖操作系统安全核心知识、实战案例及关键命令，给出密码管理、权限控制等安全建议。",
    date: "2024-05-15",
    author: "Chryssolion Chen",
    coverImage: "/images/7.png",
    category: "Tech",
    tags: ["操作系统", "安全"],
    content: `
      <h2>操作系统学习总结</h2>
      
      <h3>一、操作系统安全</h3>
      
      <h4>1. 操作系统（OS）核心作用</h4>
      <p>- <strong>硬件与应用的桥梁</strong>：管理CPU、内存、存储等硬件资源，为应用程序提供接口。</p>
      <p>- <strong>常见OS类型</strong>：</p>
      <ul>
        <li>桌面/笔记本：Windows、macOS、Linux</li>
        <li>移动端：Android、iOS</li>
        <li>服务器：Windows Server、IBM AIX、Oracle Solaris</li>
      </ul>
      <h4>2. 安全三要素</h4>
      <table>
        <thead>
          <tr>
            <th>要素</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>机密性</strong></td>
            <td>保护敏感数据（如密码、私人文件）不被未授权访问</td>
          </tr>
          <tr>
            <td><strong>完整性</strong></td>
            <td>确保数据在存储或传输中不被篡改</td>
          </tr>
          <tr>
            <td><strong>可用性</strong></td>
            <td>保证系统和服务在需要时可正常使用</td>
          </tr>
        </tbody>
      </table>
      <h4>3. 常见安全威胁</h4>
      <p>- <strong>弱密码问题</strong></p>
      <ul>
        <li><strong>典型弱密码</strong>：<code>123456</code>、<code>password</code>、<code>qwerty</code>（NCSC统计前20弱密码）</li>
        <li><strong>强密码特征</strong>：混合大小写、数字、符号（如<code>LearnM00r</code>）</li>
      </ul>
      <p>- <strong>文件权限漏洞</strong></p>
      <ul>
        <li><strong>最小权限原则</strong>：仅授予必要访问权限，避免公开敏感文件。</li>
      </ul>
      <p>- <strong>恶意程序风险</strong></p>
      <ul>
        <li><strong>木马</strong>：窃取数据或控制系统。</li>
        <li><strong>勒索软件</strong>：加密文件索要赎金（如WannaCry）。</li>
      </ul>
      <h3>三、实战案例分析</h3>
      <h4>案例1：Linux系统提权攻击</h4>
      <p>- <strong>攻击步骤</strong>：</p>
      <ol>
        <li><strong>SSH弱密码登录</strong>：使用 <code>sammie/dragon</code> 登录，发现用户 <code>johnny</code>。</li>
        <li><strong>密码爆破</strong>：尝试常见密码（如 <code>abc123</code>）登录 <code>johnny</code> 账户。</li>
        <li><strong>历史记录泄露</strong>：通过 <code>history</code> 发现 <code>root</code> 密码 <code>happyHack!NG</code>。</li>
        <li><strong>提权操作</strong>：<code>su - root</code> 切换至root，读取 <code>flag.txt</code>（内容：<code>THM{YouGotRoot}</code>）。</li>
      </ol>
      <h3>四、关键命令</h3>
      <p><strong>1. Linux命令</strong></p>
      <table>
        <thead>
          <tr>
            <th>工具/命令</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ssh user@IP</code></td>
            <td>远程登录。</td>
          </tr>
          <tr>
            <td><code>whoami</code></td>
            <td>查看当前用户。</td>
          </tr>
          <tr>
            <td><code>ls</code>/<code>cat</code></td>
            <td>列出文件/查看文件内容。</td>
          </tr>
          <tr>
            <td><code>history</code></td>
            <td>查看命令历史记录。</td>
          </tr>
          <tr>
            <td><code>su - user</code></td>
            <td>切换用户。</td>
          </tr>
        </tbody>
      </table>
      <h3>五、总结与建议</h3>
      <ul>
        <li><strong>密码管理</strong>：使用密码管理器生成复杂唯一密码，避免重复使用。</li>
        <li><strong>权限控制</strong>：遵循最小权限原则，定期审查文件权限。</li>
        <li><strong>系统更新</strong>：及时安装补丁，修复已知漏洞。</li>
        <li><strong>安全意识</strong>：警惕钓鱼攻击，避免下载未知文件。</li>
      </ul>
    `,
    style: 'style2'
  },
  "post4": {
    id: "post4",
    title: "渗透测试实战步骤总结",
    description: "详细介绍SSH登录提权流程、NMAP扫描+FTP提权流程、防火墙实战案例等渗透测试技术。",
    date: "2025-03-03",
    author: "Chryssolion Chen",
    coverImage: "/images/3.jpg",
    category: "网络安全",
    tags: ["渗透测试", "安全"],
    content: `
      <h2>渗透测试实战步骤总结</h2>
      
      <h3>场景一：SSH登录提权流程</h3>
      
      <ol>
        <li>
          <p><strong>通过弱密码登录SSH用户</strong></p>
          <pre><code>ssh username@target_ip  # 示例：ssh johnny@10.10.226.38</code></pre>
          <p>输入弱密码（如 <code>abc123</code>）完成登录。</p>
        </li>
        <li>
          <p><strong>检查历史命令记录</strong></p>
          <pre><code>history</code></pre>
          <p><strong>关键点</strong>：查找用户误操作（如明文密码输入、提权命令）。</p>
          <p><strong>示例发现</strong>：</p>
          <pre><code>su - root
password: happyHack!NG  # 发现root密码</code></pre>
        </li>
        <li>
          <p><strong>提权至root账户</strong></p>
          <pre><code>su - root</code></pre>
          <p>输入历史记录中发现的密码（如 <code>happyHack!NG</code>）。</p>
        </li>
        <li>
          <p><strong>访问敏感文件</strong></p>
          <pre><code>cat /root/flag.txt          # 查看root目录下的标志文件
cat /home/user/secret.txt   # 检查其他用户文件</code></pre>
          <p><strong>典型结果</strong>：<code>THM{YouGotRoot}</code></p>
        </li>
      </ol>

      <h3>场景二：NMAP扫描+FTP提权流程</h3>
      
      <ol>
        <li>
          <p><strong>扫描目标开放服务</strong></p>
          <pre><code>nmap target_ip  # 示例：nmap 10.10.250.183</code></pre>
          <p><strong>常见结果</strong>：</p>
          <pre><code>PORT   STATE SERVICE
21/tcp open  ftp    # 重点关注
22/tcp open  ssh
80/tcp open  http</code></pre>
        </li>
        <li>
          <p><strong>匿名登录FTP服务器</strong></p>
          <pre><code>ftp target_ip</code></pre>
          <p>输入用户名 <code>anonymous</code>，密码留空或任意值。</p>
          <p><strong>成功标志</strong>：<code>230 Login successful.</code></p>
        </li>
        <li>
          <p><strong>下载敏感文件</strong></p>
          <pre><code>ls              # 列出文件
get secret.txt  # 下载含密码的文件
exit            # 退出FTP</code></pre>
          <p><strong>文件内容示例</strong>：</p>
          <pre><code>password: ABC789xyz123  # root密码泄露</code></pre>
        </li>
        <li>
          <p><strong>通过SSH提权至root</strong></p>
          <pre><code>ssh root@target_ip</code></pre>
          <p>输入FTP中获取的密码（如 <code>ABC789xyz123</code>）。</p>
        </li>
        <li>
          <p><strong>全面访问系统文件</strong></p>
          <pre><code>cd /home         # 进入用户目录
cat */flag.txt   # 遍历所有用户的标志文件</code></pre>
          <p><strong>典型收获</strong>：</p>
          <ul>
            <li><code>/root/flag.txt</code> → <code>THM{FTP_SERVER_OWNED}</code></li>
            <li><code>/home/librarian/flag.txt</code> → <code>THM{LIBRARIAN_ACCOUNT_COMPROMISED}</code></li>
          </ul>
        </li>
      </ol>

      <h3>场景三：防火墙实战案例：CC攻击防御与规则验证</h3>
      
      <h4>一、攻击场景分析</h4>
      <p><strong>攻击特征</strong>：<br>
      外部IP <code>198.51.100.34</code> 对Web服务器 <code>203.0.110.1:80</code> 发起CC攻击（Challenge Collapsar），表现为高频HTTP请求导致服务过载</p>
      <p><strong>危害评估</strong>：</p>
      <ul>
        <li>服务不可用（违反<strong>可用性</strong>原则）</li>
        <li>潜在的数据泄露风险（若攻击混杂渗透行为）</li>
      </ul>
      
      <h4>二、防御规则配置详解</h4>
      <h5>1. 核心iptables命令</h5>
      <pre><code>### 防御规则配置
# 阻止特定攻击源访问Web服务 
iptables -A INPUT -s 198.51.100.34 -d 203.0.110.1 -p tcp --dport 80 -j DROP</code></pre>
      
      <h5>规则效果验证</h5>
      <table>
        <thead>
          <tr>
            <th>测试方向</th>
            <th>预期结果</th>
            <th>实际结果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>198.51.100.34 → 80端口</td>
            <td>阻断</td>
            <td>✅ 成功</td>
          </tr>
          <tr>
            <td>合法用户IP → 80端口</td>
            <td>放行</td>
            <td>✅ 正常</td>
          </tr>
          <tr>
            <td>攻击源其他端口访问</td>
            <td>放行</td>
            <td>⚠️ 需监控</td>
          </tr>
        </tbody>
      </table>
      
      <h5>参数解析</h5>
      <table>
        <thead>
          <tr>
            <th>参数</th>
            <th>作用</th>
            <th>关联场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>-A INPUT</code></td>
            <td>追加规则到INPUT链</td>
            <td>控制入站流量</td>
          </tr>
          <tr>
            <td><code>-s</code></td>
            <td>指定源IP</td>
            <td>精准锁定攻击源</td>
          </tr>
          <tr>
            <td><code>-d</code></td>
            <td>指定目标IP</td>
            <td>保护特定服务器</td>
          </tr>
          <tr>
            <td><code>--dport 80</code></td>
            <td>匹配目标端口</td>
            <td>针对HTTP服务防护</td>
          </tr>
          <tr>
            <td><code>-j DROP</code></td>
            <td>丢弃符合条件的数据包</td>
            <td>直接阻断攻击</td>
          </tr>
        </tbody>
      </table>

      <h3>关键注意事项</h3>
      <ol>
        <li><strong>密码复用风险</strong>：若发现密码（如 <code>ABC789xyz123</code>），需测试其在其他服务/用户中的复用情况。</li>
        <li><strong>权限最小化</strong>：提权后优先检查 <code>/etc/passwd</code> 和 <code>/etc/shadow</code> 文件。</li>
        <li><strong>痕迹清理</strong>：完成操作后清除 <code>.bash_history</code> 避免留下日志。</li>
        <li><strong>防御建议</strong>：
          <ul>
            <li>禁用FTP匿名登录</li>
            <li>配置SSH密钥认证替代密码</li>
            <li>定期审计用户命令历史</li>
          </ul>
        </li>
      </ol>

      <h3>流程图示例</h3>
      <pre><code>graph TD
  subgraph SSH提权链
    A[SSH弱密码登录] --> B{检查history}
    B -->|发现root密码| C[su - root提权]
    C --> D[访问敏感文件]
  end

  subgraph FTP提权链
    E[NMAP扫描] --> F{发现FTP服务}
    F --> G[匿名登录下载文件]
    G -->|获取root密码| H[SSH提权]
    H --> D
  end</code></pre>
    `,
    style: 'style2'
  },
  "linux-1": {
    id: "linux-1",
    title: "Linux基础入门指南",
    description: "从零开始学习Linux的基本概念，包括常用命令、文件系统和基本操作。",
    date: "2025-03-18",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/2117173837/4046808622.webp",
    category: "Linux",
    tags: ["Linux", "入门", "命令行"],
    content: `
---
# Linux基础入门指南

## 什么是Linux？

Linux是一个开源的类Unix操作系统内核，由Linus Torvalds在1991年首次发布。与Windows和macOS不同，Linux是免费开源的，任何人都可以使用、修改和分发其源代码。

## Linux发行版

Linux发行版是基于Linux内核构建的完整操作系统。常见的发行版包括：

- **Ubuntu** - 用户友好，适合Linux新手
- **CentOS/RHEL** - 企业级服务器首选
- **Debian** - 以稳定性著称 
- **Fedora** - 前沿技术，Red Hat的测试平台 
- **Arch Linux** - 高度可定制，滚动更新 

## 基础命令

### 文件和目录操作

**查看当前目录**

\`pwd\`

**列出文件和目录**

\`ls\`
\`ls -l\` # 详细信息 
\`ls -a\` # 显示隐藏文件

**切换目录**

\`cd /path/to/directory\` 
\`cd ..\` # 返回上级目录 
\`cd ~\` # 返回home目录

**创建目录**

\`mkdir new_directory\`

**创建文件**

\`touch new_file.txt\`

**复制文件**

\`cp source.txt destination.txt\`

**移动/重命名文件**

\`mv old_name.txt new_name.txt\`

**删除文件**

\`rm filename.txt\`

**删除目录**

\`rmdir empty_directory\` 
\`rm -r directory\` # 递归删除目录及其内容

### 文件内容查看

**查看文件内容**

\`cat filename.txt\`

**分页查看大文件**

\`less filename.txt\`

**查看文件前几行**

\`head filename.txt\` 
\`head -n 20 filename.txt\` # 查看前20行

**查看文件后几行**

\`tail filename.txt\` 
\`tail -n 20 filename.txt\` # 查看后20行

**查找文件内容**

\`grep "search_term" filename.txt\`

## 文件权限

Linux使用权限系统控制文件访问：

**修改文件权限**

\`chmod 755 filename\`

**修改文件所有者**

\`chown user:group filename\`

## 开始编写Shell脚本

### 第一个Shell脚本

创建一个名为hello.sh的文件：

\`\`\`
#!/bin/bash
# 这是一个简单的Shell脚本

echo "Hello, World!"
echo "当前日期是: $(date)"
echo "当前用户是: $USER"
\`\`\`

脚本的第一行 \`#!/bin/bash\` 被称为"shebang"或"hashbang"，它告诉系统使用哪个解释器来执行脚本。

### 执行脚本

有两种方式可以执行Shell脚本：

1. 使用bash命令执行：
\`\`\`
bash hello.sh
\`\`\`

2. 赋予执行权限后直接执行：
\`\`\`
chmod +x hello.sh
./hello.sh
\`\`\`

## 变量和数据类型

### 定义和使用变量

\`\`\`
#!/bin/bash

# 定义变量(注意=两边不能有空格)
name="John"
age=30
today=$(date +%Y-%m-%d)

# 使用变量
echo "姓名: $name"
echo "年龄: $age"
echo "今天是: $today"

# 变量赋值
name="Jane"
echo "新姓名: $name"

# 只读变量
readonly PI=3.14159
echo "PI值: $PI"
# PI=3.14  # 这会产生错误
\`\`\`

### 特殊变量

\`\`\`
#!/bin/bash

echo "脚本名称: $0"
echo "第一个参数: $1"
echo "第二个参数: $2"
echo "参数个数: $#"
echo "所有参数: $@"
echo "进程ID: $$"
echo "最后一个命令的退出状态: $?"
\`\`\`

## 控制结构

### if语句

\`\`\`
#!/bin/bash

age=25

if [ $age -lt 18 ]; then
    echo "未成年"
elif [ $age -ge 18 ] && [ $age -lt 60 ]; then
    echo "成年人"
else
    echo "老年人"
fi

# 文件测试
if [ -f "/etc/passwd" ]; then
    echo "/etc/passwd 存在且是普通文件"
fi

if [ -d "/etc" ]; then
    echo "/etc 是目录"
fi
\`\`\`

### for循环

\`\`\`
#!/bin/bash

# 基本for循环
for i in 1 2 3 4 5; do
    echo "数字: $i"
done

# 遍历文件
for file in /etc/*.conf; do
    echo "配置文件: $file"
done

# C风格for循环
for ((i=1; i<=5; i++)); do
    echo "计数: $i"
done
\`\`\`

### while循环

\`\`\`
#!/bin/bash

# 基本while循环
count=1
while [ $count -le 5 ]; do
    echo "循环次数: $count"
    ((count++))
done

# 读取文件
while read line; do
    echo "行内容: $line"
done < /etc/hostname
\`\`\`

### case语句

\`\`\`
#!/bin/bash

fruit="apple"

case $fruit in
    "apple")
        echo "这是一个苹果"
        ;;
    "banana"|"plantain")
        echo "这是香蕉家族的水果"
        ;;
    "orange")
        echo "这是一个橙子"
        ;;
    *)
        echo "未知水果"
        ;;
esac
\`\`\`

## 函数

\`\`\`
#!/bin/bash

# 定义函数
sayHello() {
    echo "Hello, $1!"
    echo "今天是 $(date)"
}

# 带返回值的函数
add() {
    local result=$(($1 + $2))
    echo $result  # 通过echo返回值
    return 0  # 返回状态码
}

# 调用函数
sayHello "World"
sayHello "Linux"

# 获取函数返回值
sum=$(add 5 3)
echo "5 + 3 = $sum"
echo "函数返回状态: $?"
\`\`\`

## 数组

\`\`\`
#!/bin/bash

# 定义数组
fruits=("apple" "banana" "orange" "grape")

# 访问数组元素
echo "第一个水果: \${fruits[0]}"
echo "第三个水果: \${fruits[2]}"

# 获取所有元素
echo "所有水果: \${fruits[@]}"

# 获取数组长度
echo "水果数量: \${#fruits[@]}"

# 追加元素
fruits+=("pear")
echo "新增后的水果: \${fruits[@]}"

# 遍历数组
for fruit in "\${fruits[@]}"; do
    echo "水果: $fruit"
done
      \`\`\`

      <h2>字符串操作</h2>
      \`\`\`
#!/bin/bash

# 字符串连接
first_name="John"
last_name="Doe"
full_name="$first_name $last_name"
echo "全名: $full_name"

# 字符串长度
echo "全名长度: \${#full_name}"

# 子字符串提取
echo "姓氏前3个字符: \${last_name:0:3}"

# 字符串替换
sentence="I like bash programming"
echo "\${sentence/bash/shell}"  # 替换第一次出现
echo "\${sentence//a/A}"  # 替换所有出现
      \`\`\`

## 文件操作

\`\`\`
#!/bin/bash

# 创建目录
mkdir -p temp/test

# 写入文件
echo "这是一个测试文件" > temp/test/sample.txt
echo "第二行内容" >> temp/test/sample.txt

# 读取文件
while IFS= read -r line; do
    echo "读取内容: $line"
done < temp/test/sample.txt

# 检查文件是否存在
if [ -f temp/test/sample.txt ]; then
    echo "文件存在"
fi

# 文件权限
chmod 755 temp/test/sample.txt

# 获取文件信息
file_info=$(stat -c "权限:%a 大小:%s 修改时间:%y" temp/test/sample.txt)
echo "$file_info"
\`\`\`

## 正则表达式

\`\`\`
#!/bin/bash

# 使用grep和正则表达式
echo "使用grep查找包含'bash'的行:"
grep "bash" /etc/shells

# 使用sed替换文本
echo "原文本: Hello World" | sed 's/World/Bash/'

# 使用awk处理文本
echo -e "John 25\nJane 30\nMike 22" | awk '{print "姓名:" $1 ", 年龄:" $2}'

# 使用regex测试
email="user@example.com"
if [[ $email =~ [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,} ]]; then
    echo "$email 是有效的电子邮件地址"
else
    echo "$email 不是有效的电子邮件地址"
fi
\`\`\`

## 错误处理

\`\`\`
#!/bin/bash

# 捕获错误
set -e  # 遇到错误立即退出
trap 'echo "错误发生在第 $LINENO 行"; exit 1' ERR

# 检查命令执行状态
ls /nonexistent 2>/dev/null
if [ $? -ne 0 ]; then
    echo "ls命令执行失败"
fi

# 自定义错误处理函数
error_handler() {
    echo "发生错误: $1"
    exit 1
}

# 使用自定义错误处理
[ -d "/etc" ] || error_handler "/etc 目录不存在"
\`\`\`

## 调试技巧

\`\`\`
#!/bin/bash

# 启用调试模式
set -x  # 显示执行的命令
echo "这是一个调试示例"
name="John"
echo "姓名: $name"
set +x  # 关闭调试模式

# 另一种调试方法
bash -n script.sh  # 只检查语法，不执行
bash -v script.sh  # 显示脚本行，然后执行
bash -x script.sh  # 显示命令及其参数，然后执行
\`\`\`

## 实用脚本示例

### 系统监控脚本

\`\`\`
#!/bin/bash

echo "======= 系统信息 ======="
echo "主机名: $(hostname)"
echo "内核版本: $(uname -r)"
echo "运行时间: $(uptime)"

echo "======= CPU信息 ======="
echo "CPU使用率: $(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\\([0-9.]*\\)%* id.*/\\1/" | awk '{print 100 - $1"%"}')"
echo "负载平均值: $(cat /proc/loadavg | awk '{print $1, $2, $3}')"

echo "======= 内存信息 ======="
free -h

echo "======= 磁盘使用情况 ======="
df -h

echo "======= 最活跃的5个进程 ======="
ps aux --sort=-%cpu | head -6
\`\`\`

### 批量文件重命名

\`\`\`
#!/bin/bash

# 批量将文件名中的空格替换为下划线
for file in *; do
    if [ -f "$file" ]; then
        new_name=$(echo "$file" | tr ' ' '_')
        if [ "$file" != "$new_name" ]; then
            mv "$file" "$new_name"
            echo "重命名: $file -> $new_name"
        fi
    fi
done
\`\`\`

## 最佳实践

1. **始终使用shebang行**: #!/bin/bash
2. **添加脚本文档**: 在脚本开头加入注释说明用途、用法和参数
3. **使用有意义的变量名**: 变量名应该反映其用途
4. **引用变量**: 使用双引号包围变量，防止分词问题: "$variable"
5. **返回值**: 确保脚本和函数有适当的退出状态
6. **错误处理**: 使用set -e和trap捕获错误
7. **模块化**: 将常用功能封装成函数或独立脚本
8. **路径处理**: 小心处理包含空格或特殊字符的文件路径
9. **测试**: 在重要数据上运行前先在测试环境测试脚本
10. **版本控制**: 使用Git等工具管理脚本版本

## 结论

Shell脚本是Linux系统管理和自动化的强大工具。通过本文介绍的基础知识和技巧，你可以开始编写自己的脚本，自动化日常任务，提高工作效率。随着经验的积累，你可以开发更复杂、更强大的脚本来解决各种问题。

记住，Shell脚本的真正力量在于它能够无缝地将系统命令和工具组合在一起，创建出强大的自动化解决方案。持续学习和实践是掌握Shell脚本编程的关键。
    `,
    style: 'style2'
  }
};

export default async function PostPage({ params }: { params: { id: string } }) {
  // 首先尝试从文件系统获取文章
  const postFromFile = await getPostFromFile(params.id);
  
  // 如果文件系统有这篇文章，就使用它
  if (postFromFile) {
    return <PostClient post={postFromFile} />;
  }
  
  // 否则尝试从硬编码数据中获取
  const post = postsDatabase[params.id];
  
  // 如果找不到文章，显示404页面
  if (!post) {
    notFound();
  }
  
  return <PostClient post={post} />;
}

// 生成所有可能的文章路径参数
export async function generateStaticParams() {
  // 获取所有文件系统中的文章ID
  let fileIds: string[] = [];
  try {
    if (fs.existsSync(POSTS_DIR)) {
      const files = fs.readdirSync(POSTS_DIR);
      fileIds = files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
    }
  } catch (error) {
    console.error('获取文章文件失败:', error);
  }
  
  // 获取硬编码的文章ID
  const hardcodedIds = Object.keys(postsDatabase);
  
  // 合并两种来源的ID，并去重
  const allIds = [...new Set([...fileIds, ...hardcodedIds])];
  
  // 返回所有文章ID的数组，用于静态生成
  return allIds.map(id => ({
    id: id
  }));
} 