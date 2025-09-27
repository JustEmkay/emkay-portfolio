import React, { useState, useRef } from 'react';

const Timeline = () => {
  const timelineRef = useRef(null);
  const [activePhase, setActivePhase] = useState(null);

  const timelineData = [
    {
      id: 1,
      date: "January 15, 2023",
      phase: "Phase I",
      title: "HTML & CSS",
      description: "Started with web fundamentals, learned semantic HTML and responsive CSS design.",
      skills: ["HTML5", "CSS3", "Responsive Design"],
      techStack: ["HTML", "CSS"]
    },
    {
      id: 2,
      date: "March 30, 2023", 
      phase: "Phase II",
      title: "JavaScript Fundamentals",
      description: "Mastered JavaScript ES6+ features, DOM manipulation, and async programming.",
      skills: ["JavaScript", "DOM Manipulation", "Async/Await"],
      techStack: ["JavaScript", "ES6+"]
    },
    {
      id: 3,
      date: "June 15, 2023",
      phase: "Phase III", 
      title: "React Development",
      description: "Built interactive UIs with React, learned hooks, state management, and component lifecycle.",
      skills: ["React", "Component Architecture", "State Management"],
      techStack: ["React", "JSX", "Hooks"]
    },
    {
      id: 4,
      date: "September 1, 2023",
      phase: "Phase IV",
      title: "Backend Development",
      description: "Dove into server-side development with Node.js, Express, and database integration.",
      skills: ["Backend Development", "API Design", "Database Management"],
      techStack: ["Node.js", "Express", "MongoDB"]
    },
    {
      id: 5,
      date: "December 10, 2023",
      phase: "Phase V", 
      title: "Full Stack Integration",
      description: "Connected frontend and backend, learned about authentication and deployment.",
      skills: ["Full Stack Development", "Authentication", "Deployment"],
      techStack: ["MERN Stack", "JWT", "Heroku"]
    },
    {
      id: 6,
      date: "February 20, 2024",
      phase: "Phase VI",
      title: "Advanced Frontend",
      description: "Explored advanced React patterns, TypeScript, and modern build tools.",
      skills: ["TypeScript", "Advanced React", "Build Tools"],
      techStack: ["TypeScript", "Vite", "Webpack"]
    },
    {
      id: 7,
      date: "May 15, 2024",
      phase: "Phase VII",
      title: "Mobile Development",
      description: "Started mobile development with React Native and learned cross-platform development.",
      skills: ["Mobile Development", "Cross Platform", "UI/UX"],
      techStack: ["React Native", "Expo", "Android Studio"]
    },
    {
      id: 8,
      date: "August 1, 2024",
      phase: "Phase VIII",
      title: "Cloud & DevOps",
      description: "Learned cloud services, containerization, and CI/CD pipelines for scalable applications.",
      skills: ["Cloud Computing", "DevOps", "Containerization"],
      techStack: ["AWS", "Docker", "GitHub Actions"]
    },
    {
      id: 9,
      date: "October 12, 2024",
      phase: "Phase IX",
      title: "AI & Machine Learning",
      description: "Explored AI integration, machine learning basics, and modern AI tools for development.",
      skills: ["AI Integration", "Machine Learning", "Prompt Engineering"],
      techStack: ["Python", "TensorFlow", "OpenAI API"]
    },
    {
      id: 10,
      date: "December 25, 2024",
      phase: "Phase X",
      title: "Advanced Architectures",
      description: "Mastered microservices, system design, and scalable application architectures.",
      skills: ["System Design", "Microservices", "Performance Optimization"],
      techStack: ["Kubernetes", "Redis", "GraphQL"]
    }
  ];

  // Extract unique skills and tech stacks
  const allSkills = [...new Set(timelineData.flatMap(item => item.skills))];
  const allTechStacks = [...new Set(timelineData.flatMap(item => item.techStack))];

  const scrollToPhase = (skillOrTech) => {
    const targetPhase = timelineData.find(item => 
      item.skills.includes(skillOrTech) || item.techStack.includes(skillOrTech)
    );
    
    if (targetPhase && timelineRef.current) {
      setActivePhase(targetPhase.id);
      const phaseElement = document.getElementById(`phase-${targetPhase.id}`);
      if (phaseElement) {
        phaseElement.scrollIntoView({ 
          behavior: 'smooth', 
          inline: 'center',
          block: 'nearest'
        });
      }
      
      // Remove highlight after 3 seconds
      setTimeout(() => setActivePhase(null), 3000);
    }
  };

  const MarqueeItem = ({ text, onClick, type }) => (
    <span 
      onClick={() => onClick(text)}
      className={`inline-block mx-4 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${
        type === 'skill' 
          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
          : 'bg-green-100 text-green-800 hover:bg-green-200'
      }`}
    >
      {text}
    </span>
  );

  return (
    <div className="w-full max-w-full">
      <div className="">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Learning Timeline
        </h1>
        
        {/* Skills Marquee */}
        <div className="mb-8 rounded-lg p-4 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Skills</h2>
          <div className="relative">
            <div className="animate-marquee-right hover:animate-none flex whitespace-nowrap">
              {[...allSkills, ...allSkills].map((skill, index) => (
                <MarqueeItem 
                  key={`skill-${index}`} 
                  text={skill} 
                  onClick={scrollToPhase} 
                  type="skill"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee */}
        <div className="mb-12 rounded-lg p-4 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Tech Stack</h2>
          <div className="relative">
            <div className="animate-marquee-left hover:animate-none flex whitespace-nowrap">
              {[...allTechStacks, ...allTechStacks].map((tech, index) => (
                <MarqueeItem 
                  key={`tech-${index}`} 
                  text={tech} 
                  onClick={scrollToPhase} 
                  type="tech"
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Timeline Container */}
        <div className="relative overflow-x-auto py-6 scrollbar-hide" ref={timelineRef}>
          {/* Scrollable Content */}
          <div className="flex items-center min-w-max px-4">
            {timelineData.map((item, index) => (
              <div key={item.id} className="flex items-center">
                {/* Timeline Item */}
                <div className="flex flex-col items-center relative">
                  {/* Dot */}                  
                  {/* Content Card */}
                  <div 
                    id={`phase-${item.id}`}
                    className={`bg-white rounded-lg shadow-md p-6 w-80 mx-4 transition-all duration-300 ${
                      activePhase === item.id 
                        ? 'ring-2 ring-blue-400 shadow-xl transform scale-105' 
                        : ''
                    }`}
                  >
                    <div className="text-sm text-gray-600 mb-2">{item.date}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.phase}</h3>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                    
                    {/* Skills Tags */}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-500 mb-2">Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {item.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tech Stack Tags */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-2">Tech Stack:</div>
                      <div className="flex flex-wrap gap-1">
                        {item.techStack.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Connecting Line */}
                {index < timelineData.length - 1 && (
                  <div className="w-32 h-0.5 bg-gray-900 -mt-20"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center mt-6">
            <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
              ← Scroll horizontally to explore timeline →
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
};

export default Timeline;