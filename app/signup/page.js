"use client"
import { Quicksand } from 'next/font/google'
import { useState } from "react"
// import { downloadImage, handleAddUserToChatEngine } from "@/components/utils"
const quicksand = Quicksand({ subsets: ['latin'] })
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from '@/components/ui/button'

export default function page() {
  const { toast } = useToast()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailInput, setEmail] = useState("")
  const [passwordInput, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [image, setImage] = useState(null)
  const router = useRouter()
  async function handleSubmit(e) {
    e.preventDefault()
    if(firstName == "" || lastName == "" || emailInput == "" || 
    passwordInput == "" || phone == "") {
      toast({
        title: "Error!",
        description : "Please Fill All The Fields",
        variant : "destructive"
      })
      return
    }
    let fileName = "default.jpg"
    const data = {
      name : firstName + " " + lastName,
      email: emailInput,
      password: passwordInput,
      phone : phone,
      url : "default.jpg"
    }
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/signup`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify(data)
    })
    
    const ans = await response.json()
    if(ans.type == 'error') {
      toast({
        title: "Error!",
        description : "Invalid Email or Password",
        variant : "destructive"
      })
      return
    }
    
    // handleAddUserToChatEngine(emailInput, "1234", firstName, lastName)
    router.push("/login")
  }
  return (
    <main className="h-screen w-full flex justify-center items-center bg-white overflow-auto">
        <div className="bg-white shadow-lg h-[90%] rounded-xl w-[90%] flex overflow-auto">
            {/* Left Side */}
            <div className="w-[40%] bg-[url(/signup.jpg)] bg-center h-full bg-cover flex flex-col justify-center items-center">
                
            </div>

            {/* Right Side */}
            <div className="w-[60%] space-y-4">
                <div className="flex flex-col items-center">
                    <h1 className={`text-6xl font-bold mt-12`}>New Account</h1>
                    <div className='flex items-center my-4 space-x-2 cursor-pointer'>
                        <p className='tracking-wider text-lg font-semibold'>Already have an account?<span className='ml-4 underline underline-offset-2 text-[#199292] font-bold'>Sign-In </span></p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mt-12">
                        <div className='flex space-x-6'>
                            <div className="flex flex-col space-y-4">
                                <label className={`text-xl`} htmlFor="firstName">First Name : </label>
                                <input onChange={e => setFirstName(e.target.value)} className="px-6 bg-white py-3 text-xl outline-none focus:outline-none border-[1px] border-[#199292] rounded-lg" type="text" name="firstName" id="firstName" placeholder="Enter your first name" />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <label className={`text-xl`} htmlFor="lastName">Last Name : </label>
                                <input onChange={e => setLastName(e.target.value)} className="px-6 bg-white py-3 text-xl outline-none focus:outline-none border-[1px] border-[#199292] rounded-lg" type="text" name="lastName" id="lastName" placeholder="Enter your last name" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <label className={`text-xl ${quicksand.className}`} htmlFor="email">Email : </label>
                            <input onChange={e => setEmail(e.target.value)} className="px-6 py-3 bg-white text-xl outline-none focus:outline-none border-[1px] border-[#199292] rounded-lg" type="email" name="email" id="email" placeholder="Enter your email address" />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <label className={`text-xl ${quicksand.className}`} htmlFor="phone">Phone : </label>
                            <input onChange={e => setPhone(e.target.value)} className="px-6 bg-white py-3 text-xl outline-none focus:outline-none border-[1px] border-[#199292] rounded-lg" type="text" name="phone" id="phone" placeholder="Enter your contact number" />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <label className={`text-xl ${quicksand.className}`} htmlFor="password">Password : </label>
                            <input onChange={e => setPassword(e.target.value)} className="px-6 bg-white py-3 text-xl outline-none focus:outline-none border-[1px] border-[#199292] rounded-lg" type="password" name="password" id="password" placeholder="Enter your password" />
                        </div>
                        <div>
                            <Button className="w-[100%] hover:bg-[#228070] hover:text-white bg-[#228070] text-xl mx-auto px-6 py-8 my-12 rounded-lg text-center flex items-center justify-center">Create Account</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    </main>
  )
}
