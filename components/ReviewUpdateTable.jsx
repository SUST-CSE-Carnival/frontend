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
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState } from "react"
import PageLoading from "./PageLoading"

export default function ReviewUpdateTable({ toast }) {
   const [data, setData] = useState(null)
   const [reviewContent, setReviewContent] = useState("")
   const [isLoading, setLoading] = useState(false)
   const [star, setStar] = useState("")

   useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    fetch(`${endpoint}/review/pending`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken,
      "ngrok-skip-browser-warning": "69420" }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
  }, [])

  function updateReviewHandler(review) {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    setLoading(true)
    const data = {
        subjectId : review.subjectId,
        orderId : review.orderId,
        subjectName : review.subjectName,
        role : review.role,
        
    }
    fetch(`${endpoint}/add/review?star=${parseInt(star)}&review=${reviewContent}`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken,
      "ngrok-skip-browser-warning": "69420" },
      body : JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setData(prev => prev.filter(r => r.orderId !== review.orderId))
        toast({
            title: "Review Sent!",
            description : `Thank You For Providing Your Review`
        })
        setTimeout(() => {
          window.location.reload();
        }, 600)
      })
    setStar("")
    setReviewContent("")
  }

  function formatRole(role) {
    if(role == 'hospital') {
        return "Diagnosis"
        }
      if(role == 'doctor') {
          return "Doctor"
        }
      if(role == 'ambulance') {
          return "Ambulance Trip"
        }
      if(role == 'pharmacy') {
        return "Pharmacy"
    }
  }

  if(data && data.type != 'empty') {
    return (
        <Table>
        <TableCaption>Please Give Your Important Feedback</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[200px] text-center">Name</TableHead>
            <TableHead className="w-[200px] text-center">Type</TableHead>
            <TableHead className="w-[100px]"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map((review) =>{ return (
            <TableRow key={review.id}>
                <TableCell className="w-[200px] text-center">{review?.subjectName}</TableCell>
                <TableCell className="w-[200px] text-center">{formatRole(review?.role.toLowerCase())}</TableCell>
                <TableCell className="w-[100px] text-center">
                  <Dialog>
                      <DialogTrigger>
                        <Button className="bg-[#2a818d]">Give A Review</Button>
                      </DialogTrigger>
                      <DialogContent className="p-12 max-w-2xl">
                          <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Your Review For : {review.subjectName}</DialogHeader>
                          <div className="my-2">
                            <h1 className="my-1">Your Rating : (Out of Five)</h1>
                            <input type="text" placeholder="Example : 4" value={star} onChange={(e) => setStar(e.target.value)} className="w-full my-1 px-4 py-2 focus:outline-none border border-gray-400 rounded-md"/>
                          </div>
                          <div className="">
                            <textarea type="text" className="w-full my-1 px-4 py-2 focus:outline-none border border-gray-400 rounded-md" placeholder="Write A Review" value={reviewContent} onChange={(e) => setReviewContent(e.target.value)}/>
                          </div>
                          <Button onClick={() => updateReviewHandler(review)} className={`bg-[#2589b1] round-lg text-lg h-12 w-64 flex mx-auto items-center`}>{isLoading ? <span className="loading loading-spinner"></span> : "Send"}</Button>
                      </DialogContent>
                  </Dialog>
                </TableCell>
            </TableRow>
            )})}
        </TableBody>
        </Table>
    )
  }
  else if(data && data.type == 'empty') {
    return (
        <div className="flex items-center justify-center">
            <h1>No Available Review To Be Given</h1>
        </div>
    )
  }

  else {
    return (
        <div className="flex items-center justify-center">
            <PageLoading />
        </div>
    )
  }
}
  