import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function SevenCards() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7])
  const [selected, setSelected] = useState(1)
  return (
    <div className='flex space-x-4 w-full p-8 items-start'>
        <>
        {
            numbers.map((number, index) => (
            <Card key={index} number={number} selected={selected} setNumbers={setNumbers} setSelected={setSelected} />
            ))
        }
        </>
    </div>
  )
}



function Card({ number, selected, setSelected, setNumbers }) {
  

  return (
    <div>
        {
            number == selected && (
                <div className='flex items-center justify-between my-4'>
                    <FaAngleLeft onClick={() => setSelected(selected - 1)} size={30} className='cursor-pointer text-2xl' />
                    <FaAngleRight onClick={() => setSelected(selected + 1)} size={30} className='cursor-pointer text-2xl' />
                </div>
            )
        }
        <div className={`flex items-center justify-center ${number == selected ? "h-[956px]" : "h-[756px]"} w-[36rem] bg-gray-500`}>
            <h1 className='text-4xl'>{number}</h1>
        </div>
    </div>
  )
}