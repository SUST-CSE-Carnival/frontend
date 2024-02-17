import { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { stringify } from 'postcss'

export default function TravelPlannerAPI() {
    var currentTimestamp = Math.floor(Date.now() / 1000);
    console.log(currentTimestamp)
    const url = 'https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=40.7128&longitude=74.0060&radius=10&page%5Blimit%5D=10&page%5Boffset%5D=0&categories=SIGHTS,NIGHTLIFE,RESTAURANT,SHOPPING'
    const [data, setData] = useState(null)

    useEffect(() => {
        // there is also : 
        fetch(`${url}`, {
                method: 'GET',
                headers: {
                    'X-TripGo-Key': process.env.NEXT_PUBLIC_TRIPGO_API_KEY,
                }
            }).then(response => response.json())
              .then(data => {
                setData(data)
                console.log(data) })
        }, [])   
  return (
    <div>
        {JSON.stringify(data)}
    </div>
  )
}
