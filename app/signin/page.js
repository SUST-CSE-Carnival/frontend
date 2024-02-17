"use client"
import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Image from 'next/image';
import { FaGoogle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { message, Space } from 'antd';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
export default function page() {
    const [messageApi, contextHolder] = message.useMessage();
    const [emailInput, setEmail] = useState("")
    const [passwordInput, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()


    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const data = {
            email: emailInput,
            password: passwordInput
        }
        const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
        const response = await fetch(`${endpoint}/signin`, {
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(data)
        })
        const ans = await response.json()
        setLoading(false)
        if(ans.type == 'error') {
            toast({
                title: "Error!",
                description : "Invalid Email or Password",
                variant : "destructive"
            })
            return
        }
        localStorage.setItem('token', JSON.stringify(ans))
        if(ans.role == 'PHARMACY') {
            router.push(`/pharmacy_dashboard/${ans.id}`)
        }
        else {
            router.push(`/`)
        }
    }


  return (
    
    <div className='flex items-center justify-center bg-[url(/bg14.jpg)] h-screen w-full bg-cover bg-gray-100'>
        {contextHolder}
        <div className='bg-white h-[75%] rounded-xl w-[70%]'>
           <div className='flex justify-between p-8 items-center h-full mx-16'>
             {/* Left Side */}
                <div className='mt-16 border-0 border-r-2 pr-36'>
                    <h1 className='text-3xl font-bolder text-gray-600 my-1'>Welcome Back!</h1>
                    <h1 className='text-4xl font-bold text-gray-600 my-4 mb-12'>Sign In</h1>
                    <p className='tracking-wider text-lg font-semibold'>If you don't have an account, </p>
                    <div className='flex items-center space-x-2 cursor-pointer'>
                        <p className='tracking-wider text-lg font-semibold'>you can<span onClick={() => router.push("/signup")} className='ml-4 text-[#199292] font-bold'>register now </span></p>
                        <FaArrowRightLong className='text-[#199292]'/>
                    </div>
                    <div>
                    <div className="avatar">
                        <div className="w-[24rem] rounded-xl">
                            <img src={'/girl7.jpg'} />
                        </div>
                    </div>
                    </div>
                </div>
                {/* Right Side */}
                <div className='flex flex-col justify-center items-center w-full'>
                    <form className='space-y-6 flex flex-col items-center justify-center w-full h-full'>
                        <div className='flex flex-col w-[100%] px-6'>
                            <label className='text-xl py-2' htmlFor="email">Email : </label>
                            <input onChange={e => setEmail(e.target.value)} className='px-6 bg-white py-3 text-xl outline-none focus:outline-none border-[1px] border-[#199292] rounded-lg' type="email" name="email" id="email" placeholder="Enter your email address" />
                        </div>
                        <div className='flex flex-col w-[100%] px-6'>
                            <label className='text-xl py-2' htmlFor="password">Password : </label>
                            <input onChange={e => setPassword(e.target.value)} className='px-6 bg-white py-3 text-xl outline-none focus:outline-none border-[1px] border-[#199292] rounded-lg' type="password" name="password" id="password" placeholder="Enter your password" />
                        </div>
                        <div className='flex justify-between w-[100%] px-6 mb-36 h-full'>
                            {/* Remember Me */}
                            <div>
                                <input className='mr-2 p-2 rounded-md focus:outline-none' type="checkbox" name="remember" id="remember" />
                                <label className='text-xl checkbox h-6 w-6 bg-white' htmlFor="remember">Remember me</label>
                            </div>
                            <p className='text-[#199292] font-bold text-lg cursor-pointer'>Forgot Password?</p>
                        </div>
                        <div className='flex space-x-6 w-[80%] items-center justify-center pt-12'>
                            <div className='flex items-center space-x-2 px-5 py-3 rounded-xl border border-gray-500 text-black text-xl'>
                                <FaGoogle />
                                <button className=''> With Google</button>
                            </div>
                            <button onClick={handleSubmit} className='px-5 py-3 rounded-xl bg-[#199292] text-white text-xl flex items-center'>{loading && <span className='loading loading-spinner text-lg bg-white mr-4'></span>}Sign-In</button>
                        </div>
                    </form>
                </div>
           </div>
        </div>
        <Toaster />
    </div>
  )
}
