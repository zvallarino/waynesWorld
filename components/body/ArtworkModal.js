import React from 'react';
import Image from 'next/image';

function ArtworkModal({ artwork, onClose }) {
  // Construct the image path
  const imagePath = `/images/categories/${artwork.category}/${artwork.name}.JPEG`;

  return (
    // FIXED: Replaced 'bg-black bg-opacity-80' with 'bg-black/80'
    <div 
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-red-500 transition-colors z-50"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Image Container */}
      <div 
        className="relative w-[85vw] h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imagePath}
          alt={artwork.title}
          fill
          className="object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}

export default ArtworkModal;