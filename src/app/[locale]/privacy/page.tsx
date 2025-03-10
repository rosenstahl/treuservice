"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import deData from "@/i18n/de/de.json"

export default function PrivacyPage() {
  const data = deData.privacy

  return (
    <main className="flex-1">
      <Section className="pt-24">
        <Container size="small">
          <H1 className="mb-12">{data.title}</H1>

          {/* Verantwortliche Stelle */}
          <div className="space-y-8">
            <div>
              <H2 className="text-xl mb-4">{data.responsible.title}</H2>
              <Paragraph>{data.responsible.content}</Paragraph>
              <div className="mt-4 space-y-2">
                {data.responsible.info.map((info, index) => (
                  <Paragraph key={index}>{info}</Paragraph>
                ))}
              </div>
            </div>

            {/* Widerruf der Einwilligung */}
            <div>
              <H2 className="text-xl mb-4">{data.consent.title}</H2>
              <Paragraph>{data.consent.content}</Paragraph>
            </div>

            {/* Ihre Rechte */}
            <div>
              <H2 className="text-xl mb-6">{data.rights.title}</H2>
              <div className="grid gap-6">
                {data.rights.items.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Paragraph>{item.content}</Paragraph>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* SSL/TLS Verschlüsselung */}
            <div>
              <H2 className="text-xl mb-4">{data.security.title}</H2>
              <Paragraph>{data.security.content}</Paragraph>
            </div>

            {/* Cookies */}
            <div>
              <H2 className="text-xl mb-4">{data.cookies.title}</H2>
              <Paragraph>{data.cookies.content}</Paragraph>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}