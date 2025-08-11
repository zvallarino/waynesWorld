import React from "react";
import Image from "next/image";

function Categories({ onCategorySelect }) {
  const listOfCategories = ["Locations", "Urban Scenarios", "Still Life", "Portraits"];

  return (
    <div
      className="
        w-full
        p-6 sm:p-8
      
        grid grid-cols-1
        gap-10
        landscape:sm:grid-cols-1
        landscape:lg:grid-cols-1
      "
    >
      {listOfCategories.map((category) => {
        const imagePath = `/images/categories/${category.toLowerCase()}.JPEG`;

        return (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className="
              text-center cursor-pointer group
              w-full max-w-[520px] mx-auto
              focus:outline-none
            "
          >
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={imagePath}
                alt={category}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110 group-hover:opacity-90"
                priority
              />
            </div>
            <h2 className="mt-3 font-semibold text-gray-800 text-2xl sm:text-3xl">
              {category}
            </h2>
          </button>
        );
      })}
    </div>
  );
}

export default Categories;