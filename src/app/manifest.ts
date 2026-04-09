import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tariff Calculator',
    short_name: 'Tariff',
    description: 'US Import Tax Calculator',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#DC2626',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
