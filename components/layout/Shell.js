"use client";

import React from "react";
import Toolbar from "@/components/toolbar/Toolbar";

export default function Shell({
  children,
  sideMarginPct = 5,
  stickyHeader = true,
}) {
  const padLeft  = `max(${sideMarginPct}vw, env(safe-area-inset-left))`;
  const padRight = `max(${sideMarginPct}vw, env(safe-area-inset-right))`;

  return (
    <div className="min-h-dvh w-full text-black screen-bg">
      <header
        className={[
          stickyHeader ? "sticky top-0 z-50" : "",
          "border-b border-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80",
        ].join(" ")}
        style={{ paddingLeft: padLeft, paddingRight: padRight }}
      >
        <div className="py-4 px-5 sm:px-8 lg:px-12">
          {/* min-w-0 prevents children from forcing overflow */}
          <div className="min-w-0">
            <Toolbar />
          </div>
        </div>
      </header>

      <main className="py-6" style={{ paddingLeft: padLeft, paddingRight: padRight }}>
        {children}
      </main>
    </div>
  );
}