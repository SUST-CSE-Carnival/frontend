import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'

export default function AutoSuggestion() {
    const [data, setData] = useState(null)
    const [allData, setAllData] = useState(null)
    const [searchValue, setSearchValue] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const url = "https:/jsonplaceholder.typicode.com/users"
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
    useEffect(() => {
        fetch(url, options)
        .then(res => res.json())
        .then(data => {
            setData(data)
            setAllData(data)
        })
    }, [])

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
        setData(data.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
        setShowSuggestions(true)
        if (e.target.value.length === 0) {
            setData(allData)
        }
    }

    function handleItemSelect(item) {
      setSearchValue(item.name)
      setShowSuggestions(false)

    }
  return (
    <div className='flex flex-col w-96 mx-auto py-8'>
      <input type="text" placeholder="Search" value={searchValue} onChange={handleSearch} className='px-4 py-3 text-xl rounded-lg focus:outline-none bg-transparent border border-gray-400'/>
      <div className='bg-white rounded-lg my-2'>
          {searchValue.length > 0 && data && showSuggestions && data.map((item, index) => {
              return <p onClick={() => handleItemSelect(item)} key={index} className='p-2 cursor-pointer my-2 bg-gray-100 rounded-lg overflow-auto'>{item.name}</p>
          })}
      </div>
    </div>
  )
}
