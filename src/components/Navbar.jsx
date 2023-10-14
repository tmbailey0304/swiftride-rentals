import React, {useState} from 'react'

import {FaBars, FaTimes} from 'react-icons/fa'

const Navbar = () => {

    const [navBar, setNavBar] = useState(false);

  return (
    <div className='flex flex-row justify-between lg:justify-evenly py-6 px-8 items-center'>
        <div>
            <h1 className='text-2xl'>Swiftride Rentals</h1>
        </div>
        <ul className='hidden md:flex flex-row gap-8 font-bold'>
            <li className='hover:scale-105 duration-500 cursor-pointer'>Home</li>
            <li className='hover:scale-105 duration-500 cursor-pointer'>About</li>
            <li className='hover:scale-105 duration-500 cursor-pointer'>Contact</li>
            <li className='hover:scale-105 duration-500 cursor-pointer'>Reviews</li>
        </ul>
        <div className='md:hidden z-50'>{navBar ? <FaTimes onClick={() => setNavBar(!navBar)} size={30}/> : <FaBars onClick={() => setNavBar(!navBar)} size={30}/>}</div>

        {navBar ? <ul className='md:hidden flex flex-col gap-8 fixed top-0 left-0 w-full h-screen items-center justify-center text-3xl z-40 bg-white'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Reviews</li>
            <li>Sign In</li>
            <li>Register</li>
        </ul> : ''}

        <div className='hidden md:flex gap-4 font-bold'>
            <button className='hover:scale-105 duration-500'>Sign In</button>
            <button className='px-4 py-2 bg-orange-600 text-white shadow-md shadow-orange-500 hover:shadow-lg hover:shadow-orange-500 duration-500 hover:scale-105 rounded-md'>Register</button>
        </div>

    </div>
  )
}

export default Navbar