// components/Categories.js
import React from 'react';
import Image from 'next/image';

// It now accepts a prop, which is the function from the parent page
function Categories({ onCategorySelect }) {
  const listOfCategories = ["Locations", "Urban Scenarios", "Still Life", "Portraits"];

  return (
    <div className="flex w-full justify-center flex-wrap gap-8 p-10">
      {listOfCategories.map((category) => {
        // We can keep the image path logic
        const imagePath = `/images/categories/${category.toLowerCase()}.JPEG`;

        return (
          // MODIFIED: This is now a button or clickable div, not a Link
         <div 
  key={category} 
  className="text-center w-[400px] cursor-pointer group"  // Doubled width
  onClick={() => onCategorySelect(category)}
>
  <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden shadow-lg">
    <Image 
      src={imagePath}
      alt={category}
      fill
      className="object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-300"
    />
  </div>
  <h2 className="mt-2 text-2xl font-semibold text-gray-800">{category}</h2>
</div>
        );
      })}
    </div>
  );
}

export default Categories;