"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// FAQ item type
type FAQItem = {
  question: string;
  answer: string;
};

// Props interface
type FAQProps = {
  items: FAQItem[];
  style?: "style1" | "style2" | "style3";
};

export default function FAQAccordion({ items, style = "style1" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Style 1 (技术支持)
  if (style === "style1") {
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-site1-accent rounded-lg overflow-hidden"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-site1-light"
              onClick={() => toggleItem(index)}
            >
              <h3 className="font-['MiSans'] text-site1-primary font-medium">
                {item.question}
              </h3>
              <span className="text-site1-primary">
                {openIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </span>
            </div>
            {openIndex === index && (
              <div className="p-4 bg-white border-t border-site1-accent/40">
                <p className="font-['MiSans'] text-site1-secondary">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Style 2 (Chryssolion Chen)
  if (style === "style2") {
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-site2-accent rounded-lg overflow-hidden"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-site2-light"
              onClick={() => toggleItem(index)}
            >
              <h3 className="font-['NotoSerifSC'] text-site2-primary font-medium">
                {item.question}
              </h3>
              <span className="text-site2-teal">
                {openIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </span>
            </div>
            {openIndex === index && (
              <div className="p-4 bg-white border-t border-site2-accent/40">
                <p className="font-['NotoSerifSC'] text-site2-secondary">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Style 3 (Chryssolion Chen安全小窝)
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-site3-navy/30 rounded-lg overflow-hidden"
        >
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-site3-primary/20"
            onClick={() => toggleItem(index)}
          >
            <h3 className="font-['HanTang'] text-site3-light font-medium">
              {item.question}
            </h3>
            <span className="text-site3-blue">
              {openIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </span>
          </div>
          {openIndex === index && (
            <div className="p-4 bg-site3-primary/10 border-t border-site3-navy/20">
              <p className="font-['HanTang'] text-site3-secondary">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
