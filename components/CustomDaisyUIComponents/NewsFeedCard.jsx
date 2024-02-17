"use client"
import React, { useEffect, useState } from 'react'
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { TbSend } from "react-icons/tb";

export default function NewsFeedCard({avatarUrl, name, caption, imageUrl, likes, comments, timestamp}) {
    const [liked, setLiked] = useState(false)
    const [commentContent, setCommentContent] = useState('')
    const [isClientSide, setIsClientSide] = useState(false)


    useEffect(() => {
        setIsClientSide(true)
    }, [])

    function getCurrentTime(){
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    }
  return (
    <div className='p-8  w-full rounded-xl bg-slate-100'>
        <div className='flex items-center space-x-2'>
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div> 
            <div>
                <h1 className="font-semibold text-lg">{name}</h1>
                <p className="text-xs text-gray-500">{isClientSide && getCurrentTime()}</p>
            </div>
        </div>
        <div>
            <p className="mt-4 text-lg">{caption}</p>
        </div>  
        <div className="mt-4">
            <img src={imageUrl}
                className="w-full rounded-lg" />
        </div>
        <div className='flex items-center space-x-2 my-4'> 
            <button onClick={() => setLiked(!liked)} className="flex items-center space-x-1">
                {liked ? <IoHeartSharp size={20} color='red' /> : <IoHeartOutline size={20} />}
            </button>
            <p className="text-md text-gray-500"><span className='font-semibold text-blue-800'>{likes}</span> likes</p>
            <p className="text-md text-gray-500"><span className='font-semibold text-red-800'>{comments}</span> comments</p>
        </div>
        <div className='flex space-x-4 items-center'>
            {/* User can add comment */}
            <input type="text" value={commentContent} 
            onChange={(e) => setCommentContent(e.target.value)} 
            className="w-full px-2 py-4 border-2 rounded-full bg-white focus:outline-none " 
            placeholder="Add a comment" />

            <button className="flex items-center space-x-2">
                <TbSend className='w-8 h-8 text-red-700' />
            </button>
        </div>
    </div>
  )
}
