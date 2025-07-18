"use client";

import React from 'react';

// This component receives the list of categories and a function to call when one is selected.
export default function CategoryChooser({ categories, onCategorySelect }) {
  return (
    <div
      className={`
        flex h-full flex-col items-center justify-center bg-cover bg-center 
        text-white text-center p-8 transition-all duration-300
        bg-[url('/images/categories/Sceneries/oceanwaves.jpg')] 
        md:bg-[url('/images/categories/Scenarios/shoesstore.jpg')]
      `}
    >
      {/* This div adds a semi-transparent overlay to make the text more readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0" />
      
      {/* Content container with responsive gaps and text */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 md:gap-16">
        {categories.map((category) => (
          <h1
            key={category}
            className="text-5xl sm:text-6xl md:text-8xl font-serif font-thin tracking-wider cursor-pointer hover:text-red-500 transition-colors duration-300"
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </h1>
        ))}
      </div>
    </div>
  );
}