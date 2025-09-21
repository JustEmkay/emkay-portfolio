import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpVariants, staggerContainerVariants } from '../../hooks/useAnimation';
import { gsap } from 'gsap';

const Skills = () => {
  useEffect(() => {
    // GSAP animation for skill bars
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });
    
    // Animate skill bars with staggered effect
    tl.fromTo(
      '.skill-bar-inner',
      { width: 0 },
      { 
        width: 'var(--skill-level)', 
        duration: 1.5, 
        stagger: 0.1, 
        ease: 'power2.out' 
      }
    );
    
    return () => {
      // Cleanup animations
      if (tl) tl.kill();
    };
  }, []);
  
  // Sample skills data
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Tailwind CSS', level: 75 },
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'Express', level: 70 },
        { name: 'MongoDB', level: 65 },
        { name: 'SQL', level: 60 },
      ]
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Webpack', level: 65 },
        { name: 'Docker', level: 60 },
        { name: 'CI/CD', level: 55 },
      ]
    },
  ];

  return (
    <section style={{ backgroundColor: '#FF6B6B', position: 'relative', overflow: 'hidden' }}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.1, 
            x: [0, 20, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.1, 
            x: [0, -30, 0], 
            y: [0, -20, 0] 
          }}
          transition={{ 
            duration: 10, 
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
          Skills
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
            This is a placeholder for the skills section. Here you can showcase your technical skills and proficiency levels.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: 0.1 * index,
                    duration: 0.5,
                    ease: [0.6, 0.05, 0.01, 0.9],
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
              whileHover={{ 
                y: -5, 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className="text-xl font-bold mb-4 text-center"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                {category.category}
              </motion.h3>
              
              <motion.div 
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.1 * skillIndex,
                          duration: 0.4 
                        }
                      }
                    }}
                  >
                    <motion.div 
                      className="flex justify-between mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (0.1 * skillIndex) }}
                    >
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </motion.div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="skill-bar-inner bg-white h-2.5 rounded-full" 
                        style={{ 
                          width: 0,
                          '--skill-level': `${skill.level}%` 
                        }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;