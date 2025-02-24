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
import { CalendarDays, Clock, Share2, BookmarkPlus, ChevronRight } from "lucide-react"
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

// UI-Komponenten
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
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

// Hauptkomponente
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
      {/* Hero Section mit Breadcrumb */}
      <Section className="pt-28 pb-8 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">{category}</span>
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 text-primary">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
            <H1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {data.title}
            </H1>
            {data.subtitle && (
              <H2 className="text-2xl lg:text-3xl text-muted-foreground mb-4">
                {data.subtitle}
              </H2>
            )}
            {data.intro && (
              <Paragraph className="text-lg text-muted-foreground">
                {data.intro}
              </Paragraph>
            )}
            
            <div className="flex items-center gap-6 text-muted-foreground mt-8">
              <div className="flex items-center gap-2">
                <Avatar src={author.image} alt={author.name} />
                <span>{author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>{format(date, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} Lesezeit</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />

      {/* Hauptinhalt */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Artikel-Inhalt */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none">
                {/* Feature Image */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                  <Image
                    src={`/images/blog/${category}/main.jpg`}
                    fill
                    className="object-cover"
                    alt={data.title}
                    priority
                  />
                </div>

                {/* Content Sections/Steps */}
                {data.sections ? (
                  // Render sections (für Reinigung)
                  Object.entries(data.sections).map(([key, section]) => (
                    <div key={key} id={key} className="mb-12">
                      <H2 className="mb-6">{section.title}</H2>
                      {section.problems.map((problem, index) => (
                        <Card key={index} className="mb-8">
                          <CardHeader>
                            <CardTitle className="text-xl">{problem.title}</CardTitle>
                            <CardDescription className="text-red-500">
                              {problem.cause}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              <div>
                                <H3 className="text-lg mb-3">Lösung:</H3>
                                <ul className="list-disc pl-6 space-y-2">
                                  {problem.solution.map((sol: string, i: number) => (
                                    <li key={i} className="text-green-600">{sol}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <H3 className="text-lg mb-3">Prävention:</H3>
                                <ul className="list-disc pl-6 space-y-2">
                                  {problem.prevention.map((prev: string, i: number) => (
                                    <li key={i} className="text-blue-600">{prev}</li>
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
                  // Render steps (für Winterdienst und Security)
                  data.steps.map((step, index) => (
                    <div key={index} id={`step-${step.number}`} className="mb-12">
                      <H2 className="mb-6">
                        {step.number}. {step.title}
                      </H2>
                      {step.intro && (
                        <Paragraph className="mb-6">{step.intro}</Paragraph>
                      )}
                      <div className="space-y-6">
                        {step.items.map((item, i) => (
                          <Card key={i} className="mb-8">
                            <CardHeader>
                              <CardTitle className="text-xl">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Paragraph>{item.description}</Paragraph>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))
                ) : null}
              </div>

              {/* Share & Save Buttons */}
              <div className="flex items-center gap-4 mt-8">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Teilen
                </Button>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Speichern
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-8">
                {/* Inhaltsverzeichnis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Inhaltsverzeichnis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <nav className="space-y-2">
                        {data.sections ? (
                          Object.entries(data.sections).map(([key, section]) => (
                            <div key={key}>
                              <a
                                href={`#${key}`}
                                className="block text-sm hover:text-primary transition-colors"
                              >
                                {section.title}
                              </a>
                            </div>
                          ))
                        ) : data.steps ? (
                          data.steps.map((step) => (
                            <div key={step.number}>
                              <a
                                href={`#step-${step.number}`}
                                className="block text-sm hover:text-primary transition-colors"
                              >
                                {step.number}. {step.title}
                              </a>
                            </div>
                          ))
                        ) : null}
                      </nav>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Link 
                        href="/blog/reinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors"
                      >
                        Reinigungstipps für Profis
                      </Link>
                      <Link 
                        href="/blog/winterdienst" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors"
                      >
                        Winterdienst Guide
                      </Link>
                      <Link 
                        href="/blog/security" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors"
                      >
                        Sicherheit im Fokus
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}