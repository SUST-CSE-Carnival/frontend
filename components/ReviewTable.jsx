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
import { useEffect, useState } from "react"
import PageLoading from "./PageLoading"
  
export default function ReviewTable() {
  const [reviews, setReviews] = useState(null)
  useEffect(() => {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/review/all`, {
      method: 'GET',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken,
      "ngrok-skip-browser-warning": "69420" }
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.type !== 'empty') setReviews(data)
        console.log(data)
      })
  }, [])


  if(reviews && reviews.type != 'empty') {
    return (
      <div className="p-4 text-md m-8 rounded-md flex items-center w-full">
        <Table className="">
        <TableCaption>These are the reviews you have been given </TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[200px] text-center">Reviewer Name</TableHead>
                <TableHead className="w-[200px] text-center">Rating</TableHead>
                <TableHead className="w-[200px] text-center">Review</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reviews && reviews?.map((review, index) =>{ return (
                <TableRow key={index}>
                    <TableCell className="w-[200px] text-center">{review.reviewerName}</TableCell>
                    <TableCell className="w-[200px] text-center">{review.starCount}</TableCell>
                    <TableCell className="w-[200px] text-center">{review.review}</TableCell>
                </TableRow>
                )})}
            </TableBody>
        </Table>
    </div>
    )
  }

  else if(reviews && reviews.type == 'empty') {
    return (
      <div className="inline mx-auto text-center my-16 p-2 rounded-lg w-full">
        <h1 className="text-lg mx-auto text-center">You Haven't got any reviews yet</h1>
      </div>
    )
  }
  else {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoading />
      </div>
    )
  }

}
  