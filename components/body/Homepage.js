"use client";

import React, { useState } from 'react';
import artworks from '@/data/artwork.json'; // Make sure this path is correct
import ArtworkCard from './ArtworkCard';     // Make sure this path is correct
import ArtworkModal from './ArtworkModal';   // Make sure this path is correct
import Categories from './Categories';

function Homepage({setSelectedCategory}) {
  // State to track which artwork is selected to be shown in the modal
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        
        {/* This grid will display all artworks.
          - 1 column on small screens
          - 2 columns on medium screens
          - 3 columns on large screens
        */}
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

      {/* This modal will only appear when 'selectedArtwork' is not null.
        The onClose function sets it back to null, hiding the modal.
      */}
      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
       <Categories onCategorySelect ={setSelectedCategory} />
    </div>
  );
}

export default Homepage;