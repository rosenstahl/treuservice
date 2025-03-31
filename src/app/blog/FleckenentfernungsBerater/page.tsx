"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2, 
  Droplets, 
  Check, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  ArrowRight, 
  Lightbulb,
  Phone,
  Mail,
  CheckCircle2,
  Search,
  ArrowUpRight,
  Sparkles,
  X,
  MousePointerClick,
  ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { motion, AnimatePresence } from "framer-motion"
import loesungenData from './flecken-loesungen.json'

// Funktion zum Teilen des Inhalts
const ShareContent = (title: string, url: string) => {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).catch(error => {
      console.log('Error sharing', error);
    });
  } else {
    // Fallback für Browser ohne Web Share API
    navigator.clipboard.writeText(url).then(() => {
      alert('Link in die Zwischenablage kopiert!');
    });
  }
};

// TypeScript Interfaces
interface Fleckentyp {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  description: string;
}

interface Oberflaeche {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Loesung {
  einfach: string;
  fortgeschritten: string;
  profi: string;
  hinweis: string;
}

interface Loesungen {
  [key: string]: Loesung;
  default: Loesung;
}

// Daten für Fleckentypen
const fleckentypen: Fleckentyp[] = [
  { 
    id: "kaffee", 
    name: "Kaffee & Tee", 
    color: "amber",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" x2="6" y1="2" y2="4"></line><line x1="10" x2="10" y1="2" y2="4"></line><line x1="14" x2="14" y1="2" y2="4"></line></svg>,
    description: "Kaffeestain und Teeflecken können besonders auf hellen Flächen hartnäckig sein. Frische Flecken sind leichter zu entfernen."
  },
  { 
    id: "rotwein", 
    name: "Rotwein", 
    color: "red",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M8 22h8"></path><path d="M7 10h10"></path><path d="M12 15v7"></path><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"></path></svg>,
    description: "Weinflecken enthalten Tannine und Farbstoffe, die schnell in Fasern eindringen können."
  },
  { 
    id: "blut", 
    name: "Blut", 
    color: "red",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2v10"></path><path d="M8.65 14.35 12 17.7l3.35-3.35a4.73 4.73 0 0 0 .65-5.89A4.74 4.74 0 0 0 12 6a4.74 4.74 0 0 0-4 1.81 4.73 4.73 0 0 0 .65 5.89Z"></path><path d="M12 22v-4.3"></path></svg>,
    description: "Eiweißhaltige Flecken, die sich besonders durch falsche Behandlung (wie heißes Wasser) dauerhaft festsetzen können."
  },
  { 
    id: "tinte", 
    name: "Tinte & Kugelschreiber", 
    color: "blue",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17.8 3.2H6.2c-2 0-3.2 1.5-3.2 3.2v11.4c0 2 1.5 3.2 3.2 3.2h11.6c1.7 0 3.2-1.5 3.2-3.2V6.4c0-1.7-1.5-3.2-3.2-3.2Z"></path><path d="M7 12.5h7"></path><path d="M10.5 16V9"></path></svg>,
    description: "Farbintensive Flecken mit verschiedenen chemischen Zusammensetzungen je nach Tintenart."
  },
  { 
    id: "fett", 
    name: "Fett & Öl", 
    color: "yellow",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M19 4.2c-1.3-.4-2.6-.4-3.8 0-1.2.4-2.3 1.2-3 2.3-.6-1.1-1.5-2-2.7-2.6-1.3-.7-2.7-.7-4 0-1.9.7-3.2 2.4-3.2 4.5 0 3 3 6 8.1 13.4a1 1 0 0 0 1.4 0c3-4.6 5.7-7.8 7.5-10.4a1 1 0 1 0-1.7-1l-6 8.2-4.9-7.2c-.2-.3-.1-.8.2-1 .3-.3.8-.2 1.1.1l4 5.5a1 1 0 0 0 1.6 0l6-8.2A4.6 4.6 0 0 0 19 4.2z"></path></svg>,
    description: "Fetthaltige Flecken hinterlassen oft Rückstände und können bei falscher Behandlung in die Fasern eindringen."
  },
  { 
    id: "schimmel", 
    name: "Schimmel", 
    color: "green",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M11 3a8 8 0 0 1 8 8"></path><path d="M16.9 16.9a8 8 0 0 0-3.6-13.7"></path><path d="M13 20a8 8 0 0 1-8-8"></path><path d="M7.1 7.1a8 8 0 0 0 3.6 13.7"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    description: "Schimmelflecken sind oft mit Gesundheitsrisiken verbunden und erfordern gründliche, sichere Entfernung."
  },
  { 
    id: "urin", 
    name: "Urin", 
    color: "yellow",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M8 15.5c2.1 0 5.6 1.7 7 3L16 6l-8 7.5Z"></path><path d="M16 5h-5C8.8 5 6 7.8 6 10s2.8 5 5 5h3.4"></path></svg>,
    description: "Bei Urinflecken ist es wichtig, auch Gerüche zu entfernen und mögliche Bakterien abzutöten."
  },
  { 
    id: "schweiß", 
    name: "Schweiß", 
    color: "yellow",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M9 22v-7H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4v7"></path><path d="M9 2v5"></path><path d="M15 2v5"></path></svg>,
    description: "Schweißflecken enthalten Salze und Körperfette, die auf Kleidung zu Verfärbungen führen können."
  },
  { 
    id: "gras", 
    name: "Gras & Pflanzen", 
    color: "green",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17 14c0-4-4.5-1.5-5-6"></path><path d="M12 16v3a4 4 0 0 0 8 0v-3"></path><path d="M8 12a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0v-2a3 3 0 0 0-3-3z"></path><path d="M5 5v.5A2.5 2.5 0 0 0 7.5 8H8"></path><path d="M4 9a2 2 0 0 0 2 2h2"></path><path d="M10 4a2 2 0 0 0 2 2h2"></path></svg>,
    description: "Grünflecken enthalten oft Chlorophyll, das besonders auf hellen Textilien hartnäckig sein kann."
  },
  { 
    id: "kosmetik", 
    name: "Make-up & Kosmetik", 
    color: "purple",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 2a2 2 0 0 0-2 2"></path><path d="M4 10V4a2 2 0 0 1 2-2h8"></path><path d="M14 10V4a2 2 0 0 0-2-2"></path><path d="M8 22h8a2 2 0 0 0 2-2v-8H6v8a2 2 0 0 0 2 2Z"></path><path d="M10 2v8"></path><path d="M2 10h16"></path></svg>,
    description: "Je nach Kosmetikart können Flecken öl- oder wasserbasiert sein und erfordern unterschiedliche Lösungen."
  },
  { 
    id: "kaugummi", 
    name: "Kaugummi", 
    color: "blue",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path><path d="M15.8 15.8a6 6 0 0 0 0-8.5 6 6 0 0 0-8.5 0"></path><path d="M12 15.8V9"></path></svg>,
    description: "Kaugummi haftet stark an Fasern und kann durch herkömmliche Methoden nur schwer entfernt werden."
  },
  { 
    id: "rost", 
    name: "Rost", 
    color: "orange",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2v3"></path><path d="M18 9v3"></path><path d="M18 16v3"></path><path d="M6 18v3"></path><path d="M6 18a9 9 0 0 1 9-9h3a6 6 0 0 1-9 9H6z"></path></svg>,
    description: "Rostflecken enthalten Eisen und hinterlassen oft dauerhafte Schäden, wenn sie nicht richtig behandelt werden."
  }
];

// Daten für Oberflächen
const oberflaechen: Oberflaeche[] = [
  { 
    id: "teppich", 
    name: "Teppich & Teppichboden", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18H4z"></path><path d="M4 10h16"></path><path d="M10 2v8"></path><path d="M14 2v8"></path><path d="M10 14v4"></path><path d="M14 14v4"></path><path d="M10 22v-1"></path><path d="M14 22v-1"></path></svg>,
    description: "Fasrige Oberflächen, die Flüssigkeiten schnell aufsaugen und festhalten können."
  },
  { 
    id: "polster", 
    name: "Polstermöbel & Textilien", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M20 16V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8c0 1 1.1 2 2 2h12c.9 0 2-1 2-2z"></path><path d="M4 10h16"></path><path d="M10 2v6"></path><path d="M14 2v6"></path><path d="M18 20v2"></path><path d="M6 20v2"></path></svg>,
    description: "Verschiedene Textilfasern mit teils empfindlichen Oberflächen und Polsterungen."
  },
  { 
    id: "hartboden", 
    name: "Hartböden (Fliesen, Laminat)", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 3h18v18H3z"></path><path d="M12 3v18"></path><path d="M3 12h18"></path></svg>,
    description: "Glatte, harte Oberflächen, die meist weniger saugfähig, aber empfindlich gegen Kratzer sein können."
  },
  { 
    id: "holz", 
    name: "Holz & Furniere", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"></path><path d="M4 9h16"></path><path d="M4 15h16"></path></svg>,
    description: "Natürliche, oft poröse Oberflächen, die bei falscher Behandlung mit Nässe aufquellen können."
  },
  { 
    id: "naturstein", 
    name: "Marmor & Naturstein", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M8 7h8"></path><path d="M8 9h8"></path><path d="M8 11h8"></path><path d="M8 15h4"></path><rect width="16" height="20" x="4" y="2" rx="2"></rect><path d="M16 22v-9.5a1 1 0 0 1 1-1h1c2 0 2-1.5 2-1.5"></path></svg>,
    description: "Empfindlich gegenüber Säuren, die Oberflächenstrukturen dauerhaft beschädigen können."
  },
  { 
    id: "glas", 
    name: "Glas & Spiegel", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><path d="M7 12h10"></path><path d="M12 7v10"></path></svg>,
    description: "Glatte, nicht saugfähige Oberflächen, die besonders anfällig für Streifen und Schlieren sind."
  },
  { 
    id: "metall", 
    name: "Metall & Edelstahl", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 3v19"></path><path d="M5 10h14"></path><path d="M5 16h14"></path></svg>,
    description: "Robuste Oberflächen, die jedoch korrosionsanfällig sein können und oft Fingerabdrücke zeigen."
  },
  { 
    id: "kunststoff", 
    name: "Kunststoff & Acryl", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="12" x2="12" y1="3" y2="21"></line></svg>,
    description: "Glatte Oberflächen, die je nach Art empfindlich auf Lösungsmittel reagieren können."
  },
  { 
    id: "leder", 
    name: "Leder", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17 7c0-1-2-3-6-3S5 6 5 7s2 3 3 4 4 0 6-1 3-3 3-3"></path><path d="M17 7c0 4-2 10-2 10s-4-3-8-3S3 17 3 17L2 9c0-1 2-3 8-3 5 0 7 2 7 1"></path></svg>,
    description: "Natürliches oder synthetisches Material, das bei zu viel Feuchtigkeit beschädigt werden kann."
  },
  { 
    id: "kleidung", 
    name: "Kleidung", 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>,
    description: "Verschiedene Textilfasern, die unterschiedliche Reinigungsansätze je nach Material erfordern."
  }
];

// Importieren der Lösungsdaten
const loesungen: Loesungen = loesungenData as Loesungen;

export default function FleckenentfernungsBeraterPage() {
  const [fleckentyp, setFleckentyp] = useState<string>("");
  const [oberflaeche, setOberflaeche] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("flecken");
  const [filteredFlecken, setFilteredFlecken] = useState<Fleckentyp[]>(fleckentypen);
  const [filteredOberflaechen, setFilteredOberflaechen] = useState<Oberflaeche[]>(oberflaechen);
  const [selectedLoesungsTab, setSelectedLoesungsTab] = useState<string>("einfach");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Filtern der Fleckentypen und Oberflächen basierend auf der Suche
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFlecken(fleckentypen);
      setFilteredOberflaechen(oberflaechen);
    } else {
      const query = searchQuery.toLowerCase();
      
      const matchingFlecken = fleckentypen.filter(fleck => 
        fleck.name.toLowerCase().includes(query) || 
        fleck.description.toLowerCase().includes(query)
      );
      
      const matchingOberflaechen = oberflaechen.filter(oberflaeche => 
        oberflaeche.name.toLowerCase().includes(query) || 
        oberflaeche.description.toLowerCase().includes(query)
      );
      
      setFilteredFlecken(matchingFlecken);
      setFilteredOberflaechen(matchingOberflaechen);
    }
  }, [searchQuery]);
  
  // Funktion zum Abrufen der Lösung
  const getLoesung = () => {
    const key = `${fleckentyp}-${oberflaeche}`;
    return loesungen[key] || loesungen.default;
  };
  
  // Funktion zum Zurücksetzen der Auswahl
  const resetSelection = () => {
    setFleckentyp("");
    setOberflaeche("");
    setShowResults(false);
    setSelectedLoesungsTab("einfach");
  };
  
  // Einbindung des Beratungstools
  const handleSubmit = () => {
    if (fleckentyp && oberflaeche) {
      setIsLoading(true);
      // Simulierte Verzögerung für UI-Feedback
      setTimeout(() => {
        setShowResults(true);
        setIsLoading(false);
      }, 600);
    } else {
      // Verbesserte Nutzererfahrung mit visuellem Feedback
      const missingFleckentyp = !fleckentyp;
      const missingOberflaeche = !oberflaeche;
      
      if (missingFleckentyp) {
        document.getElementById('fleckentyp-section')?.scrollIntoView({ behavior: 'smooth' });
        // Visuelles Feedback hinzufügen
        const section = document.getElementById('fleckentyp-section');
        if (section) {
          section.classList.add('pulse-animation');
          setTimeout(() => section.classList.remove('pulse-animation'), 1000);
        }
      } else if (missingOberflaeche) {
        document.getElementById('oberflaeche-section')?.scrollIntoView({ behavior: 'smooth' });
        // Visuelles Feedback hinzufügen
        const section = document.getElementById('oberflaeche-section');
        if (section) {
          section.classList.add('pulse-animation');
          setTimeout(() => section.classList.remove('pulse-animation'), 1000);
        }
      }
    }
  };

  // Animationsvarianten
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Metadaten
  const title = "Interaktiver Fleckenentfernungs-Berater";
  const subtitle = "Finden Sie die optimale Lösung für jeden Fleck auf jeder Oberfläche";
  const date = new Date('2025-03-21');
  const readingTime = "Interaktives Tool";
  const author = {
    name: "TREU Service Team",
    image: "/images/blog/flecken2.jpg"
  };
  
  // Animierte Resultate
  const renderResults = () => {
    const loesung = getLoesung();
    const selectedFleck = fleckentypen.find(f => f.id === fleckentyp);
    const selectedMaterial = oberflaechen.find(o => o.id === oberflaeche);
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <div className="mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-teal-600 mr-2" />
            <h3 className="text-xl font-medium">Ihre maßgeschneiderte Lösung</h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-teal-50 to-teal-100 p-5 rounded-xl shadow-sm border border-teal-200 mb-6"
          >
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm">
                {selectedFleck?.icon || <Droplets className="w-5 h-5 text-teal-600" />}
              </div>
              <div>
                <p className="font-medium text-teal-800 text-lg">
                  {selectedFleck?.name} auf {selectedMaterial?.name}
                </p>
                <p className="text-sm text-teal-700 mt-1">
                  Wir haben die besten Methoden für Ihre spezifische Situation zusammengestellt.
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="grid grid-cols-3 border-b">
              {['einfach', 'fortgeschritten', 'profi'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setSelectedLoesungsTab(tab)}
                  className={`py-4 px-3 text-sm font-medium transition-all relative ${selectedLoesungsTab === tab 
                    ? 'text-teal-800 bg-gray-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {selectedLoesungsTab === tab && (
                    <motion.div 
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                    />
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedLoesungsTab === tab 
                        ? tab === 'einfach' ? 'bg-teal-100 text-teal-600' 
                        : tab === 'fortgeschritten' ? 'bg-blue-100 text-blue-600' 
                        : 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-xs capitalize">
                      {tab === 'einfach' ? 'Einfach' : tab === 'fortgeschritten' ? 'Fortgeschritten' : 'Profi'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLoesungsTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedLoesungsTab === 'einfach' && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center text-teal-700">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 mr-2" />
                        Schnelle Soforthilfe
                      </h4>
                      <p className="text-gray-700">{loesung.einfach}</p>
                    </div>
                  )}
                  
                  {selectedLoesungsTab === 'fortgeschritten' && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center text-blue-700">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" />
                        Für hartnäckigere Flecken
                      </h4>
                      <p className="text-gray-700">{loesung.fortgeschritten}</p>
                    </div>
                  )}
                  
                  {selectedLoesungsTab === 'profi' && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center text-purple-700">
                        <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                        Profi-Methode für optimale Ergebnisse
                      </h4>
                      <p className="text-gray-700">{loesung.profi}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          <Alert className="mt-6 bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-sm text-amber-800 flex items-start gap-2">
              <span className="font-medium">Wichtig:</span> {loesung.hinweis}
            </AlertDescription>
          </Alert>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h4 className="font-medium mb-2 text-blue-800">Brauchen Sie professionelle Hilfe?</h4>
                <p className="text-sm text-blue-700 mb-4">
                  Für besonders hartnäckige Flecken oder wertvolle Materialien bieten wir professionelle Fleckenentfernung durch unsere Experten an.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/reinigung#kontakt">
                    <Button size="sm" className="text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm">
                      Professionelle Reinigung anfragen
                      <ArrowUpRight className="ml-2 h-4 w-4 text-white" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-end mt-6">
            <Button 
              variant="outline"
              size="sm"
              onClick={resetSelection}
              className="text-sm"
            >
              <X className="mr-2 h-4 w-4" />
              Neuer Fleck
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="flex-1">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-teal-50/50 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-teal-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog/reinigung" className="hover:text-teal-600">Reinigung</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Fleckenentfernung</span>
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-3 bg-teal-50 text-teal-600 border border-teal-200">
              Reinigung
            </Badge>
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Flecken passieren – aber mit dem richtigen Wissen werden sie nicht zum Dauerproblem. Unser interaktiver Berater hilft Ihnen, die optimale Methode für die Entfernung verschiedenster Flecken auf allen Oberflächen zu finden.
            </Paragraph>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-teal-50 p-2 rounded-full">
                  <Droplets className="h-4 w-4 text-teal-600" />
                </div>
                <span className="text-sm">{author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{format(date, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readingTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Hauptinhalt */}
              <div className="prose max-w-none">
                <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6 shadow-md">
                  <Image 
                    src="/images/blog/flecken.jpg" 
                    alt="Fleckenentfernung"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white text-sm p-4">Die richtige Technik kann selbst hartnäckige Flecken beseitigen</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Droplets className="w-6 h-6 mr-2 text-teal-600" />
                  Fleckenentfernung leicht gemacht
                </h2>
                
                <p>
                  Flecken gehören zu den häufigsten Reinigungsproblemen – ob auf Teppichen, Polstermöbeln, Kleidung oder anderen Oberflächen. Die gute Nachricht: Mit dem richtigen Ansatz lassen sich selbst hartnäckige Flecken oft vollständig entfernen, ohne teure Spezialreiniger oder professionelle Hilfe.
                </p>

                <p>
                  Der Schlüssel zum Erfolg liegt in drei Faktoren: <strong>schnelles Handeln</strong>, die <strong>richtige Methode</strong> und die <strong>richtigen Mittel</strong>. Unser interaktiver Berater hilft Ihnen, die optimale Lösung für Ihr spezifisches Fleckenproblem zu finden.
                </p>

                <Alert className="my-8 bg-teal-50 border-teal-200">
                  <Info className="h-5 w-5 text-teal-600" />
                  <AlertTitle className="text-teal-800">Gut zu wissen</AlertTitle>
                  <AlertDescription className="text-teal-700">
                    <p className="mt-2">Je früher Sie einen Fleck behandeln, desto höher sind die Erfolgschancen. Trockene, eingetrocknete Flecken sind deutlich schwieriger zu entfernen als frische.</p>
                  </AlertDescription>
                </Alert>

                <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center">
                  <MousePointerClick className="w-6 h-6 mr-2 text-teal-600" />
                  Interaktiver Fleckenentfernungs-Berater
                </h2>
              </div>

              {/* Apple-inspirierter Fleckenentfernungs-Berater */}
              <div className="mt-4">
                <Card className="overflow-hidden border-0 shadow-lg rounded-xl">
                  <CardHeader className="pb-4 bg-gradient-to-r from-teal-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                          <Droplets className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Fleckenentfernungs-Assistent</CardTitle>
                          <CardDescription>
                            Individuelle Lösungen für jede Fleckenart und Oberfläche
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="flex items-center bg-white rounded-full border border-gray-200 px-3 py-1 w-48 shadow-sm">
                          <Search className="h-4 w-4 text-gray-400 mr-2" />
                          <input
                            type="text"
                            placeholder="Suchen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-none bg-transparent text-sm w-full focus:outline-none"
                          />
                          {searchQuery && (
                            <button 
                              onClick={() => setSearchQuery('')}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {!showResults && (
                      <div className="mt-4 flex bg-white/60 rounded-lg p-1 shadow-inner w-fit">
                        <button
                          onClick={() => setActiveTab("flecken")}
                          className={`px-4 py-2 text-sm rounded-md transition-all ${
                            activeTab === "flecken" 
                              ? "bg-white shadow-sm text-teal-700" 
                              : "text-gray-600 hover:bg-white/80"
                          }`}
                        >
                          1. Fleckentyp
                        </button>
                        <button
                          onClick={() => setActiveTab("oberflaechen")}
                          className={`px-4 py-2 text-sm rounded-md transition-all ${
                            activeTab === "oberflaechen" 
                              ? "bg-white shadow-sm text-teal-700" 
                              : "text-gray-600 hover:bg-white/80"
                          }`}
                        >
                          2. Oberfläche
                        </button>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    {!showResults ? (
                      <div className="p-6">
                        <AnimatePresence mode="wait">
                          {activeTab === "flecken" && (
                            <motion.div
                              key="flecken"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ duration: 0.3 }}
                              id="fleckentyp-section"
                              className="space-y-4"
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Fleckentyp auswählen</h3>
                                {fleckentyp && (
                                  <Badge className="bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200 cursor-pointer"
                                    onClick={() => setFleckentyp("")}
                                  >
                                    {fleckentypen.find(f => f.id === fleckentyp)?.name}
                                    <X className="ml-1 h-3 w-3" />
                                  </Badge>
                                )}
                              </div>
                              
                              <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-2 md:grid-cols-3 gap-3"
                              >
                                {filteredFlecken.length > 0 ? (
                                  filteredFlecken.map((typ) => (
                                    <motion.div
                                      key={typ.id}
                                      variants={itemVariants}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
                                        fleckentyp === typ.id 
                                          ? `border-2 border-${typ.color}-400 shadow-md` 
                                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                      }`}
                                      onClick={() => setFleckentyp(typ.id)}
                                    >
                                      <div className="p-4">
                                        <div className="flex items-center mb-2">
                                          <div className={`w-8 h-8 rounded-full bg-${typ.color}-100 flex items-center justify-center mr-2`}>
                                            {typ.icon}
                                          </div>
                                          <h4 className="font-medium">{typ.name}</h4>
                                          {fleckentyp === typ.id && (
                                            <div className="ml-auto">
                                              <CheckCircle2 className="h-5 w-5 text-teal-500" />
                                            </div>
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                          {typ.description}
                                        </p>
                                      </div>
                                    </motion.div>
                                  ))
                                ) : (
                                  <div className="col-span-full text-center py-8">
                                    <p className="text-gray-500">Keine Fleckentypen gefunden</p>
                                    <button 
                                      className="mt-2 text-teal-600 hover:underline"
                                      onClick={() => setSearchQuery('')}
                                    >
                                      Alle anzeigen
                                    </button>
                                  </div>
                                )}
                              </motion.div>
                              
                              <div className="flex justify-end mt-4">
                                <Button
                                  onClick={() => setActiveTab("oberflaechen")}
                                  className={`px-4 py-2 ${
                                    fleckentyp ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  }`}
                                  disabled={!fleckentyp}
                                >
                                  Weiter zu Oberflächen
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </div>
                            </motion.div>
                          )}
                          
                          {activeTab === "oberflaechen" && (
                            <motion.div
                              key="oberflaechen"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              id="oberflaeche-section"
                              className="space-y-4"
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Oberfläche auswählen</h3>
                                {oberflaeche && (
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 cursor-pointer"
                                    onClick={() => setOberflaeche("")}
                                  >
                                    {oberflaechen.find(o => o.id === oberflaeche)?.name}
                                    <X className="ml-1 h-3 w-3" />
                                  </Badge>
                                )}
                              </div>
                              
                              <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-2 md:grid-cols-3 gap-3"
                              >
                                {filteredOberflaechen.length > 0 ? (
                                  filteredOberflaechen.map((material) => (
                                    <motion.div
                                      key={material.id}
                                      variants={itemVariants}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
                                        oberflaeche === material.id 
                                          ? 'border-2 border-blue-400 shadow-md' 
                                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                      }`}
                                      onClick={() => setOberflaeche(material.id)}
                                    >
                                      <div className="p-4">
                                        <div className="flex items-center mb-2">
                                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                            {material.icon}
                                          </div>
                                          <h4 className="font-medium">{material.name}</h4>
                                          {oberflaeche === material.id && (
                                            <div className="ml-auto">
                                              <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                            </div>
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                          {material.description}
                                        </p>
                                      </div>
                                    </motion.div>
                                  ))
                                ) : (
                                  <div className="col-span-full text-center py-8">
                                    <p className="text-gray-500">Keine Oberflächen gefunden</p>
                                    <button 
                                      className="mt-2 text-teal-600 hover:underline"
                                      onClick={() => setSearchQuery('')}
                                    >
                                      Alle anzeigen
                                    </button>
                                  </div>
                                )}
                              </motion.div>
                              
                              <div className="flex justify-between mt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => setActiveTab("flecken")}
                                >
                                  <ChevronLeft className="mr-1 h-4 w-4" />
                                  Zurück zu Fleckentypen
                                </Button>
                                
                                <Button
                                  onClick={handleSubmit}
                                  className={`px-4 py-2 ${
                                    oberflaeche ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  }`}
                                  disabled={!oberflaeche || isLoading}
                                >
                                  {isLoading ? (
                                    <>
                                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                                      Einen Moment...
                                    </>
                                  ) : (
                                    <>
                                      Lösungen anzeigen
                                      <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                  )}
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      renderResults()
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="prose max-w-none mt-12">
                <h2 className="text-2xl font-bold mb-6">Allgemeine Prinzipien der Fleckenentfernung</h2>
                
                <p>
                  Unabhängig vom spezifischen Fleck gibt es einige grundlegende Regeln, die bei jeder Fleckenbehandlung helfen:
                </p>
                
                <div className="grid gap-3 mt-6 mb-8 sm:grid-cols-2">
                  {[
                    {
                      title: "Schnell handeln",
                      description: "Je früher Sie einen Fleck behandeln, desto leichter lässt er sich entfernen."
                    },
                    {
                      title: "Von außen nach innen",
                      description: "Arbeiten Sie immer vom Rand des Flecks zur Mitte hin, um ein Ausbreiten zu verhindern."
                    },
                    {
                      title: "Tupfen statt reiben",
                      description: "Reiben kann den Fleck tiefer ins Material drücken und die Fasern beschädigen."
                    },
                    {
                      title: "Materialverträglichkeit testen",
                      description: "Testen Sie Reinigungsmittel immer zuerst an einer unauffälligen Stelle."
                    },
                    {
                      title: "Geduldig sein",
                      description: "Manche Flecken erfordern mehrere Behandlungen oder längere Einwirkzeiten."
                    }
                  ].map((principle, idx) => (
                    <div 
                      key={idx}
                      className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-teal-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-teal-100 text-teal-700 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium mb-1 text-gray-900">{principle.title}</h3>
                          <p className="text-sm text-gray-600">{principle.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold mt-10 mb-6">Wann Sie professionelle Hilfe in Anspruch nehmen sollten</h2>
                
                <p>
                  Obwohl viele Flecken mit Hausmitteln entfernt werden können, gibt es Situationen, in denen professionelle Hilfe sinnvoll ist:
                </p>
                
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 my-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Bei sehr wertvollen oder empfindlichen Materialien (z.B. Seide, Antikholz, etc.)",
                      "Wenn Flecken bereits eingetrocknet und mehrere Wochen alt sind",
                      "Bei großflächigen Verschmutzungen auf Teppichen oder Polstermöbeln",
                      "Wenn eigene Reinigungsversuche die Situation verschlimmert haben",
                      "Bei hartnäckigen Flecken unbekannter Herkunft"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-amber-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p>
                  Unsere professionellen Reinigungsteams verfügen über spezielle Ausrüstung und Reinigungsmittel, die auch bei schwierigen Fällen zuverlässige Ergebnisse liefern.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Letzte Aktualisierung: {format(date, 'dd. MMMM yyyy', { locale: de })}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-gray-100"
                    onClick={() => ShareContent(title, window.location.href)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Teilen
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Experten-Tipp Box */}
                <Card className="bg-gradient-to-b from-teal-50/70 to-teal-50/30 shadow-sm overflow-hidden rounded-xl border border-teal-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="bg-white p-1 rounded-full shadow-sm">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                      </div>
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Für die meisten Flecken gilt: Je schneller Sie handeln, desto besser. Halten Sie daher immer ein grundlegendes Set an Fleckenentfernern bereit.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Ein Basis-Notfallset besteht aus: weißem Essig, Natron, Zitronensaft, Gallseife, Wasserstoffperoxid (3%) und einem enzymbasierten Fleckenmittel. Damit sind Sie für die meisten Alltagsflecken gerüstet.
                    </Paragraph>
                  </CardContent>
                </Card>
                
                {/* Verwandte Artikel */}
                <Card className="rounded-xl shadow-sm overflow-hidden">
                  <CardHeader className="pb-2 bg-gray-50">
                    <CardTitle className="text-lg">Verwandte Artikel</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="divide-y">
                      {[
                        { url: "/blog/NachhaltigeReinigung", title: "Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen" },
                        { url: "/blog/MaterialspezifischeReinigung", title: "Materialspezifischer Reinigungsguide" }
                      ].map((article, idx) => (
                        <Link 
                          key={idx}
                          href={article.url} 
                          className="flex items-center py-3 group"
                        >
                          <ArrowRight className="h-4 w-4 text-teal-600 mr-2 transform group-hover:translate-x-1 transition-transform" />
                          <span className="text-sm group-hover:text-teal-700 transition-colors">{article.title}</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Kontakt-CTA */}
                <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl shadow-md overflow-hidden">
                  <CardHeader className="pb-3 border-b border-white/10">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Phone className="h-4 w-4" />
                      </div>
                      Professionelle Reinigung benötigt?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Unsere Experten bieten spezifische Reinigungslösungen für jedes Material. Profitieren Sie von unserer Erfahrung und schonenden Reinigungstechniken.
                    </Paragraph>
                    <div className="space-y-3">
                      <Link href="/reinigung#kontakt">
                        <Button className="w-full bg-white text-teal-700 hover:bg-white/90">
                          Kostenfreies Angebot anfordern
                        </Button>
                      </Link>

                      <div className="grid grid-cols-1 gap-2 mt-4">
                        <div className="flex items-center gap-3 bg-teal-700/30 p-3 rounded-xl">
                          <Phone className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">Telefon</div>
                            <div className="text-sm font-medium">0231 15044352</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-teal-700/30 p-3 rounded-xl">
                          <Mail className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">E-Mail</div>
                            <div className="text-sm font-medium truncate">info@treuservice.com</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Fehlende Importdefinition - für ChevronLeft, da es in den Importen nicht definiert ist */}
      {/* 
        In einer realen Umgebung müsste oben importiert werden:
        import { ChevronLeft } from 'lucide-react' 
      */}
      <div style={{ display: 'none' }}>
        {(() => {
          // Diese IIFE wird nicht ausgeführt, sie dient nur zur Typsicherheit
          const ChevronLeft = () => <></>;
          return <ChevronLeft />;
        })()}
      </div>
      
      <style jsx global>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(20, 184, 166, 0); }
          100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
        }
        
        .pulse-animation {
          animation: pulse 1s ease-in-out;
        }
      `}</style>
    </div>
  )
}