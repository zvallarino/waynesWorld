"use client";

import React, { useState } from 'react';
import Toolbar from "@/components/toolbar/Toolbar";
import CategoryChooser from "@/components/body/CategoryChooser";
import ArtworkGrid from "@/components/body/ArtworkGrid";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Sceneries", "Scenarios", "Stills", "Sketches"];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    window.scrollTo(0, 0); // Scroll to top when category changes
  };

  return (

    
      <div className="flex w-screen h-screen  flex-col px-[15%]">
      <div className="flex h-1/6" >
      <Toolbar />
      </div>
      <div className="flex flex-col h-5/6" >     {selectedCategory ? (
          // If a category IS selected, show the grid
          <ArtworkGrid
            category={selectedCategory}
            allCategories={categories}
            onCategorySelect={handleCategorySelect}
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          // If a category IS NOT selected, show the chooser
          <CategoryChooser
            categories={categories}
            onCategorySelect={handleCategorySelect}
          />
        )}
    </div>
    </div>
  );
}

  