"use client"
import { Caveat, Kameron, Nunito } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { usePathname, useRouter } from 'next/navigation'
import { BsFillBellFill } from 'react-icons/bs'
import { CiGlobe } from "react-icons/ci";



const kameron = Kameron({ subsets: ['latin'], weight: '700' })

export default function Hero({ landing = true }) {
  const pathname = usePathname()
  const [signedIn, setSignedIn] = useState(true)
  const [token, setToken] = useState(false)
  const [nav, setNav] = useState(false)
  const router = useRouter()
  console.log(pathname)
  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token) {
      setSignedIn(true)
    }
    token = JSON.parse(token)
    setToken(token)
  }, [])
  const handleNav = () => {
      setNav(!nav)
  }
  function signOutHandler() {
    localStorage.removeItem('token');
    router.push('/')
    setSignedIn(false)
  }

  function TokenCheckHandler(url) {
    let token = localStorage.getItem("token")
    // token = JSON.parse(token)
    // if(!token) {
    //   router.push("/signin")
    // }
    // else {
    //   router.push(url)
    // }
    router.push(url)
  }
  return (
    <>
      <div className='flex justify-between items-center px-8 py-4 text-white w-[80%] mx-auto'>  
      <div className='space-x-4 flex items-baseline font-bold'>
        <Link href={'/'} className={`${kameron.className} text-6xl text-red-800 font-black mx-4`} ><h1>Project Name</h1></Link>
        <p onClick={() => TokenCheckHandler("/")} className={`${pathname == '/plan' && "border-b-2 border-red-700"} text-black hover:border-b-4 hover:border-red-700 py-2 px-2 cursor-pointer`}>
          Plan A Trip
        </p>
        <p onClick={() => TokenCheckHandler("/")} className={`${pathname == '/hotels' && "border-b-2 border-red-700"} hover:border-b-4 hover:border-red-700 text-black py-2 px-2 cursor-pointer`}>
          Book Hotels
        </p>
        <p onClick={() => TokenCheckHandler("/")} className={`${pathname == '/flights' && "border-b-2 border-red-700"} hover:border-b-4 hover:border-red-700 text-black py-2 px-2 cursor-pointer`}>
          Flight Booking
        </p>
      </div>
      <div className='flex cursor-pointer items-center space-x-8'>
          <div className='flex space-x-8 items-center'>
            { !signedIn ?
            <Link href={"/signin"}><Button className="rounded-full bg-transparent hover:bg-transparent text-xl font-bold text-black hover:text-red-700"><div className='mr-2'><CiGlobe /></div>Sign In</Button></Link> 
            :
            <>
            <div className='flex items-center space-x-5'>
              <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none outline-none border-none'>
                  <div className='flex space-x-2 focus:outline-none outline-none border-none text-black'>
                    <p>Menu</p>
                    <AiOutlineMenu className='text-2xl' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white mr-8 z-50'>
                  <DropdownMenuItem className='p-2 my-4 cursor-pointer text-black'><Link href={`/dashboard`}>DashBoard</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='p-2 my-4 cursor-pointer text-black hover:border-gray-200'><Button onClick={signOutHandler} variant="outline" className="h-8 font-normal -ml-2 text-md outline-none border-none hover:bg-white">Sign Out</Button></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
          }
          {landing && !signedIn && 
              <Link href={"/signup"}><Button className="rounded-md px-4 py-2 text-white hover:bg-red-700 bg-red-700 font-bold text-lg">Sign Up</Button></Link>
            }
          </div>
      </div>
    </div>
    </>
  )
}

