import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpVariants, slideInLeftVariants, slideInRightVariants, scaleUpVariants } from '../../hooks/useAnimation';
import { gsap } from 'gsap';

const Hero = () => {
  useEffect(() => {
    // GSAP animation for background elements
    const tl = gsap.timeline();
    
    tl.fromTo(
      '.hero-bg-element',
      { opacity: 0, scale: 0.8 },
      { opacity: 0.7, scale: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out' }
    );
    
    // Parallax effect on scroll
    gsap.to('.hero-parallax', {
      y: -80,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    
    return () => {
      // Cleanup animations
      if (tl) tl.kill();
    };
  }, []);
  
  return (
    <section style={{ backgroundColor: '#4A90E2', position: 'relative', overflow: 'hidden' }}>
      {/* Background elements with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="hero-bg-element hero-parallax absolute top-20 left-10 w-32 h-32 rounded-full bg-white opacity-0 bg-opacity-10"
          initial={{ opacity: 0 }}
        />
        <motion.div 
          className="hero-bg-element hero-parallax absolute bottom-40 right-20 w-48 h-48 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
        />
        <motion.div 
          className="hero-bg-element hero-parallax absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white opacity-0 bg-opacity-10"
          initial={{ opacity: 0 }}
        />
      </div>
      
      <div className="section-content relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            initial="hidden"
            animate="visible"
            variants={slideInLeftVariants}
          >
            <motion.h1 
              className="section-title mb-4"
              variants={fadeInUpVariants}
              custom={1}
            >
              Hero Section
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-6"
              variants={fadeInUpVariants}
              custom={2}
            >
              Welcome to my portfolio! This is a placeholder for the hero section.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              variants={fadeInUpVariants}
              custom={3}
            >
              <motion.button 
                className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
              
              <motion.button 
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial="hidden"
            animate="visible"
            variants={slideInRightVariants}
          >
            <motion.div 
              className="w-64 h-64 md:w-80 md:h-80 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-xl font-bold"
              variants={scaleUpVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Profile Image Placeholder
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;