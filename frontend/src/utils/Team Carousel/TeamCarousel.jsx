import React, { useState } from 'react'
import CarouselCard from './CarouselCard'
import TeamInfo from './TeamInfo.json'    //helper for team details. using dummy data atm
import { ChevronLeft, ChevronRight } from "lucide-react";

const TeamCarousel = () => {
  const [active, setActive] = useState(0)
  const count = TeamInfo.items.length

  const prev = () => { setActive((prev) => (prev === 0 ? count - 1 : prev - 1)) }
  const next = () => { setActive((prev) => (prev === count - 1 ? 0 : prev + 1)) }

  return (
    <div className="relative w-full py-8 lg:py-20 overflow-x-hidden">
      <div className="flex justify-center items-center h-[50vh]">
        <div className="relative max-w-full h-full flex justify-center items-center">

          {TeamInfo && TeamInfo.items.map((item, i) => {

            let offset = i - active

            //wrap around for looping
            if (offset < -count / 2) offset += count
            if (offset > count / 2) offset -= count

            // Minor Optimization: Don't render cards that are too far away
            if (Math.abs(offset) > 3) return null

            const shouldBeFlipped = Math.abs(offset) > 1;

            return (
              <CarouselCard key={i} personInfo={item} offset={offset} isFlipped={shouldBeFlipped}/>
            )
          })}

        </div>
      </div>

      {/* controls */}
      <div className="flex w-full justify-center mt-10">
        <button
          onClick={prev}
          className="
            h-25 w-25 rounded-full cursor-pointer
            transition-all duration-200 ease-out
            hover:scale-105
            hover:drop-shadow-[0_0_2.5rem_rgba(212,175,55,0.95)]
            hover:shadow-[0_0_4.5rem_0.15rem_rgba(212,175,55,0.45)]
            relative overflow-hidden">
          <div className="absolute inset-0 rounded-full bg-[url('/Team/button.webp')] bg-cover bg-center"/>
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]
          opacity-0 transition-opacity duration-200 hover:opacity-90"/>
        </button>

        <button
          onClick={next}
          className="
            h-25 w-25 rounded-full cursor-pointer
            transition-all duration-200 ease-out
            hover:scale-105
            hover:drop-shadow-[0_0_2.5rem_rgba(212,175,55,0.95)]
            hover:shadow-[0_0_4.5rem_0.15rem_rgba(212,175,55,0.45)]
            relative overflow-hidden">
          <div className="absolute inset-0 rounded-full bg-[url('/Team/button.webp')] bg-cover bg-center scale-x-[-1]"/>
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]
          opacity-0 transition-opacity duration-200 hover:opacity-90"/>
        </button>
      </div>
    </div>
  )
}

export default TeamCarousel