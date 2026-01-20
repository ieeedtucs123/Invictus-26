import React from 'react'

export default function landingFigure({ className, style }) {
  return (
        <div
      style={style}
      className={`
        pointer-events-none z-10
        transition-all duration-700 ease-in-out
        ${className}
      `}
    >
      <img
        src="/figure.png"
        alt="Lotus"
        className="w-full h-full object-contain drop-shadow-md"
      />
    </div>
  )
}
