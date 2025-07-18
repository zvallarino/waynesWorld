"use client";

import React from 'react';

// This component receives the list of categories and a function to call when one is selected.
export default function CategoryChooser({ categories, onCategorySelect }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-900 text-white text-center gap-16 p-4">
      {categories.map((category) => (
        <h1
          key={category}
          className="text-6xl md:text-8xl font-serif font-thin tracking-wider cursor-pointer hover:text-red-500 transition-colors duration-300"
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </h1>
      ))}
    </div>
  );
}