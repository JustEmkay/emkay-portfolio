import React from 'react';
import { motion } from 'framer-motion';
import { useFramerAnimation, fadeInUpVariants } from '../../hooks/useAnimation';

/**
 * ScrollAnimationWrapper - A component that wraps content with scroll-triggered animations
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to animate
 * @param {Object} props.variants - Framer Motion animation variants (defaults to fadeInUpVariants)
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.delay - Animation delay in seconds
 * @param {string} props.as - HTML element to render (defaults to 'div')
 */
const ScrollAnimationWrapper = ({
  children,
  variants = fadeInUpVariants,
  className = '',
  delay = 0,
  as = 'div',
  ...props
}) => {
  const { ref, controls, isInView } = useFramerAnimation();
  
  // Create custom variants with delay if specified
  const customVariants = delay > 0 
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible.transition,
            delay
          }
        }
      }
    : variants;

  // Use the specified HTML element or default to div
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={customVariants}
      className={`scroll-animation-wrapper ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default ScrollAnimationWrapper;