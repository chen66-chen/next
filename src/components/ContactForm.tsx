"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// ContactForm props type
type ContactFormProps = {
  style?: "style1" | "style2" | "style3";
};

// Form data type
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm({ style = "style1" }: ContactFormProps) {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("感谢您的留言，我们会尽快回复！");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  // Render Style 1 (技术支持)
  if (style === "style1") {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-['KuaiKanShiJieTi'] text-site1-primary text-2xl mb-6">联系我们</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-['MiSans'] text-site1-darkAccent">姓名</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-site1-accent/40"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-['MiSans'] text-site1-darkAccent">电子邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-site1-accent/40"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="font-['MiSans'] text-site1-darkAccent">主题</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="border-site1-accent/40"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="font-['MiSans'] text-site1-darkAccent">留言</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border-site1-accent/40"
              rows={5}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-site1-primary hover:bg-site1-primary/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "提交中..." : "发送留言"}
          </Button>
        </form>
      </div>
    );
  }

  // Render Style 2 (Chryssolion Chen)
  if (style === "style2") {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-['NotoSerifSC'] text-site2-primary text-2xl mb-6">联系我们</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-['NotoSerifSC'] text-site2-secondary">姓名</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-site2-accent/40"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-['NotoSerifSC'] text-site2-secondary">电子邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-site2-accent/40"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="font-['NotoSerifSC'] text-site2-secondary">主题</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="border-site2-accent/40"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="font-['NotoSerifSC'] text-site2-secondary">留言</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border-site2-accent/40"
              rows={5}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-site2-primary hover:bg-site2-primary/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "提交中..." : "发送留言"}
          </Button>
        </form>
      </div>
    );
  }

  // Render Style 3 (Chryssolion Chen安全小窝)
  return (
    <div className="bg-site3-primary/10 p-6 rounded-lg border border-site3-navy/30">
      <h2 className="font-['HanTang'] text-site3-light text-2xl mb-6">联系我们</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-['HanTang'] text-site3-light">姓名</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-site3-primary/5 border-site3-navy/30 text-site3-light"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-['HanTang'] text-site3-light">电子邮箱</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-site3-primary/5 border-site3-navy/30 text-site3-light"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" className="font-['HanTang'] text-site3-light">主题</Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="bg-site3-primary/5 border-site3-navy/30 text-site3-light"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="font-['HanTang'] text-site3-light">留言</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="bg-site3-primary/5 border-site3-navy/30 text-site3-light"
            rows={5}
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-site3-blue hover:bg-site3-blue/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "提交中..." : "发送留言"}
        </Button>
      </form>
    </div>
  );
}
