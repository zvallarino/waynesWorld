// app/page.js
"use client";

import React, { useState } from 'react';
import Categories from '@/components/body/Categories';
import Homepage from '@/components/body/Homepage';
import PortfolioPage from '@/components/body/PortfolioPage';
import Toolbar from '@/components/toolbar/Toolbar';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // If a category is selected, show the filtered PortfolioPage view.
  // We also pass the function to allow it to go back.
  if (selectedCategory) {
    return (
      <div className="flex w-screen h-screen  flex-col px-[15%]">
      <div className="flex h-1/6" >
      <Toolbar />
      </div>
      <div className="flex  h-5/6" >   
         <PortfolioPage 
        selectedCategory={selectedCategory} 
        setSelectedCategory = {setSelectedCategory}
      />
   </div>
    </div>
    );
  }

  // Otherwise, show the main gallery and the categories list below it.
  // We pass the function to allow Categories to set the state.
  return (
    <div className="flex w-screen h-screen  flex-col px-[15%]">
      <div className="flex h-1/6" >
      <Toolbar />
      </div>
      <div className="flex flex-col h-5/6" >     <Homepage setSelectedCategory ={setSelectedCategory} />
    </div>
    </div>
  );}