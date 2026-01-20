import React from 'react'
import EventComponent from "@/components/Events/Events"

export default function Events({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return (
    <EventComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />
  )
}
