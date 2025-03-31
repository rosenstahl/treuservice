import { NextRequest, NextResponse } from 'next/server';

// Preisintervalle und Staffelpreise aus dem Frontend in den Backend-Code verschieben
const priceIntervals = [
  { min: 1000, max: 1500, price: 2.50 },
  { min: 1501, max: 2000, price: 2.30 },
  { min: 2001, max: 2500, price: 2.10 },
  { min: 2501, max: 3000, price: 1.90 },
  { min: 3001, max: 3500, price: 1.70 },
  { min: 3501, max: 4000, price: 1.50 },
  { min: 4001, max: 4500, price: 1.30 },
  { min: 4501, max: 5000, price: 1.20 },
  { min: 5001, max: 5500, price: 1.10 },
  { min: 5501, max: 6000, price: 1.00 },
  { min: 6001, max: 6500, price: 0.95 },
  { min: 6501, max: 7000, price: 0.90 },
  { min: 7001, max: 7500, price: 0.85 },
  { min: 7501, max: 8000, price: 0.80 },
  { min: 8001, max: 10000, price: 0.80 },
  { min: 10001, max: 100000, price: 0.80 }
];

export async function POST(request: NextRequest) {
  try {
    // Daten aus dem Request-Body extrahieren
    const { area, snowDepth, frequency } = await request.json();
    
    // Validierung der Eingaben
    if (!area || area < 1000 || !snowDepth || !frequency || frequency < 1) {
      return NextResponse.json(
        { success: false, message: 'Ungültige Eingabeparameter' },
        { status: 400 }
      );
    }
    
    // DIY-Kosten berechnen
    const diyResults = calculateDIYCosts(area, snowDepth, frequency);
    
    // Professionelle Kosten berechnen
    const professionalResults = calculateProfessionalCosts(area, snowDepth, frequency);
    
    // Kostendifferenz berechnen
    const costDifference = professionalResults.seasonal - diyResults.firstYear;
    
    return NextResponse.json({
      success: true,
      diyResults,
      professionalResults,
      costDifference
    });
  } catch (error) {
    console.error('Fehler bei der Berechnung:', error);
    return NextResponse.json(
      { success: false, message: 'Fehler bei der Verarbeitung der Anfrage' },
      { status: 500 }
    );
  }
}

// Funktion zur Berechnung der DIY-Kosten
function calculateDIYCosts(area: number, snowDepth: string, frequency: number) {
  // Anschaffungskosten (einmalig)
  const equipmentCosts = {
    schneeschieber: 45,
    schneeschaufel: 35,
    streuwagen: snowDepth === "stark" ? 130 : 80,
    streumittel: 0, // wird pro Einsatz berechnet
    handschuhe: 25,
    winterkleidung: 150,
    kleinwerkzeuge: 40,
    schneefraese: snowDepth === "stark" ? 600 : 0
  };
  
  const totalEquipmentCost = Object.values(equipmentCosts).reduce((a, b) => a + b, 0);
  
  // Kosten pro Einsatz
  const costPerUse = {
    streumittel: area < 500 ? 15 : area < 1000 ? 25 : 35 + (area / 1000) * 5,
    zeitaufwand: {
      leicht: Math.max(1, area / 500), // mindestens 1 Stunde
      mittel: Math.max(1.5, area / 350), // mindestens 1,5 Stunden
      stark: Math.max(2, area / 250) // mindestens 2 Stunden
    },
    stundenlohn: 25 // Opportunitätskosten der eigenen Zeit
  };
  
  const timeRequired = costPerUse.zeitaufwand[snowDepth as keyof typeof costPerUse.zeitaufwand]; // Stunden pro Einsatz
  const streumittelPerUse = costPerUse.streumittel;
  const laborCostPerUse = timeRequired * costPerUse.stundenlohn;
  
  // Gesamtkosten für die Saison
  const usesPerSeason = frequency;
  const totalSeasonalCost = (streumittelPerUse + laborCostPerUse) * usesPerSeason;
  
  // Gesamtkosten erstes Jahr (inkl. Ausrüstung)
  const totalFirstYearCost = totalEquipmentCost + totalSeasonalCost;
  
  return {
    equipment: totalEquipmentCost,
    perUse: streumittelPerUse + laborCostPerUse,
    seasonal: totalSeasonalCost,
    firstYear: totalFirstYearCost,
    timePerSeason: timeRequired * usesPerSeason,
    debris: area * 0.25 // Kosten für Frühjahrsbeseitigung (nicht im ersten Angebot enthalten)
  };
}

// Funktion zur Berechnung der professionellen Kosten
function calculateProfessionalCosts(area: number, snowDepth: string, frequency: number) {
  // Implementierung der exakten Formel aus dem PDF:
  // G(A)=∑i(Pi⋅min(A,Bi))+(0,30⋅A)+2500
  
  let totalCost = 0;
  let remainingArea = area;
  
  // Durchlaufe jedes Preisintervall und berechne den Teilbetrag
  for (let i = 0; i < priceIntervals.length; i++) {
    const interval = priceIntervals[i];
    
    // Wenn die verbleibende Fläche <= 0 ist, beenden
    if (remainingArea <= 0) break;
    
    // Wenn die Mindestfläche des Intervalls größer als die Gesamtfläche ist, überspringe
    if (interval.min > area) continue;
    
    // Berechne, wie viel Fläche in diesem Intervall liegt
    const intervalWidth = interval.max - interval.min + 1;
    const areaInInterval = Math.min(remainingArea, intervalWidth);
    
    // Berechne den Preis für diesen Teil und addiere ihn zum Gesamtpreis
    totalCost += areaInInterval * interval.price;
    
    // Reduziere die verbleibende Fläche
    remainingArea -= areaInInterval;
  }
  
  // Füge die Streugutkosten (0,30€/m²) hinzu
  totalCost += area * 0.30;
  
  // Füge die Fixkosten (2500€) hinzu
  totalCost += 2500;
  
  // Anpassungen basierend auf Schneehöhe
  const depthMultiplier = snowDepth === "leicht" ? 0.85 : snowDepth === "stark" ? 1.25 : 1.0;
  totalCost *= depthMultiplier;
  
  // Berechne Kosten pro Einsatz (ohne Fixkosten und Streugut)
  const rawAreaCost = totalCost - 2500 - (area * 0.30);
  const costPerVisit = rawAreaCost / frequency;
  
  // Monatliche Bereitschaftsgebühr
  const monthlyFee = area < 2500 ? 40 : area < 5000 ? 60 : 80;
  
  return {
    area: area,
    costPerSqm: (rawAreaCost / area / frequency).toFixed(2),
    setup: 90,
    perVisit: costPerVisit,
    monthly: monthlyFee,
    seasonal: totalCost,
    debris: area * 0.25 // Kosten für Frühjahrsbeseitigung (nicht im ersten Angebot enthalten)
  };
}