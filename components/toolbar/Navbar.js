import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav
      className="flex w-full flex-wrap items-center justify-center md:justify-evenly
                 bg-red-400 px-4 md:px-6 py-2 md:py-4
                 gap-x-8 gap-y-2
                 text-black text-lg sm:text-xl md:text-2xl"
    >
      <Link href="/portfolio" className="hover:underline underline-offset-4">
        Portfolio
      </Link>
      <Link href="/about" className="hover:underline underline-offset-4">
        About
      </Link>
      <Link href="/news" className="hover:underline underline-offset-4">
        Events
      </Link>
      <Link href="/contact" className="hover:underline underline-offset-4">
        Contact
      </Link>
    </nav>
  )
}

export default Navbar