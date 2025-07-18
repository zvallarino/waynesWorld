"use client";

import React, { useState } from 'react';
import artworks from '@/data/artwork.json'; // Make sure this path is correct
import ArtworkCard from './ArtworkCard';     // Make sure this path is correct
import ArtworkModal from './ArtworkModal';   // Make sure this path is correct
import Categories from './Categories';

function Homepage({setSelectedCategory}) {
  // State to track which artwork is selected to be shown in the modal
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // NEW: Handler function to set category AND scroll to top
  const handleCategorySelect = (category) => {
    // This function is passed from the parent to change the page
    setSelectedCategory(category); 
    
    // This command scrolls the window to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className=" w-full min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <ArtworkCard 
              key={artwork.name} 
              artwork={artwork} 
              onClick={() => setSelectedArtwork(artwork)} 
            />
          ))}
        </div>
      </div>

      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
      
      {/* MODIFIED: Pass the new handler function to the Categories component */}
      <Categories onCategorySelect={handleCategorySelect} />
    </div>
  );
}

export default Homepage;