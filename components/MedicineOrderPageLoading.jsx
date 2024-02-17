"use client"
import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import Plane from "../components/Lottiefiles/loader.json";

export default function MedicineOrderPageLoading() {
  return (
    <main className='flex justify-center bg-white'>
      <Lottie className='w-[20rem]' animationData={Plane} loop={true} />
    </main>
  )
}
