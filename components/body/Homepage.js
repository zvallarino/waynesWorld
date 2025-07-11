import React from 'react'
import Categories from './Categories'

function Homepage() {
  return (
    <div className='flex flex-col w-full'>
       <div className='flex h-screen'>
            <div className='flex w-1/3 h-full bg-pink-300'>Box 1</div>
            <div className='flex w-1/3 h-full bg-blue-300'>Box 2</div>
            <div className='flex w-1/3 h-full bg-red-300'>Box 3</div>
       </div>
        <div> 
            <Categories />
        </div>

    </div>
  )
}

export default Homepage