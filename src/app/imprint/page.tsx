"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2 } from "@/components/ui/typography"
import Link from "next/link"
import deData from "@/i18n/de/de.json"

export default function ImprintPage() {
  const data = deData.imprint

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
            
            {/* Content sections - pure typography, no decoration */}
            <div className="space-y-16">
              {/* Company */}
              <div>
                <H2 className="text-xl font-normal mb-6">{data.company.title}</H2>
                <div className="space-y-2 text-sm leading-relaxed">
                  <p className="font-medium">{data.company.name}</p>
                  <p>{data.company.address}</p>
                  <p>{data.company.city}</p>
                  <p>{data.company.register}</p>
                  <p>{data.company.court}</p>
                </div>
              </div>

              {/* Management */}
              <div>
                <H2 className="text-xl font-normal mb-6">{data.management.title}</H2>
                <p className="text-sm">{data.management.name}</p>
              </div>

              {/* Contact */}
              <div>
                <H2 className="text-xl font-normal mb-6">{data.contact.title}</H2>
                <div className="space-y-2 text-sm leading-relaxed">
                  <p>{data.contact.phone}</p>
                  <p>{data.contact.email}</p>
                </div>
              </div>

              {/* Tax */}
              <div>
                <H2 className="text-xl font-normal mb-6">{data.tax.title}</H2>
                <p className="text-sm">{data.tax.content}</p>
              </div>

              {/* Qualifications */}
              <div>
                <H2 className="text-xl font-normal mb-6">{data.qualifications.title}</H2>
                <div className="space-y-2 text-sm leading-relaxed">
                  <p>{data.qualifications.profession}</p>
                  <p>{data.qualifications.chamber}</p>
                  <p>{data.qualifications.chamberAddress}</p>
                  <p>{data.qualifications.country}</p>
                </div>
              </div>

              {/* Authority */}
              <div>
                <H2 className="text-xl font-normal mb-6">{data.authority.title}</H2>
                <div className="space-y-2 text-sm leading-relaxed">
                  <p>{data.authority.name}</p>
                  <p>{data.authority.address}</p>
                </div>
              </div>

              {/* Dispute */}
              <div>
                <H2 className="text-xl font-normal mb-6">{data.dispute.title}</H2>
                <p className="text-sm">{data.dispute.content}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}