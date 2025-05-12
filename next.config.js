/**
 * @type {import('next').NextConfig}
 */

// Konfiguriere Next.js
const nextConfig = {
  // Hier deine bestehende Konfiguration
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  
  // Füge die webpack Konfiguration hinzu für WebSocket 
  webpack: (config, { dev, isServer }) => {
    // Nur in der Entwicklungsumgebung und für Client-Seite anwenden
    if (dev && !isServer) {
      // Konfiguriere den WebSocket-Server für HMR
      config.devServer = {
        // Expliziter Port für WebSocket
        port: 3001,
        // Andere WebSocket-Optionen
        hot: true
      };
    }
    
    // Gib die erweiterte Konfiguration zurück
    return config;
  }
};

// Exportiere die Konfiguration
module.exports = nextConfig;