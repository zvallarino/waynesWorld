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

  // Title sizes
  mobileTitleSize:  "text-5xl ml-8",
  desktopTitleSizes:"text-3xl sm:text-5xl md:text-6xl xl:text-7xl text-black",
  baseTitleClasses: "font-montserrat leading-tight font-semibold",

  // Overlay look & sizing
  overlayBg: "bg-black/60 backdrop-blur-sm",     // transparent grey with subtle blur
  itemSize:  "text-4xl sm:text-5xl",             // big menu items
  itemGap:   "gap-8 sm:gap-10",                  // spacing between items
  itemStyle: "text-white font-light tracking-wide hover:opacity-80",
  overlayPadding: "px-8",                        // side breathing room
  iconSize: 48,                                  // X / burger size
};

export default function Toolbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqPortrait = window.matchMedia("(orientation: portrait)");
    const update = () => {
      const portrait = mqPortrait.matches;
      const narrow = window.innerWidth < 768;
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

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock background scroll when overlay is open
  useEffect(() => {
    if (open) {
      const { style } = document.documentElement;
      const prev = style.overflow;
      style.overflow = "hidden";
      return () => { style.overflow = prev; };
    }
  }, [open]);

  // Until mounted, render a neutral header (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="w-full flex items-center justify-between gap-3">
        <Link href="/" className="shrink-0">
          <h1 className={`${UI.baseTitleClasses} ${UI.desktopTitleSizes}`}>{UI.title}</h1>
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
          <h1 className={`${UI.baseTitleClasses} ${isMobile ? UI.mobileTitleSize : UI.desktopTitleSizes}`}>
            {UI.title}
          </h1>
        </Link>

        {/* Desktop navbar */}
        {!isMobile && (
          <div className="w-full">
            <Navbar />
          </div>
        )}

        {/* Mobile burger */}
        {isMobile && (
          <button
            className="inline-flex items-center justify-center p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <FiX size={UI.iconSize} /> : <FiMenu size={UI.iconSize} />}
          </button>
        )}
      </div>

      {/* Mobile FULL-SCREEN overlay */}
      {isMobile && open && (
        <div
          className={`fixed inset-0 z-[100] ${UI.overlayBg} ${UI.overlayPadding} flex`}
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}  // click outside to close
        >
          {/* Close button inside overlay */}
          <button
            aria-label="Close menu"
            className="absolute right-4 top-4 p-3 text-white"
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
          >
            <FiX size={UI.iconSize} />
          </button>

          {/* Big centered menu */}
          <nav
            className={`relative mx-auto my-auto w-full flex flex-col items-center ${UI.itemGap}`}
            onClick={(e) => e.stopPropagation()} // keep clicks on links from closing before nav
          >
            {UI.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full text-center ${UI.itemSize} ${UI.itemStyle} py-3`}
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