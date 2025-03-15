import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { GoogleMap, DrawingManager } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleMaps } from '../utils/GoogleMapsProvider';

// Optimierte Kartengröße für bessere Darstellung
const mapContainerStyle = {
  width: '100%',
  height: '60vh',
  maxHeight: '600px',
};

// Moderne Kartenoptionen
const mapOptions = {
  mapTypeId: 'satellite',
  tilt: 0,
  disableDefaultUI: true,
  mapTypeControl: true,
  mapTypeControlOptions: {
    style: 1,
    position: 1,
  },
  zoomControl: true,
  zoomControlOptions: {
    position: 9 // RIGHT_CENTER
  },
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 3 // TOP_RIGHT
  },
  streetViewControl: false,
  rotateControl: false,
};

// Zeichnungsoptionen mit TREU-Akzentfarbe
const drawingOptions = {
  drawingControl: false,
  polygonOptions: {
    fillColor: '#009FD8', // TREU Akzentfarbe
    fillOpacity: 0.25,
    strokeColor: '#009FD8',
    strokeWeight: 2,
    editable: true,
    draggable: true,
  },
};

type AreaDrawingMapProps = {
  initialCoordinates?: Array<[number, number]>;
  onAreaChange: (data: { area: number; coordinates: Array<[number, number]> }) => void;
};

type Polygon = {
  polygon: google.maps.Polygon;
  area: number;
  coordinates: Array<[number, number]>;
};

// Hilfsfunktion zur Flächenberechnung, nur verwendet wenn die API geladen ist
const calculateArea = (path: google.maps.MVCArray<google.maps.LatLng>): number => {
  return google.maps.geometry.spherical.computeArea(path);
};

