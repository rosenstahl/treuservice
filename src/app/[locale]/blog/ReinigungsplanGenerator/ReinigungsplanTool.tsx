"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building, 
  Download, 
  Share2, 
  Calendar, 
  Clock, 
  ClipboardList, 
  Users, 
  FileText,
  Printer,
  ShieldCheck,
  Sparkles,
  Droplets
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { H3 } from "@/components/ui/typography";

type ReinigungsbereichType = {
  name: string;
  aufgaben: {
    taeglich?: string[];
    woechentlich?: string[];
    monatlich?: string[];
    quartalsweise?: string[];
  };
};

type ObjektType = {
  name: string;
  bereiche: string[];
};

const OBJEKT_TYPEN: ObjektType[] = [
  {
    name: "Büro",
    bereiche: ["Arbeitsplätze", "Besprechungsräume", "Sanitärbereiche", "Küche/Kaffeeecke", "Empfang/Eingang", "Flure und Treppen"]
  },
  {
    name: "Arztpraxis",
    bereiche: ["Wartezimmer", "Behandlungsräume", "Sanitärbereiche", "Empfang", "Personal- und Aufenthaltsräume", "Flure und Verkehrswege"]
  },
  {
    name: "Gewerbeobjekt",
    bereiche: ["Verkaufsflächen", "Lagerbereiche", "Sanitärbereiche", "Personalräume", "Eingangsbereich", "Büroflächen"]
  },
  {
    name: "Produktionsstätte",
    bereiche: ["Produktionshallen", "Sanitärbereiche", "Büros", "Umkleideräume", "Kantine/Pausenraum", "Lagerbereiche"]
  },
  {
    name: "Bildungseinrichtung",
    bereiche: ["Klassenzimmer/Hörsäle", "Sanitärbereiche", "Flure und Treppen", "Mensa/Cafeteria", "Verwaltung", "Eingangsbereiche"]
  }
];

