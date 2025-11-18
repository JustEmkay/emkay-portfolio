import React, { useState, useRef } from 'react';

const Timeline = () => {
  const timelineRef = useRef(null);
  const [activePhase, setActivePhase] = useState(null);

  const timelineData = [
    {
      id: 1,
      date: "2015",
      phase: "Beginning",
      title: "2D Animation Certification",
      description: "Completed 2D animation certification in Micromedia Flash (Adobe Animate). Learned about 2D animation, simple flash animation, and HTML for the first time.",
      skills: ["2D Animation", "Flash Animation", "HTML Basics"],
      techStack: ["Adobe Animate", "HTML"]
    },
    {
      id: 2,
      date: "2016", 
      phase: "Hardware Training",
      title: "C-DIT Hardware Training",
      description: "Completed C-DIT hardware training. Learned about PC hardware and how to build PCs.",
      skills: ["PC Hardware", "Computer Assembly", "Hardware Troubleshooting"],
      techStack: ["PC Hardware"]
    },
    {
      id: 3,
      date: "2018",
      phase: "Programming Start", 
      title: "Programming Fundamentals",
      description: "Started learning about programming. Explored C, C++, HTML, SQL, and CSS.",
      skills: ["Programming Fundamentals", "C Programming", "C++", "SQL", "CSS"],
      techStack: ["C", "C++", "HTML", "SQL", "CSS"]
    },
    {
      id: 4,
      date: "2020",
      phase: "Web Development",
      title: "Blender3D & E-commerce Project",
      description: "Learned to use Blender3D as part of learning how to build a game. Built an e-commerce application for PC hardware and Custom PC (first web application project) using Laravel, MySQL, HTML, and Bootstrap CDN as a mini project. Learned about MVC architecture and CRUD operations.",
      skills: ["3D Modeling", "Web Development", "MVC Architecture", "CRUD Operations", "E-commerce"],
      techStack: ["Blender3D", "Laravel", "MySQL", "HTML", "Bootstrap"]
    },
    {
      id: 5,
      date: "2021",
      phase: "Game Development", 
      title: "Astro Mania - 2D Game",
      description: "Worked on Unity + Blender + Aseprite for development of 2D game called Astro Mania as part of final year project of BSc Computer Science.",
      skills: ["Game Development", "2D Game Design", "Unity Development", "3D Modeling"],
      techStack: ["Unity", "Blender", "Aseprite"]
    },
    {
      id: 6,
      date: "2022",
      phase: "Full Stack Development",
      title: "Note Management Application",
      description: "In first year of MCA, made a note management application using React + Node + Redis. Learned about TailwindCSS. First time using in-memory database.",
      skills: ["Full Stack Development", "React Development", "Backend Development", "In-Memory Database"],
      techStack: ["React", "Node.js", "Redis", "TailwindCSS"]
    },
    {
      id: 7,
      date: "2023",
      phase: "Machine Learning",
      title: "ML Internship at iDatalytics",
      description: "As part of final year ML project, joined internship at iDatalytics. Learned to use PowerBI, Flask, Streamlit, TensorFlow, Keras, OpenCV, and SQLite using Python. Learned and worked with ML concepts such as Data Collection, Data Preparation, Model Selection, Model Training, and Model Evaluation. Annotated and trained CNN object detection model and worked with COCO model for image recognition as part of final year main project.",
      skills: ["Machine Learning", "Data Collection", "Data Preparation", "Model Training", "Model Evaluation", "CNN", "Object Detection", "Image Recognition"],
      techStack: ["Python", "PowerBI", "Flask", "Streamlit", "TensorFlow", "Keras", "OpenCV", "SQLite"]
    },
    {
      id: 8,
      date: "2024",
      phase: "AI & LLMs",
      title: "LLM Chatbot Pipelines",
      description: "Learned to use open source LLM with Streamlit, Ollama, and HuggingFace. Developed LLM chatbot pipelines.",
      skills: ["LLM Integration", "Chatbot Development", "Open Source AI", "NLP Pipelines"],
      techStack: ["Streamlit", "Ollama", "HuggingFace", "LLM"]
    },
    {
      id: 9,
      date: "2025",
      phase: "Professional AI/ML",
      title: "Jr. AI/ML Developer at Triangle Software Solutions",
      description: "Joined work at Triangle Software Solutions as Jr. AI/ML Developer. Learned to develop RAG-based chatbots using LangChain and VectorDB. Learned to write agentic pipelines using LangChain and Pydantic-AI. Learned basics of hosting and managing projects on AWS. Got proper understanding of REST API and WebSockets. Worked in backend of projects using FastAPI, PostgreSQL, Supabase. Started using tools such as Cursor.ai, Stitch, and MCPs.",
      skills: ["RAG Development", "Agentic Pipelines", "AWS Hosting", "REST API", "WebSockets", "Backend Development", "Vector Databases"],
      techStack: ["LangChain", "VectorDB", "Pydantic-AI", "AWS", "FastAPI", "PostgreSQL", "Supabase", "Cursor.ai", "Stitch", "MCPs"]
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