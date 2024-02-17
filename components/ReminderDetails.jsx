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

  function handleUpdate() {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const data = {
        id : reminder.id,
        description,
        time : reminderTime,
        days : selectedDays.join(',')
    }
    console.log(data)
    setDescription("")
    setReminderTime("")
    setSelectedDays([])

    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/update/medicine/reminder`, {
        method: 'POST',
        headers : {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken },
        body : JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        })
  }
  function handleDelete() {
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/delete/medicine/reminder/${reminder.id}`, {
        method: 'DELETE',
        headers : {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken }
    })
        .then((res) => res.json())
        .then((data) => {
            setTimeout(() => {
                window.location.reload();
            }, 1000)
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
                <Button className="bg-[#2991b1] rounded-lg">Update</Button>
            </DialogTrigger>
            <DialogContent className="p-12 max-w-2xl">
                <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Medication Schedule :</DialogHeader>
                   <div>
                    <label className='font-semibold' htmlFor='description'>Medication Description :</label>
                    <textarea name='description' value={description} onChange={e => setDescription(e.target.value)} className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring my-5 text-lg"
                        rows="2" />
                   <div>
                        <label className='font-semibold mr-16' htmlFor='reminder'>Reminder Time :</label>
                        <input className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500' name='reminder' type='time' value={reminderTime} onChange={(e) => setReminderTime(e.target.value)}/>
                   </div>
                    <h1 className='mt-6 mb-3 text-center text-lg font-semibold'>For Which Weekdays Do You Need The Reminder?</h1>
                   <div className='grid grid-cols-4 space-y-5 items-center'>
                    <label className='flex space-x-4 items-center text-lg mt-4'>
                        <input className='w-5 h-5' type="checkbox" name="Sunday" value="0" onChange={handleCheckboxChange} />
                        <span>Sunday</span>
                    </label>
                    <label className='flex space-x-4 items-center text-lg'>
                        <input className='w-5 h-5' type="checkbox" name="Monday" value="1" onChange={handleCheckboxChange} />
                        <span>Monday</span>
                    </label>
                    <label className='flex space-x-4 items-center text-lg'>
                        <input className='w-5 h-5' type="checkbox" name="Tuesday" value="2" onChange={handleCheckboxChange} />
                        <span>Tuesday</span>
                    </label>
                    <label className='flex space-x-4 items-center text-lg'>
                        <input className='w-5 h-5' type="checkbox" name="Wednesday" value="3" onChange={handleCheckboxChange} />
                        <span>Wednesday</span>
                    </label>
                    <label className='flex space-x-4 items-center text-lg'>
                        <input className='w-5 h-5'  type="checkbox" name="Thursday" value="4" onChange={handleCheckboxChange} />
                        <span>Thursday</span>
                    </label>
                    <label className='flex space-x-4 items-center text-lg'>
                        <input className='w-5 h-5' type="checkbox" name="Friday" value="5" onChange={handleCheckboxChange} />
                        <span>Friday</span>
                    </label>
                    <label className='flex space-x-4 items-center text-lg'>
                        <input className='w-5 h-5' type="checkbox" name="Saturday" value="6" onChange={handleCheckboxChange} />
                        <span>Saturday</span>
                    </label>
                    </div>
                   <Button onClick={handleUpdate} className="flex justify-center rounded-lg mt-16 mx-auto">Save</Button>
                </div>
            </DialogContent>
        </Dialog>
        
        <Dialog>
            <DialogTrigger>
                <Button className="bg-[#c71717] rounded-lg">Delete</Button>
            </DialogTrigger>
            <DialogContent className="p-12 max-w-2xl">
                <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Are You Sure You Want To
                    Stop This Reminder?</DialogHeader>
                   
                   <Button onClick={handleDelete} className="flex justify-center rounded-lg w-[150px] bg-[#ac1e1e] mx-auto">Yes</Button>
            </DialogContent>
        </Dialog>
      </div>
      
    </div>
  )
}
