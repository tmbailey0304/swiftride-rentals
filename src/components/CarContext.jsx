import React, { useState, useEffect, createContext } from "react";

const CarContext = createContext();

const CarProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/vehicles");
        const data = await res.json();
        setCarList(data);
        setSelectedCar(data[0] || null); // Select first car by default
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const selectCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <CarContext.Provider value={{ selectedCar, selectCar, carList, loading }}>
      {children}
    </CarContext.Provider>
  );
};

const useCarContext = () => React.useContext(CarContext);

export { CarProvider, useCarContext };
