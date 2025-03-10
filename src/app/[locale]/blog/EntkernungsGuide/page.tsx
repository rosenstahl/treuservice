"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card"
import { 
  CheckCircle2, 
  ChevronRight, 
  Hammer, 
  HardHat, 
  Clock, 
  Trash2,
  Shield,
  Info,
  Users,
  FileText,
  Pipette,
  Wrench
} from "lucide-react"
import entkernungData from "@/i18n/de/entkernung.json"

export default function EntkernungsGuidePage() {
  return (
    <div className="flex-1 pb-20">
      {/* Hero Section */}
      <Section className="pt-32 bg-gradient-to-b from-accent/10 to-transparent">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-bounce bg-accent/20 p-2 rounded-full mb-4">
              <HardHat className="h-8 w-8 text-accent" />
            </div>
            <H1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ablauf einer Entkernungsarbeit
            </H1>
            <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-xl md:text-2xl font-medium mb-6">
              Professioneller Rückbau in 10 Schritten erklärt
            </div>
            <Paragraph className="text-muted-foreground text-lg mb-8">
              Ein umfassender Guide, der Ihnen den professionellen Entkernungsprozess vom ersten bis zum letzten Schritt erklärt. 
              Erfahren Sie, wie TREU Service Ihr Projekt systematisch, sicher und effizient durchführt.
            </Paragraph>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
              <Link href="/entkernung" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
                Zurück zur Entkernungsseite
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-accent/20 hover:bg-accent/5 transition-colors">
                Kostenloses Angebot anfordern
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="my-8" />

      {/* Ablauf Steps */}
      <Section>
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <H2 className="mb-4">Der professionelle Entkernungsprozess bei TREU Service</H2>
              <Paragraph className="text-muted-foreground max-w-3xl mx-auto">
                {entkernungData.ablauf.content}
              </Paragraph>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[24px] md:left-1/2 md:ml-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/80 via-accent to-accent/30" />
              
              {/* Steps */}
              <div className="space-y-12 relative">
                {entkernungData.ablauf.items.map((step, index) => {
                  // Icons für verschiedene Schritte
                  const icons = [
                    <FileText key="planning" className="h-8 w-8" />,
                    <Shield key="safety" className="h-8 w-8" />,
                    <Trash2 key="furniture" className="h-8 w-8" />,
                    <Pipette key="pipes" className="h-8 w-8" />,
                    <Hammer key="walls" className="h-8 w-8" />,
                    <Wrench key="floors" className="h-8 w-8" />,
                    <Info key="electric" className="h-8 w-8" />,
                    <Users key="pipes2" className="h-8 w-8" />,
                    <Trash2 key="cleanup" className="h-8 w-8" />,
                    <HardHat key="disposal" className="h-8 w-8" />
                  ];
                  
                  // Abwechselnd links/rechts bei Desktop
                  const isLeft = index % 2 === 0;
                  
                  return (
                    <InView
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: isLeft ? -20 : 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className={cn(
                        "flex flex-col md:flex-row items-start relative",
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      )}>
                        {/* Step Number Circle */}
                        <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-accent shadow-lg">
                          <span className="text-accent font-bold">{index + 1}</span>
                        </div>
                        
                        {/* Content Card */}
                        <div className={cn(
                          "ml-16 md:ml-0 w-full md:w-[calc(50%-20px)]",
                          isLeft ? "md:mr-10" : "md:ml-10"
                        )}>
                          <Card className="overflow-hidden hover:shadow-md transition-shadow border-accent/10">
                            <CardHeader className="bg-accent/5">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                  {icons[index]}
                                </div>
                                <CardTitle>{step.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <Paragraph>{step.description}</Paragraph>
                            </CardContent>
                            <CardFooter className="border-t border-border/50 bg-muted/20 flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">
                                Schritt {index + 1} von 10
                              </div>
                              <div className="flex items-center text-xs text-accent gap-1">
                                <Clock className="h-3 w-3" />
                                {["Kurz", "Mittel", "Lang"][Math.floor(Math.random() * 3)]}
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                    </InView>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Wichtige Hinweise */}
      <Section className="bg-primary/5 mt-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 text-center">
              <H2 className="mb-4">Wichtige Hinweise zur Entkernungsarbeit</H2>
              <Paragraph className="text-muted-foreground max-w-3xl mx-auto">
                Beachten Sie diese wichtigen Punkte für ein erfolgreiches Entkernungsprojekt
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Genehmigungen einholen",
                  description: "Stellen Sie sicher, dass alle behördlichen Genehmigungen vorliegen, bevor Sie mit den Arbeiten beginnen."
                },
                {
                  title: "Sicherheit geht vor",
                  description: "Arbeiten Sie immer mit entsprechender Schutzausrüstung und sichern Sie die Baustelle ab."
                },
                {
                  title: "Schadstofferkundung",
                  description: "Lassen Sie vor Beginn eine professionelle Schadstofferkundung durchführen."
                },
                {
                  title: "Baustatik beachten",
                  description: "Achten Sie auf die statische Integrität des Gebäudes während der Entkernung."
                },
                {
                  title: "Fachgerechte Entsorgung",
                  description: "Sorgen Sie für eine sortenreine Trennung und fachgerechte Entsorgung aller Materialien."
                },
                {
                  title: "Nachbarn informieren",
                  description: "Informieren Sie rechtzeitig alle Nachbarn über die geplanten Arbeiten."
                }
              ].map((item, index) => (
                <InView
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-accent/10 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-accent/10 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <H3 className="text-lg font-medium mb-2">{item.title}</H3>
                        <Paragraph className="text-sm text-muted-foreground">{item.description}</Paragraph>
                      </div>
                    </div>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="mt-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-8 md:p-10 text-center">
              <div className="inline-block bg-white p-3 rounded-full shadow-sm mb-6">
                <Hammer className="h-8 w-8 text-accent" />
              </div>
              <H2 className="text-2xl md:text-3xl font-bold mb-4">Bereit für Ihr Entkernungsprojekt?</H2>
              <Paragraph className="text-muted-foreground max-w-2xl mx-auto mb-8">
                TREU Service steht Ihnen mit Fachwissen, Erfahrung und modernster Ausrüstung für eine sichere und effiziente Entkernung zur Verfügung. Fordern Sie jetzt Ihr unverbindliches Angebot an!
              </Paragraph>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/entkernung" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
                  Zurück zur Entkernungsseite
                </Link>
                <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-accent/20 hover:bg-accent/5 transition-colors">
                  Kostenloses Angebot anfordern
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}