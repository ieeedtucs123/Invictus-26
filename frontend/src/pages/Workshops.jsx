import React from 'react'
import WorkshopComponent from "@/components/Workshops/Workshops"

export default function Workshops({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return (
    <WorkshopComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle}/>
  )
}
