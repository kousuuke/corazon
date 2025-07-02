"use client";
import { InfiniteSlider } from "@/components/effects/slider";
import { useGap } from "@/hooks/useGap";
import React from "react";

export default function NotFoundError() {
  const gap = useGap();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-[16px]">
      <div className="w-full select-none space-y-4">
        <InfiniteSlider speedOnHover={20} gap={gap}>
          <h1 className="font-black text-[50px] md:text-[100px] lg:text-[300px]">
            404
          </h1>
          <h1 className="font-black text-[50px] md:text-[100px] lg:text-[300px]">
            404
          </h1>
          <h1 className="font-black text-[50px] md:text-[100px] lg:text-[300px]">
            404
          </h1>
        </InfiniteSlider>
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="font-bold text-[var(--primary)] text-xl md:text-2xl lg:text-3xl">
            This URL leads nowhere.
          </h2>
          <p className="break-words ml-4 mr-4 text-center max-w-md md:max-w-xl mx-auto text-[12px] md:text-sm lg:text-lg">
            The shortened link you requested does not exist in our system. It
            may have expired, been deleted, or never created. Verify the URL or
            return to the homepage to generate a new one.
          </p>
        </div>
      </div>
    </div>
  );
}
