import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom';

const Navbar = () => {
  return (
    <BrowserRouter>
    <nav>
        <div className='bg-[#1A1A1A] h-11 flex justify-between items-center p-5'>
          <div className='font-black text-blue-700 text-2xl font-serif' >
             Zendone
          </div>
          <Link to="https://github.com/Abad-Ali" target='_blank'><button className='bg-green-400  px-2 rounded-full font-semibold hover:font-bold hover:bg-green-500 hover:cursor-pointer text-xl my-5'>GitHub</button></Link>
        </div>
    </nav>
    </BrowserRouter>
  )
}

export default Navbar
