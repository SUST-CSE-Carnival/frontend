"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import PageLoading from './PageLoading'


export default function MedicineDetail({ medicineDetail, cartItems, setCartItems }) {
    const [number, setNumber] = useState(0)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [indications, setIndications] = useState(null)
    const [sideEffect, setSideEffect] = useState(null)
    const [caution, setCaution] = useState(null)


    const url = `https://api.openai.com/v1/chat/completions`
    async function handleSubmit(prompt, type) {
        const response = await fetch(url, {
            method : "POST",
            headers : {
              Authorization : `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
              'content-type' : 'application/json' 
            },
            body : JSON.stringify({
              model : "gpt-3.5-turbo",
              messages :  [
                {
                  "role": "user",
                  "content": prompt
                }
              ],
              max_tokens : 300
            })        
          })
        
        if (response.ok) {
          let answer = await response.json()
          answer = answer["choices"][0]["message"]["content"]
          if(type == 'indications') {
            setIndications(answer)
          }
          if(type == 'sideEffect') {
            setSideEffect(answer)

          }if(type == 'caution') {
            setCaution(answer)
          }

        } else {
          console.error("Failed to send message");
        }
      }
      
      function apiCall() {
          handleSubmit(`Can You Tell Me The indications of the medicine with the generic name ${medicineDetail.generic_name} in one paragraph`, 'indications')
          handleSubmit(`Can You Tell Me The side effects of the medicine with the generic name ${medicineDetail.generic_name} in one paragraph`, 'sideEffect')
          handleSubmit(`Can You Tell Me The pre cautions i should take for the medicine with the generic name ${medicineDetail.generic_name} in one paragraph`, 'caution')
      }
    
        

    function handleAddToCart() {
        if(!buttonClicked) {
            if(number > 0) {
                setCartItems([...cartItems, {...medicineDetail, number}])
            }
        }
        else {
            setCartItems(cartItems.filter(item => item.id != medicineDetail.id))
        }
        setButtonClicked(prev => !prev)
    }
  return (
    <div key={medicineDetail.id} className='flex justify-between items-center p-4 shadow-xl rounded-lg'>
        <div>
            <div className='w-[10rem] lg:w-[40rem]'>
                <Dialog>
                    <DialogTrigger>
                        <h1 onClick={apiCall} className='lg:text-lg cursor-pointer font-semibold uppercase'>{medicineDetail.medicine_name} ({medicineDetail.generic_name})</h1>
                    </DialogTrigger>
                    <DialogContent className="p-12 max-w-5xl overflow-y-scroll bg-white">
                        <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}><span className='font-semibold inline'>{medicineDetail.name} ({medicineDetail.generic_name})</span></DialogHeader>
                        <div className='bg-white'>
                            {indications && sideEffect && caution &&
                                <div className='bg-white'>
                                    <div className='my-3 space-y-3'>
                                        <h1 className='font-semibold text-lg my-3'>Medicine Description : </h1>
                                        <h1>{indications}</h1>
                                    </div>
                                    <div className='my-3 space-y-3'>
                                        <h1 className='font-semibold text-lg my-3'>Medicine Side Effects : </h1>
                                        <h1>{sideEffect}</h1>
                                    </div>
                                    <div className='my-3 space-y-3'>
                                        <h1 className='font-semibold text-lg my-3'>Necessary Pre-Cautions : </h1>
                                        <h1>{caution}</h1>
                                    </div>
                                </div>
                            }
                            {
                                indications == null && sideEffect == null && caution == null && 
                                <div className='flex items-center justify-center'>
                                    <PageLoading />
                                </div>                               
                            }
                        </div>
                    </DialogContent>
                </Dialog>


            <p className='text-sm mb-2'>{medicineDetail.company}</p>
            </div>
            <span className='text-sm px-4 py-2 rounded-full text-white bg-gray-500 my-2'><span className='font-semibold text-xl'>{medicineDetail.price}</span> Tk per piece </span>
        </div>
        <div className='flex space-x-4 text-xl '>
            <p onClick={() => setNumber((prev) => prev > 0 ? prev - 1 : prev)} className='px-1 rounded-md border text-2xl border-black cursor-pointer'>-</p>
            <p className='text-xl font-semibold'>{number}</p>
            <p onClick={() => setNumber(prev => prev + 1)} className='px-1 rounded-md border border-black text-2xl cursor-pointer'>+</p>
        </div>
        <div className='space-y-2 flex flex-col items-center justify-center'>
            <h1>Total : <span className='font-bold text-lg'>{(number * medicineDetail.price).toFixed(2)}</span> Tk</h1>
            <Button disabled={number == 0} onClick={() => {
                handleAddToCart()
            }} className={`${!buttonClicked ? "bg-[#2699b6] hover:bg-[#2699b6]" : "bg-[#803131] hover:bg-[#803131]"} w-48`}>{buttonClicked ? "Remove From Cart" : "Add To Cart"}</Button>
        </div>
    </div>
  )
}
