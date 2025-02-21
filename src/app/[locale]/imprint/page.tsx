"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import deData from "@/i18n/de/de.json"

export default function ImprintPage() {
  const data = deData.imprint

  return (
    <main className="flex-1">
      <Section className="pt-24">
        <Container size="small">
          <H1 className="mb-12">{data.title}</H1>

          {/* Unternehmensinformationen */}
          <div className="space-y-8">
            <div>
              <H2 className="text-xl mb-4">{data.company.title}</H2>
              <div className="space-y-2">
                <Paragraph>{data.company.name}</Paragraph>
                <Paragraph>{data.company.address}</Paragraph>
                <Paragraph>{data.company.city}</Paragraph>
                <Paragraph>{data.company.register}</Paragraph>
                <Paragraph>{data.company.court}</Paragraph>
              </div>
            </div>

            {/* Vertretung */}
            <div>
              <H2 className="text-xl mb-4">{data.management.title}</H2>
              <Paragraph>{data.management.name}</Paragraph>
            </div>

            {/* Kontakt */}
            <div>
              <H2 className="text-xl mb-4">{data.contact.title}</H2>
              <Paragraph>{data.contact.phone}</Paragraph>
              <Paragraph>{data.contact.email}</Paragraph>
            </div>

            {/* Umsatzsteuer */}
            <div>
              <H2 className="text-xl mb-4">{data.tax.title}</H2>
              <Paragraph>{data.tax.content}</Paragraph>
            </div>

            {/* Qualifikationen */}
            <div>
              <H2 className="text-xl mb-4">{data.qualifications.title}</H2>
              <div className="space-y-2">
                <Paragraph>{data.qualifications.profession}</Paragraph>
                <Paragraph>{data.qualifications.chamber}</Paragraph>
                <Paragraph>{data.qualifications.chamberAddress}</Paragraph>
                <Paragraph>{data.qualifications.country}</Paragraph>
              </div>
            </div>

            {/* Aufsichtsbehörde */}
            <div>
              <H2 className="text-xl mb-4">{data.authority.title}</H2>
              <Paragraph>{data.authority.name}</Paragraph>
              <Paragraph>{data.authority.address}</Paragraph>
            </div>

            {/* Streitbeilegung */}
            <div>
              <H2 className="text-xl mb-4">{data.dispute.title}</H2>
              <Paragraph>{data.dispute.content}</Paragraph>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}