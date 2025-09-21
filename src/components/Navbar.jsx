import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/all';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      // Using GSAP for smoother scrolling with easing
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: section,
          offsetY: 70, // Offset for the navbar height
        },
        ease: 'power3.inOut',
      });
      setMenuOpen(false);
    }
  };

  // Animation variants for navbar items
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 ${scrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="text-white font-bold text-xl cursor-pointer" 
              onClick={() => scrollToSection('#hero')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.span>
          </motion.div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <motion.div 
              className="ml-10 flex items-baseline space-x-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {[
                { name: 'Home', section: '#hero' },
                { name: 'About', section: '#about' },
                { name: 'Skills', section: '#skills' },
                { name: 'Tech Stack', section: '#tech-stack' },
                { name: 'Projects', section: '#projects' },
                { name: 'Experience', section: '#experience' },
                { name: 'Blog', section: '#blog' },
                { name: 'Contact', section: '#contact' },
              ].map((item, i) => (
                <motion.a
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  variants={navItemVariants}
                  custom={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <motion.div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
              {[
                { name: 'Home', section: '#hero' },
                { name: 'About', section: '#about' },
                { name: 'Skills', section: '#skills' },
                { name: 'Tech Stack', section: '#tech-stack' },
                { name: 'Projects', section: '#projects' },
                { name: 'Experience', section: '#experience' },
                { name: 'Blog', section: '#blog' },
                { name: 'Contact', section: '#contact' },
              ].map((item) => (
                <motion.a
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                  variants={mobileNavItemVariants}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;