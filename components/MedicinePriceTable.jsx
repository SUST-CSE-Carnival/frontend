"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
  
export default function MedicinePriceTable({ medicineInput }) {
  const [data, setData] = useState(null)
   const [allData, setAllData] = useState(null)

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    fetch(`${endpoint}/medicine/all`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken,
      "ngrok-skip-browser-warning": "69420"}
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
        setAllData(data)
      })
  }, [])

  useEffect(() => {
    if(medicineInput.length == 0) {
      setData(allData)
    }
    else {
      setData(allData)
      setData(prev => prev?.filter(medicine => medicine.medicine_name.toLowerCase().startsWith(medicineInput)))
    }
  }, [medicineInput])

return (
    <Table className="">
    <TableCaption>Check Current Price of All Medicines Here</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[200px] text-center">Medicine Name</TableHead>
        <TableHead className="w-[200px] text-center">Company Name</TableHead>
        <TableHead className="w-[200px] text-center">Generic Name</TableHead>
        <TableHead className="w-[200px] text-center">Price</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {data?.map((medicine) =>{ return (
        <TableRow key={medicine.id}>
            <TableCell className="w-[200px] text-center text-lg">{medicine.medicine_name}</TableCell>
            <TableCell className="w-[200px] text-center text-lg">{medicine.manufacturer_name}</TableCell>
            <TableCell className="w-[200px] text-center text-lg">{medicine.generic_name}</TableCell>
            <TableCell className="w-[200px] text-center"><span className="font-semibold text-lg">{medicine.price}</span> Tk (Per Piece)</TableCell>
        </TableRow>
        )})}
    </TableBody>
    </Table>
)
}
  