"use client"
import NavBar from '@/components/NavBar'
import {  Nunito, Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: '500' })
import Lottie from 'lottie-react'
import Link from 'next/link'
import landing from '@/components/Lottiefiles/travel.json'

export default function Home() {

  return (
    <main className={`w-full min-h-screen overflow-auto bg-[white]`}>
      <nav className='sticky bg-[#ffffff] z-50 h-20'>
        <NavBar />
      </nav>
       <section className='flex flex-col mx-auto overflow-hidden'>
          <div className='flex w-[90%] mx-auto h-screen justify-center items-center'>
            
            <div className='w-[55%] flex flex-col justify-center items-center'>
              <h1 className={`${poppins.className} mt-[-4rem] text-black mb-4 text-center tracking-wider text-3xl xl:text-5xl font-semibold w-[46rem]  bg-clip-text leading-[5rem]`}>"Discover, Plan, Go: Your Journey Starts Here!"</h1>
              <p className='tracking-wider text-xl xl:text-2xl text-center bg-white mx-auto w-[98%] my-6  bg-clip-text leading-[2rem] text-black'>"Craft your perfect getaway with ease, from tailored itineraries to seamless bookings. Your passport to stress-free travel planning awaits with our intuitive app."</p>
              <div className='p-6 flex justify-center'>
                <button className='bg-red-700 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out text-4xl'><Link href="/signup">Try For Free</Link></button>
              </div>
            </div>


            <Lottie className='w-[40%]' animationData={landing} />

          </div>
        </section>
    </main>
  )
}
