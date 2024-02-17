import React, { useReducer } from 'react'
import { Button } from './ui/button'

function reducer(state, action) {
    switch(action.type) {
        case 'increment' :
            return { count : state.count + 1}
        case 'decrement' :
            return { count : state.count - 1}
        case 'default' :
            return state
    }
}


export default function UseReducer() {
    // dispatch is used to call the reducer function - to update the state
    const [state, dispatch] = useReducer(reducer, { count : 0 })

    function increment() {
        dispatch({ type : 'increment' })
    }

    function decrement() {
        dispatch({ type : 'decrement' })
    }

  return (
    <div className='flex space-x-6 text-2xl p-16 test'>
        <Button className="bg-black p-4 rounded-e-lg hover:bg-black " onClick={decrement}>-</Button>
        <h1>{state.count}</h1>
        <Button className="bg-black p-4 rounded-e-lg hover:bg-black" onClick={increment}>+</Button>
    </div>
  )
}


