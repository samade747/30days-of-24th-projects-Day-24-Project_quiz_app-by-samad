"use client"; // Marks the file as client-side for Next.js

import * as React from "react"; // Importing React for component creation
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"; // Importing Checkbox components from Radix UI
import { Check } from "lucide-react"; // Importing the 'Check' icon from lucide-react library

import { cn } from "@/lib/utils"; // Importing a utility function to handle class name merging

// Defining the Checkbox component using forwardRef to pass refs to the underlying DOM element
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>, // Type for the underlying element of the Checkbox
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> // Type for the props excluding ref
>(
  // Destructuring className and props, and passing ref to the CheckboxPrimitive.Root component
  ({ className, ...props }, ref) => (
    // Radix UI's Checkbox root component
    <CheckboxPrimitive.Root
      ref={ref} // Passing ref to the underlying DOM element
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className // Merging custom className with default styling
      )}
      {...props} // Passing down any additional props to the root component
    >
      {/* Radix UI's Indicator component, which shows when the checkbox is checked */}
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" /> {/* Displaying the check icon inside the checkbox when checked */}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

// Setting the display name for the Checkbox component, which helps with debugging
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Exporting the Checkbox component for use in other parts of the application
export { Checkbox };
