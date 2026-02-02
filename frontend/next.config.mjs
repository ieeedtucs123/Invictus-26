/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,

  workboxOptions: {
    // 1. IMPORT PUSH WORKER
    importScripts: ['/push-worker.js'],
    
    // 2. THE FORCE FIX: Manually remove the ghost file from the manifest
    manifestTransforms: [
      async (manifestEntries) => {
        const manifest = manifestEntries.filter((entry) => 
          !entry.url.includes('dynamic-css-manifest.json') &&
          !entry.url.includes('middleware-manifest.json')
        );
        return { manifest, warnings: [] };
      },
    ],
  },

  // 3. Keep buildExcludes as a backup
  buildExcludes: [/middleware-manifest\.json$/, /dynamic-css-manifest\.json$/],

  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        networkTimeoutSeconds: 3,
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 150,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /\.(?:glb|gltf|hdr|bin)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'models-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 90,
        },
      },
    },
    {
      urlPattern: /^https:\/\/(cdn\.jsdelivr\.net|unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'cdn-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
  ],
})

export default withPWA({
  reactCompiler: true,
  reactStrictMode: true,
  // turbopack: {}, // Keep commented out
})