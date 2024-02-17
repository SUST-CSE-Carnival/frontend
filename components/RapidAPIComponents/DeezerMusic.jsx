import { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { stringify } from 'postcss'
import Image from 'next/image'
import AudioPlayer from '../AudioPlayer'

export default function DeezerMusic() {
    const url = 'https://deezerdevs-deezer.p.rapidapi.com'
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`${url}/search?q=eminem`, {
                method: 'GET',
                headers: {
                   'X-RapidAPI-Key': 'd1be66f88emsh0f94820bd9e70f1p12ab1bjsnc657e4841b5e',
                   'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                }

            }).then(response => response.json())
            .then(data => {
                setData(data)
                console.log(data)
            })
        }, [])   
  return (
    <div className='grid grid-cols-3 gap-6 m-4'>
      {data?.data.map(data => (
            <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={data.album.cover_big} alt="Image" /></figure>
                <div className="card-body bg-white">
                    <h2 className="card-title">{data.title}</h2>
                    <p>Album : {data.album.title}</p>
                    <div className="card-actions justify-end">
                    <AudioPlayer src={data.preview}/>
                    </div>
                </div>
                </div>
          </div>
        )
      )}
    </div>
  )
}
