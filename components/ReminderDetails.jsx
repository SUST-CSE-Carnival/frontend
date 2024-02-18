import React, { useState } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'

export default function ReminderDetails({ reminder }) {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const reminderDays = reminder.days.split(",")
  const [reminderTime, setReminderTime] = useState(reminder.time) 
  const [description, setDescription] = useState(reminder.description)
  const [selectedDays, setSelectedDays] = useState([])

  function convertTo12HourFormat(time24) {
    const [hour, minute] = time24.split(":").map(Number);
    const period = hour < 12 ? "AM" : "PM";
    const hour12 = hour % 12 || 12
    const time12 = `${hour12}:${minute} ${period}`;
    return time12;
  }  

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  function handleDelete() {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/reminder/delete/${reminder.id}`, {
        method: 'DELETE',
        headers : {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken }
    })
        .then((res) => res.json())
        .then((data) => {
            setTimeout(() => {
                window.location.reload();
            }, 600)
        })
  }


  return (
    <div key={reminder.id} className="my-4 cursor-pointer">
      <div className="relative w-64 h-64 rounded-md overflow-hidden">
        <Image src={`/medication${randomNumber}.jpg`} layout="fill" objectFit="cover" alt="Image" />
      </div>
      <div className="flex flex-col justify-between p-2">
        <h3 className="font-bold">{reminder.description}</h3>
       <div className="flex space-x-1 items-center">
        <p className='my-2 font-semibold'>{convertTo12HourFormat(reminder.time)}</p>
       </div>
      </div>
      <div className='flex max-w-[90%] flex-wrap items-start min-h-[50px]'>
        {reminderDays.map((day, index) => <p key={index} className="px-2 text-md">{days[day]},</p>)}
      </div>
      <div className="px-2 flex items-center space-x-6 my-4">
        <Dialog>
            <DialogTrigger>
                <Button className="bg-[#c71717] hover:bg-[#c71717] rounded-lg">Delete</Button>
            </DialogTrigger>
            <DialogContent className="p-12 max-w-2xl bg-white">
                <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Are You Sure You Want To
                    Stop This Reminder?</DialogHeader>
                   
                   <Button onClick={handleDelete} className="flex justify-center rounded-lg w-[150px] bg-[#ac1e1e] hover:bg-[#ac1e1e] mx-auto">Yes</Button>
            </DialogContent>
        </Dialog>
      </div>
      
    </div>
  )
}
