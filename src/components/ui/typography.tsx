import { cn } from "@/lib/utils"
import React from "react"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 
      className={cn(
        "scroll-m-20 text-[3rem] font-bold leading-[3.5rem] tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-[2.25rem] font-semibold leading-[2.75rem] tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-[1.5rem] font-medium leading-[2rem] tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function Paragraph({ children, className, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-[1rem] leading-[1.5rem] [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function Small({ children, className, ...props }: TypographyProps) {
  return (
    <small
      className={cn(
        "text-[0.875rem] leading-[1.25rem] text-secondary/80",
        className
      )}
      {...props}
    >
      {children}
    </small>
  )
}