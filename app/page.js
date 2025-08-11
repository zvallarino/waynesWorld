// app/page.js
"use client";

import React, { useState } from "react";
import Categories from "@/components/body/Categories";
import Homepage from "@/components/body/Homepage";
import PortfolioPage from "@/components/body/PortfolioPage";
import Toolbar from "@/components/toolbar/Toolbar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ---- EASY TWEAKS ----
  const UI = {
    sideMarginPct: 5, // change this to adjust left/right breathing room
  };
  const sideMargin = `mx-[${UI.sideMarginPct}%]`;

  const Shell = ({ children }) => (
    <div className={`min-h-dvh w-full text-black screen-bg`}>
      <header className={`border-b border-black/10 ${sideMargin}`}>
        <div className="py-4 ">
          <Toolbar />
        </div>
      </header>

      <main className={`${sideMargin} py-6`}>{children}</main>
    </div>
  );

  if (selectedCategory) {
    return (
      <Shell>
        <PortfolioPage
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Shell>
    );
  }

  return (
    <Shell>
      <Homepage setSelectedCategory={setSelectedCategory} />
    </Shell>
  );
}