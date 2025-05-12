"use client"

import React from "react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import deData from "@/i18n/de/de.json"

// Typ-Definition für die i18n-Daten (optional, wenn du Typisierung beibehalten möchtest)
interface LocaleData {
  about: {
    title: string;
    sections: Array<{
      title: string;
      content: string[];
    }>;
    location: {
      title: string;
      content: string;
    };
    testimonials?: {
      title: string;
      items: Array<{
        quote: string;
        author: string;
        designation?: string;
      }>;
    };
  };
  testimonials?: {
    all: Array<{
      quote: string;
      author: string;
      designation?: string;
    }>;
  };
}

export default function AboutPage() {
  // Statt einer dynamischen Locale nutzen wir direkt deData
  const translations: LocaleData = deData as LocaleData
  const data = translations.about

  return (
    <main className="flex-1 font-sans">
      {/* Hero Section */}
      <Section className="relative bg-gradient-to-b from-accent/5 to-white pt-28 pb-16">
        <Container>
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-sm text-accent/80 font-medium">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <span>Über uns</span>
            </div>
            <H1 className="mb-6 text-5xl font-medium tracking-tight text-[#1d1d1f]">{data.title}</H1>
            <Paragraph className="text-xl text-[#1d1d1f]/80 max-w-2xl leading-relaxed">
              Lernen Sie TREU Service kennen — ein verlässlicher Partner für professionelle Dienstleistungen.
            </Paragraph>
          </div>
        </Container>
      </Section>

      {/* Weitere Sections */}
      {data.sections.map((section, index) => (
        <Section 
          key={index} 
          className={index % 2 === 0 ? "bg-white py-20" : "bg-[#f5f5f7] py-20"}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <H2 className="text-4xl font-medium text-[#1d1d1f] tracking-tight">{section.title}</H2>
                {section.content.map((paragraph, pIndex) => (
                  <Paragraph key={pIndex} className="leading-relaxed text-[#1d1d1f]/80">
                    {paragraph}
                  </Paragraph>
                ))}
              </div>
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] w-full relative">
                    <Image
                      src={`/images/about/section-${index + 1}.jpg`}
                      alt={section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${index % 2 === 0 ? "from-accent/20" : "from-accent/10"} to-transparent opacity-60`} />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}
{/* Testimonials Section */}
<Section className="bg-[#f5f5f7] py-20">
  <Container>
    <div className="text-center max-w-3xl mx-auto mb-12">
      <H2 className="text-4xl font-medium text-[#1d1d1f] text-center mb-4">
        {data.testimonials?.title || "Stimmen unserer Kunden"}
      </H2>
      <Paragraph className="text-lg text-[#1d1d1f]/70">
        Was unsere Kunden über unsere Dienstleistungen sagen.
      </Paragraph>
    </div>
    
    {translations.testimonials?.all && (
      <AnimatedTestimonials 
        testimonials={translations.testimonials.all.map((t) => {
          const maleAuthors = [
            "Michael S.",
            "Ahmed Y.",
            "Stefan B.",
            "Peter M.",
            "Mehmet A.",
            "Markus W.",
            "Johannes R.",
            "Klaus H.",
            "Markus H.",
            "Thomas G.",
            "Farid N."
          ];
          const isMale = maleAuthors.includes(t.author);
          const imageName = isMale ? "4.jpg" : "12.jpg";
          return {
            quote: t.quote,
            name: t.author,
            designation: t.designation || "",
            src: `/images/testimonials/${imageName}`
          };
        })}
      />
    )}
  </Container>
</Section>

      {/* Location Section */}
      <Section className="bg-white py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-2 p-8 bg-accent">
                    <div className="h-full flex flex-col text-white">
                      <div className="mb-8">
                        <H2 className="text-3xl font-medium mb-4 text-white">{data.location.title}</H2>
                        <Paragraph className="text-white/90">{data.location.content}</Paragraph>
                      </div>
                      <div className="space-y-6 mt-auto">
                        <div className="bg-white/10 p-4 rounded-xl">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <div className="text-sm space-y-1">
                              <strong>TREU Service GmbH</strong>
                              <p>Rheinische Straße 220</p>
                              <p>44147 Dortmund</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 h-[500px]">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.2341956501433!2d7.4496232770556025!3d51.51372660954271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b91a3a9d5e27c7%3A0x46932346c716ce6a!2sRheinische%20Str.%20220%2C%2044147%20Dortmund%2C%20Germany!5e0!3m2!1sen!2sus!4v1711311626548!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-r-none md:rounded-r-2xl"
                      title="TREU Service Standort"
                      aria-label="Standort von TREU Service in Dortmund"
                    ></iframe>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}