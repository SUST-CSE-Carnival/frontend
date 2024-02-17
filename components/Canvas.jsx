import UseDraw from '@/hooks/useDraw'
import React from 'react'

export default function Canvas() {
  const setCanvasRef= UseDraw(onDraw)

  function onDraw(context, point, prevPoint) {
    drawLine(prevPoint, point, context, "#000000", 5)
  }

  function drawLine(start, end, context, color, width) {
    start = start ?? end
    context.beginPath()
    context.lineWidth = width 
    context.strokeStyle = color 
    context.moveTo(start.x, start.y)
    context.lineTo(end.x, end.y)
    context.stroke()

    context.fillStyle = color 
    context.beginPath()
    context.arc(start.x, start.y, 2, 0, 2 * Math.PI)
    context.fill() 
  }
  return (
    <div>
      <canvas ref={setCanvasRef} width={750} height={750} 
      className='border border-black rounded-md' />
    </div>
  )
}
