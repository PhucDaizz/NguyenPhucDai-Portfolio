
"use client";
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions extends IntersectionObserverInit {}

export function useScrollReveal<T extends HTMLElement>(options?: ScrollRevealOptions): [RefObject<T>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after first reveal to prevent re-animation and save resources
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
        // To re-animate if it scrolls out and back in, remove unobserve and set isVisible to false in else block
        // else {
        //   setIsVisible(false);
        // }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation a bit before it's fully in view
        ...options,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
}
