"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H3, Paragraph } from "@/components/ui/typography";
import { BellRing, BellOff, AlertTriangle, CloudSnow, X } from "lucide-react";
import { getCurrentWeather, getWeatherForecast, predictSnowfall } from './brightsky';

// Neu: Import des intelligenten Wetter-Services
import { 
  getWeatherData as getIntelligentWeatherData, 
  loadApiStatus, 
  saveApiStatus 
} from './weather-service';

// Benachrichtigungstypen
type NotificationType = 'info' | 'warning' | 'alert';

// Benachrichtigungsstruktur
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Typ für gespeicherte Benachrichtigungen
interface StoredNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Props für den NotificationManager
interface NotificationManagerProps {
  location?: string;
  coordinates?: { lat: number; lon: number };
}

export const NotificationManager = ({ location, coordinates }: NotificationManagerProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  // Beim ersten Laden den API-Status laden
  useEffect(() => {
    loadApiStatus();
  }, []);

  // Überprüfung des Benachrichtigungsstatus
  useEffect(() => {
    // Prüfen, ob Benachrichtigungen unterstützt werden
    if (!('Notification' in window)) {
      console.log('Dieser Browser unterstützt keine Desktop-Benachrichtigungen');
      return;
    }
    
    // Aktuellen Genehmigungsstatus abfragen
    setNotificationPermission(Notification.permission);
    
    // Benachrichtigungseinstellung aus dem lokalen Speicher laden
    const savedSubscription = localStorage.getItem('weatherNotifications');
    if (savedSubscription === 'true') {
      setIsSubscribed(true);
    }
    
    // Gelesene Benachrichtigungen laden
    const savedNotifications = localStorage.getItem('weatherNotificationsList');
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications) as StoredNotification[];
        setNotifications(parsedNotifications.map((n) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (e) {
        console.error('Fehler beim Laden der Benachrichtigungen:', e);
      }
    }
  }, []);

  // Bei Änderung der Koordinaten oder des Abonnementstatus prüfen
  useEffect(() => {
    if (isSubscribed && coordinates) {
      // Erste Prüfung durchführen
      checkForWeatherAlerts();
      
      // Prüfung alle 30 Minuten wiederholen
      const intervalId = setInterval(checkForWeatherAlerts, 30 * 60 * 1000);
      
      return () => clearInterval(intervalId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed, coordinates]);

  // Speichern von Änderungen an den Benachrichtigungen
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('weatherNotificationsList', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Berechtigungen für Benachrichtigungen anfordern
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Dieser Browser unterstützt keine Desktop-Benachrichtigungen');
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        subscribeToNotifications();
        showBrowserNotification('Winterdienst-Benachrichtigungen aktiviert', 'Sie erhalten jetzt Warnungen bei kritischen Wetterereignissen.');
      }
    } catch (error) {
      console.error('Fehler bei der Anfrage für Benachrichtigungen:', error);
    }
  };

  // Abonnieren der Wetterwarnungen
  const subscribeToNotifications = () => {
    setIsSubscribed(true);
    localStorage.setItem('weatherNotifications', 'true');
    
    // Benachrichtigung hinzufügen
    addNotification(
      'info',
      'Wetterwarnungen aktiviert',
      `Sie erhalten jetzt Benachrichtigungen für den Standort ${location || 'Ihr aktueller Standort'}.`
    );
    
    // Sofort auf Warnungen prüfen
    checkForWeatherAlerts();
  };

  // Abbestellen der Wetterwarnungen
  const unsubscribeFromNotifications = () => {
    setIsSubscribed(false);
    localStorage.setItem('weatherNotifications', 'false');
    
    // Abmeldungsbenachrichtigung hinzufügen
    addNotification(
      'info',
      'Wetterwarnungen deaktiviert',
      'Sie erhalten keine Benachrichtigungen mehr zu Wetterereignissen.'
    );
  };

  // Browser-Benachrichtigung anzeigen
  const showBrowserNotification = (title: string, body: string) => {
    if (notificationPermission === 'granted') {
      const notification = new Notification(title, {
        body: body,
        icon: '/winter-service-icon.png' // Pfad zu einem Icon anpassen
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };

  // Benachrichtigung zur Liste hinzufügen
  const addNotification = (type: NotificationType, title: string, message: string) => {
    const newNotification: Notification = {
      id: `notification-${Date.now()}`,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false
    };
    
    // Zur Liste hinzufügen
    setNotifications(prev => [newNotification, ...prev]);
    
    // Bei Warnungen und Alarmen auch eine Browser-Benachrichtigung anzeigen
    if (type === 'warning' || type === 'alert') {
      showBrowserNotification(title, message);
    }
    
    return newNotification.id;
  };

  // Benachrichtigung als gelesen markieren
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Benachrichtigung entfernen
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Alle Benachrichtigungen als gelesen markieren
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  // Auf Wetterwarnungen prüfen
  const checkForWeatherAlerts = async () => {
    if (!coordinates) return;
    
    try {
      setLastCheck(new Date());
      
      // Neu: Zuerst den intelligenten Weather-Service versuchen
      try {
        console.log("Prüfe Wetterwarnungen mit intelligenten Service...");
        const intelligentData = await getIntelligentWeatherData(
          coordinates.lat, 
          coordinates.lon
        );
        
        // API-Status speichern nach erfolgreicher Anfrage
        saveApiStatus();
        
        console.log("Intelligenter Weather-Service erfolgreich:", intelligentData);
        
        // Wenn wir hier sind, war der intelligente Service erfolgreich
        // In einem echten Implementierungsszenario könnten wir die Daten hier direkt verarbeiten
      } catch (intelligentError) {
        console.warn("Intelligenter Wetter-Service fehlgeschlagen:", intelligentError);
        // Kein Problem, wir fallen auf die Original-Implementierung zurück
      }
      
      // Aktuelle Wetterdaten mit der aktualisierten API-Methode abrufen
      const currentWeather = await getCurrentWeather({
        lat: coordinates.lat,
        lon: coordinates.lon
      });
      
      if (!currentWeather) {
        console.warn('Keine Wetterdaten für Warnungen verfügbar');
        return;
      }
      
      // Temperatur- und Niederschlagsdaten extrahieren
      const temperature = currentWeather.temperature ?? 0;
      const precipitationProbability = currentWeather.precipitation_probability ?? 0;
      
      // Auf kritische Wetterbedingungen prüfen
      if (temperature < 0 && precipitationProbability > 50) {
        // Rote Warnung - Schneefall und Frost
        addNotification(
          'alert',
          'Winterdienst erforderlich!',
          `Aktuelle Temperatur: ${temperature.toFixed(1)}°C mit hoher Niederschlagswahrscheinlichkeit (${precipitationProbability}%). Schnee- und Eisglätte wahrscheinlich.`
        );
      } else if (temperature < 0) {
        // Gelbe Warnung - Frost
        addNotification(
          'warning',
          'Frostwarnung',
          `Aktuelle Temperatur: ${temperature.toFixed(1)}°C. Mögliche Glatteisbildung bei eventueller Nässe.`
        );
      } else if (temperature <= 3 && precipitationProbability > 40) {
        // Gelbe Warnung - Möglicher Schnee/Eisregen
        addNotification(
          'warning',
          'Mögliche Glätte',
          `Aktuelle Temperatur: ${temperature.toFixed(1)}°C mit erhöhter Niederschlagswahrscheinlichkeit (${precipitationProbability}%). Vorbeugender Winterdienst empfohlen.`
        );
      }
      
      // Zusätzlich Schneefall-Vorhersage abrufen
      const forecast = await getWeatherForecast({
        lat: coordinates.lat,
        lon: coordinates.lon,
        date: new Date().toISOString().split('T')[0]
      });
      
      if (forecast.length > 0) {
        // Schneefall-Vorhersage mit der korrigierten Version von predictSnowfall
        const snowPrediction = predictSnowfall(forecast, 24);
        
        if (snowPrediction.willSnow && snowPrediction.totalAmount > 1) {
          addNotification(
            'warning',
            'Schneefall erwartet',
            `Für ${location || 'Ihren Standort'} wird Schneefall mit einer Höhe von ca. ${snowPrediction.totalAmount.toFixed(1)} cm erwartet. Beginn: ${snowPrediction.startTime}`
          );
        }
      }
    } catch (error) {
      console.error('Fehler bei der Prüfung auf Wetterwarnungen:', error);
    }
  };

  // Ungelesene Benachrichtigungen zählen
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Benachrichtigungsglocke mit Zähler */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative rounded-full p-2"
      >
        {isSubscribed ? (
          <BellRing className="h-5 w-5" />
        ) : (
          <BellOff className="h-5 w-5" />
        )}
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
      
      {/* Benachrichtigungspanel */}
      {showNotifications && (
        <Card className="absolute right-0 top-10 w-80 z-50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <H3 className="text-lg font-bold">Wetterwarnungen</H3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowNotifications(false)}
                className="h-6 w-6 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Abonnement-Steuerung */}
            <div className="flex justify-between items-center mb-4 p-2 bg-gray-100 rounded">
              <span className="text-sm">
                {isSubscribed ? 'Benachrichtigungen aktiv' : 'Benachrichtigungen inaktiv'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={isSubscribed ? unsubscribeFromNotifications : requestNotificationPermission}
              >
                {isSubscribed ? 'Deaktivieren' : 'Aktivieren'}
              </Button>
            </div>
            
            {/* Letzte Aktualisierung */}
            {lastCheck && (
              <div className="text-xs text-gray-500 mb-3">
                Letzte Prüfung: {lastCheck.toLocaleTimeString('de-DE')}
              </div>
            )}
            
            {/* Liste der Benachrichtigungen */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <Paragraph className="text-sm text-gray-500">
                  Keine Benachrichtigungen vorhanden
                </Paragraph>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded border ${
                      notification.read ? 'bg-gray-50' : 'bg-white'
                    } ${
                      notification.type === 'alert' 
                        ? 'border-red-200' 
                        : notification.type === 'warning' 
                          ? 'border-yellow-200' 
                          : 'border-blue-200'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        {notification.type === 'alert' ? (
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        ) : notification.type === 'warning' ? (
                          <CloudSnow className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        ) : (
                          <BellRing className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                        )}
                        <div>
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs mt-1">{notification.message}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {notification.timestamp.toLocaleString('de-DE')}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Aktionsbuttons */}
            {notifications.length > 0 && (
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={markAllAsRead}
                >
                  Alle als gelesen markieren
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setNotifications([])}
                >
                  Alle löschen
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};