'use client'
import React, { useEffect } from 'react'
import TeamCarousel from '@/utils/Team Carousel/TeamCarousel'
import { motion } from "framer-motion";

export default function TeamComponent({ setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) {

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
      position: "absolute",
      transform: "translate(-50%, -50%)",
    });

    setLotusClass(`absolute
      w-[15vw]
      md:w-[8vw]
      opacity-100
      pointer-events-none
      z-[30]
      transition-all duration-1000 ease-in-out

    `);
  }, [setLotusStyle, setLotusClass]);

  useEffect(() => {
    if (!setFigureClass || !setFigureStyle) return;
  
    setFigureStyle({
      left: "-20px",
      bottom: "0px",
      transform: "translate(10%, 10%)",
    });
  
    setFigureClass(`
      fixed
      w-[100px]
        md:w-[120px]
        lg:w-[175px]
        pointer-events-none
        z-[30]
        opacity-60
      drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
      transition-all duration-700 ease-out
    `);
  }, [setFigureClass, setFigureStyle]);


  return (
    <>
     <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  
  transition={{ duration: 0.8 }}
  className="px-6 mt-22 lg:pt-8 md:pt-4 md:pl-10 text-center md:text-left"
>

        <div className="relative inline-block">
          <motion.span
  initial={{ scale: 0.9 }}
  whileInView={{ scale: 1 }}
  
  transition={{ delay: 0.2, duration: 0.5 }}
  className="invictus-heading mr-2 text-[3.7rem] lg:text-[7rem]"
>
  TEAM
</motion.span>

          <span
            data-lotus-anchor
            className=' 
            absolute
            right-[-4.8rem]    
            top-[30%]
            -translate-y-1/2
            w-1 h-1'
          />
        </div>

       <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}

  transition={{ delay: 0.3, duration: 0.6 }}
  className="invictus-subheading text-[0.8em] md:text-[1.1em]"
>
  The passionate minds and dedicated leaders driving Invictus forward.
</motion.div>

        <span
          data-lotus-anchor-mobile
          className='absolute top-[50%] left-[30%]'
        />

      </motion.div>

     <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
 
  transition={{ delay: 0.4, duration: 0.7 }}
  className="relative w-full flex justify-center items-center overflow-hidden"
>
  <TeamCarousel />
</motion.div>
    </>
  )
}
