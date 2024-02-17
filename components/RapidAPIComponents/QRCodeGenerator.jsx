import { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { stringify } from 'postcss'

export default function QRCodeGenerator() {
    const url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example'
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`${url}`, {
                method: 'GET',

            }).then(response => console.log(response))
        }, [])   
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}
