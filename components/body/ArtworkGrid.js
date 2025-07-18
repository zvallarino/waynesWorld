"use client";

import React, { useState } from 'react';
import artworks from '@/data/artwork.json';
import ArtworkCard from './ArtworkCard';
import ArtworkModal from './ArtworkModal';

// This component receives the selected category and functions to handle navigation.
export default function ArtworkGrid({ category, allCategories, onCategorySelect, onBack }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const filteredArtworks = artworks.filter((art) => art.category === category);
  const currentCategoryIndex = allCategories.indexOf(category);

  return (
    <div className="min-h-full w-full bg-white py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-6xl font-serif font-thin text-gray-800 mb-12">
          {category}
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

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-20 text-gray-700 font-serif">
          {currentCategoryIndex > 0 ? (
            <button 
              onClick={() => onCategorySelect(allCategories[currentCategoryIndex - 1])}
              className="text-4xl hover:text-red-600 transition-colors"
            >
              &larr; {allCategories[currentCategoryIndex - 1]}
            </button>
          ) : <div />}
          
          {currentCategoryIndex < allCategories.length - 1 ? (
            <button 
              onClick={() => onCategorySelect(allCategories[currentCategoryIndex + 1])}
              className="text-4xl hover:text-red-600 transition-colors"
            >
              {allCategories[currentCategoryIndex + 1]} &rarr;
            </button>
          ) : <div />}
        </div>

        {/* Home button to go back to category list */}
        <div className="text-center mt-12">
          <button 
            onClick={onBack}
            className="text-4xl text-gray-600 hover:text-red-600 font-serif transition-colors"
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