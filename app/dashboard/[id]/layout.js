"use client"
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaHome } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";


export default function RootLayout({ params, children }) {
  const pathname = usePathname()
  const [currentState, setCurrentState] = useState("upcoming")
  const [profile, setProfile] = useState(null)
  const [url, setUrl] = useState(null)

//   useEffect(() => {
//     async function getProfile() {
//       let token = localStorage.getItem("token")
//       token = JSON.parse(token)
//       const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
//       const response = await fetch(`${endpoint}/profile`, {
//         method: 'GET',
//         headers : {'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token.accessToken
//       }
//     })
//       const ans = await response.json()        
//       setProfile(ans)   
//     }
//     getProfile()
//   }, [])

  return (
    <main>
        <nav className="sticky bg-[#ffffff] z-50 h-24">
            <NavBar landing = {false} />
        </nav>

      <div className='flex'>

        <div className='w-[22rem] h-screen overflow-auto text-white flex items-center flex-col border-r mx-auto border-r-gray-300'>
         <div className="avatar mt-16">
            <div className="w-32 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
         </div>
          <h1 className='text-xl text-black my-4'>Hi, John!</h1>

          <div onClick={() => setCurrentState("/")} className={`p-16 my-1 text-xl ${pathname === `/dashboard/${params.id}` ? "text-black" : "text-gray-500 "} flex py-2 cursor-pointer justify-between w-full items-center`}>
              <FaHome  className='text-2xl mr-4' />
              <Link className='h-full w-full' href={`/dashboard/${params.id}/`}>Reports</Link>
          </div>

          <div onClick={() => setCurrentState("/")} className={`p-16 my-1 text-xl  ${pathname === `/dashboard/${params.id}/something` ? "text-black" : "text-gray-500 "} flex py-2 cursor-pointer justify-between w-full items-center`}>
              <FaHome  className='text-2xl mr-4' />
              <Link className='h-full w-full' href={`/dashboard/${params.id}/`}>Some other Topics</Link>
          </div>

          <div onClick={() => setCurrentState("/")} className={`p-16 my-1 text-xl  ${pathname === `/dashboard/${params.id}/something` ? "text-black" : "text-gray-500 "} flex py-2 cursor-pointer justify-between w-full items-center`}>
              <IoBookmarksOutline  className='text-2xl mr-4' />
              <Link className='h-full w-full' href={`/dashboard/${params.id}/`}>Courses</Link>
          </div>

          <div onClick={() => setCurrentState("/")} className={`p-16 my-1 text-xl  ${pathname === `/dashboard/${params.id}/something` ? "text-black" : "text-gray-500 "} flex py-2 cursor-pointer justify-between w-full items-center`}>
              <FaHome  className='text-2xl mr-4' />
              <Link className='h-full w-full' href={`/dashboard/${params.id}/`}>Home</Link>
          </div>

          <div className='mt-auto mb-32'>
            <button className='w-full my-4 bg-black px-4 py-2 rounded-lg'>Sign Out</button>
          </div>

        </div>

        <div className='flex-1 p-3'>
            {children}
        </div>

      </div>
    </main>
  )
}
