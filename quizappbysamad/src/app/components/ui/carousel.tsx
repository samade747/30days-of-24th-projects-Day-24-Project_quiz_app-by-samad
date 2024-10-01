"use client"; // This marks the file as client-side for Next.js

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"; // Importing the Embla Carousel library
import { ArrowLeft, ArrowRight } from "lucide-react"; // Importing arrow icons for carousel navigation

import { cn } from "@/lib/utils"; // Importing a utility function for class names
import { Button } from "@/components/ui/button"; // Importing Button component for carousel navigation

// Types for the carousel props
type CarouselApi = UseEmblaCarouselType[1]; // Typing the API object returned by useEmblaCarousel
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>; // Typing parameters of useEmblaCarousel
type CarouselOptions = UseCarouselParameters[0]; // Typing the options that can be passed to the carousel
type CarouselPlugin = UseCarouselParameters[1]; // Typing the plugins that can be passed to the carousel

// Defining props for the Carousel component
type CarouselProps = {
  opts?: CarouselOptions; // Options for carousel behavior
  plugins?: CarouselPlugin; // Plugins to extend carousel functionality
  orientation?: "horizontal" | "vertical"; // Direction of the carousel (default: horizontal)
  setApi?: (api: CarouselApi) => void; // Function to access carousel API
  interval?: number; // Interval for autoplay feature (optional)
};

// Context to provide carousel data across components
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]; // Reference to the carousel DOM element
  api: ReturnType<typeof useEmblaCarousel>[1]; // Carousel API to control behavior
  scrollPrev: () => void; // Function to scroll to the previous slide
  scrollNext: () => void; // Function to scroll to the next slide
  canScrollPrev: boolean; // Can we scroll to the previous slide?
  canScrollNext: boolean; // Can we scroll to the next slide?
} & CarouselProps; // Merging with CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null); // Creating a context for carousel state

// Custom hook to use the carousel context
function useCarousel() {
  const context = React.useContext(CarouselContext); // Access carousel context
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />"); // Throw error if used outside <Carousel />
  }
  return context; // Return context value
}

// Carousel component to provide structure and control
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal", // Default orientation
      opts,
      setApi,
      plugins,
      className,
      children,
      interval, // Destructure interval for autoplay feature
      ...props
    },
    ref
  ) => {
    // Initialize carousel with the given options and plugins
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y", // Determine axis based on orientation
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false); // State for previous slide availability
    const [canScrollNext, setCanScrollNext] = React.useState(false); // State for next slide availability

    // Callback to update scroll status
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev()); // Update canScrollPrev
      setCanScrollNext(api.canScrollNext()); // Update canScrollNext
    }, []);

    // Function to scroll to the previous slide
    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    // Function to scroll to the next slide
    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    // Handle keyboard navigation for carousel
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev(); // Scroll left when pressing the left arrow
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext(); // Scroll right when pressing the right arrow
        }
      },
      [scrollPrev, scrollNext]
    );

    // Set carousel API if provided in props
    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api); // Call the setApi function to pass the API to parent component
    }, [api, setApi]);

    // Update carousel scrollability state on select
    React.useEffect(() => {
      if (!api) return;
      onSelect(api); // Set the initial state for canScrollPrev and canScrollNext
      api.on("reInit", onSelect); // Re-initialize when carousel is re-rendered
      api.on("select", onSelect); // Update when slide is selected

      return () => {
        api?.off("select", onSelect); // Cleanup listener on unmount
      };
    }, [api, onSelect]);

    // Handle interval autoplay functionality
    React.useEffect(() => {
      if (!api || interval === undefined) return;
      const play = () => api.scrollNext(); // Scroll to the next slide automatically
      const id = setInterval(play, interval); // Set up the interval for autoplay
      return () => clearInterval(id); // Clear interval on unmount
    }, [api, interval]);

    return (
      // Provide carousel context to children
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"), // Set orientation if provided
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown} // Capture keyboard events for navigation
          className={cn("relative", className)} // Set className for styling
          role="region" // Set ARIA role for accessibility
          aria-roledescription="carousel" // Describe the role
          {...props}
        >
          {children} {/* Render the carousel children */}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel"; // Set a display name for the component

// Carousel content component to hold carousel items
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel(); // Access carousel context
  return (
    <div ref={carouselRef} className="overflow-hidden"> {/* Set container for carousel items */}
      <div
        ref={ref}
        className={cn(
          "flex", // Flex layout for horizontal carousel
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", // Apply margin based on orientation
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// Carousel item component representing each slide
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel(); // Access orientation from context
  return (
    <div
      ref={ref}
      role="group" // Set ARIA role for accessibility
      aria-roledescription="slide" // Describe the role as a slide
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full", // Styling for each slide
        orientation === "horizontal" ? "pl-4" : "pt-4", // Apply padding based on orientation
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// Previous button for carousel navigation
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel(); // Access carousel context
  return (
    <Button
      ref={ref}
      variant={variant} // Button variant
      size={size} // Button size
      className={cn(
        "absolute  h-8 w-8 rounded-full", // Position and style the button
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90", // Different positioning for vertical orientation
        className
      )}
      disabled={!canScrollPrev} // Disable if there is no previous slide
      onClick={scrollPrev} // Trigger scrollPrev function
      {...props}
    >
      <ArrowLeft className="h-4 w-4" /> {/* Arrow icon for navigation */}
      <span className="sr-only">Previous slide</span> {/* Screen reader text */}
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

// Next button for carousel navigation
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel(); // Access carousel context
  return (
    <Button
      ref={ref}
      variant={variant} // Button variant
      size={size} // Button size
      className={cn(
        "absolute  h-8 w-8 rounded-full", // Position and style the button
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", // Different positioning for vertical orientation
        className
      )}
      disabled={!canScrollNext} // Disable if there is no next slide
      onClick={scrollNext} // Trigger scrollNext function
      {...props}
    >
      <ArrowRight className="h-4 w-4" /> {/* Arrow icon for navigation */}
      <span className="sr-only">Next slide</span> {/* Screen reader text */}
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

// Exporting all components for use in other parts of the application
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
};
