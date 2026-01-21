import React from 'react'
import Landing from '@/components/Landing/Landing'
// import TeamComponent from '@/components/Team/Team'
export default function Home({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle, setDisplayNavbar, displayWordArt, setDisplayWordArt}) {
  return (
    <>
    <Landing setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} setDisplayNavbar={setDisplayNavbar} displayWordArt={displayWordArt} setDisplayWordArt={setDisplayWordArt}/>

    {/* just to test redndering of navbar and logo on landing, pls replace with appropriate component */}
    {/* <TeamComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} setDisplayNavbar={setDisplayNavbar} displayWordArt={displayWordArt} setDisplayWordArt={setDisplayWordArt}/> */}
    </>
  )
}