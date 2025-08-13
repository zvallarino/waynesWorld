"use client";

import React, { useState } from "react";
import Categories from "@/components/body/Categories";
import Homepage from "@/components/body/Homepage";
import PortfolioPage from "@/components/body/PortfolioPage";
import Shell from "@/components/layout/Shell";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    return (
      <Shell sideMarginPct={5}>
        <PortfolioPage
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Shell>
    );
  }

  return (
    <Shell sideMarginPct={5}>
      <Homepage setSelectedCategory={setSelectedCategory} />
    </Shell>
  );
}