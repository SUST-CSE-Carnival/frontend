"use client"
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
import React, { useEffect, useState } from 'react'
import MedicineDetail from './MedicineDetail'
import PageLoading from './PageLoading'

export default function MedicineList({ cartItems, setCartItems, medicineInput, checkedCompanies }) {
   const [data, setData] = useState(null)
   const [allData, setAllData] = useState(null)
   const [isLoading, setLoading] = useState(true)
   const [page, setPage] = useState(0)
   useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    fetch(`${endpoint}/medicine/all`, {
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420"
          }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.slice(page * 20, page * 20 + 20))
        setAllData(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const range = page * 20
    setData(allData?.slice(range, range + 20))
    if(medicineInput != "") {
        setData(prev => allData?.filter(medicine => medicine.medicine_name.toLowerCase().includes(medicineInput.toLowerCase())))
      }
    if(checkedCompanies.length != 0 && medicineInput != "") {
      let filteredMedicines = data?.filter((medicine) =>
        checkedCompanies.includes(medicine.manufacturer_name)
      );
      filteredMedicines = filteredMedicines?.filter((medicine) =>
        medicine.medicine_name.toLowerCase().includes(medicineInput.toLowerCase())
      );

      setData(filteredMedicines);
    }
  }, [medicineInput, checkedCompanies, page])

  if(data && data.type != 'error') {
    return (
      <>
        <div className='flex-1 p-3 min-h-screen'>
          {data?.map(medicine => <MedicineDetail cartItems = {cartItems} setCartItems = {setCartItems} key={medicine.id} medicineDetail={medicine}/>)}
          <div className='flex items-center justify-center space-x-12 text-white my-6'>
            <div onClick={() => setPage(prev => prev > 0 && prev - 1)} className='flex px-3 py-2 rounded-lg bg-[#197a86] items-center space-x-4 cursor-pointer'>
              <TbPlayerTrackPrev />
              <h1>Prev</h1>
            </div>
            <div onClick={() => setPage(prev => prev < 20 && prev + 1)} className='flex cursor-pointer px-3 py-2 rounded-lg bg-[#197a86] items-center space-x-4'>
              <h1>Next</h1>
              <TbPlayerTrackNext />
            </div>
          </div>
        </div>
      </>
    )
  }
  else if(data && data.type == 'error') {
    return (
      <div className='flex-1 p-3 min-h-screen'>
        <div className='flex items-center justify-center'>
          <h1 className='text-center'>No Available Medicine Found</h1>
        </div>
      </div>
    )
  }
  else {
    return <PageLoading />
  }
}
