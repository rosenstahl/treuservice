"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Share2, ChevronRight, Download, Calculator } from "lucide-react"
import Image from "next/image"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import Link from 'next/link'

// Typen für die Blog-Daten
interface BlogStep {
  number: number;
  title: string;
  intro?: string;
  items: {
    title: string;
    description: string;
  }[];
}

interface BlogSection {
  title: string;
  problems: {
    title: string;
    cause: string;
    solution: string[];
    prevention: string[];
  }[];
}

interface BlogData {
  title: string;
  subtitle?: string;
  intro?: string;
  steps?: BlogStep[];
  sections?: {
    [key: string]: BlogSection;
  };
  materials?: {
    name: string;
    wirkung: string;
    vorteile: string[];
    nachteile: string[];
  }[];
  summary?: {
    general: string;
    chemical_agents: string;
    extreme_conditions: string;
    natural_alternatives: string;
  };
  legal_basis?: {
    title: string;
    requirements: {
      when_needed: string;
      preparation: string;
    };
    legal_sources: {
      name: string;
      section?: string;
      content: string;
    }[];
  };
  required_content?: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  creation_steps?: {
    title: string;
    steps: {
      number: number;
      title: string;
      tasks: string[];
    }[];
  };
  conclusion?: {
    summary?: string;
    benefits?: string[];
    final_note?: string;
    text?: string;
    closing?: string;
  };
}

interface Author {
  name: string;
  image: string;
}

interface BlogPageProps {
  category?: string;
  data: BlogData;
  date?: Date;
  readingTime?: string;
  author?: Author;
}

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-accent bg-accent/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

const Avatar: React.FC<{ src: string; alt: string; }> = ({ src, alt }) => (
  <div className="relative w-8 h-8 rounded-full overflow-hidden">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
    />
  </div>
);

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

