"use client";

import React, { useState } from "react";
import { TransitionPanel } from "./transition-panel";

export default function TabsPanel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const footerItems = [
    {
      title: "About",
      subtitle: "Inspired by the Nagi Nagi no Mi's Elegance",
      content:
        "This platform draws inspiration from Donquixote Rosinante's Nagi Nagi no Mi Devil Fruit, which embodies silence and subtlety. We designed this URL shortener to reflect those principles—transforming lengthy, cumbersome URLs into concise, elegant links. Our tool caters to users who value simplicity and aesthetic refinement in sharing web addresses.",
    },
    {
      title: "Notice",
      subtitle: "Public Links Only: Privacy Disclaimer",
      content:
        "This service does not protect sensitive or private data. We explicitly advise against shortening URLs containing confidential information, as this platform is open-source and publicly accessible. By using this tool, you acknowledge that shortened links are not private and may be viewed by others.",
    },
    {
      title: "Guide",
      subtitle: "How to Use This URL Shortener",
      content:
        "To shorten a URL, paste the target link into the provided input field and click the 'Generate' button. The system will instantly produce a condensed version of your URL, which you can then copy and share. No registration or additional steps are required—this process ensures efficiency and ease of use for all visitors.",
    },
  ];
  return (
    <div className="col-span-full md:col-span-1 lg:col-span-1 row-span-2 ">
      <div className="mb-4 flex space-x-2">
        {footerItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              activeIndex === index
                ? "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                : "bg-zinc-700 text-zinc-400"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="overflow-hidden border-t border-[var(--border)] min-h-[130px] ">
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          variants={{
            enter: { opacity: 0, y: -50, filter: "blur(4px)" },
            center: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: 50, filter: "blur(4px)" },
          }}
        >
          {footerItems.map((item, index) => (
            <div key={index} className="py-2">
              <h3 className="mb-2 font-medium lg:text-2xl md:text-xl text-md text-[var(--secondary-foreground)] select-none">
                {item.subtitle}
              </h3>
              <p className="text-[var(--muted)] font-medium">{item.content}</p>
            </div>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}
