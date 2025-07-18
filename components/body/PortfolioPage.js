"use client";

import React, { useState } from 'react';
import artworks from '@/data/artwork.json';
import ArtworkCard from './ArtworkCard';
import ArtworkModal from './ArtworkModal';

function PortfolioPage({selectedCategory, setSelectedCategory}) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const categories = ["Sceneries", "Scenarios", "Stills", "Sketches"];
  const currentCategoryIndex = categories.indexOf(selectedCategory);

  const filteredArtworks = artworks.filter(
    (art) => art.category === selectedCategory
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // NEW: Handler to go back and scroll to top
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!selectedCategory) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white text-center gap-16 p-4">
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

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-center text-4xl md:text-6xl font-serif font-thin text-gray-800 mb-12">
          {selectedCategory}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard 
              key={artwork.name} 
              artwork={artwork} 
              onClick={() => setSelectedArtwork(artwork)} 
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-20 text-gray-700 font-serif">
          {currentCategoryIndex > 0 ? (
            <button 
              onClick={() => handleCategorySelect(categories[currentCategoryIndex - 1])}
              className="text-3xl md:text-4xl hover:text-red-600 transition-colors"
            >
              &larr; <span className="hidden md:inline">{categories[currentCategoryIndex - 1]}</span>
            </button>
          ) : <div />}
          
          {currentCategoryIndex < categories.length - 1 ? (
            <button 
              onClick={() => handleCategorySelect(categories[currentCategoryIndex + 1])}
              className="text-3xl md:text-4xl hover:text-red-600 transition-colors"
            >
              <span className="hidden md:inline">{categories[currentCategoryIndex + 1]}</span> &rarr;
            </button>
          ) : <div />}
        </div>

        <div className="text-center mt-12">
          {/* MODIFIED: Button now uses the new handler */}
          <button 
            onClick={handleBackToCategories}
            className="text-2xl md:text-4xl text-gray-600 hover:text-red-600 font-serif transition-colors"
          >
            Back to Categories
          </button>
        </div>
      </div>

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