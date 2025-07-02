import React from "react";
import { TextLoop } from "./effects/text-loop";

export default function Hero() {
  return (
    <div className="space-y-4">
      <h1 className="font-black text-[var(--primary)] text-4xl md:text-5xl lg:text-6xl leading-tight mx-auto max-w-2xl text-center select-none">
        Silent the <span className="text-[var(--foreground)]">Noise</span>
        <br></br>of Long Links
      </h1>
      <div className="flex flex-row items-center justify-center gap-2 text-[12px] md:text-md lg:text-lg text-[var(--foreground)] leading-7 select-none">
        Your Pure Path to Every Destination.
        <TextLoop
          className="overflow-y-clip min-w-[90px] md:min-w-[90px] lg:min-w-[150px]"
          transition={{
            type: "spring",
            stiffness: 900,
            damping: 80,
            mass: 10,
          }}
          interval={5}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: "blur(4px)",
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: "blur(4px)",
            },
          }}
        >
          <span className="text-[var(--foreground)]">Always Free.</span>
          <span className="text-[var(--foreground)]">No Interruptions.</span>
        </TextLoop>
      </div>
    </div>
  );
}
