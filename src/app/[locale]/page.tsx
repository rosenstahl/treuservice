import { Container } from "@/components/layout/Container"
import { Grid } from "@/components/layout/Grid"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph, Small } from "@/components/ui/typography"

export default function Home() {
  return (
    <main>
      {/* Hero Section mit voller Höhe */}
      <Section fullHeight className="bg-primary">
        <Container>
          <H1>Treu Service</H1>
          <Paragraph>Professionelle Dienstleistungen</Paragraph>
        </Container>
      </Section>

      {/* Grid Beispiel */}
      <Section>
        <Container>
          <H2 className="mb-8">Unsere Dienstleistungen</H2>
          <Grid cols={3} gap={8}>
            <div className="p-6 bg-primary-light shadow-medium rounded-lg">
              <H3>Reinigung</H3>
              <Paragraph>Professionelle Reinigungsservices</Paragraph>
            </div>
            <div className="p-6 bg-primary-light shadow-medium rounded-lg">
              <H3>Entrümpelung</H3>
              <Paragraph>Effiziente Entrümpelungsdienste</Paragraph>
            </div>
            <div className="p-6 bg-primary-light shadow-medium rounded-lg">
              <H3>Winterdienst</H3>
              <Paragraph>Zuverlässiger Winterservice</Paragraph>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Container Größen Demo */}
      <Section className="bg-primary-dark">
        <Container size="small">
          <H2>Kleiner Container</H2>
          <Paragraph>Maximale Breite von 1024px</Paragraph>
        </Container>
      </Section>

      <Section>
        <Container size="large">
          <H2>Großer Container</H2>
          <Paragraph>Maximale Breite von 1536px</Paragraph>
        </Container>
      </Section>
    </main>
  )
}