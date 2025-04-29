"use client"

// Importing React and its functionalities to use JSX, hooks, and forwardRef
import * as React from "react"

// Importing all the elements from @radix-ui/react-label and assigning it to LabelPrimitive
import * as LabelPrimitive from "@radix-ui/react-label"

// Importing 'cva' function and 'VariantProps' type from class-variance-authority to handle styling variants
import { cva, type VariantProps } from "class-variance-authority"

// Importing the 'cn' utility function from a local module "@/lib/utils" to combine CSS class names conditionally
import { cn } from "@/lib/utils"

// Defining labelVariants, a variant-driven class name generator using cva, which applies common styles to the Label component
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  // It applies text size, font weight, line height, and disabled styles (cursor and opacity) when using the 'peer' class
)

// Defining a Label component that uses forwardRef to pass down a ref to the LabelPrimitive.Root component
const Label = React.forwardRef<
  // Specifies the type of the ref that will be forwarded, which in this case is the root element of LabelPrimitive
  React.ElementRef<typeof LabelPrimitive.Root>,
  // Specifies the props of the Label component, which combines the default props of LabelPrimitive.Root and the VariantProps from labelVariants
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(
  // Defining the functional component, destructuring className and other props, passing them to the LabelPrimitive.Root
  ({ className, ...props }, ref) => (
    // LabelPrimitive.Root is the main element that renders the Label component, ref is forwarded here
    <LabelPrimitive.Root
      ref={ref} // Forwarding the ref to the root element
      className={cn(labelVariants(), className)} // Combining the labelVariants and any additional class names passed via props
      {...props} // Spreading the rest of the props (e.g., onClick, id) to the root element
    />
  )
)
// Setting the displayName of the component to LabelPrimitive.Root.displayName for better debugging in React DevTools
Label.displayName = LabelPrimitive.Root.displayName

// Exporting the Label component for use in other parts of the application
export { Label }