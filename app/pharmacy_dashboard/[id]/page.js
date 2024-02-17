"use client"
import Stat from '@/components/CustomDaisyUIComponents/Stat'
import BarChartNoPadding from '@/components/charts/BarChartNoPadding'
import React, { useEffect, useState } from 'react'

export default function page() {
  return (
    <div className='min-h-screen overflow-auto'>
      <div className='flex justify-center my-8'>
        <Stat />
      </div>
      <div className='h-[32rem] px-32'>
        <h1 className='text-xl text-center my-4'>Your Incomes</h1>
        <BarChartNoPadding />
      </div>
    </div>
  )
}
