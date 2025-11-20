export default function manifest() {
    return {
        name: 'NIHSS - Region Sjælland',
        short_name: 'NIHSS',
        description: '',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F5F5',
        theme_color: '#333',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}