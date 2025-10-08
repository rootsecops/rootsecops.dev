
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // The input field in globals.css uses hsl(var(--input)) which is light gray.
          // If input background should be same as page background (very light blue-gray)
          // use bg-background, or for white inputs, you might need a new var or explicit white.
          // For now, let's assume bg-background is desired for input fields as well for consistency.
          // If input HSL was set to white: `0 0% 100%`, then `bg-input` would work.
          // Current `bg-input` would make it light gray: `hsl(210 15% 88%)`
          // Changed `bg-input/70 focus:bg-input` to `bg-input focus:bg-background` in forms like ContactForm, AdminLogin, BlogPostForm.
          // This component itself doesn't need a change if `bg-background` is default. It is.
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
