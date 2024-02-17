"use client"
import Stat from '@/components/CustomDaisyUIComponents/Stat'
import BarChartNoPadding from '@/components/charts/BarChartNoPadding'
import LineChartComponent from '@/components/charts/LineChartComponent'
import PieChartComponent from '@/components/charts/PieChart'
import React, { useState } from 'react'
import PageLoading from '@/components/PageLoading'

export default function page() {
    const [loading, setLoading] = useState(false)

    if (loading) {
        return <PageLoading />
    }
    return (
        <div className='flex flex-col justify-center bg-white'>
            <div className='flex justify-center items-center my-8 px-8 mx-auto w-full'> 
                <Stat />
            </div>
            <div className='w-full h-screen grid grid-cols-3 p-16'>
                <div className='h-[50%]'>
                    <BarChartNoPadding />
                </div>
                <div className='h-[50%]'>
                    <LineChartComponent />
                </div>
                <div className='h-[50%]'>
                    <PieChartComponent />
                </div>
            </div>
        </div>
    )
}
