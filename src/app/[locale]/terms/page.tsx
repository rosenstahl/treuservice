"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import deData from "@/i18n/de/de.json"

export default function TermsPage() {
  const data = deData.terms

  return (
    <main className="flex-1">
      <Section className="pt-24">
        <Container size="small">
          <div className="max-w-3xl mx-auto">
            <H1 className="mb-4">{data.title}</H1>
            <Paragraph className="text-muted-foreground mb-12">
              {data.lastUpdated}
            </Paragraph>

            <div className="space-y-8">
              {data.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <H2 className="text-xl font-semibold">{section.title}</H2>
                  <Paragraph>{section.content}</Paragraph>

                  {section.subsections && (
                    <div className="pl-6 space-y-4 mt-4">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex}>
                          <H3 className="text-lg font-medium mb-2">
                            {subsection.title}
                          </H3>
                          <Paragraph>{subsection.content}</Paragraph>
                        </div>
                      ))}
                    </div>
                  )}

                  {index < data.sections.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}