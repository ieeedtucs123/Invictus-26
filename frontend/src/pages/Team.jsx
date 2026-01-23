import React from 'react'
import TeamComponent from "@/components/Team/Team"

export default function Team({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return (
      <TeamComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle}/>
  )
}
