"use client"
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import ReviewUpdateTable from '@/components/ReviewUpdateTable'

export default function page() {
  const { toast } = useToast()
  
  return (
    <div>
      <ReviewUpdateTable toast={toast} />
      <Toaster />
    </div>
  )
}
