import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import UploadImage from './antComponents/UploadImage';
import { Toaster } from './ui/toaster';
import { useToast } from "@/components/ui/use-toast"

export default function CreateNewPost({ src, setSrc }) {
 const { toast } = useToast()

 async function sendImage(src) {
    const url = 'https://api.openai.com/v1/chat/completions'
    const response = await fetch(url, {
        method : "POST",
        headers : {
          Authorization : `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          'content-type' : 'application/json' 
        },
        body : JSON.stringify({
          model : "gpt-4-vision-preview",
          messages :  [
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": "What’s in this image?"
                },
                {
                  "type": "image_url",
                  "image_url": {
                    "url": src
                  }
                }
              ]
            }
          ],
          max_tokens : 500
        })        
      })
      
      if (response.ok) {
        let answer = await response.json()
        console.log(answer)
      } else {
        console.error("Failed to send message");
      }
    }  

 async function postCreateHandler() {
        setSrc(null)
        toast({
            title: "Successful",
            description : "Post Uploaded Successfully!",
            variant : "success"
        })

  }

  return (
    <>
    <div className='w-[48rem] my-4 min-h-40 bg-gray-100 rounded-lg'>
        <div className='flex items-start space-x-2 p-4'>
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div> 
            <div className='w-full'>
                <textarea className="w-full textarea h-24 px-2 py-4 border-2 rounded-lg bg-white focus:outline-none text-md" placeholder="What's on your mind?" />
            </div>
        </div>
        {
            src && <div className="avatar w-full rounded-full">
                        <div className="w-full p-8 rounded-2xl">
                            <img src= {src} className=' opacity-50' />
                        </div>
                    </div>
        }
        <div>
            {/* Add Photo / video / activity */}
            <div className='flex justify-between items-center p-4'>
                <div className='flex space-x-4 items-start'>

                    
                    <div>
                        <UploadImage src={src} setSrc={setSrc} />
                    </div>
                    

                    <div className='flex items-center space-x-2 bg-[#2d8e3d] rounded-full py-3 px-4'>
                        <FaPlus className='text-white' />
                        <span className='text-white'>Activity</span>
                    </div>

                </div>
                <div>
                    <button onClick={postCreateHandler} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Post</button>
                </div>
            </div>
        </div>
    </div>

    <div>
    </div>
    <div className='bg-green-700'>
        <Toaster color = "bg-green-500" />
    </div>
    </>
  )
}
