"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { TracingBeam } from "@/components/ui/tracing-beam"
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
    <TracingBeam>
      <main className="flex-1">
        {/* Hero Section */}
        <Section className="relative bg-gradient-to-b from-primary/5 via-primary/10 to-transparent pt-24">
          <Container>
            <div className="max-w-3xl">
              <H1 className="mb-6">{data.title}</H1>
            </div>
          </Container>
        </Section>

        {/* Main Content Sections */}
        {data.sections.map((section, index) => (
          <Section key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <H2 className="text-3xl font-semibold">{section.title}</H2>
                  {section.content.map((paragraph, pIndex) => (
                    <Paragraph key={pIndex} className="leading-relaxed">
                      {paragraph}
                    </Paragraph>
                  ))}
                </div>
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={`/images/about/section-${index + 1}.jpg`}
                    alt={section.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                </div>
              </div>
            </Container>
          </Section>
        ))}

        {/* Testimonials Section */}
        <Section className="bg-primary/5">
          <Container>
            <H2 className="text-3xl font-semibold text-center mb-12">
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

{/* Location Section */}
<Section className="bg-white">
  <Container size="small">
    <Card className="overflow-hidden">
      <CardContent className="p-8">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <H2 className="text-2xl font-semibold mb-4">{data.location.title}</H2>
            <Paragraph className="leading-relaxed">{data.location.content}</Paragraph>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {/* Adress Card */}
          <Card className="bg-primary/5">
            <CardContent className="p-4">
              <div className="text-sm space-y-1">
                <strong>TREU Service GmbH</strong>
                <p>Rheinische Straße 220</p>
                <p>44147 Dortmund</p>
              </div>
            </CardContent>
          </Card>
          {/* Google Maps */}
          <div className="h-[400px] rounded-lg overflow-hidden">
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
</Section>      </main>
    </TracingBeam>
  )
}