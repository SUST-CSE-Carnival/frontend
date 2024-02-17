"use client"
import React, { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import CustomerMap from './GoogleMaps/CustomerMap'
import { Button } from './ui/button'


export default function MedicineOrderCompleteRow({ order, userLocation }) {
    const [loading, setLoading] = useState(false)
    const [btnValue, setBtnValue] = useState("Complete Delivery")
    console.log(userLocation)

    function completeOrderHandler() {
        setLoading(true)
        let token = localStorage.getItem("token")
        token = JSON.parse(token)
        console.log(order)
        const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
        fetch(`${endpoint}/medicine_order/update/delivery/${order.id}`, {
          method: 'PUT',
          headers : {'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.accessToken }
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setLoading(false)
            setBtnValue("Delivered")
          })
    }
    

  return (
    <TableRow key={order.id}>
        <TableCell className="w-[200px] text-center">{order.name}</TableCell>
        <TableCell className="w-[200px] text-center text-lg">{order.email}</TableCell>
        <TableCell className="w-[200px] text-center text-lg">{order.phone}</TableCell>
        <TableCell className="w-[400px] text-center">{order.description}</TableCell>
        <TableCell className="w-[200px] text-center text-lg">{order.price} Tk</TableCell>
        <TableCell className="w-[100px] text-end">
            <Dialog>
            <DialogTrigger>
                <Button className="bg-[#145a3f] hover:bg-[#145a3f]">See Exact Location</Button>
            </DialogTrigger>
                <DialogContent className="p-4 max-w-[1225px]">
                <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Customer Location</DialogHeader>
                <CustomerMap userLocation={userLocation} center={{lat : order.place.lat, lng : order.place.lng}}/>
                </DialogContent>
            </Dialog>
        </TableCell>
        <TableCell className="w-[100px] text-center"><Button onClick={completeOrderHandler} className={`${btnValue == 'Delivered' ? "bg-[#13a354] hover:bg-[#13a354]" : "bg-[#2a818d] hover:bg-[#2a818d]"} flex items-center w-full text-center`}>{loading ? <span className='loading loading-spinner'></span> : `${btnValue}`}</Button></TableCell>
    </TableRow>
  )
}
