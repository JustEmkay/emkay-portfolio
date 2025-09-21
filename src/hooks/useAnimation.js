import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useAnimation, useInView } from 'framer-motion';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom hook for scroll animations using GSAP
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const defaultOptions = {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    const animation = gsap.fromTo(
      element,
      { 
        opacity: 0, 
        y: mergedOptions.y 
      },
      {
        opacity: 1,
        y: 0,
        duration: mergedOptions.duration,
        ease: mergedOptions.ease,
        scrollTrigger: {
          trigger: element,
          start: mergedOptions.start,
          end: mergedOptions.end,
          toggleActions: mergedOptions.toggleActions,
          markers: process.env.NODE_ENV === 'development' && mergedOptions.markers,
        },
      }
    );
    
    return () => {
      // Clean up animation when component unmounts
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [options]);
  
  return elementRef;
};

// Custom hook for Framer Motion animations
export const useFramerAnimation = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);
  
  return { ref, controls, isInView };
};

// Framer Motion variants for common animations
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    }
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
    }
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

// Export motion component for easier usage
export { motion };