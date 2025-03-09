"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface FlipCardProps {
  title: string
  description: string
  features: string[]
}

export function FlipCard({ title, description, features }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="relative h-[400px] w-full perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={cn(
        "relative w-full h-full transition-transform duration-500 transform-style-3d",
        isFlipped ? "[transform:rotateY(180deg)]" : ""
      )}>
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg p-6 shadow-lg [transform:rotateY(180deg)]">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="mr-2 text-accent">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}