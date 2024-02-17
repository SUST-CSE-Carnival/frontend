"use client"
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name : '15/02/2024',
    value : 4000,
    pv: 2400,
  },
];

export default function LineChartComponent() {

    const [data, setData] = useState([
      {
        name : '15/02/2024',
        value : 4000,
        pv: 2400,
      },
    ])

    const [amount, setAmount] = useState("") 

    const handleAmount = (e) => {
      setAmount(e.target.value)
      setData( prev => [...prev, {name : '15/02/2024', value : e.target.value, pv: 2400}])  
    }

    return (
      <div className='w-full h-[36rem]'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}
