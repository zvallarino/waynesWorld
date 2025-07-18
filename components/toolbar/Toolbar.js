import React from 'react'
import Navbar from './Navbar'

function Toolbar() {
  return (
    <div className="flex w-full items-center gap-4 sm:gap-6 md:gap-8 ">
      <h1 className="w-full font-semibold leading-tight text-4xl text-black sm:text-5xl md:text-7xl lg:text-6xl xl:text-6xl ">
        Wayne Bowen Art
      </h1>
      <div className="w-full">
        <Navbar />
      </div>
    </div>
  );
}

export default Toolbar;