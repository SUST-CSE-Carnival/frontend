import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    date : "2021-01-04",
    value : "2400",
  },
  {
    name: 'Page A',
    date : "2021-01-06",
    value : 3600,
  },
  {
    name: 'Page A',
    date : "2021-01-07",
    value : 1400,
  },
  {
    name: 'Page A',
    date : "2021-01-09",
    value : 4400,
  },
  {
    name: 'Page A',
    date : "2021-01-11",
    value : 2100,
  },
  {
    name: 'Page A',
    date : "2021-01-12",
    value : 400,
  },
];

export default function BarChartNoPadding() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    );
}
