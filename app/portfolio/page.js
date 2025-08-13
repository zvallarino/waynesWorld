"use client";

import React, { useState } from "react";
import Shell from "@/components/layout/Shell";
import CategoryChooser from "@/components/body/CategoryChooser";
import ArtworkGrid from "@/components/body/ArtworkGrid";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Locations", "Urban Scenarios", "Still Life", "Portraits"];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Shell sideMarginPct={5}>
      {selectedCategory ? (
        <ArtworkGrid
          category={selectedCategory}
          allCategories={categories}
          onCategorySelect={handleCategorySelect}
          onBack={() => setSelectedCategory(null)}
        />
      ) : (
        <CategoryChooser
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      )}
    </Shell>
  );
}
