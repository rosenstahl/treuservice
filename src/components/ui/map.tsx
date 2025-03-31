// src/components/ui/map.tsx
"use client"

import { useEffect, useRef } from 'react'

interface MapProps {
  address: string;
  zoom?: number;
  height?: string;
}

export function GoogleMap({ zoom = 15, height = "400px" }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Google Maps script laden
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          zoom: zoom,
          center: { lat: 51.5135872, lng: 7.4470421 }, // Koordinaten für Rheinische Str. 220
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#242f3e" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }]
            }
          ]
        })

        const marker = new google.maps.Marker({
          map: map,
          position: { lat: 51.5135872, lng: 7.4470421 },
          title: 'TREU Service GmbH'
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <strong>TREU Service GmbH</strong><br>
              Rheinische Straße 220<br>
              44147 Dortmund
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
      }
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [zoom])

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: height,
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }} 
    />
  )
}