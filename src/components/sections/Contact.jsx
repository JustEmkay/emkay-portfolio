import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpVariants, staggerContainerVariants } from '../../hooks/useAnimation';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/all';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Contact info
  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'contact@example.com',
      link: 'mailto:contact@example.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (123) 456-7890',
      link: 'tel:+11234567890'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'New York, NY, USA',
      link: 'https://maps.google.com/?q=New+York'
    }
  ];

  // Social media links
  const socialLinks = [
    { name: 'GitHub', icon: 'GitHub', url: '#' },
    { name: 'LinkedIn', icon: 'LinkedIn', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' }
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server
    alert('Thank you for your message! This is a demo form.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // GSAP animation for form elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });
    
    // Animate form inputs on scroll
    tl.fromTo(
      '.contact-input',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power2.out' 
      }
    );
    
    return () => {
      // Cleanup animations
      if (tl) tl.kill();
    };
  }, []);
  
  // Animation variants for contact cards
  const contactCardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      y: -5,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 }
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
    <section id="contact" style={{ backgroundColor: '#6A5ACD', position: 'relative', overflow: 'hidden' }}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-60 h-60 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.1, 
            x: [0, 20, 0], 
            y: [0, -30, 0] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-white opacity-0 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.1, 
            x: [0, -30, 0], 
            y: [0, 20, 0] 
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
          Contact
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
            This is a placeholder for the contact section. Feel free to reach out if you have any questions or want to work together.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Contact Form */}
          <motion.div 
            className="bg-white bg-opacity-10 rounded-lg p-6 md:p-8 shadow-lg"
            variants={contactCardVariants}
            custom={0}
            whileHover="hover"
          >
            <motion.h3 
              className="text-xl md:text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              Send Me a Message
            </motion.h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-input w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Your Name"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-input w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="your.email@example.com"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="contact-input w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Subject"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="contact-input w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-white text-purple-700 rounded-lg font-bold shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact Details */}
            <motion.div 
              className="bg-white bg-opacity-10 rounded-lg p-6 md:p-8 shadow-lg"
              variants={contactCardVariants}
              custom={1}
              whileHover="hover"
            >
              <motion.h3 
                className="text-xl md:text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                Contact Information
              </motion.h3>
              
              <motion.div 
                className="space-y-4"
                variants={staggerContainerVariants}
              >
                {contactInfo.map((info, index) => (
                  <motion.a 
                    key={index} 
                    href={info.link} 
                    className="flex items-start md:items-center p-4 bg-white bg-opacity-10 rounded-lg"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: {
                          delay: 0.1 * index,
                          duration: 0.4
                        }
                      }
                    }}
                    whileHover={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      x: 5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="text-2xl md:text-3xl mr-4"
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.2 + (0.1 * index),
                        duration: 0.3,
                        type: 'spring',
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <motion.h4 
                        className="text-sm font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 + (0.1 * index), duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {info.title}
                      </motion.h4>
                      <motion.p 
                        className="text-base md:text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 + (0.1 * index), duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {info.value}
                      </motion.p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Social Media */}
            <motion.div 
              className="bg-white bg-opacity-10 rounded-lg p-6 md:p-8 shadow-lg"
              variants={contactCardVariants}
              custom={2}
              whileHover="hover"
            >
              <motion.h3 
                className="text-xl md:text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                Connect With Me
              </motion.h3>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                variants={staggerContainerVariants}
              >
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index} 
                    href={social.url} 
                    className="w-12 h-12 md:w-14 md:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    variants={socialLinkVariants}
                    custom={index}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.span 
                      className="text-sm md:text-base font-bold"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.3 + (0.1 * index),
                        type: 'spring',
                        stiffness: 260,
                        damping: 20
                      }}
                    >
                      {social.icon}
                    </motion.span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;