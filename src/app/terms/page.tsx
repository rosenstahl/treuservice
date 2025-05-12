"use client"

import { useState } from "react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2 } from "@/components/ui/typography"
import Link from "next/link"
import deData from "@/i18n/de/de.json"

// Typdefinitionen für die Struktur
interface Subsection {
  title: string;
  content: string;
}

interface TermsSection {
  title: string;
  content: string;
  subsections?: Subsection[];
}

export default function TermsPage() {
  const data = deData.terms
  // TypeScript-Typ-Assertion für die Struktur der Sections
  const sections = data.sections as TermsSection[]
  const [activeSection, setActiveSection] = useState(0)

  return (
    <main className="flex-1 bg-white">
      <Section className="pt-24 pb-24">
        <Container size="small">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <div className="mb-16">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                ← Zurück zur Startseite
              </Link>
            </div>
            
            {/* Title */}
            <div className="mb-16">
              <H1 className="text-3xl font-medium tracking-tight mb-3">{data.title}</H1>
              <p className="text-sm text-gray-500">{data.lastUpdated}</p>
            </div>
            
            {/* Two column layout with sidebar navigation and content */}
            <div className="flex gap-12">
              {/* Sidebar navigation */}
              <div className="w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(index)}
                      className={`w-full text-left py-2 text-sm transition-colors ${
                        activeSection === index 
                          ? 'font-medium text-black' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Content area */}
              <div className="flex-1">
                {sections.map((section, index) => (
                  <div 
                    key={index} 
                    className={activeSection === index ? 'block' : 'hidden'}
                  >
                    <H2 className="text-xl font-normal mb-6">{section.title}</H2>
                    <p className="text-sm leading-relaxed text-gray-700 mb-8">{section.content}</p>
                    
                    {/* Subsections if any */}
                    {section.subsections && section.subsections.length > 0 && (
                      <div className="space-y-8 mt-8 border-t pt-8">
                        {section.subsections.map((subsection: Subsection, subIndex: number) => (
                          <div key={subIndex}>
                            <h3 className="text-base font-medium mb-3">{subsection.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-700">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}