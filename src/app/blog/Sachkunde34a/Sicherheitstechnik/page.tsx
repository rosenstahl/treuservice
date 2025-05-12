import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, BookOpen, AlertTriangle, CheckCircle, HelpCircle, MousePointer, ExternalLink, AlertCircle, Lock, Shield, Camera, Bell, DoorOpen, Eye } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Sicherheitstechnik | Sachkunde §34a",
  description: "Grundlagen der Sicherheitstechnik für die Sachkundeprüfung §34a GewO - Mechanische und elektronische Sicherungssysteme, Brandschutz und mehr",
};

export default function SicherheitstechnikPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Sicherheitstechnik</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Grundlagen der Sicherheitstechnik</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Mechanische und elektronische Sicherheitssysteme, Zutrittskontrolle, Videoüberwachung und Brandschutz - die essentiellen Grundlagen für Ihre Sachkundeprüfung
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Mittel</AlertTitle>
        <AlertDescription>
          Sicherheitstechnik macht etwa 10% der schriftlichen Prüfungsfragen aus. Grundlegende Kenntnisse der verschiedenen Sicherungssysteme und ihrer Funktion werden vorausgesetzt.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="mechanisch" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="mechanisch">Mechanische Sicherheit</TabsTrigger>
          <TabsTrigger value="elektronisch">Elektronische Sicherheit</TabsTrigger>
          <TabsTrigger value="zutritt">Zutrittskontrolle</TabsTrigger>
          <TabsTrigger value="brand">Brandschutz</TabsTrigger>
        </TabsList>
        
        {/* Mechanische Sicherheit */}
        <TabsContent value="mechanisch" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Mechanische Sicherungstechnik</h2>
            
            <p>
              Mechanische Sicherheitssysteme bilden die Basis jedes Sicherheitskonzepts. Sie stellen 
              physische Barrieren dar, die ein unbefugtes Eindringen erschweren und verzögern sollen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-blue-600" />
                    Schlösser und Schließanlagen
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-2">
                    Schlösser sind eine der grundlegendsten Sicherheitsvorrichtungen. Es gibt verschiedene Typen mit 
                    unterschiedlichen Sicherheitsstufen:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Standardzylinder:</strong> Einfache, kostengünstige Lösung mit begrenztem Schutz</li>
                    <li><strong>Sicherheitszylinder:</strong> Erhöhter Schutz gegen Picking und Aufbohren</li>
                    <li><strong>Hochsicherheitszylinder:</strong> Maximaler Schutz, oft mit Patentschutz und Kopierschutz</li>
                    <li><strong>Elektronische Schließsysteme:</strong> Kombination aus mechanischer und elektronischer Sicherheit</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Türen und Torsicherungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-2">
                    Neben dem Schloss sind auch Tür und Zarge wichtige Sicherheitsfaktoren:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Sicherheitstüren:</strong> Verstärkte Konstruktion, oft mit Mehrfachverriegelung</li>
                    <li><strong>Panzerriegel:</strong> Zusätzliche Verriegelung für bestehende Türen</li>
                    <li><strong>Türverstärkungen:</strong> Bandseiten- und Schließblechverstärkungen</li>
                    <li><strong>Querriegelschlösser:</strong> Verriegeln die Tür an mehreren Punkten</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Weitere mechanische Sicherungselemente</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Fenstersicherungen</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <p>
                    Fenster sind häufige Angriffspunkte bei Einbrüchen und sollten gesichert werden:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Abschließbare Fenstergriffe</li>
                    <li>Zusatzschlösser für Fenster</li>
                    <li>Fenstergitter und -stäbe</li>
                    <li>Rollläden mit Hochschiebesicherung</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Tresore und Wertbehältnisse</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <p>
                    Zum Schutz wertvoller Gegenstände und vertraulicher Dokumente:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Möbeltresore (in Möbel eingebaut)</li>
                    <li>Wandtresore (in die Wand eingelassen)</li>
                    <li>Standtresore (freistehend, oft sehr schwer)</li>
                    <li>Wertschutzschränke (verschiedene Widerstandsgrade)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Perimetersicherung</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <p>
                    Sicherung der Außengrenzen eines Objekts:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Zäune und Mauern in verschiedenen Höhen</li>
                    <li>Drehkreuze und Personenschleusen</li>
                    <li>Poller und Durchfahrtssperren</li>
                    <li>Natürliche Barrieren (Hecken, Gräben)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted p-4 rounded-lg mt-4">
              <h4 className="font-medium mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                Widerstandsklassen (RC)
              </h4>
              <p className="text-sm">
                Bei mechanischen Sicherungselementen ist die Widerstandsklasse (Resistance Class, RC) ein wichtiger Indikator für die Sicherheit:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li><strong>RC 1:</strong> Grundschutz gegen Gelegenheitstäter mit körperlicher Gewalt</li>
                <li><strong>RC 2:</strong> Schutz gegen Gelegenheitstäter mit einfachen Werkzeugen</li>
                <li><strong>RC 3:</strong> Schutz gegen Täter mit schwerem Werkzeug</li>
                <li><strong>RC 4-6:</strong> Zunehmender Schutz gegen erfahrene Täter mit professionellem Werkzeug</li>
              </ul>
              <p className="text-sm mt-2 text-muted-foreground">
                Je höher die RC-Klasse, desto länger der Widerstand gegen Einbruchsversuche.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {/* Elektronische Sicherheit */}
        <TabsContent value="elektronisch" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Elektronische Sicherungssysteme</h2>
            
            <p>
              Elektronische Sicherheitssysteme ergänzen mechanische Sicherungen und bieten zusätzlichen Schutz durch 
              Überwachung, Detektion und Alarmierung. Sie erkennen und melden Eindringversuche und andere Gefahren.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-red-600" />
                  Einbruchmeldeanlagen (EMA)
                </h3>
                <p className="text-sm mb-3">
                  Einbruchmeldeanlagen (auch Alarmanlagen genannt) dienen der frühzeitigen Erkennung und Meldung von 
                  Einbruchsversuchen. Eine EMA besteht aus mehreren Komponenten:
                </p>
                <div className="text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">1</Badge>
                    <div>
                      <p className="font-medium">Zentrale</p>
                      <p className="text-muted-foreground">Das "Gehirn" der Anlage, verarbeitet Signale der Melder, löst Alarm aus, kommuniziert mit Notruf- und Serviceleitstelle.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">2</Badge>
                    <div>
                      <p className="font-medium">Melder (Sensoren)</p>
                      <p className="text-muted-foreground">Erfassen Einbruchsversuche und senden Signale an die Zentrale. Verschiedene Typen:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li><strong>Öffnungsmelder:</strong> Überwachen Türen und Fenster</li>
                        <li><strong>Bewegungsmelder:</strong> Erkennen Bewegungen im Raum</li>
                        <li><strong>Glasbruchmelder:</strong> Erkennen das Zerbrechen von Glas</li>
                        <li><strong>Erschütterungsmelder:</strong> Registrieren Erschütterungen an Wänden oder Safes</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">3</Badge>
                    <div>
                      <p className="font-medium">Signalgeber</p>
                      <p className="text-muted-foreground">Lösen bei Alarm akustische und optische Signale aus:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li><strong>Sirenen:</strong> Lauter akustischer Alarm (innen und außen)</li>
                        <li><strong>Blitzleuchten:</strong> Optisches Signal bei Alarm</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">4</Badge>
                    <div>
                      <p className="font-medium">Bedienelemente</p>
                      <p className="text-muted-foreground">Ermöglichen das Scharf-/Unscharfschalten und die Steuerung der Anlage:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li><strong>Bedienteil:</strong> Tastatur mit Display</li>
                        <li><strong>Schlüsselschalter:</strong> Aktivierung per Schlüssel</li>
                        <li><strong>Kartenleser/Transponder:</strong> Berührungslose Aktivierung</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-blue-600" />
                  Videoüberwachungssysteme (CCTV)
                </h3>
                <p className="text-sm mb-3">
                  Videoüberwachungssysteme (CCTV - Closed Circuit Television) dienen der optischen Überwachung 
                  von Bereichen und der Dokumentation von Ereignissen.
                </p>
                <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <p className="font-medium">Komponenten</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Kameras:</strong> Unterschiedliche Typen für verschiedene Anwendungen (Innen/Außen, Tag/Nacht)</li>
                      <li><strong>Aufzeichnungsgeräte:</strong> DVR (Digital Video Recorder) oder NVR (Network Video Recorder)</li>
                      <li><strong>Monitore:</strong> Zur Livebeobachtung</li>
                      <li><strong>Netzwerkkomponenten:</strong> Für IP-basierte Systeme</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium">Kameratypen</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Festkameras:</strong> Fixe Bildausrichtung</li>
                      <li><strong>PTZ-Kameras:</strong> Schwenk-, Neige- und Zoomfunktion</li>
                      <li><strong>Dome-Kameras:</strong> Halbkugelförmig, diskret</li>
                      <li><strong>Thermalkameras:</strong> Erkennen Wärmestrahlung, auch bei Dunkelheit</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded mt-3">
                  <p className="text-sm">
                    <strong>Datenschutzhinweis:</strong> Bei der Videoüberwachung sind die gesetzlichen 
                    Bestimmungen der DSGVO zu beachten! Hierzu gehören Hinweisschilder, begrenzte 
                    Speicherdauer und ein berechtigtes Interesse an der Überwachung.
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Überfall- und Notfallmeldesysteme
                </h3>
                <p className="text-sm mb-3">
                  Diese Systeme dienen dem Schutz von Personen in Gefahrensituationen wie Überfällen oder medizinischen Notfällen.
                </p>
                <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Überfallmeldeanlagen</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Ermöglichen das unauffällige Auslösen eines Alarms bei Bedrohungssituationen:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Überfallmelder:</strong> Fest installierte Taster</li>
                        <li><strong>Fußleisten:</strong> Unauffällige Auslösung mit dem Fuß</li>
                        <li><strong>Funk-Notfallknöpfe:</strong> Mobile Alarmauslösung</li>
                        <li><strong>Stiller Alarm:</strong> Keine hörbare Alarmierung vor Ort</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Notrufsysteme</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Für medizinische Notfälle oder hilfsbedürftige Personen:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Notruftaster:</strong> In Sanitärräumen und barrierefreien Bereichen</li>
                        <li><strong>Personennotsignalanlagen:</strong> Für Alleinarbeitsplätze</li>
                        <li><strong>Seniorennotrufsysteme:</strong> Mit tragbaren Sendern</li>
                        <li><strong>Aufzugnotrufe:</strong> Spezielle Kommunikationssysteme in Aufzügen</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Zutrittskontrolle */}
        <TabsContent value="zutritt" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Zutrittskontrollsysteme</h2>
            
            <p>
              Zutrittskontrollsysteme regeln und überwachen den Zutritt zu geschützten Bereichen. Sie 
              erlauben nur autorisierten Personen den Zugang und dokumentieren Zutrittsversuche und -ereignisse.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Grundlagen</Badge>
                  <CardTitle className="text-base flex items-center">
                    <DoorOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Funktionsprinzip
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Zutrittskontrollsysteme basieren auf dem Prinzip der Identifikation und Authentifizierung:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Identifikation:</strong> Wer ist die Person? (Kartenleser, Fingerabdruck)</li>
                    <li><strong>Authentifizierung:</strong> Ist die Person berechtigt? (PIN, biometrische Merkmale)</li>
                    <li><strong>Autorisierung:</strong> Welche Bereiche darf die Person betreten?</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    Die Sicherheit kann durch Kombination mehrerer Faktoren erhöht werden (Mehr-Faktor-Authentifizierung).
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Komponenten</Badge>
                  <CardTitle className="text-base">Systemaufbau</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Ein modernes Zutrittskontrollsystem besteht aus mehreren Komponenten:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Identifikationsmedien:</strong> Karten, Transponder, Smartphones</li>
                    <li><strong>Lesegeräte:</strong> Erkennen die Identifikationsmedien</li>
                    <li><strong>Türcontroller:</strong> Steuern die Türöffner</li>
                    <li><strong>Zentraleinheit:</strong> Verwaltet Berechtigungen und Ereignisse</li>
                    <li><strong>Management-Software:</strong> Konfiguration und Auswertung</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-xl font-semibold">Identifikationsmethoden</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Wissensbasierte Verfahren</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <p>
                      Basierend auf etwas, das die Person weiß:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>PIN-Codes:</strong> Numerische Kombinationen</li>
                      <li><strong>Passwörter:</strong> Alphanumerische Zeichenfolgen</li>
                      <li><strong>Sicherheitsfragen:</strong> Persönliche Informationen</li>
                    </ul>
                    <p className="text-muted-foreground mt-1">
                      <strong>Vorteil:</strong> Einfache Implementierung<br />
                      <strong>Nachteil:</strong> Kann vergessen oder ausgespäht werden
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Besitzbasierte Verfahren</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <p>
                      Basierend auf etwas, das die Person besitzt:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Zugangskarten:</strong> Magnetstreifen, Barcode, RFID</li>
                      <li><strong>Transponder:</strong> Passive oder aktive Chips</li>
                      <li><strong>Schlüssel:</strong> Mechanisch oder elektronisch</li>
                      <li><strong>Smartphones:</strong> Mit NFC oder Bluetooth</li>
                    </ul>
                    <p className="text-muted-foreground mt-1">
                      <strong>Vorteil:</strong> Einfache Handhabung<br />
                      <strong>Nachteil:</strong> Kann verloren oder gestohlen werden
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Biometrische Verfahren</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <p>
                      Basierend auf körperlichen Merkmalen der Person:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Fingerabdruck:</strong> Verbreitet und zuverlässig</li>
                      <li><strong>Gesichtserkennung:</strong> Kontaktlos und schnell</li>
                      <li><strong>Iriserkennung:</strong> Sehr hohe Sicherheit</li>
                      <li><strong>Handvenenerkennung:</strong> Berührungslos und fälschungssicher</li>
                    </ul>
                    <p className="text-muted-foreground mt-1">
                      <strong>Vorteil:</strong> Hohe Sicherheit, nicht übertragbar<br />
                      <strong>Nachteil:</strong> Höhere Kosten, Datenschutzbedenken
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-muted p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                  Mehr-Faktor-Authentifizierung
                </h4>
                <p className="text-sm">
                  Die Kombination mehrerer Authentifizierungsfaktoren erhöht die Sicherheit erheblich:
                </p>
                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                  <li><strong>2-Faktor-Authentifizierung:</strong> Kombination von zwei Faktoren (z.B. Karte + PIN)</li>
                  <li><strong>3-Faktor-Authentifizierung:</strong> Kombination von drei Faktoren (z.B. Karte + PIN + Fingerabdruck)</li>
                </ul>
                <p className="text-sm mt-2 text-muted-foreground">
                  <strong>Sicherheitsprinzip:</strong> Die Faktoren sollten aus unterschiedlichen Kategorien stammen:
                  Wissen (was man weiß), Besitz (was man hat), Inhärenz (was man ist).
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Brandschutz */}
        <TabsContent value="brand" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Brandschutztechnik</h2>
            
            <p>
              Brandschutztechnische Einrichtungen dienen der Früherkennung von Bränden, der Alarmierung
              von Personen und Feuerwehr sowie der Eindämmung oder Bekämpfung von Bränden. 
              Sie sind ein wichtiger Bestandteil des Sicherheitskonzepts.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-red-600" />
                  Brandmeldeanlagen (BMA)
                </h3>
                <p className="text-sm mb-3">
                  Brandmeldeanlagen dienen der frühzeitigen Erkennung von Bränden und der automatischen 
                  Alarmierung der Feuerwehr.
                </p>
                <div className="text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">1</Badge>
                    <div>
                      <p className="font-medium">Zentrale</p>
                      <p className="text-muted-foreground">Empfängt und verarbeitet die Signale der Brandmelder, löst Alarm aus und steuert angeschlossene Systeme.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">2</Badge>
                    <div>
                      <p className="font-medium">Brandmelder</p>
                      <p className="text-muted-foreground">Verschiedene Typen für unterschiedliche Anwendungen:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li><strong>Rauchmelder:</strong> Optische oder ionisierende Rauchdetektoren</li>
                        <li><strong>Wärmemelder:</strong> Reagieren auf Temperaturanstieg oder Maximaltemperatur</li>
                        <li><strong>Flammenmelder:</strong> Erkennen die UV- oder IR-Strahlung von Flammen</li>
                        <li><strong>Gasmelder:</strong> Detektieren brennbare Gase oder CO</li>
                        <li><strong>Handfeuermelder:</strong> Manuelle Auslösung durch Personen</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">3</Badge>
                    <div>
                      <p className="font-medium">Alarmierungseinrichtungen</p>
                      <p className="text-muted-foreground">Akustische und optische Signale zur Warnung:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li><strong>Sirenen und Hupen:</strong> Akustische Alarmierung</li>
                        <li><strong>Blitzleuchten:</strong> Optische Alarmierung, besonders für Gehörlose</li>
                        <li><strong>Sprachalarmierung:</strong> Durchsagen mit konkreten Handlungsanweisungen</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">4</Badge>
                    <div>
                      <p className="font-medium">Brandschutztechnische Einrichtungen</p>
                      <p className="text-muted-foreground">Von der BMA angesteuerte Systeme:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li><strong>Feuerlöschanlagen:</strong> Automatische Brandbekämpfung</li>
                        <li><strong>Rauch- und Wärmeabzugsanlagen:</strong> Ableitung von Rauch und Wärme</li>
                        <li><strong>Brandschutztüren:</strong> Automatisches Schließen im Brandfall</li>
                        <li><strong>Aufzugssteuerung:</strong> Feuerwehrschaltung bei Aufzügen</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Feuerlöschanlagen
                </h3>
                <p className="text-sm mb-3">
                  Feuerlöschanlagen dienen der automatischen Brandbekämpfung. Es gibt verschiedene Systeme 
                  für unterschiedliche Anwendungsbereiche und Brandklassen.
                </p>
                <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Wasserbasierte Systeme</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Sprinkleranlagen:</strong> Lokale Brandbekämpfung mit Wasser, nur im Brandherd</li>
                        <li><strong>Sprühwasseranlagen:</strong> Gleichzeitige Aktivierung aller Düsen</li>
                        <li><strong>Wassernebel:</strong> Feiner Nebel, geringerer Wasserschaden</li>
                        <li><strong>Schaumlöschanlagen:</strong> Mit Schaum vermischtes Wasser, für Flüssigkeitsbrände</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Gasbasierte Systeme</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>CO2-Anlagen:</strong> Löschwirkung durch Sauerstoffverdrängung</li>
                        <li><strong>Inertgas-Anlagen:</strong> Senken den Sauerstoffgehalt</li>
                        <li><strong>Chemische Löschgase:</strong> Unterbrechen die Verbrennungsreaktion</li>
                      </ul>
                      <p className="text-muted-foreground mt-1">
                        <strong>Beachte:</strong> Gasbasierte Systeme sind für Personen gefährlich und 
                        erfordern besondere Sicherheitsvorkehrungen!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-green-600" />
                  Flucht- und Rettungswege
                </h3>
                <p className="text-sm mb-3">
                  Flucht- und Rettungswege müssen im Brandfall klar erkennbar sein und sicher genutzt werden können.
                  Hier kommen verschiedene technische Einrichtungen zum Einsatz:
                </p>
                <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <p className="font-medium">Kennzeichnung und Beleuchtung</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Fluchtwegzeichen:</strong> Standardisierte grün-weiße Piktogramme</li>
                      <li><strong>Sicherheitsbeleuchtung:</strong> Funktioniert auch bei Stromausfall</li>
                      <li><strong>Dynamische Fluchtwegleitsysteme:</strong> Passen die Fluchtrichtung an die Gefahrenlage an</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium">Türen und Verschlüsse</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Notausgangstüren:</strong> Mit Panikbeschlag, immer von innen zu öffnen</li>
                      <li><strong>Brandschutztüren:</strong> Verhindern die Ausbreitung von Feuer und Rauch</li>
                      <li><strong>Fluchtwegsicherungen:</strong> Ermöglichen die Nutzung im Notfall trotz Zutrittskontrolle</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded mt-3">
                  <p className="text-sm">
                    <strong>Wichtig für die Prüfung:</strong> Flucht- und Rettungswege müssen immer freigehalten werden. 
                    Das Blockieren oder Versperren ist verboten und kann im Brandfall zu Todesfällen führen!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Besondere Verantwortung für Sicherheitspersonal</AlertTitle>
            <AlertDescription>
              Sicherheitsmitarbeiter haben im Brandfall eine besondere Verantwortung. Sie müssen die 
              brandschutztechnischen Einrichtungen kennen, mit ihnen umgehen können und im Notfall 
              die Evakuierung unterstützen. Regelmäßige Schulungen und Übungen sind daher essentiell.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* Lernhilfen und Zusammenfassung */}
      <div className="space-y-6 p-6 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-bold">Lernhilfen und Schlüsselbegriffe</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Essentielle Begriffe</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Mechanische Sicherheit:</strong> Physische Barrieren wie Schlösser, Türen und Fenster</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Einbruchmeldeanlage (EMA):</strong> System zur Erkennung und Meldung von Einbruchsversuchen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Zutrittskontrollsystem:</strong> Regelt den Zugang zu Bereichen für autorisierte Personen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Brandmeldeanlage (BMA):</strong> System zur frühzeitigen Erkennung von Bränden</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Nennen Sie die Komponenten einer Einbruchmeldeanlage und erklären Sie ihre Funktion.</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Arten von Zutrittskontrollsystemen gibt es und wie funktionieren sie?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was bedeutet Mehr-Faktor-Authentifizierung und warum ist sie sicherer?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Brandmeldertypen gibt es und für welche Anwendungen werden sie eingesetzt?</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA-Bereich */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
        <div>
          <h3 className="text-lg font-medium mb-2">Bereit für die nächsten Themen?</h3>
          <p className="text-sm text-muted-foreground">
            Setzen Sie Ihre Vorbereitung mit den anderen Prüfungsbereichen fort oder testen Sie Ihr Wissen im Simulator.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/blog/Sachkunde34a/UVV"
            className={buttonVariants({ variant: "outline" })}
          >
            <BookOpen className="mr-2 h-4 w-4" /> Nächstes Thema
          </Link>
          <Link
            href="/blog/Sachkunde34a/PruefungsSimulator"
            className={buttonVariants({})}
          >
            <MousePointer className="mr-2 h-4 w-4" /> Zum Prüfungssimulator
          </Link>
        </div>
      </div>

      {/* Weitere Ressourcen */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-medium">Weiterführende Ressourcen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.bhe.de/de/weitere-infos/bhe-publikationen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>BHE Bundesverband Sicherheitstechnik</span>
          </a>
          
          <a
            href="https://www.vds.de/de/publikationen/richtlinien/download"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>VdS-Richtlinien zur Sicherheitstechnik</span>
          </a>
        </div>
      </div>
    </div>
  );
}
