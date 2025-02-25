"use client"

import React from 'react'
import BlogPage from '../index'
import blogData from "@/i18n/de/blog.json"
import { Calculator } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function WinterdienstBlogPage() {
  const date = new Date('2025-02-23')
  
  return (
    <>
      <BlogPage 
        category="winterdienst"
        data={blogData.blog.diy_winterservice}
        date={date}
        readingTime="10 min"
      />
      
      {/* Diese Komponente fügt einen Button unter dem BlogPage hinzu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-blue-50 rounded-lg border border-blue-100 p-6 flex flex-col md:flex-row items-center gap-5 justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-full">
              <Calculator className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Streumittelrechner</h3>
              <p className="text-slate-700 mb-4 md:mb-0">
                Berechnen Sie Ihren Streumittelbedarf mit unserem interaktiven Rechner. Vergleichen Sie Kosten und Umweltauswirkungen verschiedener Produkte.
              </p>
            </div>
          </div>
          <Button size="lg" asChild>
            <Link href="/blog/StreumittelCalculator">
              Zum Rechner
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}