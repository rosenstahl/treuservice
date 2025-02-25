"use client"

import React from 'react'
import BlogPage from '../index'
import blogData from "@/i18n/de/blog.json"

export default function StreumittelPage() {
  const date = new Date('2025-02-24')
  
  return (
    <BlogPage 
      category="winterdienst"
      data={blogData.blog.streumittel}
      date={date}
      readingTime="8 min"
    />
  )
}