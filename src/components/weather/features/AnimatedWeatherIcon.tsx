"use client"

import React from 'react';
import Image from 'next/image';

// Unterstützte Größen
type IconSize = 'sm' | 'md' | 'lg' | 'xl' | number;

interface AnimatedWeatherIconProps {
  iconName: string | null;
  size?: IconSize;
  className?: string;
  color?: string;
  isHeader?: boolean; // Neue Prop für Header-Icons mit x.-Präfix
}

/**
 * Komponente zur Anzeige von Wetter-Icons
 * Verwendet direkt die Icon-Namen aus der Brightsky API
 * Mit isHeader=true werden alternative Icons mit "x."-Präfix verwendet
 */
export const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({ 
  iconName,
  size = 'md', 
  className = '',
  color,
  isHeader = false
}) => {
  // Größen konvertieren für einheitliche Darstellung
  const getPixelSize = (size: IconSize): number => {
    if (typeof size === 'number') return size;
    
    switch (size) {
      case 'sm': return 40;
      case 'md': return 80;
      case 'lg': return 120;
      case 'xl': return 160;
      default: return 80;
    }
  };
  
  // Fallback für den Fall, dass iconName nicht vorhanden ist
  const effectiveIconName = iconName || 'cloudy';
  
  // Pixelgröße berechnen
  const pixelSize = getPixelSize(size);
  
  // Pfad zum Icon - für Header-Icons das "x." Präfix hinzufügen
  const iconPath = `/images/weather-icons/${isHeader ? 'x.' : ''}${effectiveIconName}.svg`;
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
    >
      <Image
        src={iconPath}
        alt={`Wetter: ${effectiveIconName}`}
        width={pixelSize}
        height={pixelSize}
        className="object-contain"
        style={color ? { filter: `drop-shadow(0 0 1px ${color})` } : undefined}
      />
    </div>
  );
};

// Zusätzlicher Default-Export für einfacheres Importieren
export default AnimatedWeatherIcon;