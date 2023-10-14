import React,{useEffect, useState} from 'react'

import heroImage from "../assets/hero-image.png"

const carRentals = [
    {
      id: 1,
      img: 'https://di-uploads-pod28.dealerinspire.com/colonialtoyota/uploads/2022/10/mlp-img-top-2023-corolla-temp.png',
      name: 'Toyota Corolla',
      model: 'Corolla',
      year: '2023',
      doors: '4/5',
      ac: 'Yes',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      price: '25'
    },
    {
      id: 2,
      img: 'https://di-uploads-pod23.dealerinspire.com/rairdonshondaofburien/uploads/2022/10/2023-HONDA-CIVIC-LEAD-IMAGE-BLUE.png',
      name: 'Honda Civic',
      model: 'Civic',
      year: '2023',
      doors: '4/5',
      ac: 'Yes',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      price: '28'
    },
    {
      id: 3,
      img: 'https://i.pinimg.com/originals/85/c4/bc/85c4bc3f7a6723fc24ba06c45a2d4e1a.png',
      name: 'Ford Focus',
      model: 'Focus',
      year: '2023',
      doors: '4/5',
      ac: 'Yes',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      price: '30'
    },
    {
      id: 4,
      img: 'https://images.dealer.com/ddc/vehicles/2021/Volkswagen/Jetta/Sedan/perspective/front-left/2000_24.png',
      name: 'Volkswagen Jetta',
      model: 'Jetta',
      year: '2023',
      doors: '4/5',
      ac: 'Yes',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      price: '35'
    },
    {
      id: 5,
      img: 'https://images.dealer.com/ddc/vehicles/2021/Nissan/Altima/Sedan/perspective/front-left/2021_24.png',
      name: 'Nissan Altima',
      model: 'Altima',
      year: '2012',
      doors: '4/5',
      ac: 'Yes',
      transmission: 'Manual',
      fuel: 'Gasoline',
      price: '40'
    },
    {
      id: 6,
      img: 'https://www.bmw.in/content/dam/bmw/marketIN/bmw_in/all-models/3-series/gl/2023/navigation.png',
      name: 'BMW 3 Series',
      model: '3 Series',
      year: '2023',
      doors: '4/5',
      ac: 'Yes',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      price: '65'
    }
  ]


const Rentals = () => {

    const [selectedCar, setSelectedCar] = useState(carRentals[0])

  return (
    <div className='flex flex-col items-center h-screen w-full mb-40 md:mb-0'>
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-bold'>Vehicle Models</h2>
            <h1 className='text-4xl font-extrabold'>Our Rental Fleet</h1>
            <p className='px-4 text-center'>Choose from a variety of our amazing vehicles to rent for your next adventure or business trip!</p>
        </div>
        <div className='grid md:grid-cols-3 gap-8 mt-8 justify-items-center'>
            <div className='flex flex-col font-bold w-52'>

                {carRentals.map((car) => {
                    return (
                        <button key={car.id} onClick={() => setSelectedCar(car)} className={selectedCar.id === car.id ? 'bg-orange-600 h-12 text-white text-left px-4 py-2' : 'text-left h-12 px-4 py-2 hover:scale-105 hover:text-white hover:bg-orange-600 duration-300'}>{car.name}</button>
                    )
                })}
            </div>
            <div>
                <img className='px-8 min-w-[200px] md:px-0' src={selectedCar.img}></img>
            </div>
            <div className='w-72 text-left flex flex-col'>
                <div className='bg-orange-600 text-center text-white px-4 py-2 text-xl'>
                    <h2 className='items-center justify-center flex'><span className='font-extrabold text-2xl'>${selectedCar.price}</span> / rent per day</h2>
                </div>
                <table className='text-center'>
                    <tbody>

                    <tr className='border-2 border-black'>
                      <th className='border-2 border-black w-1/2'>Model</th>
                      <td>{selectedCar.model}</td>
                    </tr>
                    <tr className='border-2 border-black'>
                      <th className='border-2 border-black'>Mark</th>
                      <td>AI</td>
                    </tr>
                    <tr className='border-2 border-black'>
                      <th className='border-2 border-black'>Year</th>
                      <td>{selectedCar.year}</td>
                    </tr>
                    <tr className='border-2 border-black'>
                      <th className='border-2 border-black'>Doors</th>
                      <td>{selectedCar.doors}</td>
                    </tr>
                    <tr className='border-2 border-black'>
                      <th className='border-2 border-black'>AC</th>
                      <td>{selectedCar.ac}</td>
                    </tr>
                    <tr className='border-2 border-black'>
                      <th className='border-2 border-black'>Transmission</th>
                      <td>{selectedCar.transmission}</td>
                    </tr>
                    <tr className='border-2 border-black'>
                      <th className='border-2 border-black'>Fuel</th>
                      <td>{selectedCar.fuel}</td>
                    </tr>
                    </tbody>
                </table>
                <button className='mt-4 bg-orange-600 py-2 text-white text-xl font-bold'>Reserve Now</button>
            </div>
        </div>
    </div>
  )
}

export default Rentals