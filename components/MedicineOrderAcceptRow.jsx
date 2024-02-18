"use client"
import React, { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import CustomerMap from './GoogleMaps/CustomerMap'
import { Button } from './ui/button'
import { addMemberToChat, createNewChat, deleteChat } from './utils'


export default function MedicineOrderAcceptRow({ order, userLocation }) {
    const [loading, setLoading] = useState(false)
    const [btnValue, setBtnValue] = useState("Take This Order")

    function acceptOrderHandler() {
        setLoading(true)
        let token = localStorage.getItem("token")
        token = JSON.parse(token)
        console.log(order)
        const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
        fetch(`${endpoint}/medicine_order/update/${order.id}`, {
          method: 'PUT',
          headers : {'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.accessToken }
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setLoading(false)
            setBtnValue("Order Taken")
            createNewChat(`Medicine Order Delivery`, token.email, "1234")
            .then((res) => {
              console.log(order)
              addMemberToChat(token.email, "1234", res.id, order?.email)
              setTimeout(() => {
                  deleteChat(token.email, "1234", res.id)
              }, 1000 * 60 * 60)
            })
          })
    }

  return (
    <TableRow key={order.id}>
        <TableCell className="w-[200px] text-center">{order.name}</TableCell>
        <TableCell className="w-[200px] text-center text-lg">{parseFloat(order.distance).toFixed(1)} Km.</TableCell>
        <TableCell className="w-[400px] text-center">{order.description}</TableCell>
        <TableCell className="w-[200px] text-center text-lg">{order.price} Tk</TableCell>
        <TableCell className="w-[100px] text-end">
            <Dialog>
            <DialogTrigger>
                <Button className="bg-[#145a3f] hover:bg-[#145a3f] hover:text-white">See Exact Location</Button>
            </DialogTrigger>
                <DialogContent className="p-4 max-w-[1225px] bg-white">
                <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Customer Location</DialogHeader>
                <CustomerMap userLocation={userLocation} center={{lat : order.place.lat, lng : order.place.lng}}/>
                </DialogContent>
            </Dialog>
        </TableCell>
        <TableCell className="w-[100px] text-center"><Button onClick={acceptOrderHandler} className={`${btnValue != 'Order Taken' ? "bg-[#2a818d] hover:bg-[#2a818d]" : "bg-[#148614] hover:bg-[#148614]"} flex w-full items-center text-center`}>{loading ? <span className='loading'></span> : `${btnValue}`}</Button></TableCell>
    </TableRow>
  )
}
