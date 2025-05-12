"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2, 
  PaintBucket, 
  AlertTriangle, 
  Info, 
  Lightbulb,
  Phone,
  Mail,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Droplets,
  Search,
  ChevronUp,
  ArrowRight,
  Pointer
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

// Funktion zum Teilen des Inhalts
const shareContent = (title: string, url: string): void => {
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

// TypeScript Interface für Material-Daten
interface MaterialItem {
  id: string;
  name: string;
  image: string;
  description: string;
  geeignet: string[];
  ungeeignet: string[];
  routinePflege: string;
  besondereHinweise: string;
  profiTipps: string;
}

// Daten für verschiedene Materialien und ihre Reinigungsmethoden
const materialData: MaterialItem[] = [
  {
    id: "holz",
    name: "Holz & Furniere",
    image: "/images/blog/holz.jpg",
    description: "Holzoberflächen verleihen Räumen Wärme und Natürlichkeit, benötigen aber spezielle Pflege, um ihre Schönheit zu erhalten.",
    geeignet: [
      "Milde pH-neutrale Reiniger",
      "Spezielle Holzpflegemittel",
      "Leicht feuchtes Mikrofasertuch",
      "Holzöle und -wachse"
    ],
    ungeeignet: [
      "Aggressive Reinigungsmittel",
      "Scheuermittel jeder Art",
      "Zu viel Feuchtigkeit",
      "Dampfreiniger",
      "Bleichmittel"
    ],
    routinePflege: "Regelmäßiges Staubwischen mit einem leicht angefeuchteten Mikrofasertuch. Verwenden Sie spezielle Holzpflegemittel gemäß Herstellerangaben für versiegelte Oberflächen etwa alle 2-3 Monate.",
    besondereHinweise: "Die Reinigung variiert je nach Holzart und Oberflächenbehandlung (geölt, gewachst, lackiert). Beachten Sie stets die spezifischen Pflegehinweise des Herstellers.",
    profiTipps: "Holzpolitur sollte in Richtung der Holzmaserung aufgetragen werden. Bei unbehandeltem Holz Flecken sofort behandeln, da es stark saugfähig ist."
  },
  {
    id: "naturstein",
    name: "Naturstein & Marmor",
    image: "/images/blog/naturstein.jpg",
    description: "Naturstein wie Marmor, Granit oder Schiefer bringt Eleganz in jeden Raum, ist aber empfindlich gegenüber falscher Reinigung.",
    geeignet: [
      "Spezielle Natursteinreiniger",
      "pH-neutrale Reinigungsmittel",
      "Klares, warmes Wasser",
      "Weiche Mikrofasertücher"
    ],
    ungeeignet: [
      "Säurehaltige Reiniger (inkl. Essig, Zitrone)",
      "Scheuermittel",
      "Stark alkalische Reiniger",
      "Allzweckreiniger mit Zusatzstoffen"
    ],
    routinePflege: "Tägliches Abwischen mit einem weichen, feuchten Tuch. Wöchentliche Reinigung mit speziellen Natursteinreinigern. Alle 6-12 Monate eine Versiegelung je nach Nutzungsintensität.",
    besondereHinweise: "Besonders Marmor und Kalkstein reagieren empfindlich auf Säuren. Verschüttete Flüssigkeiten wie Wein, Saft oder Essig sofort aufwischen, um Ätzflecken zu vermeiden.",
    profiTipps: "Verwenden Sie Untersetzer für Gläser und heiße Gefäße. Bei stark frequentierten Bereichen wie Küchenarbeitsplatten empfiehlt sich eine häufigere Neuversiegelung."
  },
  {
    id: "glas",
    name: "Glas & Spiegel",
    image: "/images/blog/glas.jpg",
    description: "Glasflächen und Spiegel können Räume optisch vergrößern und mehr Licht reflektieren, sind aber anfällig für Fingerabdrücke und Streifen.",
    geeignet: [
      "Spezielle Glasreiniger",
      "Isopropylalkohol verdünnt",
      "Mikrofasertücher",
      "Wasser mit etwas Essig"
    ],
    ungeeignet: [
      "Scheuernde Reinigungsmittel",
      "Stahlwolle oder harte Bürsten",
      "Stark alkalische Reiniger",
      "Papiertücher (können fusseln)"
    ],
    routinePflege: "Wöchentliche Reinigung mit Glasreiniger und fusselfreiem Mikrofasertuch. Bei täglicher Benutzung (wie Duschtüren) regelmäßiges Abziehen mit einem Fensterwischer nach jedem Gebrauch.",
    besondereHinweise: "Reinigen Sie Glas idealerweise nicht bei direkter Sonneneinstrahlung, da der Reiniger zu schnell trocknet und Streifen hinterlässt.",
    profiTipps: "Für streifenfreien Glanz erst mit Glasreiniger besprühen, dann mit einem feuchten Mikrofasertuch abwischen und sofort mit einem zweiten, trockenen Mikrofasertuch nachpolieren."
  },
  {
    id: "edelstahl",
    name: "Edelstahl",
    image: "/images/blog/edelstahl.jpg",
    description: "Edelstahl findet sich in modernen Küchen und Bädern und besticht durch seine elegante Optik, zeigt aber leicht Fingerabdrücke und Wasserflecken.",
    geeignet: [
      "Spezielle Edelstahlreiniger",
      "Warmes Wasser mit mildem Spülmittel",
      "Mikrofasertücher",
      "Edelstahlpolitur"
    ],
    ungeeignet: [
      "Chlorhaltige Reiniger",
      "Scheuermittel",
      "Stahlwolle oder Metallschwämme",
      "Bleichmittel"
    ],
    routinePflege: "Tägliches Abwischen mit einem weichen, feuchten Tuch in Richtung der Maserung. Wöchentliche gründliche Reinigung mit speziellem Edelstahlreiniger oder mildem Spülmittel.",
    besondereHinweise: "Immer in Richtung der Metallmaserung wischen, um Kratzer zu vermeiden. Nach der Reinigung gründlich trocknen, um Wasserflecken zu verhindern.",
    profiTipps: "Für besonders hartnäckige Flecken kann Backpulver mit Wasser als Paste aufgetragen werden. Für zusätzlichen Glanz nach der Reinigung etwas Babyöl oder spezielle Edelstahlpolitur auftragen."
  },
  {
    id: "keramik",
    name: "Keramik & Fliesen",
    image: "/images/blog/keramik.jpg",
    description: "Keramische Oberflächen und Fliesen sind langlebig und pflegeleicht, aber die Fugen können problematisch sein.",
    geeignet: [
      "Neutrale Allzweckreiniger",
      "Spezielle Fliesenreiniger",
      "Wasserdampfreiniger",
      "Mikrofasertücher"
    ],
    ungeeignet: [
      "Ölhaltige Reiniger (machen Boden rutschig)",
      "Stark säurehaltige Reiniger (für viele Fliesen)",
      "Stahlwolle",
      "Wachshaltige Produkte"
    ],
    routinePflege: "Regelmäßiges Kehren oder Staubsaugen, gefolgt von feuchtem Wischen mit einem milden Reinigungsmittel. Monatliche tiefere Reinigung der Fugen mit einer weichen Bürste.",
    besondereHinweise: "Die Reinigungsmethode hängt von der Art der Keramik ab. Glasierte Fliesen sind unempfindlicher als unglasierte. Matte Fliesen können empfindlicher auf bestimmte Reinigungsmittel reagieren.",
    profiTipps: "Fugen können mit einer Mischung aus Backpulver und Wasser gereinigt werden. Für besonders hartnäckige Flecken auf glasierten Fliesen eignet sich eine verdünnte Wasserstoffperoxidlösung."
  },
  {
    id: "teppich",
    name: "Teppiche & Textilien",
    image: "/images/blog/teppich.jpg",
    description: "Teppiche und textile Bodenbeläge schaffen Behaglichkeit, können aber Staub und Schmutz ansammeln und Flecken aufnehmen.",
    geeignet: [
      "Spezielle Teppichreiniger",
      "Milde Wollwaschmittel (für Wollteppiche)",
      "Dampfreiniger (für synthetische Fasern)",
      "Enzymreiniger für organische Flecken"
    ],
    ungeeignet: [
      "Aggressive chemische Reiniger",
      "Bleichmittel",
      "Zu viel Wasser bei Wollteppichen",
      "Allzweckreiniger"
    ],
    routinePflege: "Regelmäßiges Staubsaugen (2-3 Mal pro Woche). Bei synthetischen Teppichen alle 12-18 Monate eine Tiefenreinigung, bei Naturfasern eher alle 2-3 Jahre oder bei Bedarf.",
    besondereHinweise: "Die Reinigungsmethode hängt stark vom Material ab (Wolle, Seide, Synthetik, Sisal etc.). Beachten Sie immer die Pflegehinweise des Herstellers.",
    profiTipps: "Flecken immer sofort behandeln und von außen nach innen abtupfen, nicht reiben. Rotieren Sie Teppiche regelmäßig, um eine gleichmäßige Abnutzung zu gewährleisten."
  },
  {
    id: "leder",
    name: "Leder",
    image: "/images/blog/leder.jpg",
    description: "Lederoberflächen strahlen Eleganz und Wertigkeit aus, benötigen aber eine besondere Pflege, um ihre Qualität zu erhalten.",
    geeignet: [
      "Spezielle Lederreiniger",
      "Lederpflegemittel",
      "Weiche, leicht feuchte Tücher",
      "Sattelseife (für bestimmte Lederarten)"
    ],
    ungeeignet: [
      "Haushaltsweiniger jeder Art",
      "Lösungsmittel oder Alkohol",
      "Scheuermittel",
      "Zu viel Wasser"
    ],
    routinePflege: "Regelmäßiges Abstauben mit einem weichen Tuch. Alle 3-6 Monate mit speziellen Lederreinigern behandeln, gefolgt von einer Lederpflege zum Schutz und Erhalt der Geschmeidigkeit.",
    besondereHinweise: "Die Pflege variiert je nach Lederart (Anilin, Semi-Anilin, pigmentiert, Nubukleder etc.). UV-Strahlung kann Leder ausbleichen – direkte Sonneneinstrahlung vermeiden.",
    profiTipps: "Leder in regelmäßigen Abständen mit speziellen Lederpflegemitteln behandeln, um es geschmeidig zu halten. Flecken sofort entfernen, indem man sie vorsichtig abtupft, nicht reibt."
  },
  {
    id: "kunststoff",
    name: "Kunststoff & Acryl",
    image: "/images/blog/kunststoff.jpg",
    description: "Kunststoffoberflächen finden sich in vielen Bereichen des Alltags und sind meist pflegeleicht, können aber mit der Zeit vergilben oder stumpf werden.",
    geeignet: [
      "Milde Allzweckreiniger",
      "Spülmittel mit warmem Wasser",
      "Kunststoffpflegemittel",
      "Mikrofasertücher"
    ],
    ungeeignet: [
      "Aggressive Lösungsmittel",
      "Scheuermittel",
      "Aceton (bei Acryl)",
      "Bleichmittel (bei farbigen Kunststoffen)"
    ],
    routinePflege: "Regelmäßiges Abwischen mit einem feuchten Tuch und mildem Reinigungsmittel. Bei matten Oberflächen spezielle Pflegemittel verwenden, um Glanzstellen zu vermeiden.",
    besondereHinweise: "Bei Acryl (z.B. Plexiglas) besonders vorsichtig sein, da es leicht zerkratzt. Für klare Kunststoffe spezielle Poliermittel verwenden, um Kratzer zu entfernen.",
    profiTipps: "Für vergilbte weiße Kunststoffe kann eine Mischung aus Backpulver und Wasser helfen. Acrylglas immer mit viel Wasser reinigen, um Kratzer durch Schmutzpartikel zu vermeiden."
  }
];

// Apple-inspirierte MaterialSelector Komponente
const MaterialSelector: React.FC<{
  materials: MaterialItem[];
  selectedMaterial: string;
  onSelectMaterial: (id: string) => void;
}> = ({ materials, selectedMaterial, onSelectMaterial }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialItem[]>(materials);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  
  // Aktuelle Material-Details
  const currentMaterial = materials.find(m => m.id === selectedMaterial) || materials[0];
  
  // Filtern der Materialien basierend auf Suchbegriff
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMaterials(materials);
    } else {
      const filtered = materials.filter(material => 
        material.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        material.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMaterials(filtered);
    }
  }, [searchQuery, materials]);

  return (
    <div className="space-y-8 mt-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-medium flex items-center">
          <Pointer className="w-6 h-6 mr-2 text-teal-600" />
          Material auswählen
        </h2>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text"
              placeholder="Material suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:ring-teal-500 focus:border-teal-500 rounded-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            )}
          </div>
          
          <div className="flex border border-gray-200 rounded-full overflow-hidden">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 ${isGridView ? 'bg-teal-500 text-white' : 'bg-white text-gray-600'}`}
              aria-label="Grid View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 ${!isGridView ? 'bg-teal-500 text-white' : 'bg-white text-gray-600'}`}
              aria-label="List View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Material-Galerie */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        className={`grid gap-4 ${isGridView ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}
      >
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <motion.div
              key={material.id}
              variants={{
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
              }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div 
                className={`
                  rounded-xl overflow-hidden border border-gray-200
                  ${selectedMaterial === material.id ? 'ring-2 ring-teal-500' : ''}
                  transition-all cursor-pointer hover:shadow-md
                  flex ${isGridView ? 'flex-col' : 'flex-row h-28'}
                `}
                onClick={() => onSelectMaterial(material.id)}
                tabIndex={0}
                role="button"
                aria-pressed={selectedMaterial === material.id}
              >
                <div className={`relative ${isGridView ? 'h-32 w-full' : 'h-full w-32 flex-shrink-0'}`}>
                  <Image 
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover"
                  />
                  {selectedMaterial === material.id && (
                    <div className="absolute top-2 right-2 bg-teal-500 rounded-full p-1">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className={`${isGridView ? 'p-3' : 'p-3 flex-grow'}`}>
                  <h3 className="font-medium text-sm">{material.name}</h3>
                  {!isGridView && (
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">{material.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Keine Materialien gefunden für &quot;{searchQuery}&quot;</p>
            <button 
              className="mt-2 text-teal-600 hover:underline"
              onClick={() => setSearchQuery('')}
            >
              Alle Materialien anzeigen
            </button>
          </div>
        )}
      </motion.div>
      
      {/* Material-Detailansicht */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-t-4 border-t-teal-500 shadow-lg overflow-hidden">
          <div className="relative h-[240px] w-full">
            <Image 
              src={currentMaterial.image}
              alt={currentMaterial.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{currentMaterial.name}</h2>
                <p className="text-white/90">{currentMaterial.description}</p>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 h-full">
                <h4 className="font-medium text-teal-800 mb-3 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 mr-2" />
                  Geeignete Reinigungsmittel & Methoden
                </h4>
                <ul className="space-y-2.5">
                  {currentMaterial.geeignet.map((item, index) => (
                    <li key={index} className="text-sm flex items-start group">
                      <div className="h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                      </div>
                      <span className="text-teal-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 p-5 rounded-xl border border-red-100 h-full">
                <h4 className="font-medium text-red-800 mb-3 flex items-center">
                  <XCircle className="h-5 w-5 text-red-600 mr-2" />
                  Zu vermeidende Reinigungsmittel
                </h4>
                <ul className="space-y-2.5">
                  {currentMaterial.ungeeignet.map((item, index) => (
                    <li key={index} className="text-sm flex items-start group">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0 group-hover:bg-red-200 transition-colors">
                        <XCircle className="h-3.5 w-3.5 text-red-600" />
                      </div>
                      <span className="text-red-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-teal-200 transition-colors">
                  <h4 className="font-medium text-gray-900 mb-2">Routine-Pflege</h4>
                  <p className="text-sm text-gray-600">{currentMaterial.routinePflege}</p>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-teal-200 transition-colors">
                  <h4 className="font-medium text-gray-900 mb-2">Besondere Hinweise</h4>
                  <p className="text-sm text-gray-600">{currentMaterial.besondereHinweise}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-start">
                  <div className="bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-sm mr-3 mt-1">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Profi-Tipps</h4>
                    <p className="text-sm text-blue-700">{currentMaterial.profiTipps}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// Hauptkomponente für die Materialspezifische Reinigung Page
export default function MaterialspezifischerReinigungsguidePage() {
  const [selectedMaterial, setSelectedMaterial] = useState("holz");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Scroll-to-Top Funktionalität
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Meta-Informationen für den Blog-Artikel
  const title = "Materialspezifischer Reinigungsguide";
  const subtitle = "Die richtigen Reinigungsmethoden für verschiedene Oberflächen und Materialien";
  const date = new Date('2025-03-21');
  const readingTime = "12 min";
  const author = {
    name: "TREU Service Team",
    image: "/images/blog/materialien.jpg"
  };
  
  return (
    <div className="flex-1 relative">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-teal-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog/reinigung" className="hover:text-teal-600">Reinigung</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Materialguide</span>
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
              Jedes Material hat seine eigenen Eigenschaften und benötigt eine spezifische Reinigung und Pflege. In diesem umfassenden Guide finden Sie detaillierte Anleitungen für verschiedene Oberflächen – von empfindlichem Naturstein bis hin zu pflegeleichtem Kunststoff.
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
                    src="/images/blog/materialien.jpg" 
                    alt="Verschiedene Materialien und Oberflächen"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white text-sm p-4">Die richtige Reinigungsmethode schützt und erhält die Schönheit verschiedener Materialien</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <PaintBucket className="w-6 h-6 mr-2 text-teal-600" />
                  Warum die richtige Reinigungsmethode entscheidend ist
                </h2>
                
                <p>
                  Die falsche Reinigungsmethode kann Oberflächen nachhaltig schädigen, ihre Lebensdauer verkürzen und ihre ästhetische Qualität beeinträchtigen. Was für ein Material perfekt ist, kann für ein anderes schädlich sein – beispielsweise können säurehaltige Reiniger Naturstein ätzen, während sie für Glas hervorragend geeignet sind.
                </p>

                <p>
                  In diesem Guide finden Sie materialspezifische Empfehlungen, die auf unserem Fachwissen und langjähriger Erfahrung basieren. Wählen Sie einfach das gewünschte Material aus der Übersicht unten, um detaillierte Informationen zu erhalten.
                </p>

                <Alert className="my-8 bg-blue-50 border-blue-200 rounded-xl">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800">Wichtig zu wissen</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    <p className="mt-2">Testen Sie jeden Reiniger zuerst an einer unauffälligen Stelle, besonders bei wertvollen oder empfindlichen Materialien. Beachten Sie stets die spezifischen Herstellerhinweise für Ihre Oberflächen.</p>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Material Selector - Steve Jobs Stil */}
              <MaterialSelector 
                materials={materialData}
                selectedMaterial={selectedMaterial}
                onSelectMaterial={setSelectedMaterial}
              />

              <div className="prose max-w-none mt-16" id="materialDetails">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-2 text-teal-600" />
                  Allgemeine Reinigungsprinzipien für alle Materialien
                </h2>
                
                <p>
                  Trotz der Unterschiede zwischen den verschiedenen Materialien gibt es einige allgemeine Grundsätze, die bei der Reinigung jeder Oberfläche berücksichtigt werden sollten:
                </p>
                
                <div className="overflow-x-auto my-6">
                  <Table className="rounded-xl border overflow-hidden shadow-sm">
                    <TableHeader>
                      <TableRow className="bg-teal-50 border-b-0">
                        <TableHead className="font-medium text-teal-800">Prinzip</TableHead>
                        <TableHead className="font-medium text-teal-800">Beschreibung</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">Vorbereitung</TableCell>
                        <TableCell>Entfernen Sie losen Schmutz und Staub, bevor Sie mit der Nassreinigung beginnen. Dies verhindert Kratzer durch Schmutzpartikel.</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">Methodentesten</TableCell>
                        <TableCell>Testen Sie Reinigungsmittel immer zuerst an einer unauffälligen Stelle, um unerwünschte Reaktionen auszuschließen.</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">Milde Lösungen</TableCell>
                        <TableCell>Beginnen Sie mit der mildesten Reinigungsmethode und steigern Sie die Intensität nur bei Bedarf.</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">Gründliches Spülen</TableCell>
                        <TableCell>Reinigungsmittelrückstände können Oberflächen mit der Zeit beschädigen. Spülen Sie daher gründlich nach.</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">Trocknung</TableCell>
                        <TableCell>Die meisten Materialien profitieren von einer gründlichen Trocknung nach der Reinigung, um Wasserflecken zu vermeiden.</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">Regelmäßigkeit</TableCell>
                        <TableCell>Regelmäßige leichte Reinigung ist oft schonender als seltene intensive Reinigungsaktionen.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <h2 className="text-2xl font-bold mt-10 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2 text-teal-600" />
                  Wann professionelle Reinigung sinnvoll ist
                </h2>
                
                <p>
                  In bestimmten Situationen ist es ratsam, professionelle Reinigungsservices in Anspruch zu nehmen:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  {[
                    "Bei sehr wertvollen oder antiken Materialien, die spezielle Behandlung erfordern",
                    "Nach Wasserschäden, die tiefgreifende Reinigung und Trocknung erfordern",
                    "Bei großflächiger Verschmutzung oder Verfleckung von Teppichen oder Polstermöbeln",
                    "Bei hartnäckigen Flecken oder Verschmutzungen, die der Standardreinigung widerstehen",
                    "Bei Naturstein, der poliert oder neu versiegelt werden muss",
                    "Wenn Spezialtechniken und -geräte erforderlich sind, wie z.B. Dampfreinigung oder Heißwasserextraktion"
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-lg border border-amber-100 bg-amber-50 hover:bg-amber-100 transition-colors"
                    >
                      <AlertTriangle className="h-5 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-amber-800">{item}</span>
                    </div>
                  ))}
                </div>
                
                <p>
                  Unsere professionellen Reinigungsteams verfügen über das Fachwissen, die Erfahrung und die spezialisierten Werkzeuge, um selbst die anspruchsvollsten Reinigungsaufgaben zu bewältigen, und können die Lebensdauer Ihrer wertvollen Materialien verlängern.
                </p>
              </div>
              
              {/* Teilen und Datum */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Letzte Aktualisierung: {format(date, 'dd. MMMM yyyy', { locale: de })}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-gray-100"
                    onClick={() => shareContent(title, window.location.href)}
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
                <Card className="bg-gradient-to-b from-teal-50 to-teal-50/30 border border-teal-100 rounded-xl shadow-sm overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="bg-white p-1.5 rounded-full shadow-sm">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                      </div>
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Investieren Sie in hochwertige Mikrofasertücher in verschiedenen Farben, um Cross-Kontamination zu vermeiden. Verwenden Sie beispielsweise rote Tücher für Sanitärbereiche und blaue für Glasflächen.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Ein weiterer Tipp: Verzichten Sie auf zu viele Spezialreiniger. Mit einem pH-neutralen Allzweckreiniger, einem Entkalker, einem Glasreiniger und einem milden Scheuermittel bewältigen Sie die meisten Reinigungsaufgaben schonend und effizient.
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
                        { url: "/blog/FleckenentfernungsBerater", title: "Fleckenentfernungs-Berater" }
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
      
      {/* Scroll-to-top Button im Apple Stil */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          y: showScrollTop ? 0 : 20,
          scale: showScrollTop ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-3 z-50"
        aria-label="Nach oben scrollen"
      >
        <ChevronUp className="h-5 w-5 text-gray-500" />
      </motion.button>
    </div>
  )
}