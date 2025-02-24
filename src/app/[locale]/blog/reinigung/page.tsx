"use client"

import React from 'react'
import BlogPage from '@/app/[locale]/blog/index'
import blogData from "@/i18n/de/blog.json"

export default function SecurityBlogPage() {
  return (
    <BlogPage
      category="security"
      data={blogData.blog.emergency_plan}
      date={new Date('2024-02-20')}
      readingTime="10 min"
      author={{
        name: "TREU Security Team",
        image: "/images/team/security-expert.jpg"
      }}
    />
  )
}