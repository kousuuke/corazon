"use client";
import { InfiniteSlider } from "@/components/effects/slider";
import { useGap } from "@/hooks/useGap";
import React from "react";

export default function UrlError() {
  const gap = useGap();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-[16px]">
      <div className="w-full select-none space-y-4">
        <InfiniteSlider speedOnHover={20} gap={gap}>
          <h1 className="font-black text-[50px] md:text-[100px] lg:text-[300px]">
            500
          </h1>
          <h1 className="font-black text-[50px] md:text-[100px] lg:text-[300px]">
            500
          </h1>
          <h1 className="font-black text-[50px] md:text-[100px] lg:text-[300px]">
            500
          </h1>
        </InfiniteSlider>
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="font-bold text-[var(--primary)] text-xl md:text-2xl lg:text-3xl">
            Server Error
          </h2>
          <p className="break-words ml-4 mr-4 text-center max-w-md md:max-w-xl mx-auto text-[12px] md:text-sm lg:text-lg">
            Our servers encountered an unexpected error while processing your
            request. This isn't your fault - it's a problem on our end. Our team
            has been notified and we're working to fix it.
          </p>
        </div>
      </div>
    </div>
  );
}
