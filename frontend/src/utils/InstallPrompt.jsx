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

    // 2. Capture install event
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
    }
  }

  const handleClose = () => {
    setIsDismissed(true)
  }

  // Don't show if:
  // 1. Already installed/not ready (deferredPrompt is null) AND not iOS
  // 2. User manually closed it (isDismissed is true)
  if (isDismissed) return null
  if (!deferredPrompt && !isIOS) return null

  return (
    <div style={styles.banner}>
      {/* Close Button */}
      <button onClick={handleClose} style={styles.closeButton} aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div style={styles.content}>
        <div style={styles.textContainer}>
          <p style={styles.title}>Install App</p>
          <p style={styles.description}>
            {isIOS 
              ? "Tap 'Share' then 'Add to Home Screen' for the best experience."
              : "Install INVICTUS for a better experience."}
          </p>
        </div>

        {!isIOS && (
          <button onClick={handleInstallClick} style={styles.installButton}>
            Install
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  banner: {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(5, 5, 5, 0.95)', // Deep black with slight transparency
    backdropFilter: 'blur(10px)',            // Glass effect
    border: '1px solid rgba(212, 175, 55, 0.3)', // Subtle Gold border
    padding: '16px 20px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
    width: 'calc(100% - 32px)', // Responsive width with margins
    maxWidth: '380px',
    display: 'flex',
    flexDirection: 'column',
    animation: 'fadeIn 0.5s ease-out',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'transparent',
    border: 'none',
    color: '#666', // Muted color for the X
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    paddingRight: '12px', // Make room for close button visual balance
  },
  textContainer: {
    flex: 1,
    textAlign: 'left',
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    fontWeight: '700',
    color: '#D4AF37', // Gold title
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  description: {
    margin: 0,
    fontSize: '13px',
    color: '#aaa', // Light gray text
    lineHeight: '1.4',
  },
  installButton: {
    backgroundColor: '#D4AF37',
    color: '#000',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '50px', // Pill shape
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'transform 0.1s',
    boxShadow: '0 2px 8px rgba(212, 175, 55, 0.2)',
  },
}