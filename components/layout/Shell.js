"use client";

import React from "react";
import Toolbar from "@/components/toolbar/Toolbar";

export default function Shell({
  children,
  sideMarginPct = 5,
  stickyHeader = true,
}) {
  return (
    <div className="min-h-dvh w-full text-black screen-bg">
      <header
        className={[
          stickyHeader ? "sticky top-0 z-50" : "",
          "border-b border-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80",
        ].join(" ")}
        style={{ marginLeft: `${sideMarginPct}%`, marginRight: `${sideMarginPct}%` }}
      >
        <div className="py-4 px-5 sm:px-8 lg:px-20">
          <div className="min-w-0">
            <Toolbar />
          </div>
        </div>
      </header>

      <main
        className="py-6"
        style={{ marginLeft: `${sideMarginPct}%`, marginRight: `${sideMarginPct}%` }}
      >
        {children}
      </main>
    </div>
  );
}