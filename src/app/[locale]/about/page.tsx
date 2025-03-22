"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import deData from "@/i18n/de/de.json"
import enData from "@/i18n/en/en.json"
import { GoogleMap } from "@/components/ui/map"

export default function AboutPage() {
  const params = useParams()
  const locale = params.locale as keyof typeof translations
  const translations = { de: deData, en: enData }
  const data = translations[locale].about

  return (
    <main className="flex-1 font-sans">
      {/* Hero Section - Apple Style */}
      <Section className="relative bg-[#f5f5f7] pt-24">
        <Container>
          <div className="max-w-3xl">
            <H1 className="mb-6 text-[3rem] font-medium tracking-tight text-[#1d1d1f]">{data.title}</H1>
          </div>
        </Container>
      </Section>

      {/* Main Content Sections - Apple Style */}
      {data.sections.map((section, index) => (
        <Section key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f5f5f7]"}>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <H2 className="text-3xl font-medium text-[#1d1d1f]">{section.title}</H2>
                {section.content.map((paragraph, pIndex) => (
                  <Paragraph key={pIndex} className="leading-relaxed text-[#1d1d1f]/90">
                    {paragraph}
                  </Paragraph>
                ))}
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={`/images/about/section-${index + 1}.jpg`}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/10 to-transparent" />
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* Testimonials Section - Apple Style */}
      <Section className="bg-[#f5f5f7]">
        <Container>
          <H2 className="text-3xl font-medium text-[#1d1d1f] text-center mb-12">
            {data.testimonials.title}
          </H2>
          <AnimatedTestimonials 
            testimonials={data.testimonials.items.map(t => ({
              quote: t.quote,
              name: t.author,
              designation: t.designation,
              src: "/images/testimonials/placeholder.jpg"
            }))}
          />
        </Container>
      </Section>

      {/* Location Section - Apple Style */}
      <Section className="bg-white">
        <Container size="small">
          <Card className="overflow-hidden border-none shadow-sm rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#007AFF] flex-shrink-0 mt-1" />
                <div>
                  <H2 className="text-2xl font-medium mb-4 text-[#1d1d1f]">{data.location.title}</H2>
                  <Paragraph className="leading-relaxed text-[#1d1d1f]/90">{data.location.content}</Paragraph>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                {/* Address Card - Apple Style */}
                <Card className="bg-[#f5f5f7] border-none rounded-xl">
                  <CardContent className="p-4">
                    <div className="text-sm space-y-1 text-[#1d1d1f]">
                      <strong>TREU Service GmbH</strong>
                      <p>Rheinische Straße 220</p>
                      <p>44147 Dortmund</p>
                    </div>
                  </CardContent>
                </Card>
                {/* Google Maps */}
                <div className="h-[400px] rounded-xl overflow-hidden">
                  <GoogleMap 
                    address="Rheinische Straße 220, 44147 Dortmund"
                    zoom={15}
                    height="400px"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  )
}