'use client'
import React, { useEffect } from 'react'
import TeamCarousel from '@/utils/Team Carousel/TeamCarousel'

export default function TeamComponent({ setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) {

  /* ---------------- MOVE GLOBAL LOTUS NEXT TO "TEAM" ---------------- */
  useEffect(() => {
    if (!setLotusStyle || !setLotusClass) return;

    const isMobile = window.innerWidth < 768;

    const anchor = document.querySelector(
      isMobile
        ? "[data-lotus-anchor-mobile]"
        : "[data-lotus-anchor]"
    );

    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();

    setLotusStyle({
      left: isMobile
        ? window.innerWidth / 2
        : rect.left + rect.width / 2,

      top: isMobile ? rect.top + 30 : rect.top,

      transform: "translate(-50%, -50%)",
    });

    setLotusClass(`absolute
      w-[90px] md:w-[120px] lg:w-[150px]
      opacity-80
    `);
  }, [setLotusStyle, setLotusClass]);

  useEffect(() => {
    if (!setFigureClass || !setFigureStyle) return;
  
    setFigureStyle({
      left: "0px",
      bottom: "0px",
      transform: "translate(10%, 10%)",
    });
  
    setFigureClass(`
      fixed
      w-[120px]
      md:w-[140px]
      lg:w-[190px]
      pointer-events-none
      z-[30]
      opacity-90
      drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
      transition-all duration-700 ease-out
    `);
  }, [setFigureClass, setFigureStyle]);


  return (
    <>
      {/* ---------------- DECORATIVE BACKGROUND ELEMENTS ---------------- */}

      <img
        src="/Team/feathers.webp"
        alt="Decorative Feathers"
        className="
          fixed z-[10] pointer-events-none
          w-[400px] md:w-[500px] xl:w-[600px]
          bottom-0 right-0
          translate-x-[35%] translate-y-[35%]
          brightness-125 saturate-125
          transition-all duration-500 opacity-100
        "
      />

      <img
        src="/Team/peacock-shadow.webp"
        alt="Peacock Shadow"
        className="
          fixed z-[9] pointer-events-none
          w-[300px] md:w-[400px] xl:w-[550px]
          bottom-0 left-0
          translate-x-[-27%] translate-y-[15%]
          brightness-125 saturate-125
          transition-all duration-500 opacity-100
        "
      />

      {/* ---------------- HEADING SECTION ---------------- */}

      <div className="px-6 mt-22 lg:pt-8 md:pt-4 md:pl-10 text-center md:text-left">

        <div className="relative inline-block">
          <span className="invictus-heading mr-2 text-[3.7rem] lg:text-[7rem]">
            TEAM
          </span>

          {/* LOTUS ANCHOR — exact placement reference */}
          <span
            data-lotus-anchor
            className=" absolute right-[-2.5rem] md:right-[-3.5rem] lg:right-[-4.5rem] top-1/2 -translate-y-1/2 w-0 h-0"
          />
        </div>

        <div className="invictus-subheading text-[0.8em] md:text-[1.1em]">
          The passionate minds and dedicated leaders driving Invictus forward.
        </div>

        {/* LOTUS ANCHOR — mobile between heading & carousel */}
        <span
          data-lotus-anchor-mobile
          className="block w-0 h-0 md:hidden"
        />

      </div>

      {/* ---------------- TEAM CAROUSEL ---------------- */}

      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <TeamCarousel />
      </div>
    </>
  )
}
