import React, { useState, createContext } from 'react';

const carRentals = [
    {
      id: 1,
      img: 'https://di-uploads-pod28.dealerinspire.com/colonialtoyota/uploads/2022/10/mlp-img-top-2023-corolla-temp.png',
      name: 'Toyota Corolla',
      make: 'Toyota',
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
      make: 'Honda',
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
      img: 'https://file.kelleybluebookimages.com/kbb/base/evox/CP/12502/2018-Ford-Focus-front_12502_032_1796x829_GN_cropped.png',
      name: 'Ford Focus',
      make: 'Ford',
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
      make: 'Volkswagen',
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
      make: 'Nissan',
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
      img: 'https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2019-BMW-3-Series-Sunset-Orange-Metallic.png',
      name: 'BMW 3 Series',
      make: 'BMW',
      model: '3 Series',
      year: '2023',
      doors: '4/5',
      ac: 'Yes',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      price: '65'
    }
  ]

const CarContext = createContext();

const CarProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(carRentals[0]);

  const selectCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <CarContext.Provider value={{ selectedCar, selectCar }}>
      {children}
    </CarContext.Provider>
  );
};

const useCarContext = () => {
  return React.useContext(CarContext);
};

export { CarProvider, useCarContext, carRentals };