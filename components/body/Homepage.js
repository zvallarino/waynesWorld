"use client";

import React, { useState } from "react";
import artworks from "@/data/artwork.json";
import ArtworkCard from "./ArtworkCard";
import ArtworkModal from "./ArtworkModal";
import Categories from "./Categories";

function Homepage({ setSelectedCategory }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Re-enable your grid when ready
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.name}
              artwork={artwork}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </div> */}
      </div>

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}

      <Categories onCategorySelect={handleCategorySelect} />
    </div>
  );
}

export default Homepage;