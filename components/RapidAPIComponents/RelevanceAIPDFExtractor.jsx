import { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { stringify } from 'postcss'
import { Josefin_Sans } from 'next/font/google'

export default function RelevanceAPIExtractor() {
    const url = 'https://api-bcbe5a.stack.tryrelevance.com/latest/studios/19317fc8-b671-4cdd-90bf-642e9432c69a/trigger_limited'
    const [data, setData] = useState(null)

    const bodyData = 
        {
            "params": 
                {
                    "file_url": "https://web.stanford.edu/class/cs106ax/res/lectures/16-Dictionaries-In-Python.pdf",
                    "data_points": ["Medicine Name"],
                    "llm_choice": "openai-gpt35-16k"
                },
            "project": "72efca8eb19d-4dd7-a29a-57a7b2104d09"
        }

    useEffect(() => {
        // there is also : 
        fetch(`${url}`, {
                method: 'POST',
                body : bodyData
                    
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
