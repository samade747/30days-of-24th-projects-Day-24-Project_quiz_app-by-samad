import * as React from "react"; // Importing React to use JSX and React functionalities

import { cn } from "@/lib/utils"; // Importing the `cn` utility function for className manipulation

// Define the `InputProps` interface which extends the default HTML input element attributes
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Defining the Input component using React.forwardRef to allow ref forwarding
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // Destructuring `className`, `type`, and other props
  ({ className, type, ...props }, ref) => {
    return (
      // Input field with dynamic className, type, and ref
      <input
        type={type} // Dynamic input type, could be text, password, etc.
        className={cn(
          // Using `cn` to combine utility classes and custom className
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className // Allows passing additional class names dynamically
        )}
        ref={ref} // Forwarding the ref for direct DOM access, useful for form handling
        {...props} // Spread remaining props like `onChange`, `value`, etc.
      />
    );
  }
);

// Setting a display name for the Input component for better debugging and component identification
Input.displayName = "Input";

// Exporting the Input component for use in other parts of the application
export { Input };
