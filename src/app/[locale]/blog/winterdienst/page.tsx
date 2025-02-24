"use client"

import React from 'react'
import BlogPage from '@/components/ui/blog-page/index'
import blogData from "@/i18n/de/blog.json"

export default function WinterdienstBlogPage() {
  return (
    <BlogPage
      category="winterdienst"
      data={blogData.blog.diy_winterservice}
      date={new Date('2024-02-23')}
      readingTime="10 min"
      author={{
        name: "TREU Service Team",
        image: "/images/team/winter-expert.jpg"
      }}
    />
  )
}