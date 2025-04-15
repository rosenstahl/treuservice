import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, DrawingManager } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Info, Plus, Trash2 } from 'lucide-react';

// Steve Jobs & Elon Musk Ansatz: Radikal vereinfachen und klar trennen
// 1. Genau definierte Typen
// 2. Klare Modi - Normaler Modus vs. Zeichenmodus
// 3. Genaue Kontrolle über Map-Interaktionen

type Libraries = ('drawing' | 'geometry' | 'places')[];
const libraries: Libraries = ['drawing', 'geometry'];

// Kartenoptionen - separat für den normalen und den Zeichenmodus
const NORMAL_MAP_OPTIONS = {
  mapTypeId: 'satellite',
  tilt: 0,
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
  mapTypeControl: true,
  mapTypeControlOptions: {
    style: 1,
    position: 1,
  },
  draggable: true,
  scrollwheel: true,
  clickableIcons: false,
  disableDoubleClickZoom: false,
};

// Zeichenoptionen mit konsistenter Darstellung
const DRAWING_OPTIONS = {
  drawingControl: false,
  polygonOptions: {
    fillColor: '#0284c7',
    fillOpacity: 0.2,
    strokeColor: '#0284c7',
    strokeWeight: 2,
    editable: true,
    draggable: false, // Verhindert unbeabsichtigte Verschiebungen
    clickable: false   // Wichtig: Verhindert, dass das Polygon Klicks abfängt
  },
};

const MapContainerStyle = {
  width: '100%',
  height: '60vh',
  maxHeight: '600px',
};

const calculateArea = (path: google.maps.MVCArray<google.maps.LatLng>): number => {
  return window.google.maps.geometry.spherical.computeArea(path);
};

// Klare Typdefinitionen verbessern die Wartbarkeit
interface AreaDrawingMapProps {
  initialCoordinates?: Array<[number, number]>;
  onAreaChange: (data: { area: number; coordinates: Array<[number, number]> }) => void;
}

interface Polygon {
  polygon: google.maps.Polygon;
  area: number;
  coordinates: Array<[number, number]>;
}