const REINIGUNGSBEREICHE: { [key: string]: ReinigungsbereichType } = {
  "Arbeitsplätze": {
    name: "Arbeitsplätze/Büros",
    aufgaben: {
      taeglich: [
        "Papierkörbe leeren und bei Bedarf reinigen",
        "Sichtbare Verschmutzungen an Arbeitsflächen beseitigen",
        "Getränkeflecken auf Tischen entfernen"
      ],
      woechentlich: [
        "Staubwischen aller zugänglichen Oberflächen",
        "Abwischen von Telefonen und Bildschirmen",
        "Reinigung der Bodenbeläge (saugen/wischen)",
        "Entfernen von Fingerabdrücken an Türen/Griffen/Flächen"
      ],
      monatlich: [
        "Gründliche Reinigung von Tastatur/Maus mit geeigneten Reinigern",
        "Staub von schwer zugänglichen Bereichen entfernen",
        "Reinigung von Fensterbretter und Heizkörpern"
      ],
      quartalsweise: [
        "Reinigung von Beleuchtungskörpern",
        "Grundreinigung von Teppichböden",
        "Innenreinigung von Schränken nach Absprache"
      ]
    }
  },
  "Besprechungsräume": {
    name: "Besprechungs-/Konferenzräume",
    aufgaben: {
      taeglich: [
        "Tischflächen abwischen und desinfizieren",
        "Papierkörbe leeren",
        "Aufräumen von Stühlen und Konferenztischen",
        "Entfernung von Gläsern/Geschirr"
      ],
      woechentlich: [
        "Staubsaugen/Wischen des Bodens",
        "Reinigung der Whiteboards/Schreibflächen",
        "Abstauben aller horizontalen Flächen",
        "Fleckenentfernung auf Polstermöbeln"
      ],
      monatlich: [
        "Reinigung der technischen Geräte (Projektoren, Bildschirme)",
        "Fensterbretter und Heizkörper säubern",
        "Gründliches Reinigen der Türen und Türrahmen"
      ],
      quartalsweise: [
        "Polster- und Stuhlreinigung",
        "Reinigung von Leuchten und Deckenstrahlern",
        "Fensterreinigung innen"
      ]
    }
  },
  "Sanitärbereiche": {
    name: "Sanitärbereiche/Toiletten",
    aufgaben: {
      taeglich: [
        "WCs und Urinale gründlich reinigen und desinfizieren",
        "Waschbecken und Armaturen reinigen und polieren",
        "Seifen- und Handtuchspender auffüllen und reinigen",
        "Spiegel streifenfrei reinigen",
        "Bodenflächen nass reinigen und desinfizieren",
        "Abfallbehälter leeren und reinigen"
      ],
      woechentlich: [
        "Fliesen auf Spritzwasser kontrollieren und reinigen",
        "Türgriffe und Lichtschalter desinfizieren",
        "Toilettenbürsten reinigen/austauschen",
        "Entkalken der Armaturen"
      ],
      monatlich: [
        "Wandfliesen komplett reinigen",
        "Entlüftungsgitter reinigen",
        "Zwischenreinigung der Fugen",
        "Gründliche Reinigung/Desinfektion der Abfallbehälter"
      ],
      quartalsweise: [
        "Grundreinigung der Bodenflächen (inkl. Fugen)",
        "Deckenreinigung (Spinnweben entfernen)",
        "Entkalken der Toiletten und Urinale",
        "Kontrolle der Silikonfugen"
      ]
    }
  },
  "Küche/Kaffeeecke": {
    name: "Küche/Kaffeeecke",
    aufgaben: {
      taeglich: [
        "Arbeitsflächen reinigen und desinfizieren",
        "Spülbecken reinigen und polieren",
        "Kaffee- und Wasserkocher außen abwischen",
        "Tische und Stühle reinigen",
        "Boden feucht wischen",
        "Abfall entsorgen"
      ],
      woechentlich: [
        "Innenseiten der Mikrowelle reinigen",
        "Außenflächen von Kühlschrank reinigen",
        "Fronten der Schränke reinigen",
        "Entfernen von Fingerabdrücken an allen Oberflächen",
        "Entkalken der Kaffeemaschine"
      ],
      monatlich: [
        "Innenreinigung des Kühlschranks (Absprache mit Nutzern)",
        "Schubladen und Schränke außen gründlich reinigen",
        "Herd/Kochplatten gründlich reinigen",
        "Entfetten von Wandfliesen"
      ],
      quartalsweise: [
        "Reinigung der Dunstabzugshaube (falls vorhanden)",
        "Schrankinnenräume nach Absprache reinigen",
        "Grundreinigung des Bodens",
        "Entkalken aller wasserführenden Geräte"
      ]
    }
  },
  "Empfang/Eingang": {
    name: "Empfang/Eingangsbereich",
    aufgaben: {
      taeglich: [
        "Saugen/Wischen des Bodens",
        "Abstauben des Empfangstresens",
        "Glas- und Türflächen von Fingerabdrücken befreien",
        "Mülleimer leeren",
        "Sitzgelegenheiten ordnen und abwischen"
      ],
      woechentlich: [
        "Glasflächen reinigen",
        "Pflanzen abstauben und prüfen",
        "Sitzpolster absaugen",
        "Reinigung von Dekorationselementen"
      ],
      monatlich: [
        "Gründliche Reinigung von Bilderrahmen und Beschilderungen",
        "Tiefenreinigung von Sitzgelegenheiten",
        "Reinigung von schwer zugänglichen Bereichen"
      ],
      quartalsweise: [
        "Polster- und Textilreinigung aller Sitzgelegenheiten",
        "Reinigung von Leuchten",
        "Fassadenelemente innen reinigen"
      ]
    }
  },
  "Flure und Treppen": {
    name: "Flure und Treppenhäuser",
    aufgaben: {
      taeglich: [
        "Bodenbeläge saugen/wischen",
        "Handläufe abwischen und desinfizieren",
        "Aufzugbedienelemente reinigen",
        "Fingerspuren an Türen und Wänden entfernen",
        "Papierkörbe leeren"
      ],
      woechentlich: [
        "Staubwischen horizontaler Flächen",
        "Treppenhandläufe gründlich reinigen",
        "Staubentfernung in Ecken und Kanten",
        "Fleckenentfernung auf Bodenbelägen"
      ],
      monatlich: [
        "Reinigung von Beschilderungen und Hinweistafeln",
        "Heizungsverkleidungen/Heizkörper reinigen",
        "Türrahmen und -blätter gründlich reinigen"
      ],
      quartalsweise: [
        "Grundreinigung des Bodenbelags",
        "Reinigung von Beleuchtungskörpern",
        "Spinnweben entfernen (auch in Höhe)",
        "Reinigung von Geländern/Handläufen mit Spezialreiniger"
      ]
    }
  },
  "Wartezimmer": {
    name: "Wartezimmer",
    aufgaben: {
      taeglich: [
        "Boden saugen/wischen",
        "Stühle und Sitzflächen desinfizieren",
        "Zeitschriften ordnen und aussortieren",
        "Türklinken und Lichtschalter desinfizieren",
        "Papierkörbe leeren und desinfizieren",
        "Abwischen aller Kontaktflächen"
      ],
      woechentlich: [
        "Spielzeugbereiche desinfizieren (falls vorhanden)",
        "Pflanzen abstauben und pflegen",
        "Bilderrahmen und Dekoration abstauben",
        "Staubsaugen von Polstermöbeln",
        "Desinfizieren von Zeitschriftenständern"
      ],
      monatlich: [
        "Reinigung von Fensterbänken und Heizkörpern",
        "Gründliche Reinigung der Sitzmöbel",
        "Reinigung schwer zugänglicher Bereiche",
        "Desinfektion aller Oberflächen mit Spezialmitteln"
      ],
      quartalsweise: [
        "Tiefenreinigung der Polstermöbel",
        "Grundreinigung des Bodenbelags",
        "Reinigung von Beleuchtungskörpern",
        "Fensterreinigung innen"
      ]
    }
  },
  "Behandlungsräume": {
    name: "Behandlungsräume",
    aufgaben: {
      taeglich: [
        "Boden nass wischen und desinfizieren",
        "Behandlungsliege reinigen und desinfizieren",
        "Arbeitsflächen und Ablageflächen desinfizieren",
        "Waschbecken und Armatur reinigen und desinfizieren",
        "Türgriffe und Lichtschalter desinfizieren",
        "Abfallbehälter leeren und desinfizieren",
        "Instrumentenschränke äußerlich desinfizieren"
      ],
      woechentlich: [
        "Wandflächen im Spritzbereich desinfizieren",
        "Medizinische Geräte außen abstauben (falls vereinbart)",
        "Schränke außen gründlich reinigen",
        "Desinfizierung aller horizontalen Flächen"
      ],
      monatlich: [
        "Deckenleuchten abstauben",
        "Fliesen und Fugen gründlich reinigen",
        "Schubladengriffe und Schranktüren desinfizieren",
        "Reinigung von Behandlungsstühlen mit Spezialreiniger"
      ],
      quartalsweise: [
        "Grundreinigung nach RKI-Richtlinien",
        "Fensterreinigung innen",
        "Desinfizierende Grundreinigung aller Flächen",
        "Inventarreinigung nach Absprache"
      ]
    }
  },
  "Verkaufsflächen": {
    name: "Verkaufsflächen",
    aufgaben: {
      taeglich: [
        "Bodenbeläge saugen/wischen",
        "Kassenbereich reinigen",
        "Eingangsbereich und Türen reinigen",
        "Abfallbehälter leeren",
        "Verkaufstheken abwischen",
        "Fingerabdrücke von Glasflächen entfernen"
      ],
      woechentlich: [
        "Staubwischen von Regalen und Ausstellungsflächen",
        "Pflanzen abstauben und pflegen",
        "Glas- und Spiegelflächen reinigen",
        "Entfernen von Produktresten/Etiketten"
      ],
      monatlich: [
        "Reinigung der Produktdisplays",
        "Entfernen von Kaugummi und hartnäckigen Verschmutzungen",
        "Fußleisten und Ecken gründlich reinigen",
        "Reinigung von Ausstellungsständern"
      ],
      quartalsweise: [
        "Grundreinigung des Bodenbelags",
        "Reinigung von Leuchtwerbung und Beschilderung",
        "Fensterreinigung innen",
        "Reinigung von Regalsystemen (nach Absprache)"
      ]
    }
  },
  "Lagerbereiche": {
    name: "Lagerbereiche",
    aufgaben: {
      taeglich: [
        "Hauptverkehrswege kehren/wischen",
        "Verpackungsmaterial entsorgen",
        "Entleerung der Abfallbehälter",
        "Sichtbare Verschmutzungen beseitigen"
      ],
      woechentlich: [
        "Reinigung des gesamten Bodenbereichs",
        "Staubwischen von zugänglichen Oberflächen",
        "Reinigung von Verladeflächen",
        "Türen und Tore reinigen"
      ],
      monatlich: [
        "Entfernen von Spinnweben",
        "Reinigung von Laderampen",
        "Säuberung von Lagerregalen (zugängliche Bereiche)",
        "Reinigung von Feuerlöschern und Sicherheitseinrichtungen"
      ],
      quartalsweise: [
        "Grundreinigung des Betonbodens",
        "Maschinenreinigung nach Absprache",
        "Reinigung von Rolltoren und Industrietüren",
        "Beleuchtungskörper reinigen"
      ]
    }
  },
  "Produktionshallen": {
    name: "Produktionshallen",
    aufgaben: {
      taeglich: [
        "Kehrarbeiten in Hauptverkehrswegen",
        "Entsorgung von Produktionsabfällen",
        "Reinigung von Pausenbereichen",
        "Tägliche Sichtreinigung nach Arbeitsende"
      ],
      woechentlich: [
        "Nassreinigung der Bodenflächen",
        "Reinigung von Arbeitsbereichen",
        "Entfernen von Öl- und Schmierspuren",
        "Reinigung von Sozialbereichen"
      ],
      monatlich: [
        "Gründliche Reinigung aller Verkehrswege",
        "Maschinenumfeld reinigen (ohne Maschinen)",
        "Entfernen von Spinnweben und Staub in der Höhe",
        "Reinigung von Sicherheits- und Warnmarkierungen"
      ],
      quartalsweise: [
        "Grundreinigung der Industrieböden",
        "Reinigung von Trennwänden und Zwischenwänden",
        "Beleuchtungsreinigung (nach Absprache)",
        "Reinigung von Lüftungsauslässen"
      ]
    }
  },
  "Umkleideräume": {
    name: "Umkleide-/Sozialräume",
    aufgaben: {
      taeglich: [
        "Böden nass reinigen und desinfizieren",
        "Bänke und Sitzflächen reinigen und desinfizieren",
        "Abfallbehälter leeren und reinigen",
        "Türgriffe und Schließfächer außen abwischen",
        "Duschen und Waschbecken reinigen und desinfizieren"
      ],
      woechentlich: [
        "Wandfliesen in Duschen komplett reinigen",
        "Spinde außen reinigen",
        "Duschabflüsse reinigen",
        "Entfernen von Kalkablagerungen"
      ],
      monatlich: [
        "Gründliche Reinigung und Desinfektion aller Oberflächen",
        "Entkalken der Duschen und Armaturen",
        "Entlüftungsgitter reinigen",
        "Türrahmen und -blätter desinfizieren"
      ],
      quartalsweise: [
        "Grundreinigung der Bodenflächen mit Desinfektionsreiniger",
        "Tiefenreinigung der Fugen",
        "Entfeuchtung und Schimmelprävention",
        "Spindreihen verschieben und dahinter reinigen"
      ]
    }
  },
  "Kantine/Pausenraum": {
    name: "Kantine/Pausenraum",
    aufgaben: {
      taeglich: [
        "Tische und Stühle reinigen und desinfizieren",
        "Boden feucht wischen",
        "Mikrowelle und Küchengeräte außen reinigen",
        "Ausgabetheken reinigen und desinfizieren",
        "Abfallbehälter leeren und reinigen",
        "Selbstbedienungsbereiche säubern"
      ],
      woechentlich: [
        "Stühle und Sitzgelegenheiten gründlich reinigen",
        "Mikrowelle innen reinigen",
        "Kühlschränke außen reinigen",
        "Automaten und Getränkespender außen reinigen",
        "Türen und Türgriffe desinfizieren"
      ],
      monatlich: [
        "Sitzpolster reinigen",
        "Fensterbänke und Heizkörper gründlich reinigen",
        "Entfetten von Wänden im Küchenbereich",
        "Kühlschränke innen reinigen (nach Ankündigung)"
      ],
      quartalsweise: [
        "Grundreinigung des Bodenbelags",
        "Reinigung von Beleuchtungskörpern",
        "Entlüftungsgitter der Klimaanlage reinigen",
        "Tiefenreinigung aller Elektrogeräte"
      ]
    }
  },
  "Klassenzimmer/Hörsäle": {
    name: "Klassenzimmer/Hörsäle",
    aufgaben: {
      taeglich: [
        "Böden kehren/saugen",
        "Tafeln/Whiteboards reinigen",
        "Papierkörbe leeren",
        "Tische und Stühle ordnen",
        "Lehrerpult/Dozentenpult reinigen",
        "Türgriffe und Lichtschalter reinigen"
      ],
      woechentlich: [
        "Böden feucht wischen",
        "Tisch- und Stuhloberflächen gründlich reinigen",
        "Staubwischen aller horizontalen Flächen",
        "Fingerabdrücke an Oberflächen entfernen",
        "Reinigung der Fensterbretter"
      ],
      monatlich: [
        "Entfernen von Kaugummi unter Tischen",
        "Stühle gründlich reinigen (auch Unterkonstruktion)",
        "Reinigung von Schränken außen",
        "Technische Geräte abstauben"
      ],
      quartalsweise: [
        "Grundreinigung der Böden",
        "Fensterreinigung innen",
        "Reinigung von Beleuchtungskörpern",
        "Tiefenreinigung der Bestuhlung",
        "Reinigung schwer zugänglicher Bereiche"
      ]
    }
  },
  "Personalräume": {
    name: "Personal-/Aufenthaltsräume",
    aufgaben: {
      taeglich: [
        "Böden saugen/wischen",
        "Tische und Arbeitsflächen reinigen",
        "Papierkörbe leeren",
        "Spüle und Küchenzeile reinigen",
        "Bestuhlung ordnen"
      ],
      woechentlich: [
        "Staubwischen aller horizontalen Flächen",
        "Außenflächen von Elektrogeräten reinigen",
        "Entfernen von Fingerabdrücken an Glasflächen",
        "Türgriffe und Lichtschalter desinfizieren"
      ],
      monatlich: [
        "Kühlschrank außen reinigen",
        "Gründliche Reinigung von Tischen und Stühlen",
        "Reinigung von Bilderrahmen und Wanddekorationen",
        "Schränke außen gründlich reinigen"
      ],
      quartalsweise: [
        "Grundreinigung der Bodenbeläge",
        "Polstermöbel reinigen",
        "Kühlschrank innen reinigen (nach Ankündigung)",
        "Reinigung von Leuchten und Lampen"
      ]
    }
  },
  "Büroflächen": {
    name: "Büroflächen",
    aufgaben: {
      taeglich: [
        "Papierkörbe leeren",
        "Sichtbare Verschmutzungen beseitigen",
        "Schreibtische aufräumen (nur freigeräumte Flächen)",
        "Türgriffe und Lichtschalter reinigen"
      ],
      woechentlich: [
        "Böden saugen/wischen",
        "Staubwischen zugänglicher Oberflächen",
        "Telefone desinfizieren",
        "Entfernen von Fingerabdrücken an Glasflächen"
      ],
      monatlich: [
        "Tastatur und Maus desinfizieren",
        "Bildschirme reinigen",
        "Fensterbretter und Heizkörper abstauben",
        "Türen und Türrahmen reinigen"
      ],
      quartalsweise: [
        "Grundreinigung der Bürostühle",
        "Fensterreinigung innen",
        "Tiefenreinigung der Böden",
        "Reinigung von Beleuchtungskörpern"
      ]
    }
  },
  "Verwaltung": {
    name: "Verwaltung/Büros",
    aufgaben: {
      taeglich: [
        "Papierkörbe leeren",
        "Sichtbare Verschmutzungen beseitigen",
        "Tische und Schreibtische abwischen (freigeräumt)",
        "Türgriffe und Lichtschalter reinigen"
      ],
      woechentlich: [
        "Böden saugen/wischen",
        "Staubwischen zugänglicher Oberflächen",
        "Telefone desinfizieren",
        "Entfernen von Fingerabdrücken an Glas- und Hochglanzflächen"
      ],
      monatlich: [
        "PC-Ausrüstung abstauben (ohne Haftung)",
        "Fensterbretter und Heizkörper reinigen",
        "Schränke außen abstauben",
        "Polierte Oberflächen auffrischen"
      ],
      quartalsweise: [
        "Tiefenreinigung der Bodenbeläge",
        "Polstermöbel und Bürostühle reinigen",
        "Reinigung von Beleuchtungskörpern",
        "Fensterreinigung innen"
      ]
    }
  },
  "Eingangsbereiche": {
    name: "Eingangsbereiche/Foyer",
    aufgaben: {
      taeglich: [
        "Boden feucht wischen/saugen",
        "Eingangstüren und Glasflächen von Fingerabdrücken befreien",
        "Abtreter/Schmutzfangmatten reinigen",
        "Empfangstresen reinigen",
        "Papierkörbe leeren",
        "Sitzmöbel ordnen und reinigen"
      ],
      woechentlich: [
        "Gründliche Reinigung der Glasflächen",
        "Pflanzen abstauben und pflegen",
        "Sitzgelegenheiten gründlich reinigen",
        "Info-Stände und Aushänge abstauben"
      ],
      monatlich: [
        "Reinigung von Beschilderungen",
        "Dekoration abstauben/reinigen",
        "Eingangsmatten gründlich reinigen/austauschen",
        "Intensive Reinigung von Glastüren"
      ],
      quartalsweise: [
        "Grundreinigung der Bodenbeläge",
        "Polstermöbel tiefenreinigen",
        "Leuchten und Lampen reinigen",
        "Hochgelegene Bereiche von Staub befreien"
      ]
    }
  }
};

