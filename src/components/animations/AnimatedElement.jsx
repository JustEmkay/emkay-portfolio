import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from '../../hooks/useAnimation';

/**
 * AnimatedElement - A component for animating individual elements
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} props.variants - Framer Motion animation variants
 * @param {number} props.delay - Animation delay in seconds
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.as - HTML element to render (defaults to 'div')
 */
const AnimatedElement = ({
  children,
  variants = fadeInUpVariants,
  delay = 0,
  className = '',
  as = 'div',
  ...props
}) => {
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
      initial="hidden"
      animate="visible"
      variants={customVariants}
      className={`animated-element ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedElement;