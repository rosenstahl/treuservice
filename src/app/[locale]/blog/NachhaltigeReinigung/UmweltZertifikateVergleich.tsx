"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Paragraph } from "@/components/ui/typography"
import { 
  Star, 
  StarHalf, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  Check,
  X,
  FileText,
  Globe,
  Search
} from 'lucide-react'

// Daten für Zertifikate
const zertifikate = [
  {
    id: "blauer-engel",
    name: "Blauer Engel",
    logo: "/images/blog/blauer-engel-logo.png",
    placeholder: true,
    region: "Deutschland",
    seit: 1978,
    fokus: ["Umweltauswirkungen", "Gesundheitsschutz", "Gebrauchstauglichkeit"],
    vertrauenswürdigkeit: 5,
    marktrelevanz: 5,
    standards: "Sehr hoch",
    kosten: "Mittel",
    kategorien: ["reinigungsmittel", "geraete"],
    vorteile: [
      "Sehr hohes Vertrauen bei Verbrauchern",
      "Strengste Umweltkriterien in Deutschland",
      "Umfassende Produktbewertung"
    ],
    nachteile: [
      "Primär auf deutschen Markt beschränkt",
      "Aufwändiger Zertifizierungsprozess"
    ],
    beschreibung: "Der Blaue Engel ist das bekannteste Umweltzeichen Deutschlands. Er zeichnet Produkte aus, die in ihrer Gesamtheit umweltfreundlicher sind als vergleichbare konventionelle Produkte und gleichzeitig hohe Ansprüche an den Gesundheitsschutz erfüllen."
  },
  {
    id: "eu-ecolabel",
    name: "EU Ecolabel",
    logo: "/images/blog/eu-ecolabel-logo.png",
    placeholder: true,
    region: "Europäische Union",
    seit: 1992,
    fokus: ["Geringer Energieverbrauch", "Reduzierte Umweltverschmutzung", "Ressourcenschonung"],
    vertrauenswürdigkeit: 4.5,
    marktrelevanz: 4,
    standards: "Hoch",
    kosten: "Niedrig bis Mittel",
    kategorien: ["reinigungsmittel", "dienstleistungen"],
    vorteile: [
      "EU-weit anerkannt und gültig",
      "Gutes Preis-Leistungs-Verhältnis",
      "Transparente Vergabekriterien"
    ],
    nachteile: [
      "Weniger streng als nationale Spitzenstandards",
      "Geringere Bekanntheit in manchen EU-Ländern"
    ],
    beschreibung: "Das EU Ecolabel ist das offizielle Umweltzeichen der Europäischen Union. Es wird an Produkte und Dienstleistungen vergeben, die während ihres gesamten Lebenszyklus geringere Umweltauswirkungen haben."
  },
  {
    id: "nordic-swan",
    name: "Nordic Swan Ecolabel",
    logo: "/images/blog/nordic-swan-logo.png",
    placeholder: true,
    region: "Nordische Länder",
    seit: 1989,
    fokus: ["Lebenszyklus-Ansatz", "Klimaauswirkungen", "Chemikalienbelastung"],
    vertrauenswürdigkeit: 4.5,
    marktrelevanz: 3,
    standards: "Sehr hoch",
    kosten: "Mittel",
    kategorien: ["reinigungsmittel", "dienstleistungen"],
    vorteile: [
      "Umfassende Lebenszyklusanalyse",
      "Strenge Chemikalien-Regulierung",
      "Hohe Bekanntheit in nordischen Ländern"
    ],
    nachteile: [
      "In Mitteleuropa weniger bekannt",
      "Aufwändiger Zertifizierungsprozess"
    ],
    beschreibung: "Der Nordic Swan ist das offizielle Umweltzeichen der nordischen Länder. Es berücksichtigt die Umweltauswirkungen eines Produkts über seinen gesamten Lebenszyklus – von der Rohstoffgewinnung über die Produktion und Verwendung bis hin zur Entsorgung."
  },
  {
    id: "cradle-to-cradle",
    name: "Cradle to Cradle",
    logo: "/images/blog/cradle-to-cradle-logo.png",
    placeholder: true,
    region: "International",
    seit: 2010,
    fokus: ["Kreislaufwirtschaft", "Materialgesundheit", "Soziale Gerechtigkeit"],
    vertrauenswürdigkeit: 4,
    marktrelevanz: 3.5,
    standards: "Hoch",
    kosten: "Hoch",
    kategorien: ["reinigungsmittel", "geraete", "dienstleistungen"],
    vorteile: [
      "Ganzheitlicher Ansatz der Kreislaufwirtschaft",
      "Abstufungen der Zertifizierung (Basic bis Platinum)",
      "Zukunftsweisende Philosophie"
    ],
    nachteile: [
      "Relativ hohe Kosten",
      "Komplexes Zertifizierungsverfahren",
      "Begrenzte Verfügbarkeit im Reinigungssektor"
    ],
    beschreibung: "Cradle to Cradle steht für einen konsequenten Kreislaufansatz. Produkte werden so konzipiert, dass alle Materialien nach der Nutzung entweder als biologische Nährstoffe in Kreisläufe zurückkehren oder als technische Nährstoffe kontinuierlich wiederverwendet werden können."
  },
  {
    id: "ecocert",
    name: "Ecocert",
    logo: "/images/blog/ecocert-logo.png",
    placeholder: true,
    region: "International",
    seit: 1991,
    fokus: ["Biologische Rohstoffe", "Umweltmanagement", "Transparenz"],
    vertrauenswürdigkeit: 4,
    marktrelevanz: 3.5,
    standards: "Mittel bis Hoch",
    kosten: "Mittel",
    kategorien: ["reinigungsmittel"],
    vorteile: [
      "Fokus auf natürliche Inhaltsstoffe",
      "International anerkannt",
      "Verschiedene Stufen (Ecocert, Ecocert Greenlife)"
    ],
    nachteile: [
      "Hauptsächlich für Reinigungsmittel, nicht für Dienstleistungen",
      "Weniger streng als einige andere Standards"
    ],
    beschreibung: "Ecocert ist eine international tätige Zertifizierungsorganisation für nachhaltige Entwicklung. Der Standard für ökologische Reinigungs- und Waschmittel garantiert, dass diese biologisch abbaubar sind und einen Mindestanteil an natürlichen Inhaltsstoffen enthalten."
  },
  {
    id: "iso-14001",
    name: "ISO 14001",
    logo: "/images/blog/iso-14001-logo.png",
    placeholder: true,
    region: "International",
    seit: 1996,
    fokus: ["Umweltmanagement", "Prozessoptimierung", "Kontinuierliche Verbesserung"],
    vertrauenswürdigkeit: 4,
    marktrelevanz: 5,
    standards: "Mittel",
    kosten: "Hoch",
    kategorien: ["dienstleistungen", "unternehmen"],
    vorteile: [
      "Weltweit anerkannter Standard",
      "Systematischer Managementansatz",
      "Gut integrierbar mit anderen ISO-Normen"
    ],
    nachteile: [
      "Legt keine konkreten Umweltleistungen fest",
      "Zertifiziert Prozesse, nicht Produkte",
      "Hoher Dokumentationsaufwand"
    ],
    beschreibung: "ISO 14001 ist ein internationaler Standard für Umweltmanagementsysteme. Er spezifiziert Anforderungen für ein effektives Umweltmanagementsystem, das Unternehmen hilft, ihre Umweltleistung zu verbessern und gesetzliche Vorgaben einzuhalten."
  },
  {
    id: "emas",
    name: "EMAS",
    logo: "/images/blog/emas-logo.png",
    placeholder: true,
    region: "Europäische Union",
    seit: 1993,
    fokus: ["Umweltmanagement", "Transparenz", "Rechtskonformität"],
    vertrauenswürdigkeit: 4.5,
    marktrelevanz: 3.5,
    standards: "Sehr hoch",
    kosten: "Hoch",
    kategorien: ["dienstleistungen", "unternehmen"],
    vorteile: [
      "Geht über ISO 14001 hinaus",
      "Verpflichtende Umwelterklärung schafft Transparenz",
      "Starke behördliche Anerkennung in der EU"
    ],
    nachteile: [
      "Hoher Implementierungsaufwand",
      "Vorrangig in Europa relevant",
      "Höhere Kosten als ISO 14001"
    ],
    beschreibung: "Das Eco-Management and Audit Scheme (EMAS) ist ein freiwilliges Instrument der EU, das Unternehmen und Organisationen jeder Größe und Branche dabei unterstützt, ihre Umweltleistung kontinuierlich zu verbessern."
  }
]

