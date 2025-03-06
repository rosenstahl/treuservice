 "use client";

import dynamic from 'next/dynamic';

// Importiere die aktuelle WeatherWidget ohne deren Export zu verwenden
import { WeatherWidget as OriginalWeatherWidget } from './WeatherWidget';

// Exportiere einen dynamischen Import der verhindert, dass diese Komponente serverseitig gerendert wird
export const ClientWeatherWidget = dynamic(
  () => Promise.resolve({default: OriginalWeatherWidget}),
  { ssr: false }
);