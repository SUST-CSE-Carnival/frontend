"use client"
import NavBar from '@/components/NavBar'
import MedicineList from "@/components/MedicineList";
import MedicineSIdeBar from "@/components/MedicineSIdeBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartPlus } from 'react-icons/fa'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Maps from "@/components/GoogleMaps/Maps";

export default function page() {
  const [medicineInput, setMedicineInput] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [checkedCompanies, setCheckedCompanies] = useState([]);
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  useEffect(() => {
    let tp = 0
    for (let item in cartItems) {
      tp += cartItems[item].price * cartItems[item].number
    }
    setTotalPrice(tp)
  }, [cartItems])

  async function handleMedicinePayment() {
    setLoading(true)
    let description = ""
    for (let item in cartItems) {
      description += `${cartItems[item].medicine_name} (${cartItems[item].manufacturer_name})  - ${cartItems[item].number} pieces, \n`
    }
    const medicineData = {
      description,
      price : (parseInt(totalPrice) + 5).toString(),
      place : JSON.stringify(place)
    }

    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/medicine_order/create/`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken
    },
      body : JSON.stringify(medicineData)
    })
    const ans = await response.json()
    setLoading(false)
    // if(ans.detail == "Success") {
    //   router.push("/payment_confirmation")
    // }

  }

  function handleSendToUploadPrescription() {
    router.push('/upload_prescription?place=' + JSON.stringify(place))
  }

  if(place) {
    return (
      <main className="min-h-screen overflow-auto bg-white">
        <nav className="bg-white">
          <NavBar />
        </nav>
        <div className="flex items-center my-4">
          <input type="text" value={medicineInput} onChange={e => setMedicineInput(e.target.value)} placeholder="Enter Your Required Medicine Here" 
          className="h-[4rem] z-10 overflow-wrap px-4 bg-white w-[60%] focus:outline-none text-xl mx-auto placeholder:text-gray-400 border border-gray-500 rounded-full" />
        </div>
        <div className='my-4 flex justify-center'>
          <h1 className='text-2xl'>Or, Upload Your Prescription <span onClick={handleSendToUploadPrescription} className='text-red-700 cursor-pointer underline underline-offset-1'>Here</span></h1>
        </div>
        {cartItems.length > 0 && 
          <div className="flex w-[32rem] mx-auto items-center justify-center">
            <Dialog>
              <DialogTrigger>
                  <div className="flex w-[32rem] mx-auto items-center justify-center space-x-6 text-black text-xl px-4 py-4 rounded-lg bg-[#2699b6] cursor-pointer">
                      <FaCartPlus />
                      <h1>Proceed To CheckOut</h1>
                  </div>
              </DialogTrigger>
                <DialogContent className="p-12 bg-white">
                  <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Your Cart</DialogHeader>
                    <div className='flex flex-col space-y-4'>
                      {
                        cartItems.map(medicine => 
                            <div key={medicine.id} className="shadow-md p-3 rounded-lg text-white bg-[#1b79a8]">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center space-x-2">
                                    <h1 className="font-semibold">{medicine.medicine_name}</h1>
                                    <p className="text-sm">{medicine.number} Pcs</p>
                                  </div>
                                  <h1>{parseFloat(medicine.price * medicine.number).toFixed(2)} Tk</h1>
                                </div>
                            </div>
                          )
                      }
                    <p>-------------------------------------------------------------------</p>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">Total : <span>{Math.ceil(totalPrice) + 5} Tk</span></p>
                      <Button className="rounded-lg bg-[#187a7a] hover:bg-[#187a7a] hover:text-white" onClick={handleMedicinePayment}>
                      
                        <div className='flex items-center space-x-2'>{loading && <span className='loading loading-spinner'></span>}Complete Payment</div>
                      
                      
                      </Button>
                    </div>
                    </div>
                </DialogContent>
              </Dialog>
          </div>
        }
        <div className="flex mt-8">
          <MedicineSIdeBar setCheckedCompanies={setCheckedCompanies} checkedCompanies={checkedCompanies} />
          <MedicineList checkedCompanies={checkedCompanies} medicineInput={medicineInput} cartItems ={cartItems} setCartItems = {setCartItems} />
        </div>
      </main>
   )
  }
  else {
    return (
      <div className='min-h-screen bg-white overflow-auto'>
        <nav className="bg-white">
          <NavBar />
        </nav>
        <h1 className="my-8 text-2xl text-center">Please Select Your Location At First To Order Medicine</h1>
        <div className="px-16">
          <Maps setPlace={setPlace}/>
        </div>
      </div>
    )
  }
}
