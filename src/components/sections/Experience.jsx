import React from 'react';




const Experience = () => {
  // Sample experience data
  const experiences = [
    {
      id: 1,
      role: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      duration: 'Jan 2022 - Present',
      description: 'Led the frontend development team in creating responsive web applications. Implemented modern UI/UX designs using React and Next.js. Improved site performance by 40% through code optimization.',
      achievements: [
        'Spearheaded the migration from legacy codebase to React, improving development efficiency by 30%',
        'Implemented CI/CD pipelines, reducing deployment time by 50%',
        'Mentored junior developers and conducted code reviews'
      ],
      logo: '🏢'
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'Digital Solutions LLC',
      duration: 'Mar 2019 - Dec 2021',
      description: 'Developed and maintained client websites and web applications. Collaborated with designers to implement responsive designs. Worked with RESTful APIs and state management.',
      achievements: [
        'Built 15+ responsive websites for various clients across different industries',
        'Reduced load time by 35% through image optimization and code splitting',
        'Implemented accessibility features, achieving WCAG 2.1 AA compliance'
      ],
      logo: '🏢'
    },
    {
      id: 3,
      role: 'Web Development Intern',
      company: 'StartUp Ventures',
      duration: 'Jun 2018 - Feb 2019',
      description: 'Assisted in the development of web applications. Learned modern web development practices and tools. Participated in team meetings and contributed to project planning.',
      achievements: [
        'Developed a responsive landing page that increased conversion rates by 15%',
        'Created reusable UI components that were adopted across multiple projects',
        'Collaborated with the design team to implement pixel-perfect designs'
      ],
      logo: '🏢'
    },
  ];

  return (
    <section style={{ backgroundColor: '#FF7F50' }}>
      <div className="section-content">
        <h2 className="section-title mb-8 md:mb-12">Work Experience</h2>
        
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            This is a placeholder for the work experience section. Here you can showcase your professional journey.
          </p>
        </div>
        
        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white bg-opacity-30"></div>
          
          {experiences.map((exp, index) => (
            <div key={exp.id} className="mb-12 md:mb-0">
              <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot for desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-orange-500"></div>
                
                {/* Content */}
                <div className="w-full md:w-5/12 mb-8 md:mb-0">
                  <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
                    {/* Mobile timeline dot */}
                    <div className="md:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-500 text-xl font-bold mb-4 mx-auto">
                      {exp.logo}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{exp.role}</h3>
                    <h4 className="text-lg md:text-xl mb-2">{exp.company}</h4>
                    <p className="text-sm md:text-base mb-4">{exp.duration}</p>
                    <p className="text-sm md:text-base mb-4">{exp.description}</p>
                    
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm md:text-base">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Spacer for desktop layout */}
                <div className="hidden md:block w-2/12"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Download Resume Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-white text-orange-500 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-colors duration-300 shadow-lg">
            Download Full Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;