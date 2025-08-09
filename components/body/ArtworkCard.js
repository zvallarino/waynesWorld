import React from 'react';
import Image from 'next/image';

function ArtworkCard({ artwork, onClick }) {
  // Construct the image path
  const imagePath = `/images/categories/${artwork.category}/${artwork.name}.JPEG`;

  return (
    <div 
      className="group cursor-pointer flex flex-col items-center text-center gap-2"
      onClick={onClick}
    >
      {/* MODIFIED: Removed 'relative' and the fixed 'aspect-[4/5]' class. */}
      <div className="w-full overflow-hidden bg-gray-200 shadow-lg">
        <Image
          src={imagePath}
          alt={artwork.title}
          // ADDED: width/height props for Next.js optimization and to prevent layout shift.
          // These values act as a maximum size; CSS will handle the final display size.
          width={800}
          height={1000}
          onError={() =>
            setSrc(`/images/categories/${artwork.category}/${artwork.name}.jpg`)
          }
          sizes="(max-width: 768px) 100vw, 33vw"
          // CHANGED: 'fill' and 'object-cover' are removed.
          // ADDED: 'w-full' makes the image fill the column width.
          // ADDED: 'h-auto' makes the browser calculate height automatically to keep the aspect ratio.
          className="w-full h-auto group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      
      {/* Caption (no changes here) */}
      <div className="mt-2 text-gray-700">
        <p className="font-bold text-sm tracking-wide">{artwork.title}</p>
        <p className="text-xs">{artwork.type}</p>
        <p className="text-xs">{artwork.size && `Size: ${artwork.size}`}</p>
        {/* <p className="text-xs text-gray-500">{artwork.year}</p> */}
      </div>
    </div>
  );
}

export default ArtworkCard;