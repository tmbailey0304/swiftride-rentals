import React from 'react'

const Banner = () => {
  return (
    <div className='w-full bg-black text-white h-80 sm:h-60 flex flex-col gap-6 items-center justify-center my-20 md:my-40 text-center py-12 px-4'>
        <h1 className='font-extrabold text-4xl'>Save big with our cheap car rentals!</h1>
        <h2 className='font-semibold text-xl'>Top Airports. Local suppliers. <span className=' text-red-500'>24/7</span> Support.</h2>
    </div>
  )
}

export default Banner