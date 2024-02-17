"use client"
import ImageToText from '@/components/ImageToText'
import React from 'react'

export default function page() {
  return (
    <div>
       <div className='flex justify-center my-4'>
            <h1 className='text-2xl'>Upload Your Prescription Image Here : </h1>
        </div> 
      <ImageToText />
    </div>
  )
}
