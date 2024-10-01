"use client" // Indicate that this code is intended to run on the client side

// Import necessary React and Radix UI components
import * as React from "react" // Import React and its features
import * as AvatarPrimitive from "@radix-ui/react-avatar" // Import Avatar components from Radix UI

import { cn } from "@/lib/utils" // Import a utility function for conditional class names

// Create a forwardRef component for Avatar
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>, // Type for the ref, pointing to the AvatarPrimitive.Root component
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> // Type for the props, excluding the ref
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root // Use the Root component from Radix UI
    ref={ref} // Attach the ref passed to the Avatar component
    className={cn( // Apply conditional class names using the cn utility
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Base styles for the Avatar
      className // Additional custom class names passed via props
    )}
    {...props} // Spread remaining props onto the AvatarPrimitive.Root
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName // Set the display name for debugging purposes

// Create a forwardRef component for AvatarImage
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>, // Type for the ref, pointing to the AvatarPrimitive.Image component
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> // Type for the props, excluding the ref
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image // Use the Image component from Radix UI
    ref={ref} // Attach the ref passed to the AvatarImage component
    className={cn("aspect-square h-full w-full", className)} // Apply base styles and custom class names
    {...props} // Spread remaining props onto the AvatarPrimitive.Image
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName // Set the display name for debugging purposes

// Create a forwardRef component for AvatarFallback
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>, // Type for the ref, pointing to the AvatarPrimitive.Fallback component
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> // Type for the props, excluding the ref
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback // Use the Fallback component from Radix UI
    ref={ref} // Attach the ref passed to the AvatarFallback component
    className={cn( // Apply conditional class names using the cn utility
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Base styles for the Fallback
      className // Additional custom class names passed via props
    )}
    {...props} // Spread remaining props onto the AvatarPrimitive.Fallback
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName // Set the display name for debugging purposes

// Export the Avatar, AvatarImage, and AvatarFallback components for use in other parts of the application
export { Avatar, AvatarImage, AvatarFallback }
