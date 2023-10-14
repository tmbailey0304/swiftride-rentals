import React, {useEffect} from 'react'
import { useCarContext } from './CarContext'
import { Link } from 'react-router-dom';

const Reserve = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { selectedCar, selectCar } = useCarContext();
  return (
    <div>
      <h1>{selectedCar.name}</h1>
      <h1>{selectedCar.model}</h1>
      <h1>{selectedCar.price}</h1>
      <h1>{selectedCar.id}</h1>
      <img src={selectedCar.img}></img>
      <Link to='/'><button className='bg-orange-600 px-4 py-2 text-white font-bold hover:scale-105 shadow-md hover:shadow-lg shadow-orange-600 hover:shadow-orange-600 duration-300'>Change Car</button></Link>
    </div>
  )
}

export default Reserve