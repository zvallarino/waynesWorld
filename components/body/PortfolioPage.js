"use client";

import React, { useState } from 'react';
import artworks from '@/data/artwork.json';
import ArtworkCard from './ArtworkCard';
import ArtworkModal from './ArtworkModal';

function PortfolioPage({selectedCategory, setSelectedCategory}) {
  // State to track the currently selected category (e.g., "Sceneries")
  
  // State to track the artwork selected for the modal view
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Define the categories and their order for navigation
  const categories = ["Sceneries", "Scenarios", "Stills", "Sketches"];
  const currentCategoryIndex = categories.indexOf(selectedCategory);

  // Filter artworks based on the selected category
  const filteredArtworks = artworks.filter(
    (art) => art.category === selectedCategory
  );

  // Handle category selection and navigation
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    window.scrollTo(0, 0); // Scroll to top when category changes
  };

  // Render the initial category selection view
  if (!selectedCategory) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-900 w-full text-white text-center gap-16 p-4">
        {categories.map((category) => (
          <h1
            key={category}
            className="text-6xl md:text-8xl font-serif font-thin tracking-wider cursor-pointer hover:text-red-500 transition-colors duration-300"
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </h1>
        ))}
      </div>
    );
  }

  // Render the gallery view for the selected category
  return (
    <div className="min-h-screen w-full">
      
      {/* KEY PART 1: This wider container makes the whole content area bigger. */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* <h1 className="text-center text-6xl font-serif font-thin text-gray-800 mb-12">
          {selectedCategory}
        </h1>
         */}
        {/* Artworks Grid */}
        {/* KEY PART 2: This divides the wider container into 3 columns on medium screens and up. */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard 
              key={artwork.name} 
              artwork={artwork} 
              onClick={() => setSelectedArtwork(artwork)} 
            />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-20 text-gray-700 font-serif">
          {/* Previous Button */}
          {currentCategoryIndex > 0 ? (
            <button 
              onClick={() => handleCategorySelect(categories[currentCategoryIndex - 1])}
              className="text-4xl hover:text-red-600 transition-colors"
            >
              &larr; {categories[currentCategoryIndex - 1]}
            </button>
          ) : <div />} {/* Empty div to maintain spacing */}
          
          {/* Next Button */}
          {currentCategoryIndex < categories.length - 1 ? (
            <button 
              onClick={() => handleCategorySelect(categories[currentCategoryIndex + 1])}
              className="text-4xl hover:text-red-600 transition-colors"
            >
              {categories[currentCategoryIndex + 1]} &rarr;
            </button>
          ) : <div />} {/* Empty div to maintain spacing */}
        </div>

        {/* Home button to go back to category list */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="text-4xl text-gray-600 hover:text-red-600 font-serif transition-colors"
          >
            Back to Categories
          </button>
        </div>
      </div>

      {/* Modal for viewing a single artwork */}
      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
    </div>
  );
}

export default PortfolioPage;