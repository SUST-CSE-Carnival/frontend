"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function AdminDashBoardHero() {
  const pathname = usePathname()
  let path = pathname.split('/').pop()
  if(!isNaN(parseInt(path))) path = null
  const router = useRouter()
  function signOutHandler() {
    localStorage.removeItem('token');
    router.push('/')
  }
  return (
    <nav className='bg-[#FFF] border-b-2 border-gray-200 h-20 shadow-xl my-auto'>
      <div className='justify-between px-8 py-4 flex items-center'>
        <div className='flex items-center text-base space-x-6'>
            <div className={`cursor-pointer hover:border-b hover:border-b-red-700 hover:text-red-700 ${!path && "border-b border-b-red-700 text-red-700"}`}><Link href={`/admin`}>Dashboard</Link></div>
            <div className={`cursor-pointer hover:border-b hover:border-b-red-700 hover:text-red-700 ${path == "emails" && "border-b border-b-red-700 text-red-700"}`}><Link href={`/admin/emails`}>User's Emails</Link></div>
            <div className={`cursor-pointer hover:border-b hover:border-b-red-700 hover:text-red-700 ${path == "medicine" && "border-b border-b-red-700 text-red-700"}`}><Link href={`/admin/medicine`}>Medicine Price</Link></div>
            <div className={`cursor-pointer hover:border-b hover:border-b-red-700 hover:text-red-700 ${path == "add_medicine" && "border-b border-b-red-700 text-red-700"}`}><Link href={`/admin/add_medicine`}>Add New Medicine</Link></div>      
        </div>
        <div>
            <Button onClick={signOutHandler} className="rounded-lg bg-red-700 text-white font-semibold hover:bg-red-700 hover:text-white">Sign Out</Button>
        </div>
      </div>
    </nav>
  )
}
