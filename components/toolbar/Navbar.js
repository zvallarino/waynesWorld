import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="flex bg-red-400 justify-evenly px-6 py-4 text-white text-2xl ">
      <Link href="/portfolio" className="hover:underline">
        Portfolio
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
      <Link href="/news" className="hover:underline">
        Events
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact
      </Link>
    </div>
  )
}

export default Navbar