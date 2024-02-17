"use client"
import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import Plane from "../components/Lottiefiles/loader.json";

export default function PageLoading() {
  return (
    <main className='flex items-center justify-center min-h-screen bg-white'>
      <Lottie className='w-[30rem]' animationData={Plane} loop={true} />
    </main>
  )
}
