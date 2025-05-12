import React, { ReactNode } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <Section className="bg-gray-50 min-h-screen">
      <Container className="py-0">{children}</Container>
    </Section>
  )
}