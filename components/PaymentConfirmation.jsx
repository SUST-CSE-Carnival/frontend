import React from 'react'
import { Quicksand } from 'next/font/google'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
const quicksand = Quicksand({ subsets: ['latin'] })

export default function PaymentConfirmation({ billed, setBilled, paymentMethod, setPaymentMethod }) {
  const router = useRouter()
  return (
    <div className={`w-[35%] bg-gray-100 min-h-screen overflow-auto p-8 ${quicksand.className}`}>
        <p className='text-4xl my-4'>Summary</p>
        <p className='text-gray-600 text-sm font-bold'>{billed} Membership : <span className='ml-8 text-black text-end'>199 BDT/month <br /></span></p>
        <p className='text-center text-sm ml-[-36%] font-bold my-1'>(549.00 BDT billed annually)</p>
        <hr className='w-[50%] h-[0.1rem] bg-gray-400 my-4'/>
        <h1 className='text-2xl my-6 font-bold'>Today's Total : <span className='ml-8'>549.00 BDT</span></h1>
        <button onClick={() => router.push("/payment_confirmation")} className="bg-[#199292] text-white w-96 rounded-lg text-xl h-12">Complete Payment</button>

        {/* Dummy Text */}
        <p className='text-sm text-gray-600 tracking-wide my-8 w-96'>
         A recurring annual charge of 549.00 BDT (plus tax, where applicable) will be automatically applied to your payment method and start on
         today. Note: the actual amount charged may be lower in the first year based on promo codes or discounts applied. 
         You may cancel at any time, effective at the end of the billing period, by going to your Memberships & Payments settings. 
         Rates for subsequent billing periods may change. All amounts paid are non-refundable, subject to certain exceptions.
         By clicking 'Complete Payment', you agree to our Terms of Service and authorize this recurring charge.
         Have any questions? Write to our support team at help@skillshare.com or visit our Help Center.
        </p>
    </div>
  )
}