import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "outline" | "primary";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-accent text-primary-light hover:bg-accent-hover",
    secondary: "bg-primary text-secondary hover:bg-primary-dark",
    outline: "border border-accent bg-primary-light hover:bg-accent hover:text-primary-light",
    primary: "bg-accent/10 text-accent hover:bg-accent/20"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}