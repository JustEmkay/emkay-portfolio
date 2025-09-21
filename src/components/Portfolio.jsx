import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StaggeredMenu from './StaggeredMenu';
import Lanyard from './Lanyard'

const Portfolio = () => {
  const [showMainPage, setShowMainPage] = useState(false);
  const blackScreenRef = useRef(null);
  const mainPageRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    // Initial black screen animation
    const tl = gsap.timeline();
    
    tl.to(blackScreenRef.current, {
      duration: 2,
      opacity: 1,
      ease: "power2.out"
    })
    .to(blackScreenRef.current, {
      duration: 1.5,
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        setShowMainPage(true);
      }
    }, "+=1");
  }, []);

  useEffect(() => {
    if (showMainPage) {
      // Main page entrance animation
      gsap.fromTo(mainPageRef.current, 
        { opacity: 0, y: 50 },
        { 
          duration: 1.5, 
          opacity: 1, 
          y: 0, 
          ease: "power3.out" 
        }
      );

      // Name animation
      gsap.fromTo(nameRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          duration: 1.2, 
          opacity: 1, 
          scale: 1, 
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }
  }, [showMainPage]);

  const menuItems = [
    { label: 'About', ariaLabel: 'Learn about Manukrishna', link: '#about' },
    { label: 'Experience', ariaLabel: 'View work experience', link: '#experience' },
    { label: 'Projects', ariaLabel: 'See portfolio projects', link: '#projects' },
    { label: 'Skills', ariaLabel: 'View technical skills', link: '#skills' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/JustEmkay/' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/manukrishna-t-m/' },
    { label: 'Email', link: 'mailto:t.m.manukrishna@gmail.com' }
  ];

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Staggered Menu Overlay */}
      <StaggeredMenu
        position="right"
        colors={['#A2D5C6', '#CFFFE2', '#F6F6F6']}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        logoUrl="/src/assets/icons/blender.png"
        menuButtonColor="#CFFFE2"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        accentColor="#A2D5C6"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />

      {/* Black Screen with Namaskāram */}
      {/* <div 
        ref={blackScreenRef}
        className="fixed inset-0 bg-black flex items-center justify-center z-30"
        style={{ opacity: 0 }}
      >
        <h1 className="text-6xl font-bold tracking-wider" style={{ color: '#CFFFE2' }}>
          Namaskāram
        </h1>
      </div> */}

      {/* Main Page */}
      {showMainPage && (
        <div ref={mainPageRef} className="min-h-screen relative" style={{ opacity: 0, backgroundColor: '#000000' }}>

          {/* Main Content */}
          <div className="flex items-center justify-center min-h-screen px-8">
            <div className="text-center">
              <h1 
                ref={nameRef}
                className="text-8xl md:text-9xl font-black mb-8 tracking-tight"
                style={{ opacity: 0, color: '#CFFFE2' }}
              >
                MANUകൃഷ്ണ T.M
              </h1>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: '#F6F6F6' }}>
                Junior AI/Backend Developer passionate about creating innovative solutions
              </p>
            </div>
          </div>

          {/* Sections for smooth scrolling */}
          <section id="about" className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#A2D5C6' }}>
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-8" style={{ color: '#000000' }}>About</h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: '#000000' }}>
                Passionate developer with expertise in AI/ML, backend development, and modern web technologies.
              </p>
            </div>
          </section>

          <section id="experience" className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: '#F6F6F6' }}>
            <div className="absolute inset-0 z-10">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div>
            <div className="text-center relative z-10">
              <h2 className="text-5xl font-bold mb-8" style={{ color: '#000000' }}>Experience</h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: '#000000' }}>
                Junior ML/AI Developer at Triangle Software Solutions
              </p>
            </div>
          </section>

          <section id="projects" className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#A2D5C6' }}>
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-8" style={{ color: '#000000' }}>Projects</h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: '#000000' }}>
                AI/ML Projects, Web Applications, 3D Visualizations
              </p>
            </div>
          </section>

          <section id="skills" className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F6F6F6' }}>
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-8" style={{ color: '#000000' }}>Skills</h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: '#000000' }}>
                React, Python, TensorFlow, FastAPI, Machine Learning, AI
              </p>
            </div>
          </section>

          <section id="contact" className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#A2D5C6' }}>
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-8" style={{ color: '#000000' }}>Contact</h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: '#000000' }}>
                t.m.manukrishna@gmail.com
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Portfolio;