export default function AreaDrawingMap({ initialCoordinates, onAreaChange }: AreaDrawingMapProps) {
  // Verwende den gemeinsamen Google Maps Context
  const { isLoaded, loadError } = useGoogleMaps();

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [totalArea, setTotalArea] = useState<number>(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  // Kartenzentrum mit useMemo berechnen, um unnötige Re-Renders zu vermeiden
  const mapCenter = useMemo(() => {
    if (initialCoordinates && initialCoordinates.length > 0) {
      const [lat, lng] = initialCoordinates[0];
      return { lat, lng };
    }
    return { lat: 51.1657, lng: 10.4515 }; // Deutschland-Zentrum als Fallback
  }, [initialCoordinates]);
  
  const mapRef = useRef<google.maps.Map>();
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  
  // Vermeidung von unnötigen Updates durch Verwendung einer Ref
  const lastAreaUpdateRef = useRef<string>('');

  // Berechnung der Gesamtfläche aller Polygone - optimiert, um unnötige Updates zu vermeiden
  useEffect(() => {
    // Berechne die Summe der Flächen
    const sum = polygons.reduce((acc, curr) => acc + curr.area, 0);
    
    // Aktualisiere den internen State
    setTotalArea(sum);
    
    // Bestimme die aktuellen Koordinaten
    const currentCoordinates = polygons.length > 0 
      ? polygons.flatMap(p => p.coordinates)
      : initialCoordinates || [[mapCenter.lat, mapCenter.lng]];
    
    // Erstelle einen Vergleichsstring
    const updateKey = `${sum}-${JSON.stringify(currentCoordinates)}`;
    
    // Prüfe, ob sich etwas geändert hat
    if (updateKey !== lastAreaUpdateRef.current) {
      lastAreaUpdateRef.current = updateKey;
      
      // Aktualisiere die übergeordnete Komponente nur bei tatsächlichen Änderungen
      onAreaChange({
        area: sum,
        coordinates: currentCoordinates
      });
    }
  }, [polygons, initialCoordinates, mapCenter, onAreaChange]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    
    if (initialCoordinates && initialCoordinates.length > 0) {
      const [lat, lng] = initialCoordinates[0];
      map.setCenter({ lat, lng });
      // Höherer Zoom für bessere Sichtbarkeit
      map.setZoom(19);
    }
  }, [initialCoordinates]);
  
  // Zeichenmodus umschalten
  const toggleDrawingMode = useCallback(() => {
    if (drawingManagerRef.current) {
      if (isDrawingMode) {
        drawingManagerRef.current.setDrawingMode(null);
      } else {
        drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
      }
      setIsDrawingMode(!isDrawingMode);
    }
  }, [isDrawingMode]);

  const onDrawingManagerLoad = useCallback((drawingManager: google.maps.drawing.DrawingManager) => {
    drawingManagerRef.current = drawingManager;
  }, []);

  // Polygon-Erstellung optimiert
  const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    // Berechne Fläche und Koordinaten des neuen Polygons
    const path = polygon.getPath();
    const areaInSqMeters = calculateArea(path);
    
    const coordinates: Array<[number, number]> = [];
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coordinates.push([point.lat(), point.lng()]);
    }
    
    // Füge das neue Polygon zum Array hinzu
    setPolygons(prev => [...prev, {
      polygon,
      area: Math.round(areaInSqMeters),
      coordinates
    }]);
    
    // Event-Listener für Änderungen am Polygon mit angemessener Drosselung
    let updateTimeout: NodeJS.Timeout;
    google.maps.event.addListener(polygon, 'paths_changed', () => {
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        const updatedPath = polygon.getPath();
        const updatedArea = calculateArea(updatedPath);
        
        const updatedCoordinates: Array<[number, number]> = [];
        for (let i = 0; i < updatedPath.getLength(); i++) {
          const point = updatedPath.getAt(i);
          updatedCoordinates.push([point.lat(), point.lng()]);
        }
        
        setPolygons(prevPolygons => 
          prevPolygons.map(p => 
            p.polygon === polygon 
              ? {
                  polygon,
                  area: Math.round(updatedArea),
                  coordinates: updatedCoordinates
                } 
              : p
          )
        );
      }, 100); // Kleine Verzögerung zur Vermeidung zu häufiger Updates
    });
    
    setShowInstructions(false);
    setIsDrawingMode(false);
    
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(null);
    }
  }, []);

  const removeLastPolygon = useCallback(() => {
    if (polygons.length > 0) {
      const lastPolygon = polygons[polygons.length - 1];
      lastPolygon.polygon.setMap(null); // Entferne das Polygon von der Karte
      setPolygons(prev => prev.slice(0, -1)); // Entferne das letzte Element aus dem Array
    }
  }, [polygons]);

  const closeInstructions = useCallback(() => {
    setShowInstructions(false);
  }, []);

  if (loadError) return (
    <motion.div 
      className="p-4 bg-red-50 text-red-700 rounded-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      Fehler beim Laden der Karte. Bitte laden Sie die Seite neu.
    </motion.div>
  );
  
  if (!isLoaded) return (
    <motion.div 
      className="h-60 bg-gray-100 rounded-lg flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="animate-pulse">Karte wird geladen...</span>
    </motion.div>
  );

  // Prüfe, ob Koordinaten vorhanden sind
  if (!initialCoordinates || initialCoordinates.length === 0) {
    return (
      <div className="h-60 bg-gray-100 rounded-lg flex items-center justify-center flex-col p-8">
        <p className="text-red-600 font-medium mb-2">Keine gültige Adresse gefunden</p>
        <p className="text-gray-600 text-center">Bitte gehen Sie zurück und geben Sie eine vollständige Adresse mit Hausnummer ein.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 relative">
      <motion.div 
        className="rounded-lg overflow-hidden shadow-sm border border-gray-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={19}
          center={mapCenter}
          onLoad={onMapLoad}
          options={mapOptions}
        >
          <DrawingManager
            onLoad={onDrawingManagerLoad}
            options={drawingOptions}
            onPolygonComplete={onPolygonComplete}
          />
          
          {/* Berechnete Fläche - modernisiert */}
          <motion.div 
            className="absolute bottom-4 left-4 z-10 bg-white px-4 py-2 rounded-md shadow-md flex items-center border border-gray-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div>
              <p className="text-xs text-gray-500">Berechnete Fläche</p>
              <motion.p 
                className="font-medium text-lg"
                key={totalArea}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {totalArea} m²
              </motion.p>
            </div>
          </motion.div>

          {/* Pop-up mit Anleitung direkt auf der Karte */}
          <AnimatePresence>
            {showInstructions && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
                <motion.div 
                  className="bg-white p-5 rounded-lg shadow-md max-w-md m-4 border border-gray-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-gray-800">Fläche einzeichnen</h3>
                    <button 
                      onClick={closeInstructions}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs">1</span>
                      Klicken Sie auf &quot;Zeichnen starten&quot; um den Zeichenmodus zu aktivieren.
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs">2</span>
                      Klicken Sie auf die Karte, um Eckpunkte Ihrer zu räumenden Fläche zu setzen.
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs">3</span>
                      Schließen Sie das Polygon, indem Sie wieder auf den ersten Punkt klicken.
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs">4</span>
                      Sie können mehrere Flächen zeichnen und bereits gezeichnete Flächen bearbeiten.
                    </motion.li>
                  </ul>
                  <motion.button 
                    onClick={closeInstructions}
                    className="mt-4 w-full py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-all duration-200 text-sm font-medium transform hover:scale-105"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Verstanden
                  </motion.button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </GoogleMap>
      </motion.div>
      
      <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
        {/* Linke Seite - Info-Button */}
        <motion.button 
          onClick={() => setShowInstructions(true)} 
          className="flex items-center text-accent hover:text-accent-dark transition-all text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Hilfe zur Flächenmarkierung
        </motion.button>

        {/* Rechte Seite - Fläche hinzufügen/entfernen Buttons */}
        <div className="flex space-x-2">
          <motion.button 
            onClick={toggleDrawingMode}
            className={`flex items-center py-2 px-3 text-sm rounded-md ${
              isDrawingMode 
                ? 'bg-accent/10 text-accent border border-accent/20' 
                : 'bg-accent text-white hover:bg-accent-dark'
            } transition-all duration-200`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {isDrawingMode ? 'Zeichnung aktiv' : 'Zeichnen starten'}
          </motion.button>
          <motion.button 
            onClick={removeLastPolygon}
            disabled={polygons.length === 0}
            className={`flex items-center py-2 px-3 text-sm rounded-md ${
              polygons.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
            } transition-all duration-200`}
            whileHover={polygons.length > 0 ? { scale: 1.05 } : {}}
            whileTap={polygons.length > 0 ? { scale: 0.95 } : {}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Letzte Fläche löschen
          </motion.button>
        </div>
      </div>
    </div>
  );
}