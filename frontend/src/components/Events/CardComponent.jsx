'use client'
import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Events/ui/carousel' 

// --- 1. Event Card Sub-Component ---
const EventCard = ({ title, isActive, isLive }) => {
  return (
    <div
      className={`
        relative bg-white transition-all duration-500 ease-in-out
        w-[279px] h-[377px]
        rounded-2xl
        border-4 border-[#C5A059]
        flex flex-col items-center p-4
        shadow-[6px_10px_4px_rgba(0,0,0,0.25)]
        ${isActive ? 'scale-100 md:scale-110 z-20' : 'scale-90 z-10'}
      `}
    >
      {/* Inner Decorative Border */}
      <div className="absolute inset-2 border-2 border-[#C5A059]/50 rounded-xl pointer-events-none" />

      {/* Header */}
      <div className="z-10 mt-4 text-center">
        <h3 className="text-[#C5A059] font-bold text-2xl uppercase tracking-widest font-serif">
          {title || 'EVENT NAME'}
        </h3>
      </div>

      {/* Image Area */}
      <div className="z-10 w-full flex-1 my-3 border-2 border-[#C5A059]/30 bg-[#FFF8E7] rounded-lg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 mx-auto mb-2 flex items-center justify-center">
            <span className="text-[#C5A059] text-xl">📷</span>
          </div>
          <p className="text-[#C5A059] text-[10px] font-bold tracking-widest leading-relaxed">
            EVENT PHOTO<br />THEME BACKGROUND
          </p>
        </div>
      </div>

      {/* Lotus only when active */}
      {isActive && (
        <div className="flex justify-center items-center">
          <img
            src="/lotus.svg"
            alt="Lotus Decoration"
            className="w-14 h-10 sm:w-16 sm:h-10 md:w-18 md:h-12 drop-shadow-md"
          />
        </div>
      )}

      {/* Button */}
      <button className="z-10 w-[90%] py-3 mb-2 bg-gradient-to-r from-[#FAEAB1] to-[#C5A059] text-white font-bold rounded-full shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5 uppercase tracking-widest text-sm border border-[#C5A059]">
        Register Now
      </button>
    </div>
  )
}

// --- 2. Main Component ---
export default function CardComponent() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // FETCH FROM BACKEND / JSON
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/EventsData.json')
        const data = await response.json()
        setEvents(data || [])
      } catch (error) {
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Carousel active index
  useEffect(() => {
    if (!api) return
    const update = () => {
      setCurrent(api.selectedScrollSnap())
    }
    api.on('select', update)
    update()
  }, [api])

  // ================== RENDER ==================

  // 1️⃣ Loading
  if (isLoading) {
    return (
      <div className="w-full py-20 flex justify-center items-center min-h-[400px]">
        <p className="text-[#C5A059] font-bold animate-pulse tracking-widest">
          LOADING EVENTS...
        </p>
      </div>
    )
  }

  // 2️⃣ Backend returned empty array → Coming Soon
  if (events.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4 p-8 border-4 border-[#C5A059] rounded-2xl bg-[#FFF8E7] shadow-xl">
          <h2 className="text-[#C5A059] text-4xl md:text-7xl font-bold font-serif tracking-widest">
            COMING SOON
          </h2>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
          <p className="text-[#7A6C45] font-bold uppercase tracking-widest mt-4">
            Stay tuned for amazing events
          </p>
        </div>
      </div>
    )
  }

  // 3️⃣ Data exists → Show carousel
  return (
    <div className="w-full py-20 flex justify-center min-h-[600px] overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{ align: 'center', loop: true }}
        className="w-full max-w-5xl"
      >
        <CarouselContent className="-ml-4 items-center pt-10 pb-10">
          {events.map((ev, index) => (
            <CarouselItem
              key={ev.id || index}
              className="pl-4 basis-[85%] md:basis-1/3 flex justify-center"
            >
              <EventCard
                title={ev.title}
                isActive={index === current}
                isLive={ev.live}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-30
          h-10 w-10 rounded-full border-2 border-[#C5A059] bg-white text-[#C5A059]
          shadow-md hover:bg-[#C5A059] hover:text-white transition"
        />
        <CarouselNext
          className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-30
          h-10 w-10 rounded-full border-2 border-[#C5A059] bg-white text-[#C5A059]
          shadow-md hover:bg-[#C5A059] hover:text-white transition"
        />
      </Carousel>
    </div>
  )
}
