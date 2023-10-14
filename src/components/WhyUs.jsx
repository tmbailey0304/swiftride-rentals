import React from 'react'
import whyUsImage from "../assets/about-us-image.png"

import {BsCoin} from "react-icons/bs"
import {AiOutlineCar} from "react-icons/ai"
import {TbPigMoney} from "react-icons/tb"

const WhyUs = () => {
  return (
    <div id='about-us' className='flex items-center flex-col my-40'>
        <img src='https://pngimg.com/d/dodge_PNG90.png' alt="" className='w-[60rem] px-8' />
        <div className='grid md:grid-cols-2 items-center justify-items-center lg:px-20 xl:px-40'>
            <div className='flex flex-col items-center my-8'>
                <div className='px-8 text-center md:text-left'>
                    <h2 className='text-2xl font-bold'>Why choose us?</h2>
                    <h1 className='text-4xl font-bold'>Best valued deals you will ever find</h1>
                    <p className='py-4'>Discover the best deals you'll ever find with our unbeatable offers. We're dedicated to providing you with the best value for your money, so you can enjoy top-quality services and products without breaking the bank. Our deals are designed to give you the ultimate renting experience, so don't miss out on your chance to save big.</p>
                    <button className='bg-orange-600 px-4 py-2 text-white font-bold shadow-md shadow-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-orange-600 duration-300'>Find Out More</button>
                </div>
            </div>
            <div className='flex flex-col w-2/3 gap-6'>
                <div className='flex flex-row items-center'>
                    <AiOutlineCar className='mr-4' color='#ea580c' size={150}></AiOutlineCar>
                    <div className='flex flex-col'>
                        <h1 className='text-3xl font-bold mb-2'>Cross Country Drive</h1>
                        <p>Take your driving experience to the next level with our top-notch vehicles for your cross-country adventures</p>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <BsCoin className='mr-4' color='#ea580c' size={150}></BsCoin>
                    <div>
                        <h1 className='text-3xl font-bold mb-2'>All Inclusive Pricing</h1>
                        <p>Get everything you need in one convenient transparent price with our all-inclusice pricing policy</p>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <TbPigMoney className='mr-4' color='#ea580c' size={150}></TbPigMoney>
                    <div>
                        <h1 className='text-3xl font-bold mb-2'>No Hidden Charges</h1>
                        <p>Enjoy peace of mind with our no hidden charge policy. We believe in full transparency and honest pricing</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default WhyUs