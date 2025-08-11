"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import Navbar from "./Navbar";

// ---- EASY TWEAKS ----
const UI = {
  title: "Wayne Bowen Art",
  items: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "About",     href: "/about" },
    { label: "Events",    href: "/news" },
    { label: "Contact",   href: "/contact" },
  ],

  // Edit these two only:
  mobileTitleSize:  "text-7xl ml-8",                          // <-- mobile portrait size (make it “twice as big” here)
  desktopTitleSizes:"text-3xl sm:text-5xl md:text-6xl xl:text-7xl text-black", // desktop/landscape sizes
  baseTitleClasses: "font-montserrat leading-tight font-semibold",
};
export default function Toolbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqPortrait = window.matchMedia("(orientation: portrait)");

    const update = () => {
      const portrait = mqPortrait.matches;
      const narrow = window.innerWidth < 768; // safety for genuinely small widths
      setIsMobile(portrait || narrow);
    };

    update();
    setMounted(true);

    // listeners
    mqPortrait.addEventListener?.("change", update);
    window.addEventListener("resize", update);

    return () => {
      mqPortrait.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Until mounted, render a neutral header (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="w-full flex items-center justify-between gap-3">
        <Link href="/" className="shrink-0">
          <h1 className={UI.titleClasses}>{UI.title}</h1>
        </Link>
        <div className="h-7 w-7" />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex w-full items-center justify-between gap-3">
        {/* Title */}
        <Link href="/" className="shrink-0">
          <h1 className={`${UI.baseTitleClasses} ${isMobile ? UI.mobileTitleSize : UI.desktopTitleSizes}`}>{UI.title}</h1>
        </Link>

        {/* Desktop navbar (landscape) */}
        {!isMobile && (
          <div className="w-full">
            <Navbar />
          </div>
        )}

        {/* Mobile burger (portrait or narrow) */}
        {isMobile && (
          <button
            className="inline-flex items-center justify-center p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <FiX size={128} /> : <FiMenu size={128} />}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && open && (
        <div className="absolute left-0 right-0 mt-3 rounded-2xl border border-black/10 bg-white/95 backdrop-blur shadow-xl z-50">
          <nav className="flex flex-col">
            {UI.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-4 hover:bg-black/5 ${UI.mobileItemClasses}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}