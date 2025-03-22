"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  imageSrc: string
}

export const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  href, 
  imageSrc 
}: ServiceCardProps) => {
  return (
    <Link href={href} className="block">
      <motion.div 
        className="relative group overflow-hidden rounded-2xl bg-white hover:shadow-xl transition-all duration-300 border border-accent/10 h-full"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Container */}
        <div className="relative h-[200px] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
          
          {/* Icon overlay */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30">
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          <div className="flex items-center text-accent font-medium">
            <span>Mehr erfahren</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}