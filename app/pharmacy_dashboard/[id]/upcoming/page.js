
import Maps from '@/components/GoogleMaps/Maps'
import PharmacyOrderTable from '@/components/PharmacyOrderTable'
import React from 'react'

export default function page() {
  return (
    <>
      <div className='p-4 m-4 border border-gray-400 rounded-md'>
        <PharmacyOrderTable />
      </div>
    </>
  )
}
