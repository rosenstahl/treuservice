"use client";

import { H3, Paragraph } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, Layers } from "lucide-react";

export const SnowfallMapWidget = () => {
  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <H3 className="text-xl font-semibold">Niederschlagsradar mit Schneefall</H3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4 mr-2" />
              Layer
            </Button>
          </div>
        </div>
        
        {/* Map Placeholder - In der echten App würde hier eine Karte angezeigt werden */}
        <div className="relative w-full h-[400px] bg-slate-100 rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-blue-200/30 to-blue-300/20">
            {/* Statische Karte für Demo-Zwecke */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Paragraph className="text-center text-muted-foreground">
                Hier würde das interaktive Niederschlagsradar angezeigt werden.
                <br />
                (Basierend auf DWD-Radardaten)
              </Paragraph>
            </div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute right-4 top-4 flex flex-col space-y-2">
            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md">
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Current Location */}
          <div className="absolute left-4 bottom-4">
            <Button variant="secondary" size="sm" className="bg-white shadow-md">
              <MapPin className="h-4 w-4 mr-2" />
              Mein Standort
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>Letzte Aktualisierung: 09:45 Uhr</div>
          <div>Quelle: Deutscher Wetterdienst (DWD)</div>
        </div>
      </CardContent>
    </Card>
  );
};