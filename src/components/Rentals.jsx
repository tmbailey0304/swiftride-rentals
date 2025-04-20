import React from "react";
import heroImage from "../assets/hero-image.png";
import { useCarContext } from "./CarContext";
import { Link } from "react-router-dom";

const Rentals = () => {
  const { selectedCar, selectCar, carList, loading } = useCarContext();

  const setSelectedCar = (car) => {
    selectCar(car);
  };

  if (loading || !selectedCar) {
    return <p className="text-center mt-10">Loading vehicles...</p>;
  }

  return (
    <div id="rent" className="flex flex-col items-center w-full mt-20 md:mt-40">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Vehicle Models</h2>
        <h1 className="text-4xl font-extrabold">Our Rental Fleet</h1>
        <p className="px-4 text-center">
          Choose from a variety of our amazing vehicles to rent for your next
          adventure or business trip!
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-8 justify-items-center">
        <div className="flex flex-col font-bold w-52">
          {carList.map((car) => (
            <button
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className={
                selectedCar.id === car.id
                  ? "bg-orange-600 h-12 text-white text-left px-4 py-2 hover:scale-105 shadow-lg shadow-orange-600 duration-500"
                  : "text-left h-12 px-4 py-2 hover:scale-105 hover:text-white hover:bg-orange-600 duration-300 hover:shadow-lg hover:shadow-orange-600"
              }
            >
              {car.make} {car.model}
            </button>
          ))}
        </div>
        <div className="items-center flex">
          <img
            className="px-8 md:px-0 w-[30rem] md:w-[40rem]"
            src={selectedCar.img}
            alt={selectedCar.name}
          />
        </div>
        <div className="w-72 text-left flex flex-col">
          <div className="bg-orange-600 text-center text-white px-4 py-2 text-xl">
            <h2 className="items-center justify-center flex">
              <span className="font-extrabold text-2xl">
                ${selectedCar.price}
              </span>{" "}
              / per day
            </h2>
          </div>
          <table className="text-center">
            <tbody>
              <tr className="border-2 border-black">
                <th className="border-2 border-black w-1/2">Make</th>
                <td>{selectedCar.make}</td>
              </tr>
              <tr className="border-2 border-black">
                <th className="border-2 border-black">Model</th>
                <td>{selectedCar.model}</td>
              </tr>
              <tr className="border-2 border-black">
                <th className="border-2 border-black">Year</th>
                <td>{selectedCar.year}</td>
              </tr>
              <tr className="border-2 border-black">
                <th className="border-2 border-black">Doors</th>
                <td>{selectedCar.doors}</td>
              </tr>
              <tr className="border-2 border-black">
                <th className="border-2 border-black">AC</th>
                <td>{selectedCar.ac}</td>
              </tr>
              <tr className="border-2 border-black">
                <th className="border-2 border-black">Transmission</th>
                <td>{selectedCar.transmission}</td>
              </tr>
              <tr className="border-2 border-black">
                <th className="border-2 border-black">Fuel</th>
                <td>{selectedCar.fuel}</td>
              </tr>
            </tbody>
          </table>
          <Link to="/reserve">
            <button className="mt-4 w-full bg-orange-600 py-2 text-white text-xl font-bold hover:scale-105 duration-500 shadow-md shadow-orange-600 hover:shadow-lg hover:shadow-orange-600">
              Reserve Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
