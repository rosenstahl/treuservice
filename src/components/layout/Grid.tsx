import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 2 | 4 | 6 | 8 | 12 | 16
}

export function Grid({ 
  children, 
  className,
  cols = 12,
  gap = 8,
  ...props 
}: GridProps) {
  return (
    <div 
      className={cn(
        "grid",
        {
          'grid-cols-1': cols === 1,
          'grid-cols-2': cols === 2,
          'grid-cols-3': cols === 3,
          'grid-cols-4': cols === 4,
          'grid-cols-6': cols === 6,
          'grid-cols-12': cols === 12,
          'gap-2': gap === 2,
          'gap-4': gap === 4,
          'gap-6': gap === 6,
          'gap-8': gap === 8,
          'gap-12': gap === 12,
          'gap-16': gap === 16,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}