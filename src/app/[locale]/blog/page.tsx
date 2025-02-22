// src/app/[locale]/blog/page.tsx
import { H1 } from "@/components/ui/typography"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'

const categories = [
  {
    title: "Winterdienst",
    description: "DIY-Tipps und Streugut-Vergleiche für effektiven Winterdienst",
    slug: "winterdienst",
    image: "/images/blog/winter.jpg"
  },
  {
    title: "Reinigung",
    description: "Professionelle Reinigungstipps und Problemlösungen",
    slug: "reinigung",
    image: "/images/blog/cleaning.jpg"
  },
  {
    title: "Security",
    description: "Sicherheitskonzepte und Notfallplan-Erstellung",
    slug: "security",
    image: "/images/blog/security.jpg"
  }
]

export default function BlogPage() {
  return (
    <div className="py-12">
      <H1 className="text-center mb-12">TREU Service Blog</H1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/blog/${category.slug}`}>
                <Button className="w-full">Artikel ansehen</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}