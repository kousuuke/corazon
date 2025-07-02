import Image from "next/image";
import React from "react";
import TabsPanel from "./ui/tabs";
import Contacts from "./ui/contacts";
import { InView } from "./effects/in-view";

export default function Footer() {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      viewOptions={{ margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <footer className="w-full h-auto bg-[var(--primary)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-[auto_auto_auto_auto] md:grid-rows-2 lg:grid-rows-2 p-4 gap-10">
        <div className="relative flex flex-col items-center justify-end pb-2 col-span-full md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-2">
          <Image
            src="/crzn-footer.png"
            alt="crzn-footer"
            fill
            className="object-contain color-[var(--primary)]"
          />
        </div>
        <TabsPanel />
        <Contacts />
        <span className="select-none text-xl md:text-2xl lg:text-4xl col-span-full md:col-span-1 lg:col-start-3 text-center md:text-right self-end mt-4 md:mt-0">
          2025
        </span>
      </footer>
    </InView>
  );
}
