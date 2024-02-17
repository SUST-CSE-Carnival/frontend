"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import ReminderDetails from './ReminderDetails'

export default function MedicationInput() {
  const [description, setDescription] = useState("")
  const [reminderTime, setReminderTime] = useState("")
  const [selectedDays, setSelectedDays] = useState([])
  const [allReminders, setAllReminders] = useState(null)

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  function handleSubmit() {
    
    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const data = {
        description,
        time : reminderTime,
        days : selectedDays.join(',')
    }
    console.log(data)
    setDescription("")
    setReminderTime("")
    setSelectedDays([])

    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    fetch(`${endpoint}/add/medicine/reminder`, {
        method: 'POST',
        headers : {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken },
        body : JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
            setTimeout(() => {
                window.location.reload();
            }, 600)
        })
  }

    useEffect(() => {
        let token = localStorage.getItem("token")
        token = JSON.parse(token)
        const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
        fetch(`${endpoint}/medicine/reminder/all`, {
        method: 'GET',
        headers : {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken }
        })
        .then((res) => res.json())
        .then((data) => {
            setAllReminders(data)
            console.log(data)
        })
    }, [])

  return (
    <>
    <div className='flex justify-center px-4 py-3'>
        <Dialog>
            <DialogTrigger>
                <h1 className="bg-[#3aa2d3] px-4 py-3 text-2xl text-white rounded-xl">Add A New Medication Schedule</h1>
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
                        <input className='w-5 h-5' type="checkbox" name="Thursday" value="4" onChange={handleCheckboxChange} />
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
                   <Button onClick={handleSubmit} className="flex justify-center rounded-lg mt-16 mx-auto">Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {
            allReminders?.type != 'empty' && allReminders?.map(reminder => <ReminderDetails reminder={reminder}/>)
        }
    </div>  
    </>
  )
}
