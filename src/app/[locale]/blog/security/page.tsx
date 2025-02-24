"use client"

import React from 'react'
import BlogPage from '@/components/ui/blog-page/index'
import blogData from "@/i18n/de/blog.json"

export default function SecurityBlogPage() {
  return (
    <BlogPage
      category="security"
      data={blogData.blog.emergency_plan}
      date={new Date('2024-02-23')}
      readingTime="12 min"
      author={{
        name: "TREU Service Team",
        image: "/images/team/security-expert.jpg"
      }}
    />
  )
}