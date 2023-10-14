import React from 'react'
import heroImage from "../assets/hero-image.png"

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row w-full items-center justify-evenly px-8 lg:px-32 mt-40'>
        <div className='mb-20'>
            <h2 className='font-bold text-2xl'>Plan your trip now</h2>
            <h1 className=' font-extrabold text-4xl lg:text-5xl w-4/5'>Save <span className='text-orange-600 hover:scale-125 duration-500 inline-block'>big</span> with our car rentals</h1>
            <p className='mt-4 max-w-md'>Rent the car of your dreams. Unbeatable prices, unlimited miles, flexible pick-up options and much more</p>
            <div className='flex flex-row gap-4 mt-4'>
                <button className='px-4 py-2 bg-orange-600 text-white shadow-md shadow-orange-500 hover:shadow-lg hover:shadow-orange-500 duration-500 hover:scale-105 rounded-md font-bold'>Book Ride</button>
                <button className='bg-black text-white px-4 py-2 rounded-md font-bold shadow-md hover:shadow-lg shadow-black hover:shadow-black hover:scale-105 duration-500'>Learn More</button>
            </div>
        </div>
        <div>
            <img src={heroImage}></img>
        </div>
    </div>
  )
}

export default Hero