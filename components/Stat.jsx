

import React from 'react'
import { FaRegHeart } from "react-icons/fa6";


export default function Stat() {
 return (
   <div className='w-full flex justify-center space-x-6 px-64 items-center mx-auto bg-white '>
       <div className="stat bg-[#336e85] rounded-lg py-4 space-y-2 w-[48rem]">
           <div className=" text-white">Customers : (Last 7 Days) : 50</div>
           <div className="text-white">Customers : (Last 30 Days) : 600</div>
           <div className="text-secondary text-white">Customers : (All Time) : 3000</div>
       </div>
        <div className="stat bg-[#336e85] rounded-lg space-y-2 w-[48rem]">
           <div className=" text-white">Income : (Last 7 Days) : 3000</div>
           <div className="text-white">Income : (Last 30 Days) : 8000</div>
           <div className="text-secondary text-white">Income : (All Time) : 150000</div>
       </div>
        <div className="stat bg-[#336e85] rounded-lg space-y-2 w-[48rem]">
           <div className=" text-white">Rating : (Last 7 Days) : 4.5</div>
           <div className="text-white">Rating : (Last 30 Days) : 4.3</div>
           <div className="text-secondary text-white">Rating : (All Time) : 4.1</div>
       </div>      
   </div>
 )
}
