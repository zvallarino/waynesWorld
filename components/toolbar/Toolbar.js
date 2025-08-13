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
 mobileTitleSize:  "text-[clamp(24px,8vw,40px)]",
  desktopTitleSizes:"text-3xl sm:text-5xl md:text-6xl xl:text-7xl text-black",
  baseTitleClasses: "font-montserrat leading-tight font-semibold",

  // MOBILE OVERLAY ONLY
  overlayBgMobile: "bg-black",   // <- was a semi-transparent gradient
overlayPadding:  "px-8",
itemSize:  "text-4xl sm:text-5xl",
itemGap:   "gap-8 sm:gap-10",
itemStyleMobile: "text-white drop-shadow-lg",
itemPillMobile:  "bg-white/5 hover:bg-white/10 active:bg-white/15 ring-1 ring-white/10 rounded-2xl",

iconSize: 48,                               // X / burger size
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
  className={`fixed inset-0 z-[100] isolate ${UI.overlayBgMobile} ${UI.overlayPadding} flex`}
    role="dialog"
    aria-modal="true"
    style={{
      paddingTop: "max(16px, env(safe-area-inset-top))",
      paddingBottom: "max(16px, env(safe-area-inset-bottom))",
      paddingLeft: "max(16px, env(safe-area-inset-left))",
      paddingRight:"max(16px, env(safe-area-inset-right))",
    }}
    onClick={() => setOpen(false)}
  >
    <button
      aria-label="Close menu"
      className="absolute right-4 top-4 p-3 text-white"
      onClick={(e) => { e.stopPropagation(); setOpen(false); }}
    >
      <FiX size={UI.iconSize} />
    </button>

    <nav
      className={`relative mx-auto my-auto w-full flex flex-col items-center ${UI.itemGap}`}
      onClick={(e) => e.stopPropagation()}
    >
      {UI.items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`w-full max-w-sm text-center ${UI.itemSize} ${UI.itemStyleMobile} ${UI.itemPillMobile} py-4`}
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