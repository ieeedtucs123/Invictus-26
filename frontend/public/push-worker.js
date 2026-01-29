self.addEventListener('push', function (event) {
  var data = {}
  try {
    data = event.data.json()
  } catch (e) {
    data = { title: 'INVICTUS', message: 'New update available!', url: '/' }
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'INVICTUS', {
      body: data.message || '',
      icon: '/pwa-512x512.png',
      badge: '/invictuslogo.svg',
      data: { url: data.url || '/' }
    })
  )
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(
    self.clients.openWindow(event.notification.data.url || '/')
  )
})