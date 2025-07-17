import React from 'react'
import Navbar from './Navbar'

function Toolbar() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-blue-500 text-center gap-4 sm:gap-6 md:gap-8 py-4">
      <h1 className="w-full font-semibold leading-tight text-4xl sm:text-5xl md:text-7xl lg:text-7xl">
        Wayne Bowen Art
      </h1>
      <div className="w-full">
        <Navbar />
      </div>
    </div>
  );
}

export default Toolbar;