"use client" 
import { Quicksand } from 'next/font/google'
import Image from 'next/image'
const quicksand = Quicksand({ subsets: ['latin'], weight: '400' })

import React, { useRef, useState } from 'react'
export default function Message({ sender, messageContent, chatbot }) {
  const isOwner = sender === 'owner'
  
  return (
    <main className={`flex space-x-4 items-baseline p-4 ${isOwner ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!chatbot && 
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image src={isOwner ? "/avatar.jpg" : "/avatar.jpg"} layout="fill" objectFit="cover" alt="Image" />
      </div>
      }
      <div className='max-w-[60%]'>
        <p className={`${quicksand.className} ${isOwner ? 'bg-slate-100' : 'bg-blue-300'} rounded-r-lg rounded-e-lg rounded-b-lg p-1`}>{messageContent}</p>
      </div>
    </main>
  )
}
