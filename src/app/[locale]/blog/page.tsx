"use client"

import { H1 } from "@/components/ui/typography"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'
import blogData from "@/i18n/de/blog.json"

const articles = [
  {
    title: blogData.blog.diy_winterservice.title,
    description: blogData.blog.diy_winterservice.subtitle,
    category: "Winterdienst",
    slug: "winterdienst",
    image: "/images/blog/winter.jpg",
    date: "23.02.2024",
    readingTime: "10 min"
  },
  {
    title: blogData.blog.streumittel.title,
    description: blogData.blog.streumittel.subtitle,
    category: "Winterdienst",
    slug: "streumittel",
    image: "/images/blog/winter.jpg",
    date: "24.02.2024",
    readingTime: "8 min"
  },
  {
    title: "Professionelle Reinigungstipps",
    description: "Professionelle Reinigungstipps und Problemlösungen",
    category: "Reinigung",
    slug: "reinigung",
    image: "/images/blog/cleaning.jpg",
    date: "22.02.2024",
    readingTime: "12 min"
  },
  {
    title: "Sicherheitskonzepte",
    description: "Sicherheitskonzepte und Notfallplan-Erstellung",
    category: "Security",
    slug: "security",
    image: "/images/blog/security.jpg",
    date: "21.02.2024",
    readingTime: "15 min"
  }
]

export default function BlogPage() {
  return (
    <div className="py-12">
      <H1 className="text-center mb-12">TREU Service Blog</H1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Card key={article.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="text-sm text-primary mb-2">{article.category}</div>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>
                {article.description}
                <div className="mt-2 text-sm text-gray-500">
                  {article.date} • {article.readingTime} Lesezeit
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/blog/${article.slug}`}>
                <Button className="w-full">
                  Artikel lesen
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}