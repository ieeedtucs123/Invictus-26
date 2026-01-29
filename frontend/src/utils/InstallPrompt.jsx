'use client'

import { useState, useEffect } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // 1. Check iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    setIsIOS(isIosDevice)

    // 2. Check if prompt was dismissed within last 1 day
    const lastDismissed = localStorage.getItem('installPromptDismissed')
    if (lastDismissed) {
      const daysPassed = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60 * 24)
      
      // 👇 CHANGED FROM 2 TO 1 HERE
      if (daysPassed < 1) {
        setIsDismissed(true)
        return
      }
    }

    // 3. Capture install event
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      // Optional: Dismiss it permanently if they installed
      setIsDismissed(true) 
    }
  }

  const handleClose = () => {
    setIsDismissed(true)
    localStorage.setItem('installPromptDismissed', Date.now().toString())
  }

  if (isDismissed) return null
  if (!deferredPrompt && !isIOS) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] 
                    w-[calc(100%-32px)] max-w-[380px]
                    bg-[#050505]/95 backdrop-blur-md 
                    border border-[#D4AF37]/30 rounded-2xl 
                    shadow-[0_8px_32px_rgba(0,0,0,0.4)] 
                    flex flex-col p-4 px-5 
                    animate-in fade-in slide-in-from-bottom-4 duration-500
                    invictus-text">
      
      {/* Close Button */}
      <button 
        onClick={handleClose} 
        className="absolute top-3 right-3 p-1 text-neutral-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer flex items-center justify-center"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Content */}
      <div className="flex items-center justify-between gap-4 pr-3">
        <div className="flex-1 text-left">
          <p className="m-0 mb-1 text-sm font-bold text-white uppercase tracking-wide">
            Install App
          </p>
          <p className="m-0 text-[13px] text-gray-400 leading-snug">
            {isIOS 
              ? "Tap 'Share' then 'Add to Home Screen' for the best experience."
              : "Install INVICTUS for a better experience."}
          </p>
        </div>

        {!isIOS && (
          <button 
            onClick={handleInstallClick} 
            className="bg-[#f1f0ee] text-black border-none px-4 py-2 rounded-full 
                       font-semibold text-[13px] whitespace-nowrap cursor-pointer 
                       shadow-[0_2px_8px_rgba(212,175,55,0.2)] 
                       hover:scale-105 active:scale-95 transition-transform"
          >
            Install
          </button>
        )}
      </div>
    </div>
  )
}