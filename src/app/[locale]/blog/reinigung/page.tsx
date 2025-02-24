"use client"

import React from 'react'
import BlogPage from '@/components/ui/blog-page/index'
import blogData from "@/i18n/de/blog.json"

export default function ReinigungBlogPage() {
  return (
    <BlogPage
      category="reinigung"
      data={blogData.blog.cleaning}
      date={new Date('2024-02-23')}
      readingTime="8 min"
      author={{
        name: "TREU Service Team",
        image: "/images/team/cleaning-expert.jpg"
      }}
    />
  )
}