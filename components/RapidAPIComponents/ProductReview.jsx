import { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { stringify } from 'postcss'

export default function ProductReview() {
    const url = 'https://real-time-product-search.p.rapidapi.com'
    const [data, setData] = useState(null)

    useEffect(() => {
        // there is also : 
        fetch(`${url}/search?q=Adidas&country=BD&language=en`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'd1be66f88emsh0f94820bd9e70f1p12ab1bjsnc657e4841b5e',
                    'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
                }
            }).then(response => response.json())
              .then(data => {
                setData(data)
                console.log(data) })
        }, [])   
  return (
    <div>
      {data?.data.map(data => (
            <div>
                <h1>{data.product_title}</h1>
                <h3>{data.offer.store_name}</h3>
                <h3>{data.offer.price}</h3>
            </div>
        )
      )}
    </div>
  )
}
