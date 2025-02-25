"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H3, Paragraph } from "@/components/ui/typography";
import { Bell, BellOff } from "lucide-react";

interface NotificationManagerProps {
  alertLevel: 'green' | 'yellow' | 'red';
  temperatureThreshold: number;
  location: string;
}

export const NotificationManager = ({ alertLevel, temperatureThreshold, location }: NotificationManagerProps) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [notificationsSupported, setNotificationsSupported] = useState<boolean>(false);
  const [notificationsSetting, setNotificationsSetting] = useState<'all' | 'critical' | 'none'>('critical');

  useEffect(() => {
    // Überprüfen, ob Browser Benachrichtigungen unterstützt
    if ('Notification' in window) {
      setNotificationsSupported(true);
      // Überprüfen, ob Berechtigungen bereits erteilt wurden
      if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
      }
    }
  }, []);

  // Funktion zum Anfordern von Benachrichtigungsberechtigungen
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Ihr Browser unterstützt keine Benachrichtigungen.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        // Testbenachrichtigung senden
        new Notification('Winterdienst-Benachrichtigungen aktiviert', {
          body: `Sie erhalten jetzt Benachrichtigungen für ${location} bei kritischen Wetterbedingungen.`,
          icon: '/favicon.ico'
        });
      } else {
        setNotificationsEnabled(false);
        alert('Um Wetterwarnungen zu erhalten, müssen Sie Benachrichtigungen erlauben.');
      }
    } catch (error) {
      console.error('Fehler beim Anfordern der Benachrichtigungserlaubnis:', error);
    }
  };

  // Beispiel für Auslösen einer Benachrichtigung (in einer echten App würde dies durch ein Backend oder einen Service Worker erfolgen)
  useEffect(() => {
    if (notificationsEnabled && ((alertLevel === 'red') || (alertLevel === 'yellow' && notificationsSetting === 'all'))) {
      const message = alertLevel === 'red' 
        ? `ACHTUNG: Frostgefahr in ${location}! Temperatur unter ${temperatureThreshold}°C.`
        : `Vorwarnung: Mögliche Glätte in ${location}. Temperatur bei ${temperatureThreshold}°C.`;
      
      // In einer echten App würde dies über einen Service Worker oder ein Backend-System gesteuert
      // und nicht direkt im Browser-Tab ausgelöst
      new Notification('Winterdienst-Warnung', {
        body: message,
        icon: '/favicon.ico'
      });
    }
  }, [alertLevel, notificationsEnabled, notificationsSetting, location, temperatureThreshold]);

  if (!notificationsSupported) {
    return null;
  }

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <H3 className="text-xl font-semibold">Wetter-Benachrichtigungen</H3>
          <Button
            variant={notificationsEnabled ? "default" : "outline"}
            onClick={requestNotificationPermission}
          >
            {notificationsEnabled ? (
              <>
                <Bell className="w-4 h-4 mr-2" />
                Aktiviert
              </>
            ) : (
              <>
                <BellOff className="w-4 h-4 mr-2" />
                Aktivieren
              </>
            )}
          </Button>
        </div>
        
        {notificationsEnabled && (
          <div className="mt-2">
            <Paragraph className="mb-2">Benachrichtigungen erhalten für:</Paragraph>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={notificationsSetting === 'all' ? "default" : "outline"} 
                size="sm"
                onClick={() => setNotificationsSetting('all')}
              >
                Alle Warnungen
              </Button>
              <Button 
                variant={notificationsSetting === 'critical' ? "default" : "outline"} 
                size="sm"
                onClick={() => setNotificationsSetting('critical')}
              >
                Nur kritische Warnungen
              </Button>
              <Button 
                variant={notificationsSetting === 'none' ? "default" : "outline"} 
                size="sm"
                onClick={() => setNotificationsSetting('none')}
              >
                Keine Benachrichtigungen
              </Button>
            </div>
            <Paragraph className="text-xs text-muted-foreground mt-3">
              Sie erhalten automatische Benachrichtigungen für {location} bei {notificationsSetting === 'all' ? 'allen Wetteränderungen' : 'kritischen Wetterbedingungen'}.
            </Paragraph>
          </div>
        )}
        
        {!notificationsEnabled && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <Paragraph>
              Aktivieren Sie Benachrichtigungen, um automatisch über kritische Wetterbedingungen informiert zu werden. So verpassen Sie keine wichtigen Wetterwarnungen mehr.
            </Paragraph>
          </div>
        )}
      </CardContent>
    </Card>
  );
};