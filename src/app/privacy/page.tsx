"use client"

import { useState } from "react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2 } from "@/components/ui/typography"
import Link from "next/link"
import deData from "@/i18n/de/de.json"

// Typdefinitionen
interface SectionContent {
  title: string;
  content: React.ReactNode;
}

interface SectionMap {
  [key: string]: SectionContent;
}

export default function PrivacyPage() {
  const data = deData.privacy
  const [activeTab, setActiveTab] = useState("responsible")

  // All sections from data
  const sections: SectionMap = {
    responsible: {
      title: data.responsible.title,
      content: (
        <>
          <p className="text-sm mb-6">{data.responsible.content}</p>
          <div className="space-y-2 text-sm leading-relaxed">
            {data.responsible.info.map((info: string, index: number) => (
              <p key={index}>{info}</p>
            ))}
          </div>
        </>
      )
    },
    consent: {
      title: data.consent.title,
      content: <p className="text-sm">{data.consent.content}</p>
    },
    rights: {
      title: data.rights.title,
      content: (
        <div className="space-y-10">
          {data.rights.items.map((item: {title: string, content: string}, index: number) => (
            <div key={index}>
              <h3 className="text-sm font-medium mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-700">{item.content}</p>
            </div>
          ))}
        </div>
      )
    },
    security: {
      title: data.security.title,
      content: <p className="text-sm">{data.security.content}</p>
    },
    cookies: {
      title: data.cookies.title,
      content: <p className="text-sm">{data.cookies.content}</p>
    }
  }

  // Section keys for navigation
  const sectionKeys = Object.keys(sections)

  return (
    <main className="flex-1 bg-white">
      <Section className="pt-24 pb-24">
        <Container size="small">
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <div className="mb-16">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                ← Zurück zur Startseite
              </Link>
            </div>
            
            {/* Title */}
            <H1 className="text-3xl font-medium tracking-tight mb-16">{data.title}</H1>
            
            {/* Simple vertical navigation - fully visible, no scrolling needed */}
            <div className="flex gap-12">
              {/* Sidebar navigation */}
              <div className="w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-1">
                  {sectionKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full text-left py-2 text-sm transition-colors ${
                        activeTab === key 
                          ? 'font-medium text-black' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {sections[key].title}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Content area */}
              <div className="flex-1">
                {sectionKeys.map((key) => (
                  <div 
                    key={key} 
                    className={activeTab === key ? 'block' : 'hidden'}
                  >
                    <H2 className="text-xl font-normal mb-6">{sections[key].title}</H2>
                    {sections[key].content}
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