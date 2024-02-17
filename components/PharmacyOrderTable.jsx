"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { calculateDistance } from "./utils"
import MedicineOrderAcceptRow from "./MedicineOrderAcceptRow"
import PageLoading from "./PageLoading"

  
export default function PharmacyOrderTable() {
  const [data, setData] = useState([])
  const [allData, setAllData] = useState([])

  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/medicine_order/available/all`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken,
        "ngrok-skip-browser-warning": "69420" 
     }
    })
      .then((res) => res.json())
      .then((data) => {
        setAllData(data)
        console.log(data)
        setData(data)
      })
  }, [])
  const [userLocation, setUserLocation] = useState({ latitude : "24.9287318", longitude : "91.8220913"});
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, [])
  useEffect(() => {
    if(allData.type != 'empty') {
      for(let order of allData) {
        order.place = JSON.parse(order.place)
        order.distance = calculateDistance(userLocation.latitude, userLocation.longitude, order.place.lat, order.place.lng)
      }
      const ordersToShow = allData.filter(order => order.distance < 50)
      setData(ordersToShow)
      console.log(ordersToShow)
    } 
  }, [allData])

  if(data?.type !== 'empty' && data.length > 0) {
      return (
        <Table>
        <TableCaption>Currently Available Medicine Orders</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[200px] text-center">Customer Name</TableHead>
            <TableHead className="w-[200px] text-center">Distance</TableHead>
            <TableHead className="w-[200px] text-center">Order Description</TableHead>
            <TableHead className="w-[200px] text-center">Total Price</TableHead>
            <TableHead className="w-[200px] text-center"></TableHead>
            <TableHead className="w-[200px] text-center"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map((order) =>{ return (
              <MedicineOrderAcceptRow order={order} userLocation={userLocation}/>
            )})}
        </TableBody>
        </Table>
    )
  }
  else if(data.type == 'empty') {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <h1 className="text-2xl">No Available Medicine Orders Right Now</h1>
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
  