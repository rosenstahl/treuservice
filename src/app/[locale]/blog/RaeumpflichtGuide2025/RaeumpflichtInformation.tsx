"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Home, Building, User, Users, AlertTriangle, Info, ArrowRight, CheckCircle2, Clock } from 'lucide-react'

const RaeumpflichtInformation = () => {
  const [eigentumstyp, setEigentumstyp] = useState<string>("eigenheim")
  const [gebaeudeart, setGebaeudeart] = useState<string>("einfamilienhaus")
  const [strassentyp, setStrassentyp] = useState<string>("gemeindestrasse")
  const [bundesland, setBundesland] = useState<string>("bayern")
  const [activeTab, setActiveTab] = useState<string>("grundlagen")

  // Datensatz für rechtliche Informationen nach Bundesland
  const bundeslaenderInfo = {
    bayern: {
      raeumzeiten: "7:00 - 20:00 Uhr (an Sonn- und Feiertagen ab 8:00 Uhr)",
      streusalz: "In den meisten Gemeinden verboten. Ausnahmen nur bei Blitzeis und an Gefahrenstellen wie Treppen.",
      raeumbreite: "Mindestens 1,0 bis 1,5 Meter, bei stark frequentierten Wegen auch breiter.",
      bußgeld: "Bis zu 1.000 € bei Verstoß, bis zu 10.000 € bei Unfällen mit Personenschaden",
      rechtsgrundlage: "Art. 51 Abs. 4 und 5 des Bayerischen Straßen- und Wegegesetzes (BayStrWG)",
      besonderheiten: "Besonders strenge Kontrollen in München und Nürnberg. Strenge Umweltschutzauflagen beim Einsatz von Taumitteln."
    },
    badenwuerttemberg: {
      raeumzeiten: "7:00 - 21:00 Uhr (an Sonn- und Feiertagen ab 8:00 oder 9:00 Uhr)",
      streusalz: "Stark eingeschränkt. Meist nur bei extremer Glätte erlaubt.",
      raeumbreite: "Mindestens 1,0 bis 1,2 Meter, je nach kommunaler Satzung auch mehr.",
      bußgeld: "50 € bis 500 € bei einfachen Verstößen. Bis zu 5.000 € bei schweren Verstößen.",
      rechtsgrundlage: "§ 41 Straßengesetz für Baden-Württemberg (StrG BW)",
      besonderheiten: "Besonders strenge Regelungen in Stuttgart. Privatstraßen sind häufig von der kommunalen Räumpflicht ausgenommen."
    },
    berlin: {
      raeumzeiten: "7:00 - 20:00 Uhr (an Sonn- und Feiertagen ab 9:00 Uhr)",
      streusalz: "Grundsätzlich verboten, nur in Ausnahmen bei extremer Witterung erlaubt.",
      raeumbreite: "Mindestens 1,5 Meter bei Gehwegen.",
      bußgeld: "Bis zu 10.000 € möglich, üblicherweise 25 € bis 500 €.",
      rechtsgrundlage: "§ 4 Straßenreinigungsgesetz Berlin",
      besonderheiten: "Strenge Umweltschutzauflagen. Öffentlicher Winterdienst übernimmt viele Bereiche."
    },
    nrw: {
      raeumzeiten: "7:00 - 20:00 Uhr, je nach Kommune variierend",
      streusalz: "Eingeschränkt erlaubt, abhängig von lokalen Satzungen.",
      raeumbreite: "Typischerweise 1,0 bis 1,2 Meter.",
      bußgeld: "25 € bis 1.000 €, je nach Schwere des Verstoßes.",
      rechtsgrundlage: "§ 8 Straßen- und Wegegesetz NRW (StrWG NRW)",
      besonderheiten: "Stark variierende kommunale Regelungen. In einigen Städten umfassende Winterdienst-Programme."
    },
    sachsen: {
      raeumzeiten: "7:00 - 22:00 Uhr (an Sonn- und Feiertagen ab 9:00 Uhr)",
      streusalz: "Teilweise erlaubt, abhängig von der Kommune.",
      raeumbreite: "Mindestens 1,5 Meter in Städten, 1,0 Meter in ländlichen Gebieten.",
      bußgeld: "20 € bis 500 €, bei schweren Verstößen bis 1.000 €.",
      rechtsgrundlage: "§ 9 Sächsisches Straßengesetz (SächsStrG)",
      besonderheiten: "Strikte Regelungen für Gewerbebetriebe. Spezielle Vorschriften für Bergregionen."
    }
  }

  // Generiere Informationstext basierend auf den ausgewählten Optionen
  const getInformationstext = () => {
    let text = "Als "
    
    if (eigentumstyp === "eigenheim") {
      text += "Eigentümer"
      
      if (gebaeudeart === "einfamilienhaus") {
        text += " eines Einfamilienhauses"
      } else if (gebaeudeart === "mehrfamilienhaus") {
        text += " eines Mehrfamilienhauses"
      } else if (gebaeudeart === "reihenhaus") {
        text += " eines Reihenhauses"
      }
    } else if (eigentumstyp === "vermieter") {
      text += "Vermieter"
    } else if (eigentumstyp === "mieter") {
      text += "Mieter"
    } else if (eigentumstyp === "hausverwalter") {
      text += "Hausverwalter"
    }
    
    text += " in " + getBundeslandName(bundesland) + " "
    
    if (strassentyp === "gemeindestrasse") {
      text += "an einer Gemeindestraße"
    } else if (strassentyp === "privatstrasse") {
      text += "an einer Privatstraße"
    } else if (strassentyp === "hauptstrasse") {
      text += "an einer Hauptstraße"
    }
    
    return text
  }

  // Helper-Funktionen
  const getBundeslandName = (kuerzel: string) => {
    const namen = {
      bayern: "Bayern",
      badenwuerttemberg: "Baden-Württemberg",
      berlin: "Berlin",
      nrw: "Nordrhein-Westfalen",
      sachsen: "Sachsen"
    }
    return namen[kuerzel as keyof typeof namen] || kuerzel
  }

  // Ermittle die rechtliche Situation
  const getRechtsinfo = () => {
    const info = bundeslaenderInfo[bundesland as keyof typeof bundeslaenderInfo]
    
    let verantwortlich = ""
    
    if (eigentumstyp === "eigenheim") {
      verantwortlich = "Sie als Eigentümer sind grundsätzlich verantwortlich."
      
      if (gebaeudeart === "mehrfamilienhaus") {
        verantwortlich += " Die Räumpflicht kann vertraglich auf die Mieter übertragen werden."
      }
    } else if (eigentumstyp === "vermieter") {
      verantwortlich = "Sie als Vermieter sind grundsätzlich verantwortlich. Die Räumpflicht kann vertraglich auf die Mieter übertragen werden, muss aber wirksam kontrolliert werden."
    } else if (eigentumstyp === "mieter") {
      verantwortlich = "Die Räumpflicht obliegt grundsätzlich dem Eigentümer/Vermieter. Als Mieter sind Sie nur verantwortlich, wenn dies vertraglich vereinbart wurde."
    } else if (eigentumstyp === "hausverwalter") {
      verantwortlich = "Die Verantwortung liegt formal beim Eigentümer. Als Hausverwalter müssen Sie sicherstellen, dass die Räumpflicht erfüllt wird - entweder durch Organisation eines Dienstes oder durch klare Regelungen für die Mieter."
    }
    
    if (strassentyp === "hauptstrasse") {
      verantwortlich += " Bei Hauptstraßen ist oft die Kommune für die Fahrbahn zuständig, für den Gehweg bleiben jedoch Sie verantwortlich."
    } else if (strassentyp === "privatstrasse") {
      verantwortlich += " Bei Privatstraßen liegt die volle Verantwortung bei Ihnen als Eigentümer."
    }
    
    return {
      verantwortlich,
      zeiten: info.raeumzeiten,
      streusalz: info.streusalz,
      bußgeld: info.bußgeld,
      rechtsgrundlage: info.rechtsgrundlage,
      besonderheiten: info.besonderheiten
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Interaktiver Räumpflicht-Checker</CardTitle>
        <CardDescription>
          Prüfen Sie Ihre persönliche Situation und erhalten Sie maßgeschneiderte Informationen zur Räum- und Streupflicht
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Auswahl-Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Ihre Situation:</h3>
                <RadioGroup value={eigentumstyp} onValueChange={setEigentumstyp} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eigenheim" id="eigenheim" />
                    <Label htmlFor="eigenheim" className="flex items-center cursor-pointer">
                      <Home className="w-4 h-4 mr-2 text-primary" />
                      Eigentümer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vermieter" id="vermieter" />
                    <Label htmlFor="vermieter" className="flex items-center cursor-pointer">
                      <Building className="w-4 h-4 mr-2 text-primary" />
                      Vermieter
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mieter" id="mieter" />
                    <Label htmlFor="mieter" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2 text-primary" />
                      Mieter
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hausverwalter" id="hausverwalter" />
                    <Label htmlFor="hausverwalter" className="flex items-center cursor-pointer">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      Hausverwalter
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {eigentumstyp === "eigenheim" && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Gebäudeart:</h3>
                  <RadioGroup value={gebaeudeart} onValueChange={setGebaeudeart} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="einfamilienhaus" id="einfamilienhaus" />
                      <Label htmlFor="einfamilienhaus">Einfamilienhaus</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mehrfamilienhaus" id="mehrfamilienhaus" />
                      <Label htmlFor="mehrfamilienhaus">Mehrfamilienhaus</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reihenhaus" id="reihenhaus" />
                      <Label htmlFor="reihenhaus">Reihenhaus</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Bundesland:</h3>
                <RadioGroup value={bundesland} onValueChange={setBundesland} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bayern" id="bayern" />
                    <Label htmlFor="bayern">Bayern</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="badenwuerttemberg" id="badenwuerttemberg" />
                    <Label htmlFor="badenwuerttemberg">Baden-Württemberg</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="berlin" id="berlin" />
                    <Label htmlFor="berlin">Berlin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nrw" id="nrw" />
                    <Label htmlFor="nrw">Nordrhein-Westfalen</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sachsen" id="sachsen" />
                    <Label htmlFor="sachsen">Sachsen</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Straßentyp:</h3>
                <RadioGroup value={strassentyp} onValueChange={setStrassentyp} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gemeindestrasse" id="gemeindestrasse" />
                    <Label htmlFor="gemeindestrasse">Gemeindestraße/normale Wohnstraße</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hauptstrasse" id="hauptstrasse" />
                    <Label htmlFor="hauptstrasse">Hauptstraße/stark befahrene Straße</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="privatstrasse" id="privatstrasse" />
                    <Label htmlFor="privatstrasse">Privatstraße</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          {/* Informationsbereich */}
          <div className="mt-6 border rounded-lg overflow-hidden">
            <div className="bg-slate-50 p-4 border-b">
              <h3 className="font-medium">Ihre Situation:</h3>
              <p className="text-muted-foreground">{getInformationstext()}</p>
            </div>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="p-4"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="grundlagen">Rechtliche Grundlagen</TabsTrigger>
                <TabsTrigger value="tipps">Praktische Tipps</TabsTrigger>
              </TabsList>
              
              <TabsContent value="grundlagen" className="space-y-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border">
                      <h4 className="font-medium flex items-center">
                        <User className="w-4 h-4 mr-2 text-primary" />
                        Verantwortlichkeit
                      </h4>
                      <p className="text-sm mt-1">{getRechtsinfo().verantwortlich}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border">
                      <h4 className="font-medium flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        Räumzeiten
                      </h4>
                      <p className="text-sm mt-1">{getRechtsinfo().zeiten}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border">
                      <h4 className="font-medium flex items-center">
                        <Info className="w-4 h-4 mr-2 text-primary" />
                        Streusalz-Regelung
                      </h4>
                      <p className="text-sm mt-1">{getRechtsinfo().streusalz}</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border">
                      <h4 className="font-medium flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-primary" />
                        Mögliche Bußgelder
                      </h4>
                      <p className="text-sm mt-1">{getRechtsinfo().bußgeld}</p>
                    </div>
                  </div>
                  
                  <Alert className="bg-slate-50 border-slate-200">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Rechtsgrundlage</AlertTitle>
                    <AlertDescription className="text-sm">
                      {getRechtsinfo().rechtsgrundlage}
                    </AlertDescription>
                  </Alert>
                  
                  {getRechtsinfo().besonderheiten && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">Besonderheiten in {getBundeslandName(bundesland)}</AlertTitle>
                      <AlertDescription className="text-sm text-blue-700">
                        {getRechtsinfo().besonderheiten}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="tipps" className="space-y-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <h4 className="font-medium mb-2">Praktische Tipps für Ihre Situation</h4>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">
                        Dokumentieren Sie Ihre Räum- und Streumaßnahmen schriftlich mit Datum, Uhrzeit und Art der Durchführung.
                      </span>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">
                        Informieren Sie sich über die spezifischen Regelungen Ihrer Gemeinde, da kommunale Satzungen von den allgemeinen Landesregelungen abweichen können.
                      </span>
                    </li>
                    
                    {eigentumstyp === "eigenheim" && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Prüfen Sie Ihre private Haftpflichtversicherung auf ausreichenden Schutz bei Verletzung der Räumpflicht.
                        </span>
                      </li>
                    )}
                    
                    {eigentumstyp === "vermieter" && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Überwachen Sie regelmäßig die Durchführung, wenn Sie die Räumpflicht vertraglich auf Mieter übertragen haben.
                        </span>
                      </li>
                    )}
                    
                    {eigentumstyp === "mieter" && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Prüfen Sie Ihren Mietvertrag auf Klauseln zur Übertragung der Räumpflicht und achten Sie auf deren Rechtmäßigkeit.
                        </span>
                      </li>
                    )}
                    
                    {eigentumstyp === "hausverwalter" && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Erstellen Sie einen klaren Plan zur Räumpflicht für die Eigentümergemeinschaft und regeln Sie Vertretungsfälle.
                        </span>
                      </li>
                    )}
                    
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">
                        In {getBundeslandName(bundesland)} sollten Sie besonders auf die lokalen Regelungen zum Streusalzeinsatz achten und umweltfreundliche Alternativen wie Granulat und Sand bereithalten.
                      </span>
                    </li>
                    
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">
                        Erwägen Sie die Beauftragung eines professionellen Winterdienstes, der die Haftung übernimmt und alle rechtlichen Anforderungen erfüllt.
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm">
                    <span className="font-medium">Tipp:</span> Die Beauftragung eines professionellen Winterdienstes kann die persönliche Haftung reduzieren.
                  </div>
                  
                  <a href="/winterdienst" className="text-primary hover:underline text-sm flex items-center">
                    Winterdienst anfragen
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RaeumpflichtInformation