import { useEffect, useState } from "react";

export function useGap() {
  const [gap, setGap] = useState(20);

  useEffect(() => {
    function updateGap() {
      if (window.innerWidth >= 1024) setGap(150); // lg size
      else if (window.innerWidth >= 768) setGap(100); // md size
      else setGap(50); // sm and below sizes
    }
    updateGap();
    window.addEventListener("resize", updateGap);
    return () => window.removeEventListener("resize", updateGap);
  }, []);

  return gap;
}
