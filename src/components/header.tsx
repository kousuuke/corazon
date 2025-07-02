"use client";
import React, { useEffect, useState } from "react";
import { SlidingNumber } from "./ui/sliding-number";

export default function Header() {
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().getHours());
      setMinutes(new Date().getMinutes());
      setSeconds(new Date().getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="fixed top-0 z-50 w-full min-h-[48px] md:min-h-[56px] lg:min-h-[64px] flex items-center p-4 justify-between">
      <div className="flex items-center gap-0.5 font-mono select-none">
        <SlidingNumber value={hours} padStart={true} />
        <span className="text-[var(--primary)]">:</span>
        <SlidingNumber value={minutes} padStart={true} />
        <span className="text-[var(--primary)]">:</span>
        <SlidingNumber value={seconds} padStart={true} />
      </div>
      <span className="font-mono select-none">CORAZON</span>
    </header>
  );
}
