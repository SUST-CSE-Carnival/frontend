"use client"
import React, { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import CustomerMap from './GoogleMaps/CustomerMap'
import { Button } from './ui/button'
import Lottie from 'lottie-react' 


export default function MedicineOrderCompleteRow({ order }) {

  return (
    <TableRow key={order.id}>
        <TableCell className={`w-[200px] text-center ${order.name == 'null' && "text-red-800"}`}>{order.name == 'null' ? 'Order Not Accepted Yet' : order.name}</TableCell>
        <TableCell className="w-[200px] text-center text-lg">{order.phone == 'null' ? '' : order.phone}</TableCell>
        <TableCell className="w-[400px] text-center">{order.description}</TableCell>
        <TableCell className="w-[200px] text-center text-lg">{order.price} Tk</TableCell>
    </TableRow>
  )
}
