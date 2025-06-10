
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 rounded-full shadow-lg", // Base positioning & shadow
        "h-14 w-14", // Increased size
        "bg-gradient-to-br from-primary to-accent text-primary-foreground", // Gradient and text color
        "transition-all duration-300 ease-in-out", // Transitions for opacity, transform, shadow
        "hover:scale-105 hover:shadow-xl", // Hover effects: scale and more shadow
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Ensure focus ring is visible
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none' // Visibility logic
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-7 w-7" /> {/* Adjusted icon size */}
    </Button>
  );
}

