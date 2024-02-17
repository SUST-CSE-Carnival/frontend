"use client"
import MedicinePriceTable from '@/components/MedicinePriceTable'
import React, { useState } from 'react'

export default function page() {
  const [medicineInput, setMedicineInput] = useState("")

  return (
    <div className='grid grid-cols-1 gap-4 p-4'>
      <div className='flex shadow-md rounded-full px-4 w-[50%] py-2 items-center text-center mx-auto'>
          <input required className='bg-transparent focus:outline-none w-full h-8' onChange={e => setMedicineInput(e.target.value)} type="text" placeholder="search by medicine name" value={medicineInput}/>
      </div>
      <div className='m-4 border border-gray-300 rounded-md'>
        <MedicinePriceTable medicineInput={medicineInput} />
      </div>
    </div>
  )
}
