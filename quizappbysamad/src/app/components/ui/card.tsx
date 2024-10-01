import * as React from "react" // Import React and its features

import { cn } from "@/lib/utils" // Import utility function for conditional class names

// Create a forwardRef component for Card
const Card = React.forwardRef<
  HTMLDivElement, // Type for the ref, pointing to an HTML div element
  React.HTMLAttributes<HTMLDivElement> // Type for the props, corresponding to standard div attributes
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Attach the ref passed to the Card component
    className={cn( // Apply conditional class names using the cn utility
      "rounded-lg border bg-card text-card-foreground shadow-sm", // Base styles for the Card
      className // Additional custom class names passed via props
    )}
    {...props} // Spread remaining props onto the div element
  />
))
Card.displayName = "Card" // Set the display name for debugging purposes

// Create a forwardRef component for CardHeader
const CardHeader = React.forwardRef<
  HTMLDivElement, // Type for the ref, pointing to an HTML div element
  React.HTMLAttributes<HTMLDivElement> // Type for the props, corresponding to standard div attributes
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Attach the ref passed to the CardHeader component
    className={cn( // Apply conditional class names
      "flex flex-col space-y-1.5 p-6", // Base styles for the CardHeader
      className // Additional custom class names passed via props
    )}
    {...props} // Spread remaining props onto the div element
  />
))
CardHeader.displayName = "CardHeader" // Set the display name for debugging purposes

// Create a forwardRef component for CardTitle
const CardTitle = React.forwardRef<
  HTMLParagraphElement, // Type for the ref, pointing to an HTML paragraph element
  React.HTMLAttributes<HTMLHeadingElement> // Type for the props, corresponding to standard heading attributes
>(({ className, ...props }, ref) => (
  <h3
    ref={ref} // Attach the ref passed to the CardTitle component
    className={cn( // Apply conditional class names
      "text-2xl font-semibold leading-none tracking-tight", // Base styles for the CardTitle
      className // Additional custom class names passed via props
    )}
    {...props} // Spread remaining props onto the h3 element
  />
))
CardTitle.displayName = "CardTitle" // Set the display name for debugging purposes

// Create a forwardRef component for CardDescription
const CardDescription = React.forwardRef<
  HTMLParagraphElement, // Type for the ref, pointing to an HTML paragraph element
  React.HTMLAttributes<HTMLParagraphElement> // Type for the props, corresponding to standard paragraph attributes
>(({ className, ...props }, ref) => (
  <p
    ref={ref} // Attach the ref passed to the CardDescription component
    className={cn( // Apply conditional class names
      "text-sm text-muted-foreground", // Base styles for the CardDescription
      className // Additional custom class names passed via props
    )}
    {...props} // Spread remaining props onto the paragraph element
  />
))
CardDescription.displayName = "CardDescription" // Set the display name for debugging purposes

// Create a forwardRef component for CardContent
const CardContent = React.forwardRef<
  HTMLDivElement, // Type for the ref, pointing to an HTML div element
  React.HTMLAttributes<HTMLDivElement> // Type for the props, corresponding to standard div attributes
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Attach the ref passed to the CardContent component
    className={cn( // Apply conditional class names
      "p-6 pt-0", // Base styles for the CardContent
      className // Additional custom class names passed via props
    )}
    {...props} // Spread remaining props onto the div element
  />
))
CardContent.displayName = "CardContent" // Set the display name for debugging purposes

// Create a forwardRef component for CardFooter
const CardFooter = React.forwardRef<
  HTMLDivElement, // Type for the ref, pointing to an HTML div element
  React.HTMLAttributes<HTMLDivElement> // Type for the props, corresponding to standard div attributes
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Attach the ref passed to the CardFooter component
    className={cn( // Apply conditional class names
      "flex items-center p-6 pt-0", // Base styles for the CardFooter
      className // Additional custom class names passed via props
    )}
    {...props} // Spread remaining props onto the div element
  />
))
CardFooter.displayName = "CardFooter" // Set the display name for debugging purposes

// Export the Card and its subcomponents (CardHeader, CardFooter, CardTitle, CardDescription, CardContent)
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
