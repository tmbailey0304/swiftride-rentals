import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Rentals from './components/Rentals'
import Reserve from './components/Reserve'
import WhyUs from './components/WhyUs'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './components/Banner'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<><Hero/><Rentals/></>}></Route>
        <Route path='/reserve' element={<Reserve/>}></Route>
      </Routes>
      <Banner></Banner>
      <WhyUs></WhyUs>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
