import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUpVariants, staggerContainerVariants } from '../../hooks/useAnimation';
import { gsap } from 'gsap';

const Projects = () => {
  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with product management, cart functionality, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://via.placeholder.com/600x400?text=E-Commerce+Project',
      github: '#',
      demo: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A responsive task management application with drag-and-drop functionality and team collaboration features.',
      technologies: ['React', 'Redux', 'Firebase', 'Material UI'],
      image: 'https://via.placeholder.com/600x400?text=Task+Management+App',
      github: '#',
      demo: '#',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather dashboard that displays current and forecasted weather data using a third-party API.',
      technologies: ['JavaScript', 'HTML/CSS', 'OpenWeather API'],
      image: 'https://via.placeholder.com/600x400?text=Weather+Dashboard',
      github: '#',
      demo: '#',
    },
    {
      id: 4,
      title: 'Social Media Platform',
      description: 'A social media platform with user authentication, post creation, and real-time notifications.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      image: 'https://via.placeholder.com/600x400?text=Social+Media+Platform',
      github: '#',
      demo: '#',
    },
  ];

  // State for category filter
  const [filter, setFilter] = useState('all');

  // Filter categories
  const categories = ['all', 'web', 'mobile', 'design'];

  useEffect(() => {
    // GSAP animation for background elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });
    
    // Animate background elements
    tl.fromTo(
      '.project-bg-element',
      { opacity: 0, scale: 0.8 },
      { opacity: 0.2, scale: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
    
    return () => {
      // Cleanup animations
      if (tl) tl.kill();
    };
  }, []);
  
  // Animation variants for projects
  const projectCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      }
    }),
    hover: {
      y: -10,
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };
  
  // Animation variants for filter buttons
  const filterButtonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.4
      }
    }),
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };
  
  return (
    <section style={{ backgroundColor: '#9370DB', position: 'relative', overflow: 'hidden' }}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="project-bg-element absolute top-40 left-10 w-60 h-60 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.1, 
            x: [0, 30, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
        />
        <motion.div 
          className="project-bg-element absolute bottom-40 right-10 w-80 h-80 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.1, 
            x: [0, -20, 0], 
            y: [0, -30, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
        />
      </div>
      
      <div className="section-content relative z-10">
        <motion.h2 
          className="section-title mb-8 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          Project Showcase
        </motion.h2>
        
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
          custom={1}
        >
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            This is a placeholder for the project showcase section. Here you can display your best projects.
          </p>
        </motion.div>
        
        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8"
          initial="initial"
          animate="animate"
          variants={staggerContainerVariants}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm md:text-base ${filter === category 
                ? 'bg-white text-purple-700 font-bold' 
                : 'bg-purple-800 bg-opacity-30 text-white hover:bg-opacity-50'}`}
              variants={filterButtonVariants}
              custom={index}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg"
                variants={projectCardVariants}
                custom={index}
                whileHover="hover"
                whileTap="tap"
                layout
              >
                <motion.div 
                  className="relative pb-[60%] overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    initial={{ scale: 1.2, opacity: 0.8 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-purple-900 bg-opacity-40 flex items-center justify-center opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span 
                      className="text-white font-bold text-lg"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      View Details
                    </motion.span>
                  </motion.div>
                </motion.div>
                
                <div className="p-6">
                  <motion.h3 
                    className="text-xl md:text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm md:text-base mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex} 
                        className="px-2 py-1 bg-purple-800 bg-opacity-30 rounded-full text-xs md:text-sm"
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { 
                            opacity: 1, 
                            x: 0,
                            transition: {
                              delay: 0.1 * techIndex,
                              duration: 0.3
                            }
                          }
                        }}
                        whileHover={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          scale: 1.05
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.a 
                      href={project.github} 
                      className="px-4 py-2 bg-purple-800 bg-opacity-50 rounded-lg text-sm md:text-base"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: 'rgba(147, 112, 219, 0.7)' 
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      GitHub
                    </motion.a>
                    <motion.a 
                      href={project.demo} 
                      className="px-4 py-2 bg-white text-purple-700 rounded-lg text-sm md:text-base"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* View more button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="px-6 py-3 bg-white text-purple-700 rounded-lg text-lg font-bold shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' 
            }}
            whileTap={{ scale: 0.98 }}
          >
            View More Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;