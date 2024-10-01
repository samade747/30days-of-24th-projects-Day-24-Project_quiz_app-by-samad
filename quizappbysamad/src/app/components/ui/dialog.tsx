"use client"; // Marks the file as client-side for Next.js

import * as React from "react"; // Importing React for component creation
import * as DialogPrimitive from "@radix-ui/react-dialog"; // Importing Dialog components from Radix UI
import { X } from "lucide-react"; // Importing the 'X' icon from lucide-react library for the close button

import { cn } from "@/lib/utils"; // Importing a utility function to handle class name merging

// Wrapping Radix's Dialog Root component to export it for use
const Dialog = DialogPrimitive.Root;

// Wrapping Radix's Dialog Trigger component to export it for use
const DialogTrigger = DialogPrimitive.Trigger;

// Wrapping Radix's Dialog Portal component to export it for use
const DialogPortal = DialogPrimitive.Portal;

// Wrapping Radix's Dialog Close component to export it for use
const DialogClose = DialogPrimitive.Close;

// Dialog Overlay component using forwardRef to pass refs to the underlying DOM element
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>, // Type for the underlying element of the Overlay
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> // Type for the props excluding ref
>(
  // Destructuring className and props, passing ref to DialogPrimitive.Overlay
  ({ className, ...props }, ref) => (
    // Radix UI's Dialog Overlay component
    <DialogPrimitive.Overlay
      ref={ref} // Passing ref to the DOM element
      className={cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", 
        className // Merging custom className with default styling
      )}
      {...props} // Passing down any additional props
    />
  )
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName; // Setting display name for debugging

// Dialog Content component using forwardRef to pass refs to the underlying DOM element
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>, // Type for the underlying element of the Content
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> // Type for the props excluding ref
>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal> {/* Wrapping the content in a DialogPortal to ensure it renders outside the root */}
      <DialogOverlay /> {/* Rendering the overlay behind the dialog */}
      <DialogPrimitive.Content
        ref={ref} // Passing ref to the DOM element
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className // Merging custom className with default styling
        )}
        {...props} // Passing down any additional props
      >
        {children} {/* Rendering the children inside the dialog content */}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" /> {/* Rendering the 'X' icon for the close button */}
          <span className="sr-only">Close</span> {/* Screen reader text for accessibility */}
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName; // Setting display name for debugging

// Dialog Header component to style the header area
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left", // Styling for the header with space between elements
      className // Merging custom className with default styling
    )}
    {...props} // Passing down any additional props
  />
);
DialogHeader.displayName = "DialogHeader"; // Setting display name for debugging

// Dialog Footer component to style the footer area
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", // Styling for the footer, aligns buttons
      className // Merging custom className with default styling
    )}
    {...props} // Passing down any additional props
  />
);
DialogFooter.displayName = "DialogFooter"; // Setting display name for debugging

// Dialog Title component using forwardRef to pass refs to the underlying DOM element
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>, // Type for the underlying element of the Title
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> // Type for the props excluding ref
>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref} // Passing ref to the DOM element
      className={cn(
        "text-lg font-semibold leading-none tracking-tight", // Styling for the title
        className // Merging custom className with default styling
      )}
      {...props} // Passing down any additional props
    />
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName; // Setting display name for debugging

// Dialog Description component using forwardRef to pass refs to the underlying DOM element
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>, // Type for the underlying element of the Description
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> // Type for the props excluding ref
>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref} // Passing ref to the DOM element
      className={cn("text-sm text-muted-foreground", className)} // Styling for the description
      {...props} // Passing down any additional props
    />
  )
);
DialogDescription.displayName = DialogPrimitive.Description.displayName; // Setting display name for debugging

// Exporting all the Dialog components for use in other parts of the application
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
