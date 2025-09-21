import React from 'react';

const TechStack = () => {
  // Sample tech stack data
  const techStacks = [
    {
      category: 'Languages',
      techs: [
        { name: 'JavaScript', icon: 'JS' },
        { name: 'TypeScript', icon: 'TS' },
        { name: 'Python', icon: 'PY' },
        { name: 'HTML5', icon: 'HTML' },
        { name: 'CSS3', icon: 'CSS' },
      ]
    },
    {
      category: 'Frameworks & Libraries',
      techs: [
        { name: 'React', icon: 'R' },
        { name: 'Next.js', icon: 'N' },
        { name: 'Node.js', icon: 'N' },
        { name: 'Express', icon: 'E' },
        { name: 'Tailwind CSS', icon: 'T' },
        { name: 'Material UI', icon: 'M' },
      ]
    },
    {
      category: 'Tools & Platforms',
      techs: [
        { name: 'Git', icon: 'G' },
        { name: 'GitHub', icon: 'GH' },
        { name: 'VS Code', icon: 'VS' },
        { name: 'Docker', icon: 'D' },
        { name: 'AWS', icon: 'AWS' },
        { name: 'Firebase', icon: 'FB' },
      ]
    },
  ];

  return (
    <section style={{ backgroundColor: '#FFD700' }}>
      <div className="section-content">
        <h2 className="section-title mb-8 md:mb-12 text-gray-900">Tech Stack</h2>
        
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-800">
            This is a placeholder for the tech stack section. Here you can showcase the technologies you work with.
          </p>
        </div>
        
        <div className="space-y-12">
          {techStacks.map((stack, stackIndex) => (
            <div key={stackIndex} className="bg-white bg-opacity-20 rounded-lg p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-900">{stack.category}</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {stack.techs.map((tech, techIndex) => (
                  <div key={techIndex} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg shadow-md flex items-center justify-center mb-2">
                      <span className="text-2xl md:text-3xl font-bold text-gray-800">{tech.icon}</span>
                    </div>
                    <span className="text-sm md:text-base font-medium text-gray-800">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;