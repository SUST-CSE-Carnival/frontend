"use client"
import React, { useEffect, useState } from 'react'
import { TableCell, TableRow, Table, TableCaption, TableHead, TableHeader, TableBody } from './ui/table'
import MedicineOrderCompleteRow from './MedicineOrderCompleteRow'
import PageLoading from './PageLoading'


export default function PendingMedicineOrders() {
   const [data, setData] = useState([])
   const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/medicine_order/undelivered/all`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken,
      "ngrok-skip-browser-warning": "69420" }
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.type !== 'empty') {
            for(let order of data) {
                order['place'] = JSON.parse(order['place'])
            }
            setData(data)
            console.log(data)
        }
        else {
            setData(data)
        }
      })
  }, [])

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);


  if(data?.type !== 'empty' && data.length > 0) {
    return (
      <Table>
      <TableCaption>Currently Pending Medicine Orders</TableCaption>
      <TableHeader>
          <TableRow>
          <TableHead className="w-[200px] text-center">Customer Name</TableHead>
          <TableHead className="w-[200px] text-center">Customer Email</TableHead>
          <TableHead className="w-[200px] text-center">Contact Number</TableHead>
          <TableHead className="w-[200px] text-center">Order Description</TableHead>
          <TableHead className="w-[200px] text-center">Total Price</TableHead>
          <TableHead className="w-[200px] text-center"></TableHead>
          <TableHead className="w-[200px] text-center"></TableHead>
          </TableRow>
      </TableHeader>
      <TableBody>
          {data?.map((order) =>{ return (
            <MedicineOrderCompleteRow key={order.id} order={order} userLocation={userLocation}/>
          )})}
      </TableBody>
      </Table>
    )
    }
    else if(data.type == 'empty') {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <h1 className="text-2xl">No Pending Medicine Orders Right Now</h1>
        </div>
      )
    }
    else {
    return (
        <div className="flex items-center justify-center h-screen w-full border-none">
            <PageLoading />
        </div>
    )
  }
}
