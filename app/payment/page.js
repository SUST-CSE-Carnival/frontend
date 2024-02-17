"use client"
import PaymentComponent from '@/components/PaymentComponent'
import PaymentConfirmation from '@/components/PaymentConfirmation'
import React, { useState } from 'react'

export default function page() {
    const [billed, setBilled] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
  return (
    <main className='bg-white min-h-screen overflow-auto'>
      <div className='flex min-h-screen overflow-auto'>
        {/* Left Side */}
        <PaymentComponent billed={billed} setBilled={setBilled} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        
        {/* Right Side */}
        <PaymentConfirmation billed={billed} setBilled={setBilled} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      </div>
    </main>
  )
}