export default function AreaDrawingMap({ initialCoordinates, onAreaChange }: AreaDrawingMapProps) {
  // Laden der Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCbAjl459xe6fTtqZ8rS3OjyVIKypc0Bfg",
    libraries,
  });

  // State für die gezeichneten Polygone und UI-Status
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [totalArea, setTotalArea] = useState<number>(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  
  // Ausgangspunkt der Karte
  const [mapCenter, setMapCenter] = useState({ lat: 51.1657, lng: 10.4515 });
  
  // Referenzen für imperative API-Interaktionen
  const mapRef = useRef<google.maps.Map | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  const polygonListeners = useRef<{[key: string]: google.maps.MapsEventListener[]}>({});

  // Initialisiere Kartenzentrum basierend auf Startkoordinaten
  useEffect(() => {
    if (initialCoordinates && initialCoordinates.length > 0) {
      const [lat, lng] = initialCoordinates[0];
      setMapCenter({ lat, lng });
    }
  }, [initialCoordinates]);

  // Berechnung der Gesamtfläche und Benachrichtigung der übergeordneten Komponente
  useEffect(() => {
    const sum = polygons.reduce((acc, curr) => acc + curr.area, 0);
    setTotalArea(sum);
    
    if (polygons.length > 0) {
      const allCoordinates = polygons.flatMap(p => p.coordinates);
      onAreaChange({ area: sum, coordinates: allCoordinates });
    } else if (initialCoordinates && initialCoordinates.length > 0) {
      onAreaChange({ area: 0, coordinates: initialCoordinates });
    } else {
      onAreaChange({ area: 0, coordinates: [[mapCenter.lat, mapCenter.lng]] });
    }
  }, [polygons, initialCoordinates, onAreaChange, mapCenter]);

  // Map-Loading-Handler - klare Initialisierung
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    
    // WICHTIG: Stelle sicher, dass die Karte korrekt konfiguriert ist
    map.setOptions(NORMAL_MAP_OPTIONS);
    
    if (initialCoordinates && initialCoordinates.length > 0) {
      const [lat, lng] = initialCoordinates[0];
      map.setCenter({ lat, lng });
      map.setZoom(19);
    }
  }, [initialCoordinates]);

  // VERBESSERT: Klare Trennung zwischen Zeichenmodus und normalem Modus
  const toggleDrawingMode = () => {
    if (!drawingManagerRef.current || !mapRef.current) return;
    
    if (isDrawingMode) {
      // Deaktiviere den Zeichenmodus
      drawingManagerRef.current.setDrawingMode(null);
      
      // Wichtig: Stelle sicher, dass die Karte normal navigierbar ist
      mapRef.current.setOptions({
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false
      });
    } else {
      // Aktiviere den Zeichenmodus
      drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
    
    setIsDrawingMode(!isDrawingMode);
  };

  // DrawingManager-Setup
  const onDrawingManagerLoad = (drawingManager: google.maps.drawing.DrawingManager) => {
    drawingManagerRef.current = drawingManager;
  };

  // NEU: Verbesserte Polygon-Erstellung mit klarer Trennung der Interaktionen
  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    // Berechne Fläche und Koordinaten
    const path = polygon.getPath();
    const areaInSqMeters = calculateArea(path);
    const coordinates: Array<[number, number]> = [];
    
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coordinates.push([point.lat(), point.lng()]);
    }
    
    // Generiere eine eindeutige ID für dieses Polygon
    const polygonId = `polygon_${Date.now()}`;
    
    // Speichere das Polygon im State
    setPolygons(prev => [
      ...prev, 
      { polygon, area: Math.round(areaInSqMeters), coordinates }
    ]);
    
    // Wichtig: Nur einen Event-Listener pro Polygon
    const listener = google.maps.event.addListener(polygon, 'paths_changed', () => {
      updatePolygonData(polygon);
    });
    
    // Speichere Listener-Referenz für späteres Cleanup
    polygonListeners.current[polygonId] = [listener];
    
    // Zurück zum normalen Modus
    setIsDrawingMode(false);
    setShowInstructions(false);
    
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(null);
    }
    
    // ENTSCHEIDEND: Stelle sicher, dass die Karteninteraktion wieder normal funktioniert
    if (mapRef.current) {
      mapRef.current.setOptions(NORMAL_MAP_OPTIONS);
    }
  };
  
  // NEU: Saubere Funktion zur Aktualisierung der Polygondaten
  const updatePolygonData = (polygon: google.maps.Polygon) => {
    const updatedPath = polygon.getPath();
    const updatedArea = calculateArea(updatedPath);
    const updatedCoordinates: Array<[number, number]> = [];
    
    for (let i = 0; i < updatedPath.getLength(); i++) {
      const point = updatedPath.getAt(i);
      updatedCoordinates.push([point.lat(), point.lng()]);
    }
    
    setPolygons(prev => 
      prev.map(p => 
        p.polygon === polygon 
          ? { polygon, area: Math.round(updatedArea), coordinates: updatedCoordinates }
          : p
      )
    );
  };

  // Sauberes Entfernen des letzten Polygons inkl. Event-Listener-Cleanup
  const removeLastPolygon = () => {
    if (polygons.length === 0) return;
    
    const lastPolygon = polygons[polygons.length - 1];
    
    // Entferne alle Event-Listener
    Object.values(polygonListeners.current).forEach(listeners => {
      listeners.forEach(listener => {
        google.maps.event.removeListener(listener);
      });
    });
    
    // Entferne Polygon von der Karte
    lastPolygon.polygon.setMap(null);
    
    // Aktualisiere den State
    setPolygons(prev => prev.slice(0, -1));
    
    // Stelle sicher, dass die Karte normal interagierbar ist
    if (mapRef.current) {
      mapRef.current.setOptions(NORMAL_MAP_OPTIONS);
    }
  };

  // UI-Helfer
  const closeInstructions = () => setShowInstructions(false);

  // Formatierungshilfe für die Flächenanzeige
  const formatArea = (area: number) => {
    return new Intl.NumberFormat('de-DE').format(area);
  };

  // Lade- und Fehlerhandling
  if (loadError) return (
    <motion.div 
      className="p-4 bg-red-50 text-red-700 rounded-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Fehler beim Laden der Karte. Bitte laden Sie die Seite neu.
    </motion.div>
  );
  
  if (!isLoaded) return (
    <motion.div className="h-60 bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-gray-600">Karte wird geladen...</span>
      </div>
    </motion.div>
  );

  if (!initialCoordinates || initialCoordinates.length === 0) {
    return (
      <div className="h-60 bg-gray-100 flex items-center justify-center flex-col p-8">
        <p className="text-red-600 font-medium mb-2">Keine gültige Adresse gefunden</p>
        <p className="text-gray-600 text-center">Bitte geben Sie eine vollständige Adresse mit Hausnummer ein.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Die eigentliche Karte */}
      <GoogleMap
        mapContainerStyle={MapContainerStyle}
        zoom={19}
        center={mapCenter}
        onLoad={onMapLoad}
        options={NORMAL_MAP_OPTIONS}
      >
        {/* Zeichenfunktionalität */}
        <DrawingManager
          onLoad={onDrawingManagerLoad}
          options={DRAWING_OPTIONS}
          onPolygonComplete={onPolygonComplete}
        />
        
        {/* Flächenanzeige */}
        <motion.div 
          className="absolute bottom-4 left-4 z-10 bg-white px-4 py-3 rounded-md shadow-md border border-gray-200 flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Ruler className="h-5 w-5 text-accent mr-3" />
          <div>
            <p className="text-xs text-gray-500">Berechnete Fläche</p>
            <motion.p 
              className="font-medium text-lg"
              key={totalArea}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {formatArea(totalArea)} m²
            </motion.p>
          </div>
        </motion.div>

        {/* Anleitung */}
        <AnimatePresence>
          {showInstructions && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md max-w-md m-4 border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-800">Fläche einzeichnen</h3>
                  <button 
                    onClick={closeInstructions}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-3 text-gray-600 text-sm">
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs font-medium">1</span>
                    <span>Klicken Sie auf "Zeichnen starten" um den Zeichenmodus zu aktivieren.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs font-medium">2</span>
                    <span>Klicken Sie auf die Karte, um Eckpunkte Ihrer zu räumenden Fläche zu setzen.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs font-medium">3</span>
                    <span>Schließen Sie das Polygon, indem Sie wieder auf den ersten Punkt klicken.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs font-medium">4</span>
                    <span>Nach dem Zeichnen können Sie die Fläche bearbeiten oder eine neue hinzufügen.</span>
                  </div>
                </div>
                <button 
                  onClick={closeInstructions}
                  className="mt-5 w-full py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-all text-sm font-medium"
                >
                  Verstanden
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </GoogleMap>
      
      {/* Kontrollelemente */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <button 
          onClick={() => setShowInstructions(true)} 
          className="flex items-center text-accent hover:text-accent-dark text-sm"
        >
          <Info className="h-4 w-4 mr-1.5" />
          Hilfe zur Flächenmarkierung
        </button>

        <div className="flex space-x-3">
          <button 
            onClick={toggleDrawingMode}
            className={`flex items-center py-2 px-3 text-sm rounded-md transition-all ${
              isDrawingMode 
                ? 'bg-accent/10 text-accent border border-accent/20' 
                : 'bg-accent text-white hover:bg-accent-dark'
            }`}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            {isDrawingMode ? 'Zeichnung aktiv' : 'Zeichnen starten'}
          </button>
          <button 
            onClick={removeLastPolygon}
            disabled={polygons.length === 0}
            className={`flex items-center py-2 px-3 text-sm rounded-md transition-all ${
              polygons.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
            }`}
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Letzte Fläche löschen
          </button>
        </div>
      </div>
    </div>
  );
}