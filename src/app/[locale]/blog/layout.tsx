// src/app/[locale]/blog/layout.tsx
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import React, { ReactNode } from 'react'

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <Section className="bg-white">
      <Container>{children}</Container>
    </Section>
  )
}