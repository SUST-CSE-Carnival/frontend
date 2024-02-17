import { set } from 'date-fns'
import React, { useState } from 'react'

export default function Pagination() {
  const [dataRange, setDataRange] = useState([0, 5])
  function handleCarousel(type) {
    if (type === 'next') {
      setDataRange((prev) => [prev[0] + 5, prev[1] + 5]);
    } else {
      setDataRange((prev) => [Math.max(prev[0] - 5, 0), Math.max(prev[1] - 5, 5)]);
    }
  }
  const  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  const filteredData = data.slice(dataRange[0], dataRange[1]);
  return (
    <div>
        {
            
            filteredData.map(data => <h1>{data}</h1>)
            
        }
      <div className="join grid grid-cols-2">
        <button onClick={() => handleCarousel('prev')} className="join-item btn bg-white text-black hover:text-white">Previous page</button>
        <button onClick={() => handleCarousel('next')} className="join-item btn bg-white text-black hover:text-white">Next</button>
      </div>
    </div>
  )
}
