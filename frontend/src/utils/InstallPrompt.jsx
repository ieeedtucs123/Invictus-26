'use client' // Required for Next.js App Router (if used), safe for Pages Router too

import { useState, useEffect } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // 1. Check if user is on iOS (iPhone/iPad) because they don't support the install button
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // 2. Listen for the 'beforeinstallprompt' event (Android/Chrome)
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
      setDeferredPrompt(null) // Hide the button
    }
  }

  // Render nothing if the app is already installed or the prompt isn't ready
  if (!deferredPrompt && !isIOS) return null

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <p style={styles.text}>Install <strong>INVICTUS</strong> for the best experience!</p>
        
        {isIOS ? (
          <p style={styles.iosText}>Tap <strong>Share</strong> and <strong>Add to Home Screen</strong></p>
        ) : (
          <button onClick={handleInstallClick} style={styles.button}>
            Install Now
          </button>
        )}
      </div>
    </div>
  )
}

// Simple inline styles (replace with Tailwind or CSS modules if you prefer)
const styles = {
  banner: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#000000', // Black background
    color: '#D4AF37',           // Gold text
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    zIndex: 9999,
    width: '90%',
    maxWidth: '400px',
    border: '1px solid #D4AF37',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '10px',
  },
  text: {
    margin: 0,
    fontSize: '16px',
  },
  iosText: {
    margin: 0,
    fontSize: '14px',
    opacity: 0.8,
  },
  button: {
    backgroundColor: '#D4AF37', // Gold button
    color: '#000000',           // Black text
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
  }
}