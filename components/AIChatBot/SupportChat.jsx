"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { BiSolidMessageRoundedDetail } from 'react-icons/bi'
import SupportChatContainer from './SupportChatContainer'


export default function SupportChat() {
    const [chatOpened, setChatOpened] = useState(false)
  return (
    <div className="bottom-8 right-8 p-8 rounded-lg fixed z-50 ml-auto flex flex-col items-end cursor-pointer">
      {!chatOpened && 
      <div className='flex space-x-4 items-center' onClick={() => setChatOpened(prev => !prev)}>
        <h1 className='bg-[#3bb2cf] text-white font-bold z-100 px-3 py-2 rounded-r-lg rounded-e-lg rounded-b-lg mt-4'>Hey, There! &#x1F44D;</h1>
        <div className="relative w-[4rem] h-[4rem] rounded-full">
            <Image src={"/ai.jpg"} layout="fill" objectFit="cover" alt="Messenger" />
        </div>
      </div>
      }
      {chatOpened && <SupportChatContainer setChatOpened={setChatOpened}/>}
    </div>
  )
}
