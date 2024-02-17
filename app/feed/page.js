"use client"
import CreateNewPost from '@/components/CreateNewPost'
import NewsFeedCard from '@/components/CustomDaisyUIComponents/NewsFeedCard'
import React, { useState } from 'react'

export default function page() {
    const [src, setSrc] = useState(null)
    
  return (
    <div className='min-h-screen w-full overflow-auto space-y-6'>
        <div>
            <CreateNewPost src={src} setSrc={setSrc} />
        </div>
        <div className='flex justify-center w-[48rem] rounded-lg'>
            <NewsFeedCard avatarUrl={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                name="John Smith" caption="Wake me up when september ends" likes = {2} comments={4} 
                imageUrl={"/bg14.jpg"} />
        </div>
        <div className='flex justify-center w-[48rem] rounded-lg'>
            <NewsFeedCard avatarUrl={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                name="John Smith" caption="Wake me up when september ends" likes = {2} comments={4} 
                imageUrl={"/bg14.jpg"} />
        </div>
        <div className='flex justify-center w-[48rem] rounded-lg'>
            <NewsFeedCard avatarUrl={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                name="John Smith" caption="Wake me up when september ends" likes = {0} comments={4} 
                imageUrl={"/bg14.jpg"} />
        </div>
    </div>
  )
}
