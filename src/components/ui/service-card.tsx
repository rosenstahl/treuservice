"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  description: string
  features: string[]
}

export function ServiceCard({ title, description, features }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="group">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Plus className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-45"
                )} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="mr-2 text-accent">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}