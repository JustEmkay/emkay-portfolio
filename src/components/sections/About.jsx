import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpVariants, slideInLeftVariants, slideInRightVariants, staggerContainerVariants } from '../../hooks/useAnimation';
import { gsap } from 'gsap';

const About = () => {
  useEffect(() => {
    // GSAP animation for background elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });
    
    // Animate background elements
    tl.fromTo(
      '.about-bg-element',
      { opacity: 0, scale: 0.8 },
      { opacity: 0.5, scale: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
    
    return () => {
      // Cleanup animations
      if (tl) tl.kill();
    };
  }, []);
  
  // Stats data for the counters
  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '20+', label: 'Projects' },
    { value: '10+', label: 'Clients' },
    { value: '3+', label: 'Awards' },
  ];
  
  return (
    <section style={{ backgroundColor: '#50C878', position: 'relative', overflow: 'hidden' }}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="about-bg-element absolute top-20 right-10 w-40 h-40 rounded-full bg-white opacity-0 bg-opacity-10"
          initial={{ opacity: 0 }}
        />
        <motion.div 
          className="about-bg-element absolute bottom-20 left-20 w-32 h-32 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
        />
      </div>
      
      <div className="section-content relative z-10">
        <motion.h2 
          className="section-title mb-8 md:mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <motion.div 
            className="w-full md:w-1/3 flex justify-center"
            initial="hidden"
            animate="visible"
            variants={slideInLeftVariants}
          >
            <motion.div 
              className="w-64 h-64 bg-white bg-opacity-20 rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold">
                Profile Image
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-2/3"
            initial="hidden"
            animate="visible"
            variants={slideInRightVariants}
          >
            <motion.div 
              className="bg-white bg-opacity-10 rounded-lg p-6 md:p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h3 
                className="text-xl md:text-2xl font-bold mb-4"
                variants={fadeInUpVariants}
              >
                Who I Am
              </motion.h3>
              
              <motion.p 
                className="text-base md:text-lg mb-4"
                variants={fadeInUpVariants}
                custom={1}
              >
                This is a placeholder for the about me section. Here you can describe who you are, your background, and what you're passionate about.
              </motion.p>
              
              <motion.p 
                className="text-base md:text-lg mb-4"
                variants={fadeInUpVariants}
                custom={2}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center p-3 bg-white bg-opacity-10 rounded-lg"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          delay: 0.3 + (index * 0.1),
                          duration: 0.5,
                          ease: [0.6, 0.05, 0.01, 0.9],
                        }
                      }
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className="text-2xl md:text-3xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          delay: 0.5 + (index * 0.1),
                          duration: 0.5,
                          type: 'spring',
                          stiffness: 200
                        }
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <motion.div 
                      className="text-sm md:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: { 
                          delay: 0.7 + (index * 0.1),
                          duration: 0.3
                        }
                      }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;