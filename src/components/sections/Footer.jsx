import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUpVariants, staggerContainerVariants } from '../../hooks/useAnimation';

const Footer = () => {
  // Quick links
  const quickLinks = [
    { name: 'Home', url: '#hero' },
    { name: 'About', url: '#about' },
    { name: 'Projects', url: '#projects' },
    { name: 'Blog', url: '#blog' },
    { name: 'Contact', url: '#contact' },
  ];

  // Social links
  const socialLinks = [
    { name: 'GitHub', icon: 'GitHub', url: '#' },
    { name: 'LinkedIn', icon: 'LinkedIn', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' },
  ];

  // Animation variants for footer links
  const footerLinkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9],
      }
    }),
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };
  
  // Animation variants for social links
  const socialLinkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + (0.1 * i),
        duration: 0.4,
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }),
    hover: { 
      scale: 1.1, 
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };
  
  return (
    <footer id="footer" style={{ backgroundColor: '#2F4F4F', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-40 left-10 w-60 h-60 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.05, 
            x: [0, 20, 0], 
            y: [0, -30, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.05, 
            x: [0, -30, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
        />
      </div>
      
      <div className="section-content py-12 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* About Column */}
          <motion.div
            variants={fadeInUpVariants}
            custom={0}
          >
            <motion.h3 
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              My Portfolio
            </motion.h3>
            <motion.p 
              className="mb-4 text-sm md:text-base opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A showcase of my work, skills, and experiences as a web developer. Feel free to explore and get in touch if you'd like to collaborate.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              variants={staggerContainerVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.url} 
                  className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  variants={socialLinkVariants}
                  custom={index}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.span 
                    className="text-xs font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.3 + (0.1 * index),
                      type: 'spring',
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    {social.icon.charAt(0)}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Quick Links Column */}
          <motion.div
            variants={fadeInUpVariants}
            custom={1}
          >
            <motion.h3 
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h3>
            <motion.ul 
              className="space-y-2"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  variants={footerLinkVariants}
                  custom={index}
                >
                  <motion.a 
                    href={link.url} 
                    className="text-sm md:text-base opacity-80 block"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    variants={footerLinkVariants}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          {/* Contact Column */}
          <motion.div
            variants={fadeInUpVariants}
            custom={2}
          >
            <motion.h3 
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              Contact
            </motion.h3>
            <motion.ul 
              className="space-y-2"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li 
                className="flex items-start"
                variants={footerLinkVariants}
                custom={0}
                whileHover={{ x: 5 }}
              >
                <motion.span 
                  className="mr-2"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  📧
                </motion.span>
                <motion.a 
                  href="mailto:contact@example.com" 
                  className="text-sm md:text-base opacity-80"
                  whileHover={{ opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  contact@example.com
                </motion.a>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={footerLinkVariants}
                custom={1}
                whileHover={{ x: 5 }}
              >
                <motion.span 
                  className="mr-2"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  📱
                </motion.span>
                <motion.a 
                  href="tel:+11234567890" 
                  className="text-sm md:text-base opacity-80"
                  whileHover={{ opacity: 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  +1 (123) 456-7890
                </motion.a>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={footerLinkVariants}
                custom={2}
                whileHover={{ x: 5 }}
              >
                <motion.span 
                  className="mr-2"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  📍
                </motion.span>
                <motion.span className="text-sm md:text-base opacity-80">
                  New York, NY, USA
                </motion.span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
        
        {/* Divider */}
        <motion.div 
          className="border-t border-white border-opacity-20 my-6"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial="hidden"
          whileInView="visible"
          variants={staggerContainerVariants}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm opacity-80 mb-4 md:mb-0"
            variants={fadeInUpVariants}
            custom={0}
          >
            © {new Date().getFullYear()} My Portfolio. All rights reserved.
          </motion.p>
          <motion.div 
            className="text-sm opacity-80"
            variants={fadeInUpVariants}
            custom={1}
          >
            <motion.a 
              href="#" 
              className="mr-4"
              whileHover={{ textDecoration: 'underline', opacity: 1 }}
              whileTap={{ scale: 0.98 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ textDecoration: 'underline', opacity: 1 }}
              whileTap={{ scale: 0.98 }}
            >
              Terms of Service
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;