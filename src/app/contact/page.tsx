"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactForm from "@/components/ContactForm"
import FAQAccordion from "@/components/FAQAccordion"
import YourNameBackground from "@/components/YourNameBackground"

// FAQ数据
const faqItems = [
  {
    question: "如何订阅博客更新？",
    answer: "您可以在首页底部输入您的电子邮箱地址，点击订阅按钮即可接收我们的最新文章更新。"
  },
  {
    question: "如何投稿？",
    answer: "我们欢迎优质的投稿内容。请通过联系表单向我们发送您的投稿内容概要，我们会尽快回复您。"
  },
  {
    question: "网站支持RSS订阅吗？",
    answer: "是的，我们提供RSS订阅功能。您可以在网站底部找到RSS订阅链接，或者直接访问/rss.xml获取订阅地址。"
  },
  {
    question: "如何申请友情链接？",
    answer: "如果您希望与我们交换友情链接，请通过联系表单发送您的网站信息，包括网站名称、简介、LOGO和URL地址。"
  },
  {
    question: "文章内容可以转载吗？",
    answer: "本站内容采用CC BY-NC-SA 4.0许可协议，您可以在非商业用途下自由转载、分享，但必须保留原文链接和作者信息。"
  }
]

export default function ContactPage() {
  return (
    <>
      {/* 《你的名字》风格的动画背景 */}
      <YourNameBackground />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">联系我们</h1>

          <div className="mb-12">
            <p className="text-center mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              如果您有任何问题、建议或合作意向，欢迎通过以下表单与我们联系。我们会尽快回复您的留言。
            </p>

            <Tabs defaultValue="style1" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="style1" className="font-['KuaiKanShiJieTi']">技术风格</TabsTrigger>
                <TabsTrigger value="style3" className="font-['HanTang']">小臣小窝安全</TabsTrigger>
              </TabsList>
              <TabsContent value="style1" className="mt-6">
                <ContactForm style="style1" />
              </TabsContent>
              <TabsContent value="style3" className="mt-6">
                <ContactForm style="style3" />
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">常见问题</h2>

            <Tabs defaultValue="style1" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="style1" className="font-['KuaiKanShiJieTi']">技术风格</TabsTrigger>
                <TabsTrigger value="style3" className="font-['HanTang']">小臣小窝安全</TabsTrigger>
              </TabsList>
              <TabsContent value="style1" className="mt-6">
                <FAQAccordion items={faqItems} style="style1" />
              </TabsContent>
              <TabsContent value="style3" className="mt-6">
                <FAQAccordion items={faqItems} style="style3" />
              </TabsContent>
            </Tabs>
          </div>

          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">其他联系方式</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-slate-100">
                <div className="text-3xl mb-2">📧</div>
                <h3 className="font-medium mb-1">电子邮件</h3>
                <p className="text-muted-foreground">example@example.com</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-100">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-medium mb-1">社交媒体</h3>
                <p className="text-muted-foreground">联系客服</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-100">
                <div className="text-3xl mb-2">🏢</div>
                <h3 className="font-medium mb-1">地址</h3>
                <p className="text-muted-foreground">中国</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
