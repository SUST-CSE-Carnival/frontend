"use client"
import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import Payment from "../../components/Lottiefiles/payment.json";

export default function PaymentConfirmation() {

    useEffect(() => {
        let token = localStorage.getItem("token")
        token = JSON.parse(token)
        window.onpopstate = () => {
            window.location.href = `/dashboard/${token.id}/orders`
        }
    })
  return (
    <main className='flex items-center justify-center min-h-screen'>
      <Lottie className='w-[100rem]' animationData={Payment} loop={false} />
    </main>
  )
}
