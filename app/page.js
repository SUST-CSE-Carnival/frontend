"use client"
import NavBar from '@/components/NavBar'
import {  Nunito, Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: '500' })
import Lottie from 'lottie-react'
import Link from 'next/link'
import landing from '@/components/Lottiefiles/pharmacy.json'
import MapComponent from '@/components/GoogleMaps/MapComponent'
import SupportChat from '@/components/AIChatBot/SupportChat'
import { useEffect, useState } from 'react'


export default function Home() {

  const [client, setClient] = useState(false)  

  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <main className={`w-full min-h-screen overflow-auto bg-[white]`}>
      <nav className='sticky bg-[#ffffff] z-50 h-20'>
        <NavBar />
      </nav>
       <section className='flex flex-col mx-auto overflow-hidden'>
          <div className='flex w-[90%] mx-auto h-screen justify-center items-center'>
            
            <div className='w-[55%] flex flex-col justify-center items-center'>
              <h1 className={`${poppins.className} mt-[-4rem] text-black mb-4 text-center tracking-wider text-3xl xl:text-5xl font-semibold w-[46rem]  bg-clip-text leading-[5rem]`}>"Where Care Meets Convenience, Every Visit Counts."</h1>
              <p className='tracking-wider text-xl xl:text-2xl text-center bg-white mx-auto w-[98%] my-6  bg-clip-text leading-[2rem] text-black'>" Our online pharmacy is more than just a place to fill prescriptions. We're dedicated to your wellbeing, offering personalized service, expert advice, and a wide range of health solutions tailored to your needs. "</p>
              <div className='p-6 flex justify-center space-x-4'>
                <button className='bg-red-800 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out text-2xl'><Link href="/signup">Try For Free</Link></button>
                <button className='bg-[#379c9c] text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out text-2xl'><Link href="/pharmacy_signup">For Pharmacy Owners</Link></button>
              </div>
            </div>


            <Lottie className='w-[40%]' animationData={landing} />

          </div>
        </section>
        { client && <SupportChat /> }
    </main>
  )
}
