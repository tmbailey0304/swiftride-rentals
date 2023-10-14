import React from 'react'

const Footer = () => {
  return (
    <div className='mt-40 pb-2 md:pb-8'>
      <div className='grid md:grid-cols-4 px-6 md:px-12 lg:px-24'>
        <div className='flex flex-col font-semibold mb-6 md:mb-0'>
          <h1 className='font-bold mb-2 text-2xl'>Swiftride Rentals</h1>
          <p className=' w-2/3'>We offer a wide range of vehicles for all of your driving needs. We guarantee you will find the perfect car to meet your needs</p>
        </div>
        <div className='flex flex-col gap-2 font-semibold mb-6 md:mb-0'>
          <h1 className='font-bold mb-2 text-2xl'>Company</h1>
          <a>New York</a>
          <a>Careers</a>
          <a>Mobile</a>
          <a>Blog</a>
          <a>How we work</a>
        </div>
        <div className='flex flex-col gap-2 font-semibold mb-6 md:mb-0'>
          <h1 className='font-bold mb-2 text-2xl'>Working Hours</h1>
          <p>Mon - Fri: 9:00AM - 9:00PM</p>
          <p>Sat: 9:00AM - 7:00PM</p>
          <p>Sun: Closed</p>
        </div>
        <div className='flex flex-col gap-2 font-semibold mb-6 md:mb-0'>
          <h1 className='font-bold mb-2 text-2xl'>Subscription</h1>
          <p className='w-2/3'>Subscribe to our email list for the latest news and updates</p>
          <input type='text' placeholder='Enter your email address' className='text-center p-4 border-2 border-black'></input>
          <button className='py-4 bg-orange-600 text-white font-bold shadow-md shadow-orange-600 hover:scale-105 hover:shadow-orange-600 hover:shadow-lg duration-300'>Subscribe</button>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Footer