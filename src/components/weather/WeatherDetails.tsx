"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H3, Paragraph } from "@/components/ui/typography";
import { 
  CloudSnow, 
  CloudRain, 
  ThermometerSnowflake, 
  Calendar, 
  Clock, 
  AlertTriangle 
} from "lucide-react";

export const WeatherDetails = () => {
  return (
    <div className="w-full space-y-4">
      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecast">
            <Calendar className="w-4 h-4 mr-2" />
            7-Tage-Prognose
          </TabsTrigger>
          <TabsTrigger value="temperature">
            <ThermometerSnowflake className="w-4 h-4 mr-2" />
            Temperaturverlauf
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Wetterwarnungen
          </TabsTrigger>
        </TabsList>
        
        {/* 7-Tage-Prognose */}
        <TabsContent value="forecast" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                {[...Array(7)].map((_, i) => {
                  // Simuliert verschiedene Wetterbedingungen
                  const isSnow = i === 1 || i === 2;
                  const temp = i === 1 || i === 2 ? -2 + i : 2 + i;
                  const day = new Date();
                  day.setDate(day.getDate() + i);
                  const dayName = day.toLocaleDateString('de-DE', { weekday: 'short' });
                  const dateStr = day.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
                  
                  return (
                    <div key={i} className="flex flex-col items-center p-3 border rounded-lg">
                      <span className="text-sm font-medium">{dayName}</span>
                      <span className="text-xs text-muted-foreground">{dateStr}</span>
                      <div className="my-3">
                        {isSnow ? (
                          <CloudSnow className="w-10 h-10 text-blue-500" />
                        ) : (
                          <CloudRain className="w-10 h-10 text-gray-500" />
                        )}
                      </div>
                      <div className="flex justify-between w-full text-sm">
                        <span className="font-medium">{temp - 2}°</span>
                        <span className="font-bold">{temp}°</span>
                      </div>
                      <span className="text-xs text-center text-muted-foreground mt-1">
                        {isSnow ? 'Leichter Schneefall' : 'Bedeckt'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Temperaturverlauf */}
        <TabsContent value="temperature" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="h-64 w-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <Paragraph className="text-center text-muted-foreground">
                  Hier würde in einer echten Implementierung ein Temperaturverlaufs-Chart angezeigt werden
                </Paragraph>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <H3 className="text-lg font-medium mb-2">Bodentemperatur</H3>
                  <div className="flex items-center">
                    <ThermometerSnowflake className="w-5 h-5 text-blue-500 mr-2" />
                    <span>Aktuell: -1°C</span>
                  </div>
                  <Paragraph className="text-sm text-muted-foreground mt-2">
                    Die Bodentemperatur ist ein entscheidender Faktor für Glättebildung.
                  </Paragraph>
                </div>
                <div className="border rounded-lg p-4">
                  <H3 className="text-lg font-medium mb-2">Frostprognose</H3>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-amber-500 mr-2" />
                    <span>Beginn: Heute 18:00 Uhr</span>
                  </div>
                  <Paragraph className="text-sm text-muted-foreground mt-2">
                    Vorsorglicher Winterdienst wird ab 17:00 Uhr empfohlen.
                  </Paragraph>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Wetterwarnungen */}
        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <H3 className="text-lg font-medium text-red-800">Glätte-Warnung</H3>
                  </div>
                  <Paragraph className="text-sm text-red-700 mt-2">
                    Für Berlin und Umgebung: Achtung! Durch gefrierende Nässe kann es zu gefährlicher Glätte kommen.
                  </Paragraph>
                  <div className="mt-2 text-xs text-red-600">
                    Gültig: Heute 18:00 Uhr bis morgen 10:00 Uhr
                  </div>
                </div>
                
                <div className="bg-amber-100 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                    <H3 className="text-lg font-medium text-amber-800">Schneefall-Warnung</H3>
                  </div>
                  <Paragraph className="text-sm text-amber-700 mt-2">
                    Für Berlin und Umgebung: Es werden 2-5 cm Neuschnee innerhalb von 12 Stunden erwartet.
                  </Paragraph>
                  <div className="mt-2 text-xs text-amber-600">
                    Gültig: Morgen 03:00 Uhr bis 15:00 Uhr
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};