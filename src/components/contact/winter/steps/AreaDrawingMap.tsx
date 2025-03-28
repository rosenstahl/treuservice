import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, DrawingManager } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Info, Plus, Trash2 } from 'lucide-react';

type Libraries = ('drawing' | 'geometry' | 'places')[];
const libraries: Libraries = ['drawing', 'geometry'];

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
    fillColor: '#0284c7', // Anpassung an die Akzentfarbe
    fillOpacity: 0.2,
    strokeColor: '#0284c7',
    strokeWeight: 2,
    editable: true,
    draggable: true,
  },
};

const calculateArea = (path: google.maps.MVCArray<google.maps.LatLng>): number => {
  return window.google.maps.geometry.spherical.computeArea(path);
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

export default function AreaDrawingMap({ initialCoordinates, onAreaChange }: AreaDrawingMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCbAjl459xe6fTtqZ8rS3OjyVIKypc0Bfg',
    libraries,
  });

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [totalArea, setTotalArea] = useState<number>(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 51.1657, lng: 10.4515 });
  
  const mapRef = useRef<google.maps.Map>();
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);

  // Setze das Kartenzentrum auf Basis der initialCoordinates
  useEffect(() => {
    if (initialCoordinates && initialCoordinates.length > 0) {
      const [lat, lng] = initialCoordinates[0];
      setMapCenter({ lat, lng });
    }
  }, [initialCoordinates]);

  // Berechnung der Gesamtfläche aller Polygone
  useEffect(() => {
    const sum = polygons.reduce((acc, curr) => acc + curr.area, 0);
    setTotalArea(sum);
    
    // Aktualisiere die übergeordnete Komponente mit allen Polygondaten
    if (onAreaChange) {
      if (polygons.length > 0) {
        const allCoordinates = polygons.flatMap(p => p.coordinates);
        onAreaChange({
          area: sum,
          coordinates: allCoordinates
        });
      } else if (initialCoordinates && initialCoordinates.length > 0) {
        onAreaChange({
          area: 0,
          coordinates: initialCoordinates
        });
      } else {
        onAreaChange({
          area: 0,
          coordinates: [[mapCenter.lat, mapCenter.lng]]
        });
      }
    }
  }, [polygons, onAreaChange, initialCoordinates, mapCenter]);

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
  const toggleDrawingMode = () => {
    if (drawingManagerRef.current) {
      if (isDrawingMode) {
        drawingManagerRef.current.setDrawingMode(null);
      } else {
        drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
      }
      setIsDrawingMode(!isDrawingMode);
    }
  };

  const onDrawingManagerLoad = (drawingManager: google.maps.drawing.DrawingManager) => {
    drawingManagerRef.current = drawingManager;
  };

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
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
    
    // Event-Listener für Änderungen am Polygon
    google.maps.event.addListener(polygon, 'paths_changed', () => {
      const updatedPath = polygon.getPath();
      const updatedArea = calculateArea(updatedPath);
      const updatedCoordinates: Array<[number, number]> = [];
      
      for (let i = 0; i < updatedPath.getLength(); i++) {
        const point = updatedPath.getAt(i);
        updatedCoordinates.push([point.lat(), point.lng()]);
      }
      
      // Aktualisiere den entsprechenden Eintrag im Polygons-Array
      setPolygons(prev => prev.map(p => p.polygon === polygon ? {
        polygon,
        area: Math.round(updatedArea),
        coordinates: updatedCoordinates
      } : p));
    });
    
    setShowInstructions(false);
    setIsDrawingMode(false);
    
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(null);
    }
  };

  const removeLastPolygon = () => {
    if (polygons.length > 0) {
      const lastPolygon = polygons[polygons.length - 1];
      lastPolygon.polygon.setMap(null); // Entferne das Polygon von der Karte
      setPolygons(prev => prev.slice(0, -1)); // Entferne das letzte Element aus dem Array
    }
  };

  const closeInstructions = () => {
    setShowInstructions(false);
  };

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
      className="h-60 bg-gray-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-gray-600">Karte wird geladen...</span>
      </div>
    </motion.div>
  );

  // Prüfe, ob Koordinaten vorhanden sind
  if (!initialCoordinates || initialCoordinates.length === 0) {
    return (
      <div className="h-60 bg-gray-100 flex items-center justify-center flex-col p-8">
        <p className="text-red-600 font-medium mb-2">Keine gültige Adresse gefunden</p>
        <p className="text-gray-600 text-center">Bitte gehen Sie zurück und geben Sie eine vollständige Adresse mit Hausnummer ein.</p>
      </div>
    );
  }

  // Format-Funktion für die Flächenanzeige mit Tausendertrennzeichen
  const formatArea = (area: number) => {
    return new Intl.NumberFormat('de-DE').format(area);
  };

  return (
    <div className="space-y-4">
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
        
        {/* Berechnete Fläche */}
        <motion.div 
          className="absolute bottom-4 left-4 z-10 bg-white px-4 py-3 rounded-md shadow-md border border-gray-200 flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Ruler className="h-5 w-5 text-accent mr-3" />
          <div>
            <p className="text-xs text-gray-500">Berechnete Fläche</p>
            <motion.p 
              className="font-medium text-lg"
              key={totalArea}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {formatArea(totalArea)} m²
            </motion.p>
          </div>
        </motion.div>

        {/* Pop-up mit Anleitung direkt auf der Karte */}
        <AnimatePresence>
          {showInstructions && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md max-w-md m-4 border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }}
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
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs font-medium">1</span>
                    <span>Klicken Sie auf &quot;Zeichnen starten&quot; um den Zeichenmodus zu aktivieren.</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs font-medium">2</span>
                    <span>Klicken Sie auf die Karte, um Eckpunkte Ihrer zu räumenden Fläche zu setzen.</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs font-medium">3</span>
                    <span>Schließen Sie das Polygon, indem Sie wieder auf den ersten Punkt klicken.</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-accent/10 text-accent rounded-full text-xs font-medium">4</span>
                    <span>Sie können mehrere Flächen zeichnen und bereits gezeichnete Flächen bearbeiten.</span>
                  </motion.div>
                </div>
                <button 
                  onClick={closeInstructions}
                  className="mt-5 w-full py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-all duration-200 text-sm font-medium"
                >
                  Verstanden
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </GoogleMap>
      
      <div className="flex flex-wrap justify-between items-center gap-3">
        {/* Linke Seite - Info-Button */}
        <button 
          onClick={() => setShowInstructions(true)} 
          className="flex items-center text-accent hover:text-accent-dark transition-colors text-sm"
        >
          <Info className="h-4 w-4 mr-1.5" />
          Hilfe zur Flächenmarkierung
        </button>

        {/* Rechte Seite - Fläche hinzufügen/entfernen Buttons */}
        <div className="flex space-x-3">
          <button 
            onClick={toggleDrawingMode}
            className={`flex items-center py-2 px-3 text-sm rounded-md transition-all duration-200 ${
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
            className={`flex items-center py-2 px-3 text-sm rounded-md transition-all duration-200 ${
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