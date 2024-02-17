import React, { useState } from 'react'
import { SketchPicker } from 'react-color'

export default function ColorPicker({ setBGColor }) {
    const [color, setColor] = useState({
        background : '#FFF'
    })
    function handleChange(selectedColor) {
        setColor(prevColor => ({
            ...prevColor,
            background: selectedColor.hex
        }));
        setBGColor(selectedColor.hex)
    }
  return (
    <div>
      <SketchPicker color={color?.background} onChangeComplete={handleChange}/>
    </div>
  )
}
