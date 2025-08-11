// hooks/useMobileOrientation.js
"use client";
import { useEffect, useState } from "react";

export default function useMobileOrientation() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqPortrait = window.matchMedia("(orientation: portrait)");
    const update = () => {
      const portrait = mqPortrait.matches;
      const narrow = window.innerWidth < 768; // fallback for truly narrow landscape
      setIsMobile(portrait || narrow);
    };
    update();
    setMounted(true);
    mqPortrait.addEventListener?.("change", update);
    window.addEventListener("resize", update);
    return () => {
      mqPortrait.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { mounted, isMobile };
}
