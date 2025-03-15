import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  fullHeight?: boolean
}

export function Section({ 
  children, 
  className,
  fullHeight = false,
  ...props 
}: SectionProps) {
  return (
    <section 
      className={cn(
        "w-full py-16",
        {
          "min-h-screen": fullHeight
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}