export default function BlogPage({ 
  category = "reinigung",
  data, 
  date = new Date(),
  readingTime = "5 min",
  author = {
    name: "TREU Service",
    image: "/images/logo.png"
  }
}: BlogPageProps) {
  return (
    <div className="flex-1">
      <Section className="pt-0 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">{category}</span>
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-3">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {data.title}
            </H1>
            {data.subtitle && (
              <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
                {data.subtitle}
              </H2>
            )}
            {data.intro && (
              <Paragraph className="text-base text-muted-foreground">
                {data.intro}
              </Paragraph>
            )}
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <Avatar src={author.image} alt={author.name} />
                <span className="text-sm">{author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span className="text-sm">{format(date, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readingTime} Lesezeit</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      <Section className="py-6">
        <Container>
          {category === "winterdienst" && data.materials ? (
            <div>
              <div className="prose prose-base max-w-none">
                <div className="mb-8 mt-4">
                  <H2 className="mb-4 text-2xl">Übersicht der Streumittel</H2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-accent/10">
                          <th className="border p-2 text-left">Streumittel</th>
                          <th className="border p-2 text-left">Wirkung</th>
                          <th className="border p-2 text-left">Vorteile</th>
                          <th className="border p-2 text-left">Nachteile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.materials.map((material, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="border p-2">{material.name}</td>
                            <td className="border p-2">{material.wirkung}</td>
                            <td className="border p-2">
                              <ul className="list-disc pl-5 space-y-1">
                                {material.vorteile.map((vorteil, i) => (
                                  <li key={i} className="text-sm">{vorteil}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="border p-2">
                              <ul className="list-disc pl-5 space-y-1">
                                {material.nachteile.map((nachteil, i) => (
                                  <li key={i} className="text-sm">{nachteil}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {data.summary && (
                    <div className="mt-6 space-y-4">
                      <Paragraph className="text-base">{data.summary.general}</Paragraph>
                      <Paragraph className="text-base">{data.summary.chemical_agents}</Paragraph>
                      <Paragraph className="text-base">{data.summary.extreme_conditions}</Paragraph>
                      <Paragraph className="text-base">{data.summary.natural_alternatives}</Paragraph>
                    </div>
                  )}
                </div>
                
                {/* Call-to-Action für den Streumittel-Rechner */}
                <div className="mb-8 mt-8">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-primary" />
                        Interaktiver Streumittel-Rechner
                      </CardTitle>
                      <CardDescription>
                        Berechnen Sie Ihren individuellen Streumittelbedarf und erhalten Sie maßgeschneiderte Empfehlungen
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm">
                        Mit unserem neuen Streumittelrechner können Sie ganz einfach:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 mb-6">
                        <li className="text-sm">Die benötigte Streumittelmenge für Ihre Fläche berechnen</li>
                        <li className="text-sm">Kosten kalkulieren und Vergleichen</li>
                        <li className="text-sm">Umweltauswirkungen verschiedener Produkte bewerten</li>
                        <li className="text-sm">Nachhaltige Alternativen entdecken</li>
                      </ul>
                      <Link href="/blog/StreumittelCalculator">
                        <Button size="lg" className="w-full sm:w-auto">
                          Zum Streumittel-Rechner
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => ShareContent(data.title, window.location.href)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Teilen
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="prose prose-base max-w-none">
                  {category !== "security" && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                      <Image
                        src={`/images/blog/${category}/main.jpg`}
                        fill
                        className="object-cover"
                        alt={data.title}
                        priority
                      />
                    </div>
                  )}

                  {category === "security" && (
                    <div className="mb-8" id="notfallplan-pdf">
                      <H2 className="mb-4 text-2xl">Notfallplan-Muster</H2>
                      <div className="mb-4">
                        <a 
                          href="/pdfs/notfallplan-muster.pdf" 
                          download 
                          className="flex items-center bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded"
                        >
                          <Download className="h-5 w-5 mr-2" />
                          Notfallplan herunterladen
                        </a>
                      </div>
                      <object 
                        data="/pdfs/notfallplan-muster.pdf" 
                        type="application/pdf" 
                        width="100%" 
                        height="500px" 
                        className="rounded border"
                      >
                        <p>Ihr Browser kann PDFs nicht anzeigen. 
                          <a href="/pdfs/notfallplan-muster.pdf" download>Klicken Sie hier, um das PDF herunterzuladen</a>
                        </p>
                      </object>
                    </div>
                  )}

                  {/* Notfallpläne für Unternehmen */}
                  {data.legal_basis && (
                    <div className="mb-8" id="legal_basis">
                      <H2 className="mb-4 text-2xl">{data.legal_basis.title}</H2>
                      <Card className="mb-5">
                        <CardHeader>
                          <CardTitle className="text-lg">Notwendigkeit</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Paragraph className="text-base mb-2">{data.legal_basis.requirements.when_needed}</Paragraph>
                          <Paragraph className="text-base">{data.legal_basis.requirements.preparation}</Paragraph>
                        </CardContent>
                      </Card>
                      
                      <H3 className="mb-3 text-xl">Gesetzliche Grundlagen</H3>
                      <div className="space-y-4">
                        {data.legal_basis.legal_sources.map((source, index) => (
                          <div key={index} className="border-l-4 border-accent pl-4 py-2">
                            <p className="font-semibold text-base">
                              {source.name} {source.section && `(${source.section})`}
                            </p>
                            <p className="text-sm text-muted-foreground">{source.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.required_content && (
                    <div className="mb-8" id="required_content">
                      <H2 className="mb-4 text-2xl">{data.required_content.title}</H2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {data.required_content.items.map((item, index) => (
                          <Card key={index}>
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 pb-3">
                              <Paragraph className="text-sm">{item.description}</Paragraph>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.creation_steps && (
                    <div className="mb-8" id="creation_steps">
                      <H2 className="mb-4 text-2xl">{data.creation_steps.title}</H2>
                      <div className="space-y-6">
                        {data.creation_steps.steps.map((step) => (
                          <Card key={step.number} className="mb-4 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {step.number}. {step.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc pl-5 space-y-2">
                                {step.tasks.map((task, index) => (
                                  <li key={index} className="text-sm">{task}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content Sections/Steps */}
                  {data.sections ? (
                    // Render sections (für Reinigung)
                    Object.entries(data.sections).map(([key, section]) => (
                      <div key={key} id={key} className="mb-8">
                        <H2 className="mb-4 text-2xl">{section.title}</H2>
                        {section.problems.map((problem, index) => (
                          <Card key={index} className="mb-6">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{problem.title}</CardTitle>
                              <CardDescription className="text-red-500 text-sm">
                                {problem.cause}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <H3 className="text-base mb-2">Lösung:</H3>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {problem.solution.map((sol: string, i: number) => (
                                      <li key={i} className="text-sm text-green-600">{sol}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <H3 className="text-base mb-2">Prävention:</H3>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {problem.prevention.map((prev: string, i: number) => (
                                      <li key={i} className="text-sm text-blue-600">{prev}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ))
                  ) : data.steps ? (
                    // Render steps (für Winterdienst)
                    <div>
                      {/* Streumittel-Rechner Call-to-Action für Winterdienst-Artikel */}
                      {category === "winterdienst" && (
                        <div className="mb-8">
                          <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-primary" />
                                Interaktiver Streumittel-Rechner
                              </CardTitle>
                              <CardDescription>
                                Berechnen Sie Ihren individuellen Streumittelbedarf und erhalten Sie maßgeschneiderte Empfehlungen
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="mb-4 text-sm">
                                Mit unserem neuen Streumittelrechner können Sie ganz einfach:
                              </p>
                              <ul className="list-disc pl-5 space-y-1 mb-6">
                                <li className="text-sm">Die benötigte Streumittelmenge für Ihre Fläche berechnen</li>
                                <li className="text-sm">Kosten kalkulieren und Vergleichen</li>
                                <li className="text-sm">Umweltauswirkungen verschiedener Produkte bewerten</li>
                                <li className="text-sm">Nachhaltige Alternativen entdecken</li>
                              </ul>
                              <Link href="/blog/StreumittelCalculator">
                                <Button size="lg" className="w-full sm:w-auto">
                                  Zum Streumittel-Rechner
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        </div>
                      )}

                      {data.steps.map((step, index) => (
                        <div key={index} id={`step-${step.number}`} className="mb-8">
                          <H2 className="mb-4 text-2xl">
                            {step.number}. {step.title}
                          </H2>
                          {step.intro && (
                            <Paragraph className="text-base mb-4">{step.intro}</Paragraph>
                          )}
                          <div className="space-y-4">
                            {step.items.map((item, i) => (
                              <Card key={i} className="mb-4">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Paragraph className="text-sm">{item.description}</Paragraph>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Fazit am Ende */}
                  {data.conclusion && (
                    <div className="mb-8 bg-accent/5 p-4 rounded-lg" id="conclusion">
                      <H2 className="mb-3 text-2xl">Fazit</H2>
                      {data.conclusion.summary && (
                        <Paragraph className="text-base mb-3">{data.conclusion.summary}</Paragraph>
                      )}
                      {data.conclusion.text && (
                        <Paragraph className="text-base mb-3">{data.conclusion.text}</Paragraph>
                      )}
                      {data.conclusion.benefits && (
                        <div className="mb-3">
                          <H3 className="text-lg mb-2">Vorteile:</H3>
                          <ul className="list-disc pl-5 space-y-1">
                            {data.conclusion.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {data.conclusion.final_note && (
                        <Paragraph className="text-base italic">{data.conclusion.final_note}</Paragraph>
                      )}
                      {data.conclusion.closing && (
                        <Paragraph className="text-base italic">{data.conclusion.closing}</Paragraph>
                      )}
                    </div>
                  )}
                </div>

                {/* Share Button */}
                <div className="flex items-center gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => ShareContent(data.title, window.location.href)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Teilen
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-8 space-y-6">
                  {/* Inhaltsverzeichnis */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Inhaltsverzeichnis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[250px] pr-4">
                        <nav className="space-y-1 text-sm">
                          {category === "security" && (
                            <a
                              href="#notfallplan-pdf"
                              className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                            >
                              Notfallplan-Muster
                            </a>
                          )}
                          {data.legal_basis && (
                            <a
                              href="#legal_basis"
                              className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                            >
                              {data.legal_basis.title}
                            </a>
                          )}
                          {data.required_content && (
                            <a
                              href="#required_content"
                              className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                            >
                              {data.required_content.title}
                            </a>
                          )}
                          {data.creation_steps && (
                            <a
                              href="#creation_steps"
                              className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                            >
                              {data.creation_steps.title}
                            </a>
                          )}
                          {data.sections ? (
                            Object.entries(data.sections).map(([key, section]) => (
                              <a
                                key={key}
                                href={`#${key}`}
                                className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                              >
                                {section.title}
                              </a>
                            ))
                          ) : data.steps ? (
                            data.steps.map((step) => (
                              <a
                                key={step.number}
                                href={`#step-${step.number}`}
                                className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                              >
                                {step.number}. {step.title}
                              </a>
                            ))
                          ) : null}
                          {/* Fazit am Ende des Inhaltsverzeichnisses */}
                          {data.conclusion && (
                            <a
                              href="#conclusion"
                              className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                            >
                              Fazit
                            </a>
                          )}
                        </nav>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Quick Links */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Link 
                          href="/blog/reinigung" 
                          className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                        >
                          Reinigungsprobleme und Lösungen
                        </Link>
                        <Link 
                          href="/blog/streumittel" 
                          className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                        >
                          Streugut-Vergleich für den Winterdienst
                        </Link>
                        <Link 
                          href="/blog/StreumittelCalculator" 
                          className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm font-medium text-primary"
                        >
                          Streumittel-Rechner (NEU)
                        </Link>
                        <Link 
                          href="/blog/security" 
                          className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                        >
                          Notfallpläne für Unternehmen
                        </Link>
                        <Link 
                          href="/blog/winterdienst" 
                          className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                        >
                          DIY-Winterdienst Tipps
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}