const ReinigungsplanTool: React.FC = () => {
  // State-Variablen
  const [objektTyp, setObjektTyp] = useState<string>("Büro");
  const [objektName, setObjektName] = useState<string>("Mein Objekt");
  const [raumgroesse, setRaumgroesse] = useState<string>("101-500");
  const [reinigungsintensitaet, setReinigungsintensitaet] = useState<string>("standard");
  const [ausgewaehlteReinigungsbereiche, setAusgewaehlteReinigungsbereiche] = useState<string[]>([]);
  const [personalisierung, setPersonalisierung] = useState<{
    firmenname: string;
    verantwortlicher: string;
    mitarbeiter: string;
    kontakt: string;
  }>({
    firmenname: "",
    verantwortlicher: "",
    mitarbeiter: "",
    kontakt: ""
  });
  const [selectedTab, setSelectedTab] = useState<string>("objekttyp");
  const [generierterPlan, setGenerierterPlan] = useState<boolean>(false);
  const planRef = useRef<HTMLDivElement>(null);

  // Handler für Objekttyp-Änderung
  const handleObjektTypChange = (value: string) => {
    setObjektTyp(value);
    // Setze Standardbereiche basierend auf Objekttyp
    const bereiche = OBJEKT_TYPEN.find(typ => typ.name === value)?.bereiche || [];
    setAusgewaehlteReinigungsbereiche(bereiche);
  };

  // Handler für Checkbox-Änderungen der Reinigungsbereiche
  const handleBereichChange = (bereich: string, checked: boolean) => {
    if (checked) {
      setAusgewaehlteReinigungsbereiche(prev => [...prev, bereich]);
    } else {
      setAusgewaehlteReinigungsbereiche(prev => prev.filter(item => item !== bereich));
    }
  };

  // Handler für Personalisierungsdaten
  const handlePersonalisierungChange = (field: keyof typeof personalisierung, value: string) => {
    setPersonalisierung(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Funktion zum Generieren des Reinigungsplans
  const generateReinigungsplan = () => {
    setGenerierterPlan(true);
    setSelectedTab("preview");
    // Ein bisschen Zeit geben zum Rendern
    setTimeout(() => {
      if (planRef.current) {
        planRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Druckfunktion
  const handlePrint = () => {
    if (planRef.current) {
      const printContent = planRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Reinigungsplan - ${objektName}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .card { margin-bottom: 25px; border: 1px solid #ddd; border-radius: 5px; padding: 15px; }
                .card-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
                .task-list { padding-left: 20px; }
                .contact-info { margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px; }
                @media print {
                  .card { break-inside: avoid; }
                  body { font-size: 12px; }
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
    }
  };

  // Funktion zum Herunterladen als PDF (würde in der echten Implementierung über server-seitiges PDF-Rendering gehen)
  const handleDownload = () => {
    alert("In der vollständigen Implementation würde hier ein PDF zum Download generiert werden. Diese Funktion ist im Demo-Modus nicht verfügbar.");
  };

  // Tab-Navigation
  const handleNextTab = () => {
    switch(selectedTab) {
      case "objekttyp":
        setSelectedTab("bereiche");
        break;
      case "bereiche":
        setSelectedTab("personalisierung");
        break;
      case "personalisierung":
        generateReinigungsplan();
        break;
      default:
        break;
    }
  };

  const handlePrevTab = () => {
    switch(selectedTab) {
      case "bereiche":
        setSelectedTab("objekttyp");
        break;
      case "personalisierung":
        setSelectedTab("bereiche");
        break;
      case "preview":
        setSelectedTab("personalisierung");
        setGenerierterPlan(false);
        break;
      default:
        break;
    }
  };

  // Berechne Intensitätsfaktor für Aufgaben
  const getIntensityFactor = () => {
    switch (reinigungsintensitaet) {
      case "minimal": return 0.7;  // Reduziert Häufigkeit
      case "standard": return 1;   // Standard
      case "intensiv": return 1.3; // Erhöht Häufigkeit
      default: return 1;
    }
  };

  // Generiere Hinweistext basierend auf Raumgröße und Intensität
  const getAdviceText = () => {
    let groesseText = "";
    let intensitaetText = "";
    
    switch (raumgroesse) {
      case "bis-100":
        groesseText = "Bei kleinen Flächen bis 100m² empfehlen wir, vor allem auf Qualität statt Quantität zu achten.";
        break;
      case "101-500":
        groesseText = "Mittlere Objekte benötigen eine ausgewogene Balance zwischen Reinigungsintensität und Effizienz.";
        break;
      case "501-1000":
        groesseText = "Für größere Flächen von 501-1000m² ist ein systematischer Ansatz mit klaren Zuständigkeiten besonders wichtig.";
        break;
      case "ueber-1000":
        groesseText = "Bei Großobjekten über 1000m² sollten Sie über professionelle Reinigungsdienste mit industriellen Reinigungsmaschinen nachdenken.";
        break;
      default:
        groesseText = "";
    }
    
    switch (reinigungsintensitaet) {
      case "minimal":
        intensitaetText = "Die minimale Reinigungsintensität deckt grundlegende Hygieneanforderungen ab, kann aber bei stark frequentierten Bereichen nicht ausreichend sein.";
        break;
      case "standard":
        intensitaetText = "Die Standardreinigung bietet eine gute Balance zwischen Aufwand und Ergebnis für die meisten kommerziellen Objekte.";
        break;
      case "intensiv":
        intensitaetText = "Intensive Reinigung ist besonders für medizinische Einrichtungen, Lebensmittelbereiche und hochwertige Repräsentationsflächen zu empfehlen.";
        break;
      default:
        intensitaetText = "";
    }
    
    return `${groesseText} ${intensitaetText}`;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" />
          Interaktiver Reinigungsplan-Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          {/* Tab-Navigation */}
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="objekttyp" disabled={selectedTab === "preview"}>
              <Building className="w-4 h-4 mr-2 hidden sm:inline" />
              Objekttyp
            </TabsTrigger>
            <TabsTrigger value="bereiche" disabled={selectedTab === "preview"}>
              <ClipboardList className="w-4 h-4 mr-2 hidden sm:inline" />
              Bereiche
            </TabsTrigger>
            <TabsTrigger value="personalisierung" disabled={selectedTab === "preview"}>
              <Users className="w-4 h-4 mr-2 hidden sm:inline" />
              Personalisierung
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!generierterPlan}>
              <FileText className="w-4 h-4 mr-2 hidden sm:inline" />
              Vorschau
            </TabsTrigger>
          </TabsList>

          {/* Objekttyp-Tab */}
          <TabsContent value="objekttyp" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="objektName">Name Ihres Objekts</Label>
                  <Input 
                    id="objektName" 
                    value={objektName} 
                    onChange={(e) => setObjektName(e.target.value)} 
                    placeholder="z.B. Bürogebäude Musterstraße"
                  />
                </div>
                
                <div>
                  <Label>Objekttyp</Label>
                  <Select value={objektTyp} onValueChange={handleObjektTypChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen Sie einen Objekttyp" />
                    </SelectTrigger>
                    <SelectContent>
                      {OBJEKT_TYPEN.map((typ) => (
                        <SelectItem key={typ.name} value={typ.name}>
                          {typ.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Größe des Objekts (m²)</Label>
                  <RadioGroup 
                    value={raumgroesse} 
                    onValueChange={setRaumgroesse}
                    className="grid grid-cols-2 gap-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bis-100" id="bis-100" />
                      <Label htmlFor="bis-100">bis 100 m²</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="101-500" id="101-500" />
                      <Label htmlFor="101-500">101 - 500 m²</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="501-1000" id="501-1000" />
                      <Label htmlFor="501-1000">501 - 1000 m²</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ueber-1000" id="ueber-1000" />
                      <Label htmlFor="ueber-1000">über 1000 m²</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Reinigungsintensität</Label>
                  <RadioGroup 
                    value={reinigungsintensitaet} 
                    onValueChange={setReinigungsintensitaet}
                    className="grid grid-cols-1 gap-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="minimal" id="minimal" />
                      <Label htmlFor="minimal">Minimal (Basisreinigung)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard (ausgewogene Reinigung)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intensiv" id="intensiv" />
                      <Label htmlFor="intensiv">Intensiv (gründliche Reinigung)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Bereiche-Tab */}
          <TabsContent value="bereiche" className="space-y-4">
            <H3 className="text-lg font-semibold flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Zu reinigende Bereiche für {objektName}
            </H3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {OBJEKT_TYPEN.find(typ => typ.name === objektTyp)?.bereiche.map(bereich => (
                <div 
                  key={bereich} 
                  className="flex items-center space-x-2 p-3 border rounded-md hover:bg-slate-50"
                >
                  <Checkbox 
                    id={bereich} 
                    checked={ausgewaehlteReinigungsbereiche.includes(bereich)} 
                    onCheckedChange={(checked) => handleBereichChange(bereich, checked as boolean)}
                  />
                  <Label htmlFor={bereich} className="cursor-pointer flex-grow">
                    {bereich}
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Personalisierung-Tab */}
          <TabsContent value="personalisierung" className="space-y-4">
            <H3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Personalisierung des Reinigungsplans
            </H3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firmenname">Firmenname (optional)</Label>
                <Input 
                  id="firmenname" 
                  value={personalisierung.firmenname} 
                  onChange={(e) => handlePersonalisierungChange("firmenname", e.target.value)} 
                  placeholder="z.B. Musterfirma GmbH"
                />
              </div>
              
              <div>
                <Label htmlFor="verantwortlicher">Verantwortliche Person</Label>
                <Input 
                  id="verantwortlicher" 
                  value={personalisierung.verantwortlicher} 
                  onChange={(e) => handlePersonalisierungChange("verantwortlicher", e.target.value)} 
                  placeholder="z.B. Max Mustermann"
                />
              </div>
              
              <div>
                <Label htmlFor="mitarbeiter">Durchführende Mitarbeiter (optional)</Label>
                <Input 
                  id="mitarbeiter" 
                  value={personalisierung.mitarbeiter} 
                  onChange={(e) => handlePersonalisierungChange("mitarbeiter", e.target.value)} 
                  placeholder="z.B. Reinigungsteam A, Hausmeister"
                />
              </div>
              
              <div>
                <Label htmlFor="kontakt">Kontaktdaten (optional)</Label>
                <Input 
                  id="kontakt" 
                  value={personalisierung.kontakt} 
                  onChange={(e) => handlePersonalisierungChange("kontakt", e.target.value)} 
                  placeholder="z.B. Tel.: 030 12345678, E-Mail: kontakt@firma.de"
                />
              </div>
            </div>
          </TabsContent>

          {/* Vorschau-Tab */}
          <TabsContent value="preview" className="space-y-6">
            {generierterPlan && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <H3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Ihr personalisierter Reinigungsplan
                  </H3>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrint}
                      className="flex items-center gap-1"
                    >
                      <Printer className="h-4 w-4" />
                      <span className="hidden sm:inline">Drucken</span>
                    </Button>
                    
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={handleDownload}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Als PDF</span>
                    </Button>
                  </div>
                </div>
                
                <div ref={planRef} className="p-4 border rounded-lg bg-white">
                  {/* Header des Reinigungsplans */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Reinigungsplan</h2>
                    <h3 className="text-xl">{objektName}</h3>
                    {personalisierung.firmenname && (
                      <p>{personalisierung.firmenname}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      Erstellt am {new Date().toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  
                  {/* Hinweise zur Objektgröße und Reinigungsintensität */}
                  <div className="bg-primary/5 p-4 rounded-lg mb-6">
                    <p className="flex items-start gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{getAdviceText()}</span>
                    </p>
                  </div>
                  
                  {/* Bereiche */}
                  <div className="space-y-6">
                    {ausgewaehlteReinigungsbereiche.map(bereich => {
                      const bereichData = REINIGUNGSBEREICHE[bereich];
                      if (!bereichData) return null;
                      
                      return (
                        <div key={bereich} className="border rounded-lg p-4">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            {bereichData.name}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Tägliche Aufgaben */}
                            {bereichData.aufgaben.taeglich && (
                              <div className="border rounded p-3">
                                <h4 className="font-semibold mb-2 flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-red-600" />
                                  Tägliche Aufgaben
                                </h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {bereichData.aufgaben.taeglich.map((aufgabe, index) => (
                                    <li key={index} className="text-sm">{aufgabe}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Wöchentliche Aufgaben */}
                            {bereichData.aufgaben.woechentlich && (
                              <div className="border rounded p-3">
                                <h4 className="font-semibold mb-2 flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-orange-600" />
                                  Wöchentliche Aufgaben
                                </h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {bereichData.aufgaben.woechentlich.map((aufgabe, index) => (
                                    <li key={index} className="text-sm">{aufgabe}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Monatliche Aufgaben */}
                            {bereichData.aufgaben.monatlich && (
                              <div className="border rounded p-3">
                                <h4 className="font-semibold mb-2 flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-green-600" />
                                  Monatliche Aufgaben
                                </h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {bereichData.aufgaben.monatlich.map((aufgabe, index) => (
                                    <li key={index} className="text-sm">{aufgabe}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Quartalsweise Aufgaben */}
                            {bereichData.aufgaben.quartalsweise && (
                              <div className="border rounded p-3">
                                <h4 className="font-semibold mb-2 flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-blue-600" />
                                  Quartalsweise Aufgaben
                                </h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {bereichData.aufgaben.quartalsweise.map((aufgabe, index) => (
                                    <li key={index} className="text-sm">{aufgabe}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Verantwortlichkeiten */}
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-bold mb-2">Verantwortlichkeiten</h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr>
                          <td className="border p-2 font-semibold">Verantwortliche Person:</td>
                          <td className="border p-2">{personalisierung.verantwortlicher || "Nicht angegeben"}</td>
                        </tr>
                        {personalisierung.mitarbeiter && (
                          <tr>
                            <td className="border p-2 font-semibold">Durchführende Personen:</td>
                            <td className="border p-2">{personalisierung.mitarbeiter}</td>
                          </tr>
                        )}
                        {personalisierung.kontakt && (
                          <tr>
                            <td className="border p-2 font-semibold">Kontakt:</td>
                            <td className="border p-2">{personalisierung.kontakt}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Footer */}
                  <div className="mt-8 pt-2 border-t text-center text-sm text-muted-foreground">
                    <p>Reinigungsplan erstellt mit dem TREU Service Reinigungsplan-Generator</p>
                    <p className="mt-1">&copy; {new Date().getFullYear()} TREU Service</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
                  <p className="flex items-start gap-2">
                    <Droplets className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Tipp vom Experten:</strong> Achten Sie auf die Dokumentation der durchgeführten Reinigungsarbeiten. Sie können den erstellten Plan um entsprechende Kontrollfelder ergänzen. Für besonders anspruchsvolle Anforderungen oder komplexe Objekte empfehlen wir eine professionelle Beratung.
                    </span>
                  </p>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button className="w-full sm:w-auto" asChild>
                    <Link href="/reinigung">
                      Professionellen Reinigungsservice anfragen
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Navigation zwischen Tabs */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevTab} 
            disabled={selectedTab === "objekttyp"}
          >
            Zurück
          </Button>
          
          <Button 
            onClick={handleNextTab} 
            disabled={
              (selectedTab === "objekttyp" && (!objektTyp || !objektName)) ||
              (selectedTab === "bereiche" && ausgewaehlteReinigungsbereiche.length === 0) ||
              (selectedTab === "personalisierung" && !personalisierung.verantwortlicher) ||
              selectedTab === "preview"
            }
          >
            {selectedTab === "personalisierung" ? "Reinigungsplan erstellen" : "Weiter"}
          </Button>
        </div>

        {/* Teilen-Optionen */}
        {selectedTab === "preview" && generierterPlan && (
          <div className="mt-6 pt-6 border-t flex justify-center">
            <Button variant="outline" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>Reinigungsplan teilen</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReinigungsplanTool;