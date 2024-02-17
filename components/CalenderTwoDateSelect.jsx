import React, { useState } from 'react'

export default function CalenderTwoDateSelect() {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    function handleDate() {
        console.log(startDate, endDate)
        if(endDate == "" || startDate == "") {
            return 
        }
        else {
            const start = new Date(startDate)
            const end = new Date(endDate)
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffDays)
        }
    }


  return (
    <div className='flex space-x-6 justify-center p-5 w-full'>
      <input type='date' placeholder='Enter Start Date' className='focus:outline-none px-2 py-1 rounded-lg' value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type='date' placeholder='Enter End Date' className='focus:outline-none px-2 py-1 rounded-lg' value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleDate} className='bg-black text-white px-2 py-1 rounded-lg'>Done</button>
    </div>
  )
}
