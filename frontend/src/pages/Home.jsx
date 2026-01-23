import React from 'react'
import Landing from '@/components/Landing/Landing'
export default function Home({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return (
    <Landing setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle}/>
  )
}