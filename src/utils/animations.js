import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Fade in animation for sections
export const fadeInAnimation = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  );
};

// Scroll trigger animation for sections
export const scrollAnimation = (sectionId, animationProps = {}) => {
  const defaultProps = {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power3.out',
  };

  const mergedProps = { ...defaultProps, ...animationProps };

  gsap.fromTo(
    `#${sectionId} .animate-on-scroll`,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: mergedProps.duration,
      ease: mergedProps.ease,
      scrollTrigger: {
        trigger: `#${sectionId}`,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Stagger animation for multiple elements
export const staggerAnimation = (elements, staggerTime = 0.2, delay = 0) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      stagger: staggerTime,
      ease: 'power2.out',
    }
  );
};

// Text reveal animation
export const textRevealAnimation = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
    }
  );
};

// Parallax effect for background elements
export const parallaxAnimation = (element, scrollSpeed = 0.5) => {
  gsap.to(element, {
    y: `${scrollSpeed * 100}%`,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Scale animation
export const scaleAnimation = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

// Rotate animation
export const rotateAnimation = (element, delay = 0, rotation = 360) => {
  gsap.fromTo(
    element,
    { rotation: 0, opacity: 0 },
    {
      rotation,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power2.out',
    }
  );
};