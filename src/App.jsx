import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Rentals from "./components/Rentals";
import Reserve from "./components/Reserve";
import WhyUs from "./components/WhyUs";

import { CarProvider } from "./components/CarContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <CarProvider>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Rentals />
                <Banner></Banner>
                <WhyUs></WhyUs>
              </>
            }
          ></Route>
          <Route path="/reserve" element={<Reserve />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer></Footer>
      </CarProvider>
    </BrowserRouter>
  );
}

export default App;