// Komponente für Sternebewertung
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

// Hauptkomponente
const UmweltZertifikateVergleich = () => {
  const [ausgewaehlteKategorien, setAusgewaehlteKategorien] = useState<string[]>([]);
  const [sortieren, setSortieren] = useState<string>('vertrauenswürdigkeit');
  const [suchbegriff, setSuchbegriff] = useState<string>('');
  
  // Filter und Sortierung anwenden
  const gefilterteZertifikate = zertifikate
    .filter(zertifikat => {
      // Filter nach Kategorien
      if (ausgewaehlteKategorien.length > 0) {
        if (!zertifikat.kategorien.some(kategorie => ausgewaehlteKategorien.includes(kategorie))) {
          return false;
        }
      }
      
      // Filter nach Suchbegriff
      if (suchbegriff.trim() !== '') {
        const suchtext = suchbegriff.toLowerCase();
        return (
          zertifikat.name.toLowerCase().includes(suchtext) ||
          zertifikat.beschreibung.toLowerCase().includes(suchtext) ||
          zertifikat.region.toLowerCase().includes(suchtext)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sortierung
      if (sortieren === 'vertrauenswürdigkeit') {
        return b.vertrauenswürdigkeit - a.vertrauenswürdigkeit;
      } else if (sortieren === 'marktrelevanz') {
        return b.marktrelevanz - a.marktrelevanz;
      } else if (sortieren === 'alter') {
        return a.seit - b.seit;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  
  // Funktion zum Umschalten der Kategorie-Filter
  const toggleKategorie = (kategorie: string) => {
    if (ausgewaehlteKategorien.includes(kategorie)) {
      setAusgewaehlteKategorien(ausgewaehlteKategorien.filter(k => k !== kategorie));
    } else {
      setAusgewaehlteKategorien([...ausgewaehlteKategorien, kategorie]);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Filter und Sortierung */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium">Filtern nach Kategorie:</label>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={ausgewaehlteKategorien.includes('reinigungsmittel') ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleKategorie('reinigungsmittel')}
                >
                  Reinigungsmittel
                </Badge>
                <Badge 
                  variant={ausgewaehlteKategorien.includes('geraete') ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleKategorie('geraete')}
                >
                  Geräte
                </Badge>
                <Badge 
                  variant={ausgewaehlteKategorien.includes('dienstleistungen') ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleKategorie('dienstleistungen')}
                >
                  Dienstleistungen
                </Badge>
                <Badge 
                  variant={ausgewaehlteKategorien.includes('unternehmen') ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleKategorie('unternehmen')}
                >
                  Unternehmenszertifikate
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Sortieren nach:</label>
              <div className="flex flex-wrap gap-2">
                <select 
                  className="border rounded p-2 text-sm w-full"
                  value={sortieren}
                  onChange={(e) => setSortieren(e.target.value)}
                >
                  <option value="vertrauenswürdigkeit">Vertrauenswürdigkeit</option>
                  <option value="marktrelevanz">Marktrelevanz</option>
                  <option value="alter">Alter (älteste zuerst)</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabelle mit allen Zertifikaten */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Zertifikat</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Seit</TableHead>
              <TableHead>Vertrauenswürdigkeit</TableHead>
              <TableHead>Marktrelevanz</TableHead>
              <TableHead>Standards</TableHead>
              <TableHead className="text-right">Kosten</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gefilterteZertifikate.map((zertifikat) => (
              <TableRow key={zertifikat.id} className="cursor-pointer hover:bg-slate-50" onClick={() => {}}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 bg-gray-100 rounded">
                      {zertifikat.placeholder ? (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <FileText className="w-5 h-5" />
                        </div>
                      ) : (
                        <Image
                          src={zertifikat.logo}
                          alt={zertifikat.name}
                          fill
                          className="object-contain p-1"
                        />
                      )}
                    </div>
                    <span>{zertifikat.name}</span>
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>{zertifikat.region}</span>
                </TableCell>
                <TableCell>{zertifikat.seit}</TableCell>
                <TableCell>
                  <StarRating rating={zertifikat.vertrauenswürdigkeit} />
                </TableCell>
                <TableCell>
                  <StarRating rating={zertifikat.marktrelevanz} />
                </TableCell>
                <TableCell>{zertifikat.standards}</TableCell>
                <TableCell className="text-right">{zertifikat.kosten}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Details - Tabs für die beliebtesten Zertifikate */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Top 3 Zertifikate im Detail</h4>
        <Tabs defaultValue="blauer-engel">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blauer-engel">Blauer Engel</TabsTrigger>
            <TabsTrigger value="eu-ecolabel">EU Ecolabel</TabsTrigger>
            <TabsTrigger value="iso-14001">ISO 14001</TabsTrigger>
          </TabsList>
          
          {["blauer-engel", "eu-ecolabel", "iso-14001"].map((id) => {
            const cert = zertifikate.find(z => z.id === id);
            if (!cert) return null;
            
            return (
              <TabsContent key={id} value={id} className="p-6 border rounded-md mt-2 bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Überblick</h4>
                    <Paragraph className="text-sm mb-4">
                      {cert.beschreibung}
                    </Paragraph>
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Region:</span>
                      <span className="text-sm">{cert.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Etabliert:</span>
                      <span className="text-sm">{cert.seit}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Schwerpunkte</h4>
                    <ul className="space-y-1">
                      {cert.fokus.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Vor- und Nachteile</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-1 text-green-600 font-medium text-sm mb-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Vorteile</span>
                        </div>
                        <ul className="space-y-1">
                          {cert.vorteile.map((item, index) => (
                            <li key={index} className="text-sm ps-4 relative">
                              <span className="absolute left-0">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 text-amber-600 font-medium text-sm mb-1">
                          <ThumbsDown className="w-4 h-4" />
                          <span>Nachteile</span>
                        </div>
                        <ul className="space-y-1">
                          {cert.nachteile.map((item, index) => (
                            <li key={index} className="text-sm ps-4 relative">
                              <span className="absolute left-0">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
      
      <Paragraph className="text-sm text-slate-600">
        Hinweis: Alle Bewertungen basieren auf dem aktuellen Stand (März 2025) und wurden anhand objektiver Kriterien wie Marktdurchdringung, Transparenz, Strenge der Standards und unabhängiger Prüfungsverfahren ermittelt.
      </Paragraph>
    </div>
  );
};

export default UmweltZertifikateVergleich;