import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

function Toolbar() {
  return (
    <div className="flex w-full items-center gap-4 sm:gap-6 md:gap-8 ">
      <Link href="/">
        {/* MODIFIED: The 'whitespace-nowrap' class is now prefixed with 'md:' */}
        <h1 className="font-semibold leading-tight text-4xl text-black sm:text-5xl md:text-7xl lg:text-6xl xl:text-6xl cursor-pointer md:whitespace-nowrap">
          Wayne Bowen Art 
        </h1>
      </Link>
      
      <div className="w-full">
        <Navbar />
      </div>
    </div>
  );
}

export default Toolbar;