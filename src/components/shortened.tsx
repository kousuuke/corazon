"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { TextMorph } from "./effects/text-morph";
import { TextScramble } from "./effects/text-scramble";

type ShortenedProps = {
  shortenedUrl: string;
};

export default function Shortened({ shortenedUrl }: ShortenedProps) {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = () => {
    setIsCopying(true);
    navigator.clipboard.writeText(shortenedUrl);
    setTimeout(() => setIsCopying(false), 3000);
  };

  return (
    <div className="w-2xs md:w-lg lg:w-xl h-auto p-4 rounded-lg space-y-2">
      <h3 className="text-[var(--foreground)] font-bold text-sm select-none">
        Your shortened URL:
      </h3>
      <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
        <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
          <TextScramble className="text-sm text-[var(--primary)]">
            {shortenedUrl}
          </TextScramble>
        </a>
        <Button
          variant="secondary"
          onClick={handleCopy}
          disabled={isCopying}
          size="sm"
        >
          <TextMorph>{isCopying ? "Copied!" : "Copy"}</TextMorph>
        </Button>
      </div>
    </div>
  );
}
