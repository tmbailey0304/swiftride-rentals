import React, {useState} from 'react'

import {FaBars, FaTimes} from 'react-icons/fa'

const Navbar = () => {

    const [navBar, setNavBar] = useState(false);

  return (
    <div className='flex flex-row justify-between py-6 px-8'>
        <div>
            <h1>Swiftride Rentals</h1>
        </div>
        <ul className='hidden md:flex flex-row gap-8'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Reviews</li>
        </ul>
        <div className='md:hidden z-50'>{navBar ? <FaTimes size={30}/> : <FaBars size={30}/>}</div>
        <ul className='md:hidden flex flex-col gap-8 fixed top-0 left-0 w-full h-screen items-center justify-center text-3xl z-40 bg-white'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Reviews</li>
        </ul>
    </div>
  )
}

export default Navbar