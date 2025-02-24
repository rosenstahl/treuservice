"use client"

import React from 'react'
import BlogPage from '@/app/[locale]/blog/index'
import blogData from "@/i18n/de/blog.json"

export default function StreumittelBlogPage() {
  return (
    <BlogPage
      category="winterdienst"
      data={blogData.blog.streumittel}
      date={new Date('2024-02-24')}
      readingTime="8 min"
      author={{
        name: "TREU Service Team",
        image: "/images/team/winter-expert.jpg"
      }}
    />
  )
}