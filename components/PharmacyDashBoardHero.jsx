"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function PharmacyDashBoardHero({ id }) {
  const pathname = usePathname()
  let path = pathname.split('/').pop()
  if(!isNaN(parseInt(path))) path = null
  const router = useRouter()
  function signOutHandler() {
    localStorage.removeItem('token');
    router.push('/')
  }
  return (
    <nav>
      <div className='justify-between px-8 py-4 flex items-center'>
        <div className='flex items-end text-base space-x-6'>
            <div className={`cursor-pointer hover:underline ${!path && "underline underline-offset-8 decoration-2"}`}><Link href={`/pharmacy_dashboard/${id}/`}>Dashboard</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "upcoming" && "underline underline-offset-8 decoration-2"}`}><Link href={`/pharmacy_dashboard/${id}/upcoming`}>Available Orders</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "pending" && "underline underline-offset-8 decoration-2"}`}><Link href={`/pharmacy_dashboard/${id}/pending`}>Pending Orders</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "inbox" && "underline underline-offset-8 decoration-2"}`}><Link href={`/pharmacy_dashboard/${id}/inbox`}>Inbox</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "medicine" && "underline underline-offset-8 decoration-2"}`}><Link href={`/pharmacy_dashboard/${id}/medicine`}>Check Medicine Price</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "reviews" && "underline underline-offset-8 decoration-2"}`}><Link href={`/pharmacy_dashboard/${id}/reviews`}>Reviews</Link></div>
            <div className={`cursor-pointer hover:underline ${path == "update" && "underline underline-offset-8 decoration-2"}`}><Link href={`/pharmacy_dashboard/${id}/update`}>Update Information</Link></div>
        </div>
        <div>
            <Button onClick={signOutHandler} className="rounded-full hover:bg-black hover:text-white text-white bg-black">Sign Out</Button>
        </div>
      </div>
    </nav>
  )
}
