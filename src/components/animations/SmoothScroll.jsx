import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Import ScrollToPlugin
import { ScrollToPlugin } from 'gsap/all';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * SmoothScroll - A component that enables smooth scrolling behavior throughout the site
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Setup smooth scrolling for anchor links
    const setupSmoothScrolling = () => {
      // Get all anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      
      anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const targetId = link.getAttribute('href');
          if (targetId === '#') return; // Skip if it's just a '#' link
          
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Smooth scroll to the target element
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: targetElement,
                offsetY: 50, // Offset to account for fixed headers
              },
              ease: 'power3.inOut',
            });
          }
        });
      });
    };
    
    // Initialize smooth scrolling
    setupSmoothScrolling();
    
    // Setup scroll triggers for all sections
    const setupScrollTriggers = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleClass: { targets: section, className: 'in-view' },
          // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging
        });
      });
    };
    
    // Initialize scroll triggers
    setupScrollTriggers();
    
    // Cleanup function
    return () => {
      // Kill all scroll triggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Remove event listeners from anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  return <>{children}</>;
};

export default SmoothScroll;