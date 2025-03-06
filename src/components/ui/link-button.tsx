import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  children: React.ReactNode
}

const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        variant="link"
        className={cn(
          "p-0 h-auto font-normal relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-current after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100 hover:no-underline",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
LinkButton.displayName = "LinkButton"

export { LinkButton }