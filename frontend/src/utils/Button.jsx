import { useState } from 'react'
import { subscribeToPush } from '@/utils/pushSubscribe'

export default function NotifyButton() {
  const [loading, setLoading] = useState(false)

  const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY
  const BACKEND_URL = process.env.NEXT_PUBLIC_IEEE_BACKEND_URL

  const handleClick = async () => {
    try {
      setLoading(true)

      const status = await subscribeToPush({
        publicVapidKey: PUBLIC_VAPID_KEY,
        backendUrl: BACKEND_URL,
      })

      if (status === 201) {
        alert('Subscribed to Invictus updates 🔔')
      } else if (status === 400) {
        alert('Already subscribed')
        localStorage.setItem("notification-subscribed", true)
      }
    } catch (err) {
      console.error(err)
      alert(err.message || 'Subscription failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || localStorage.getItem("notification-subscribed")}
      className="px-4 py-2 rounded-md invictus-text uppercase tracking-widest font-[800] bg-[#ffffff] border-2 border-[#b19965]
                transition hover:bg-[#745a309b] hover:text-black active:scale-95 "
    >
      {loading ? 'Enabling...' : 'Get Notified'}
    </button>
  )
}
