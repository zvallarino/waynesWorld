"use client";

import React from "react";

export default function CategoryChooser({
  categories = [],
  onCategorySelect = () => {},
  headerHeight = 0, // pass your toolbar height in px (e.g., 64)
}) {
  return (
    <div
      // 80% of the dynamic viewport height; subtract header if provided
      style={{
        "--hero-h": "80dvh",
        "--header-h": `${headerHeight}px`,
      }}
      className={`
        relative overflow-hidden
        flex flex-col items-center justify-center
        text-white text-center p-8 transition-all duration-300
        bg-cover bg-center
        bg-[url('/images/categories/Sceneries/oceanwaves.jpg')]
        md:bg-[url('/images/categories/Scenarios/shoesstore.jpg')]

        /* responsive min-heights */
        min-h-[calc(var(--hero-h)-var(--header-h))]
        sm:min-h-[70svh]        /* a bit shorter on small phones */
        lg:min-h-[calc(80dvh-var(--header-h))] /* ensure ~20% shorter on large screens */
      `}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 md:gap-16">
        {categories.map((category) => (
          <h1
            key={category}
            className="text-2xl sm:text-4xl md:text-6xl font-serif font-thin tracking-wider cursor-pointer hover:text-red-500 transition-colors duration-300"
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </h1>
        ))}
      </div>
    </div>
  );
}