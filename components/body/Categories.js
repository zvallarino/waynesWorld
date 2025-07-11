import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Categories() {
  const listOfCategories = ["Sceneries", "Scenarios", "Stills", "Sketches"]

  return (
    <div className="flex w-full bg-blue-400 justify-evenly flex-wrap p-2 ">
      {listOfCategories.map((category) => {
        const route = category.toLowerCase()
        const imagePath = `/images/categories/${route}.jpg`

        return (
          <div key={route} className="text-center w-[300px]">
            <Link href={`/${route}`}>
              <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden hover:opacity-80 transition duration-200">
                <Image 
                  src={imagePath}
                  alt={category}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <h2 className="mt-2 text-xl font-semibold">{category}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default Categories