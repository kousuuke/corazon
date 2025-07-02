"use client";

import React, { useEffect, useState } from "react";

interface DelayRedirectClientProps {
  originalUrl: string;
  delaySeconds: number;
}

export default function DelayRedirectClient({
  originalUrl,
  delaySeconds,
}: DelayRedirectClientProps) {
  const [countdown, setCountdown] = useState<number>(delaySeconds);

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setCountdown((prev: number) => prev - 1);
    }, 1000);

    const redirectTimer: NodeJS.Timeout = setTimeout(() => {
      window.location.href = originalUrl;
    }, delaySeconds * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [originalUrl, delaySeconds]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-5 gap-4">
      <h1 className="font-bold text-[var(--primary)] text-3xl">
        Redirecting you in {countdown} seconds...
      </h1>

      <div className="space-y-2 max-w-md md:max-w-xl mx-auto">
        <p className="mb-4 font-semibold">You are being redirected to: </p>
        <a
          href={originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--primary)] hover:text-blue-800 underline break-all text-center "
        >
          {originalUrl}
        </a>
      </div>

      <p className="mt-5 text-sm text-gray-600">
        If you are not redirected automatically, please click the link above.
      </p>
    </div>
  );
}
