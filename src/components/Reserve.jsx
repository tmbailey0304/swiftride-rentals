import React, {useEffect} from 'react'
import { useCarContext } from './CarContext'

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
    </div>
  )
}

export default Reserve