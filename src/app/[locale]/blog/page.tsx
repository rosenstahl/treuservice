"use client"

import React, { useState } from 'react'
import { H1 } from "@/components/ui/typography"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'
import { CalendarDays, Clock, ArrowRight, Search, Phone, Mail } from "lucide-react"
import blogData from "@/i18n/de/blog.json"

// Define a type for the valid categories
type Category = 'Winterdienst' | 'Reinigung' | 'Security';

// Ensure article.category is of type Category
const categoryColors: Record<Category, string> = {
  Winterdienst: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
  Reinigung: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
  Security: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
};

const categoryButtonColors = {
  "Winterdienst": {
    active: "bg-blue-600 text-white",
    inactive: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
  },
  "Reinigung": {
    active: "bg-green-600 text-white",
    inactive: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
  },
  "Security": {
    active: "bg-red-600 text-white",
    inactive: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
  }
}

const articles = [
  {
    title: blogData.blog.diy_winterservice.title,
    description: blogData.blog.diy_winterservice.subtitle,
    category: "Winterdienst",
    slug: "winterdienst",
    image: "/images/blog/winter.jpg",
    date: "23.02.2024",
    readingTime: "10 min"
  },
  {
    title: blogData.blog.streumittel.title,
    description: blogData.blog.streumittel.subtitle,
    category: "Winterdienst",
    slug: "streumittel",
    image: "/images/blog/winter.jpg",
    date: "24.02.2024",
    readingTime: "8 min"
  },
  {
    title: "Streumittel-Rechner",
    description: "Interaktives Tool zur Berechnung des optimalen Streumittelbedarfs und Kostenübersicht",
    category: "Winterdienst",
    slug: "StreumittelCalculator",
    image: "/images/blog/winter.jpg",
    date: "25.02.2025",
    readingTime: "Interaktives Tool"
  },
  {
    title: "Professionelle Reinigungstipps",
    description: "Professionelle Reinigungstipps und Problemlösungen",
    category: "Reinigung",
    slug: "reinigung",
    image: "/images/blog/cleaning.jpg",
    date: "22.02.2024",
    readingTime: "12 min"
  },
  {
    title: "Sicherheitskonzepte",
    description: "Sicherheitskonzepte und Notfallplan-Erstellung",
    category: "Security",
    slug: "security",
    image: "/images/blog/security.jpg",
    date: "21.02.2024",
    readingTime: "15 min"
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtern der Artikel basierend auf Kategorie und Suchbegriff
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Alle" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 bg-gradient-to-b from-primary/5 to-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <H1 className="text-4xl md:text-5xl text-center font-bold mb-6">TREU Service Blog</H1>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Expertenratgeber für Reinigung, Sicherheitsdienste, Entrümpelung und Winterdienst
        </p>
        
        {/* Suchleiste */}
        <div className="relative max-w-md mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Blog durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Kategorie-Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Alle" ? "bg-primary text-black" : ""}`}
            onClick={() => setSelectedCategory("Alle")}
          >
            Alle Beiträge
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Winterdienst" ? categoryButtonColors["Winterdienst"].active : categoryButtonColors["Winterdienst"].inactive}`}
            onClick={() => setSelectedCategory("Winterdienst")}
          >
            Winterdienst
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Reinigung" ? categoryButtonColors["Reinigung"].active : categoryButtonColors["Reinigung"].inactive}`}
            onClick={() => setSelectedCategory("Reinigung")}
          >
            Reinigung
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Security" ? categoryButtonColors["Security"].active : categoryButtonColors["Security"].inactive}`}
            onClick={() => setSelectedCategory("Security")}
          >
            Security
          </Button>
        </div>

        {/* Ergebnismeldung */}
        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            {filteredArticles.length} {filteredArticles.length === 1 ? "Artikel" : "Artikel"} gefunden
            {selectedCategory !== "Alle" && ` in der Kategorie "${selectedCategory}"`}
            {searchQuery && ` mit dem Suchbegriff "${searchQuery}"`}
          </p>
        </div>

        {/* Blog-Kartengitter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Card 
              key={article.slug} 
              className="overflow-hidden shadow-md border-t-4 border-t-primary flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image 
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div 
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[article.category as Category] || "bg-gray-100 text-gray-600 border-gray-200"} border shadow-sm`}
                >
                  {article.category}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  <Link href={`/blog/${article.slug}`} className="hover:underline decoration-primary decoration-2 underline-offset-4">
                    {article.title}
                  </Link>
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-3 text-gray-600">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm flex flex-wrap gap-4 mt-auto">
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {article.date}
                </div>
                <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full text-gray-700">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readingTime}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full flex flex-col gap-2">
                  <Link href={`/blog/${article.slug}`} className="w-full">
                    <Button className="w-full group hover:bg-primary">
                      Artikel lesen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  
                  {/* CTA-Buttons basierend auf der Kategorie */}
                  {article.category === "Winterdienst" && (
                    <Link href="/winterdienst" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Winterdienst"].inactive}`}>
                        Winterdienst-Angebot
                      </Button>
                    </Link>
                  )}
                  {article.category === "Reinigung" && (
                    <Link href="/reinigung" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Reinigung"].inactive}`}>
                        Reinigungsservice anfragen
                      </Button>
                    </Link>
                  )}
                  {article.category === "Security" && (
                    <Link href="/security" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Security"].inactive}`}>
                        Sicherheitsdienst buchen
                      </Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* "Keine Artikel gefunden" Meldung */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Keine Artikel gefunden</h3>
            <p className="text-muted-foreground mb-6">
              Versuchen Sie es mit anderen Suchbegriffen oder wählen Sie eine andere Kategorie.
            </p>
            <Button onClick={() => {setSelectedCategory("Alle"); setSearchQuery("")}}>
              Alle Artikel anzeigen
            </Button>
          </div>
        )}
        
        {/* Kontakt CTA-Bereich */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-3 text-center">Haben Sie Fragen?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-center">
            Unser Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung zu unseren Dienstleistungen.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-3xl mx-auto">
            <Link href="/kontakt" className="w-full md:w-auto">
              <Button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 py-6">
                <Mail className="w-5 h-5" />
                <span>Kontaktformular</span>
              </Button>
            </Link>
            <Link href="tel:+4912345678" className="w-full md:w-auto">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-primary text-primary hover:bg-primary/10 py-6">
                <Phone className="w-5 h-5" />
                <span>+49 (0) 123 456 78</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}