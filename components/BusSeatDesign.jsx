"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function BusSeatDesign() {
  const seats = [
    {id : 1, booked : false, name : 'A1', isClicked : false},
    {id : 2, booked : false, name : 'A2', isClicked : false},
    {id : 3, booked : false, name : 'A3', isClicked : false},
    {id : 4, booked : false, name : 'A4', isClicked : false},
    {id : 5, booked : false, name : 'B1', isClicked : false},
    {id : 6, booked : false, name : 'B2', isClicked : false},
    {id : 7, booked : false, name : 'B3', isClicked : false},
    {id : 8, booked : false, name : 'B4', isClicked : false},
    {id : 9, booked : false, name : 'C1', isClicked : false},
    {id : 10, booked : false, name : 'C2', isClicked : false},
    {id : 11, booked : false, name : 'C3', isClicked : false},
    {id : 12, booked : false, name : 'C4', isClicked : false},
    {id : 13, booked : false, name : 'D1', isClicked : false},
    {id : 14, booked : false, name : 'D2', isClicked : false},
    {id : 15, booked : false, name : 'D3', isClicked : false},
    {id : 16, booked : false, name : 'D4', isClicked : false},
    {id : 17, booked : false, name : 'E1', isClicked : false},
    {id : 18, booked : false, name : 'E2', isClicked : false},
    {id : 19, booked : false, name : 'E3', isClicked : false},
    {id : 20, booked : false, name : 'E4', isClicked : false},
    {id : 21, booked : false, name : 'F1', isClicked : false},
    {id : 22, booked : false, name : 'F2', isClicked : false},
    {id : 23, booked : false, name : 'F3', isClicked : false},
    {id : 24, booked : false, name : 'F4', isClicked : false},
    {id : 25, booked : false, name : 'G1', isClicked : false},
    {id : 26, booked : false, name : 'G2', isClicked : false},
    {id : 27, booked : false, name : 'G3', isClicked : false},
    {id : 28, booked : false, name : 'G4', isClicked : false},
    {id : 29, booked : false, name : 'H1', isClicked : false},
    {id : 30, booked : false, name : 'H2', isClicked : false},
    {id : 31, booked : false, name : 'H3', isClicked : false},
    {id : 32, booked : false, name : 'H4', isClicked : false},
  ]
  const [allSeats, setAllSeats] = useState(seats)
  const [bookedSeats, setBookedSeats] = useState([])

  function handleBusSeatClicked(seat) {
    const newSeat = [...allSeats]
    const index = newSeat.indexOf(seat)
    newSeat[index] = {...seat}
    newSeat[index].isClicked = !newSeat[index].isClicked
    setAllSeats(newSeat)
    if (newSeat[index].isClicked) {
      setBookedSeats([...bookedSeats, newSeat[index]])
    } 
    else {
      const newBookedSeats = bookedSeats.filter(bookedSeat => bookedSeat.id !== newSeat[index].id)
      setBookedSeats(newBookedSeats)
    }
    
  }
  console.log(bookedSeats)
  return (
    <>
    <div className='flex items-center justify-center w-[50%] space-x-4 border border-gray-500 p-4 m-8'>
        <div className='grid grid-cols-4'>
            {allSeats.map(seat => (
            <SeatComponent key = {seat.id} seat = {seat} handleBusSeatClicked={handleBusSeatClicked} />
            ))}
        </div>
    </div>
    
    <div className='flex flex-col w-[50%] items-center justify-center'>
        <h1 className='text-4xl font-bold my-6'>Booked Seats :</h1>
        <ul className='grid grid-cols-2 gap-4'>
            {bookedSeats.map(seat => (
            <li key={seat.id} className='text-xl bg-gray-600 p-4 rounded-lg text-white'>{seat.name}</li>
            ))}
        </ul>
    </div>
    </>
  )
}


function SeatComponent({ seat, handleBusSeatClicked }) {
  return (
    <div className={`flex flex-col items-center w-full space-x-2`}>
        <div className={``}>
            {
            seat.booked ? 
                <Image src='/seat1.png'  width={96} height={96} alt='seat'/> : 
                <Image src={`/seat${seat.isClicked ? "3" : "2"}.png`} width={96} height={96} alt='seat' onClick={() => handleBusSeatClicked(seat)}/>
            }
        </div>
        <h1 className='text-center '>{seat.name}</h1>
    </div>
  )
}