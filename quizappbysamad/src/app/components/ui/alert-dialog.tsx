"use client"


// Importing React and the AlertDialog components from Radix UI
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"


// Importing utility function to combine class names and the button variants for styling
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Defining the main AlertDialog component using Radix UI's Root component
const AlertDialog = AlertDialogPrimitive.Root

// Defining the trigger element that opens the alert dialog
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

// Defining the portal to render dialog content outside the parent DOM tree (commonly used for modals)
const AlertDialogPortal = AlertDialogPrimitive.Portal


// Overlay component that dims the background when the alert dialog is open
// It uses React.forwardRef to pass a ref to the underlying DOM element
const AlertDialogOverlay = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
    
