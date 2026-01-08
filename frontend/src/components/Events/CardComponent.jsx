'use client'
import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

// --- 1. Single Card Component (Visuals from your snippet) ---
const EventCard = ({ title, isActive }) => {
  return (
    <div 
      className={`
        relative bg-white transition-all duration-500 ease-in-out
        /* Specific dimensions */
        w-[279px] h-[377px]
        /* The Card Styling: Double Gold Border */
        rounded-2xl
        border-4 border-[#C5A059] 
        flex flex-col items-center justify-between p-4
        /* Exact Shadow settings: X:6 Y:10 Blur:4 Color:25% */
        shadow-[6px_10px_4px_rgba(0,0,0,0.25)]
        
        /* The Scaling Effect Logic */
        ${isActive 
          ? 'scale-100 md:scale-110 z-20 opacity-100' 
          : 'scale-90 z-10 opacity-100 '
        }
      `}
    >
      {/* Decorative Inner Border Line */}
      <div className="absolute inset-2 border-2 border-[#C5A059]/50 rounded-xl pointer-events-none" />

      {/* Header */}
      <div className="z-10 mt-4 text-center">
        <h3 className="text-[#C5A059] font-bold text-2xl uppercase tracking-widest font-serif">
          {title || 'EVENT NAME'}
        </h3>
      </div>

      {/* Image Placeholder Area */}
      <div className="z-10 w-full flex-1 my-4 border-2 border-[#C5A059]/30 bg-[#FFF8E7] rounded-lg flex items-center justify-center p-4 relative overflow-hidden group">
        <div className="text-center">
             {/* Abstract Placeholder Icon */}
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 mx-auto mb-2 flex items-center justify-center">
                <span className="text-[#C5A059] text-xl">📷</span>
            </div>
          <p className="text-[#C5A059] text-[10px] font-bold tracking-widest leading-relaxed">
            EVENT PHOTO<br/>THEME BACKGROUND
          </p>
        </div>
      </div>

      {/* Button: Gradient Style */}
      <button className="z-10 w-[90%] py-3 mb-2 bg-gradient-to-r from-[#FAEAB1] to-[#C5A059] text-white font-bold rounded-full shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5 uppercase tracking-widest text-sm border border-[#C5A059]">
        <span className="drop-shadow-sm text-white">Register Now</span>
      </button>
    </div>
  )
}

// --- 2. Main Component (Shadcn Logic) ---
export default function CardComponent() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)

  const events = [
    { id: 1, title: 'WEDDING' },
    { id: 2, title: 'MUSIC FEST' },
    { id: 3, title: 'TECH TALK' },
    { id: 4, title: 'ART GALA' },
    { id: 5, title: 'BIRTHDAY' },
  ]

  // Update the "Active" index whenever the carousel scrolls
  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full py-20  flex justify-center min-h-[600px] overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center", // This centers the active card
          loop: true,
        }}
        className="w-full max-w-5xl"
      >
        <CarouselContent className="-ml-4 items-center pt-10 pb-10">
          {events.map((ev, index) => (
            <CarouselItem 
              key={ev.id} 
              // Basis sets how much width each item takes. 
              // 1/3 allows seeing the side cards clearly.
              className="pl-4 basis-[85%] md:basis-1/3 flex justify-center transition-all duration-300"
            >
              <EventCard 
                title={ev.title} 
                isActive={index === current} 
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Styling */}
       <CarouselPrevious 
          className="absolute
    left-2 md:-left-12
    top-1/2 -translate-y-1/2
    z-30
    h-10 w-10
    rounded-full
    border-2 border-[#C5A059]
    bg-white
    text-[#C5A059]
    shadow-md
    hover:bg-[#C5A059]
    hover:text-white
    transition" 
        />
        <CarouselNext 
          className=" absolute
    right-2 md:-right-12
    top-1/2 -translate-y-1/2
    z-30
    h-10 w-10
    rounded-full
    border-2 border-[#C5A059]
    bg-white
    text-[#C5A059]
    shadow-md
    hover:bg-[#C5A059]
    hover:text-white
    transition" 
        />
      </Carousel>
    </div>
  )
}