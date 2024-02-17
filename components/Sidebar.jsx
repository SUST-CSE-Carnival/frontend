import React from 'react'

export default function Sidebar({  location, setLocation }) {
  
  return (
    <main className='flex-1 h-screen bg-gray-300'>
        <div className='px-4 py-3 text-lg rounded-xl flex justify-center'>
            <input value={location} onChange={(e) => setLocation(e.target.value) } type="text" placeholder='Enter A Location' className='focus:outline-none px-2 py-1 rounded-lg' />
        </div>
    </main>
  )
}
