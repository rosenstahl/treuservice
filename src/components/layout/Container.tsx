import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  size?: "default" | "small" | "large"
}

export function Container({ 
  children, 
  className,
  size = "default",
  ...props 
}: ContainerProps) {
  return (
    <div 
      className={cn(
        "mx-auto px-4 w-full",
        {
          "max-w-7xl": size === "default",  // 1280px
          "max-w-5xl": size === "small",    // 1024px
          "max-w-screen-2xl": size === "large", // 1536px
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}