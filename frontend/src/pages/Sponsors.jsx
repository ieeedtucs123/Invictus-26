import React from 'react'
import SponsorComponent from "@/components/Sponsors/Sponsors"

export default function Sponsors({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return (
    <SponsorComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle}></SponsorComponent>
  )
}
