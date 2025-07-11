import React from 'react'
import Navbar from './Navbar'

function Toolbar() {
  return (
    <div className='flex flex-col bg-blue-500  w-full items-center justify-center text-center gap-8'>
        <div className='text-8xl w-full'>Wayne Bowen Art</div>
        <div className='text-2xl w-full'><Navbar/></div>
    </div>
  )
}

export default Toolbar