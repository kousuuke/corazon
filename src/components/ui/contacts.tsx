import React from "react";

export default function Contacts() {
  return (
    <div className="flex flex-col items-end gap-4 col-span-full md:col-span-1 lg:col-span-1">
      <a
        href="https://onepiece.fandom.com/wiki/Donquixote_Rosinante"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl md:text-2xl lg:text-4xl hover:text-white transition-colors duration-300"
      >
        Donquixote Rosinante
      </a>
      <a
        href="https://github.com/kousuuke"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl md:text-2xl lg:text-4xl hover:text-white transition-colors duration-300"
      >
        kousuuke
      </a>
    </div>
  );
}
