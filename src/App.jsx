import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Rentals from './components/Rentals'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Rentals></Rentals>
      <Footer></Footer>
    </>
  )
}

export default App
