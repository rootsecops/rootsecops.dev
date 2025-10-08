
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group z-0 transition-[background-position,color] ease-in-out duration-300",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground [background-image:linear-gradient(to_right,hsl(var(--primary)/0.9)_50%,hsl(var(--primary))_50%)] bg-[length:200%_100%] bg-[position:100%_0] hover:bg-[position:0_0] dark:hover:shadow-[0_0_12px_hsl(var(--primary)/0.7)]",
        destructive:
          "text-destructive-foreground [background-image:linear-gradient(to_right,hsl(var(--destructive)/0.9)_50%,hsl(var(--destructive))_50%)] bg-[length:200%_100%] bg-[position:100%_0] hover:bg-[position:0_0]",
        outline:
          "border border-input bg-background text-foreground hover:text-primary-foreground [background-image:linear-gradient(to_right,hsl(var(--primary))_50%,hsl(var(--background))_50%)] bg-[length:200%_100%] bg-[position:100%_0] hover:bg-[position:0_0] dark:hover:shadow-[0_0_12px_hsl(var(--primary)/0.7)] dark:hover:border-primary",
        secondary:
          "text-secondary-foreground [background-image:linear-gradient(to_right,hsl(var(--secondary)/0.8)_50%,hsl(var(--secondary))_50%)] bg-[length:200%_100%] bg-[position:100%_0] hover:bg-[position:0_0]",
        ghost: "hover:text-primary dark:hover:text-shadow-[0_0_8px_hsl(var(--primary))]",
        link: "text-primary underline-offset-4 hover:underline dark:hover:text-shadow-[0_0_8px_hsl(var(--primary))]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
