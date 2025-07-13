import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minus, Square, User, Image } from 'lucide-react';
import backgroundImage from '../assets/marek-piwnicki-unsplash.jpg';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in DraggableResizableWindow", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong with the window.</h1>;
    }
    return this.props.children;
  }
}

const DraggableResizableWindow = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
  children,
  isMaximized,
  position,
  size,
  onPositionChange,
  onSizeChange,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      onPositionChange({ x: newX, y: newY });
    }
    
    if (isResizing && resizeDirection) {
      const rect = windowRef.current.getBoundingClientRect();
      const minWidth = 300;
      const minHeight = 200;
      const maxWidth = window.innerWidth - 50;
      const maxHeight = window.innerHeight - 100;
      
      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;
      
      switch (resizeDirection) {
        case 'e':
          newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX - rect.left));
          break;
        case 'w':
          const newLeft = e.clientX;
          newWidth = Math.max(minWidth, Math.min(maxWidth, rect.right - e.clientX));
          newX = Math.min(newLeft, rect.right - minWidth);
          break;
        case 's':
          newHeight = Math.max(minHeight, Math.min(maxHeight, e.clientY - rect.top));
          break;
        case 'n':
          const newTop = e.clientY;
          newHeight = Math.max(minHeight, Math.min(maxHeight, rect.bottom - e.clientY));
          newY = Math.min(newTop, rect.bottom - minHeight);
          break;
        case 'se':
          newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX - rect.left));
          newHeight = Math.max(minHeight, Math.min(maxHeight, e.clientY - rect.top));
          break;
        case 'sw':
          const newLeftSW = e.clientX;
          newWidth = Math.max(minWidth, Math.min(maxWidth, rect.right - e.clientX));
          newHeight = Math.max(minHeight, Math.min(maxHeight, e.clientY - rect.top));
          newX = Math.min(newLeftSW, rect.right - minWidth);
          break;
        case 'ne':
          newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX - rect.left));
          const newTopNE = e.clientY;
          newHeight = Math.max(minHeight, Math.min(maxHeight, rect.bottom - e.clientY));
          newY = Math.min(newTopNE, rect.bottom - minHeight);
          break;
        case 'nw':
          const newLeftNW = e.clientX;
          const newTopNW = e.clientY;
          newWidth = Math.max(minWidth, Math.min(maxWidth, rect.right - e.clientX));
          newHeight = Math.max(minHeight, Math.min(maxHeight, rect.bottom - e.clientY));
          newX = Math.min(newLeftNW, rect.right - minWidth);
          newY = Math.min(newTopNW, rect.bottom - minHeight);
          break;
      }
      
      onSizeChange({ width: newWidth, height: newHeight });
      if (newX !== position.x || newY !== position.y) {
        onPositionChange({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };

  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset]);

  if (isMaximized) {
    return (
      <div
        className={`absolute bg-gray-100 border border-gray-300 shadow-xl rounded-none ${className}`}
        style={{
          top: 0,
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 48px)',
          zIndex: 20,
        }}
      >
        <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">{title}</span>
          <div className="flex space-x-2 window-controls" style={{ marginRight: 10, marginLeft: 10 }}>
            <button
              onClick={onMinimize}
              className="w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded flex items-center justify-center transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={onMaximize}
              className="w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded flex items-center justify-center transition-colors"
            >
              <Square className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
        <div className="relative h-full overflow-hidden">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-gray-100 border border-gray-300 rounded-xl shadow-xl overflow-hidden flex flex-col ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: 20,
        cursor: isDragging ? 'grabbing' : 'default',
        margin: 8
      }}
    >
      <div 
        className="title-bar px-4 py-2 flex items-center justify-between cursor-move select-none rounded-t-xl flex-shrink-0"
        onMouseDown={handleMouseDown}
        style={{ margin: 0 }}
      >
        <span className="text-sm font-medium text-gray-800">{title}</span>
        <div className="flex space-x-2 window-controls" style={{ marginRight: 10, marginLeft: 10 }}>
          <button
            onClick={onMinimize}
            className="w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded flex items-center justify-center transition-colors"
            style={{ margin:1 }}
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded flex items-center justify-center transition-colors"
            style={{ margin:1 }}
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
            style={{ margin:1 }}
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
      {/* Resize handles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeStart(e, 'nw')}
        />
        <div 
          className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeStart(e, 'ne')}
        />
        <div 
          className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeStart(e, 'sw')}
        />
        <div 
          className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeStart(e, 'se')}
        />
        <div 
          className="absolute top-0 left-2 right-2 h-1 cursor-n-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeStart(e, 'n')}
        />
        <div 
          className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeStart(e, 's')}
        />
        <div 
          className="absolute top-2 bottom-2 left-0 w-1 cursor-w-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeStart(e, 'w')}
        />
        <div 
          className="absolute top-2 bottom-2 right-0 w-1 cursor-e-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeStart(e, 'e')}
        />
      </div>
      <div className="relative flex-1 w-full overflow-hidden flex flex-col">{children}</div>
    </div>
  );
};

const Windows10Portfolio = () => {
  const [time, setTime] = useState(new Date());
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [terminalContent, setTerminalContent] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [imageViewerMinimized, setImageViewerMinimized] = useState(false);
  const [terminalMaximized, setTerminalMaximized] = useState(false);
  const [imageViewerMaximized, setImageViewerMaximized] = useState(false);
  const terminalRef = useRef(null);

  const [terminalPosition, setTerminalPosition] = useState({ x: 100, y: 100 });
  const [terminalSize, setTerminalSize] = useState({ width: 700, height: 500 });
  const [imageViewerPosition, setImageViewerPosition] = useState({ x: 150, y: 150 });
  const [imageViewerSize, setImageViewerSize] = useState({ width: 600, height: 500 });

  const portfolioData = {
    name: "Manukrishna T.M",
    title: "Junior AI/Backend Developer",
    email: "t.m.manukrishna@gmail.com",
    phone: "+91 (Contact for phone)",
    location: "Kochi, Ernakulam, Kerala, India",
    linkedin: "https://www.linkedin.com/in/manukrishna-t-m/",
    skills: [
      "React", "Vite", "Streamlit", "FastAPI", "Flask", "Node.js", 
      "React Three Fiber", "TensorFlow", "PyTorch", "LangChain", 
      "LangGraph", "Ollama", "Hugging Face", "OpenCV",
      "Redis", "SQLite", "PostgreSQL", "ChromaDB", "FAISS",
      "VS Code", "Cursor", "Blender 3D", "Jupyter Notebook"
    ],
    experience: [
      { 
        company: "Triangle Software Solutions", 
        role: "Junior ML/AI Developer", 
        duration: "June 2025 - Present",
        location: "Kothamangalam, Kerala",
        link: "https://trianglesoftwaresolutions.com/"
      },
      { 
        company: "iDatalytics", 
        role: "AI/Machine Learning and Data Science Intern", 
        duration: "June 2023 - September 2023",
        location: "Infopark, Kochi, Kerala",
        link: "https://www.idatalytics.com/"
      },
    ],
    projects: [
      { name: "AI/ML Projects", tech: "TensorFlow, PyTorch, LangChain, OpenCV" },
      { name: "Web Applications", tech: "React, Vite, FastAPI, Flask" },
      { name: "3D Visualization", tech: "React Three Fiber, Blender 3D" },
      { name: "Data Science", tech: "Streamlit, Jupyter Notebook, PostgreSQL" },
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalOpen && terminalContent.length === 0) {
      setTerminalContent([
        { type: 'system', text: 'Windows PowerShell Portfolio Terminal' },
        { type: 'system', text: 'Type "help" for available commands.' },
        { type: 'prompt', text: 'PS C:\\Portfolio> ' },
      ]);
    }
  }, [terminalOpen, terminalContent.length]);

  const handleCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    let response = '';

    switch (cmd) {
      case 'help':
        response = `Available commands:
  portfolio - Show portfolio details
  skills - Show technical skills
  experience - Show work experience
  projects - Show projects
  contact - Show contact information
  clear - Clear terminal
  help - Show this help message`;
        break;
      case 'portfolio':
        response = `=== ${portfolioData.name} - ${portfolioData.title} ===
Location: ${portfolioData.location}
Email: ${portfolioData.email}
Phone: ${portfolioData.phone}

A passionate full-stack developer with expertise in modern web technologies.
Type 'skills', 'experience', or 'projects' for more details.`;
        break;
      case 'skills':
        response = `Technical Skills:
${portfolioData.skills.map(skill => `• ${skill}`).join('\n')}`;
        break;
      case 'experience':
        response = `Work Experience:
${portfolioData.experience.map(exp => `• ${exp.role} at ${exp.company} (${exp.duration})`).join('\n')}`;
        break;
      case 'projects':
        response = `Recent Projects:
${portfolioData.projects.map(project => `• ${project.name} - ${project.tech}`).join('\n')}`;
        break;
      case 'contact':
        response = `Contact Information:
Email: ${portfolioData.email}
Phone: ${portfolioData.phone}
Location: ${portfolioData.location}
LinkedIn: ${portfolioData.linkedin}`;
        break;
      case 'clear':
        setTerminalContent([
          { type: 'system', text: 'Windows PowerShell Portfolio Terminal' },
          { type: 'system', text: 'Type "help" for available commands.' },
          { type: 'prompt', text: 'PS C:\\Portfolio> ' },
        ]);
        return;
      case '':
        setTerminalContent(prev => [...prev, { type: 'prompt', text: 'PS C:\\Portfolio> ' }]);
        return;
      default:
        response = `'${command}' is not recognized as a command. Type 'help' for available commands.`;
    }

    setTerminalContent(prev => [
      ...prev.slice(0, -1),
      { type: 'command', text: `PS C:\\Portfolio> ${command}` },
      { type: 'response', text: response },
      { type: 'prompt', text: 'PS C:\\Portfolio> ' },
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalContent]);

  const DesktopIcon = ({ icon: Icon, label, onClick }) => (
    <div
      className="flex flex-col items-center p-4 m-4 cursor-pointer hover:border-1 hover:border-transparent hover:bg-opacity-20 rounded-lg transition-colors duration-200"
      style={{ minWidth: 100, padding:10 }}
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-2 shadow">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-white text-xs text-center font-medium drop-shadow-lg mt-1" style={{ wordBreak: 'break-word' }}>{label}</span>
    </div>
  );

  return (
    <div className="h-screen w-screen relative overflow-hidden" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

    {/* descktop icons */}
      <div className="absolute top-8 left-8 space-y-6 z-10 flex flex-col gap-5 items-start">
        <DesktopIcon
          icon={Terminal}
          label="PowerShell"
          onClick={() => {
            setTerminalOpen(true);
            setTerminalMinimized(false);
          }}
        />
        <DesktopIcon
          icon={User}
          label="profile-pic.png"
          onClick={() => {
            setImageViewerOpen(true);
            setImageViewerMinimized(false);
          }}
        />
      </div>
    {/* taskbar icons*/}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-black bg-opacity-80 backdrop-blur-sm border-t border-gray-600 flex items-center justify-between px-8 z-30" style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10 }}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center shadow mr-2">
            <div className="w-5 h-5 bg-white rounded-sm"></div>
          </div>
          {(terminalOpen || terminalMinimized) && (
            <div
              className={`px-4 py-2 text-white text-xs rounded cursor-pointer transition-colors shadow ${
                terminalMinimized ? 'bg-gray-600' : 'bg-gray-700'
              }`}
              onClick={() => {
                setTerminalMinimized(!terminalMinimized);
                setTerminalOpen(true);
              }}
              style={{ marginRight: 8, marginLeft:15, padding: 10 }}
            >
              PowerShell
            </div>
          )}
          {(imageViewerOpen || imageViewerMinimized) && (
            <div
              className={`px-4 py-2 text-white text-xs rounded cursor-pointer transition-colors shadow ${
                imageViewerMinimized ? 'bg-gray-600' : 'bg-gray-700'
              }`}
              onClick={() => {
                setImageViewerMinimized(!imageViewerMinimized);
                setImageViewerOpen(true);
              }}
              style={{ marginRight: 8, marginLeft:2, padding: 10 }}
            >
              Photos
            </div>
          )}
        </div>
        <div className="text-white text-sm text-right pr-2">
          <div className="mb-1">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-xs">{time.toLocaleDateString()}</div>
        </div>
      </div>

      {terminalOpen && !terminalMinimized && (
        <ErrorBoundary>
          <DraggableResizableWindow
            title="Windows PowerShell"
            onClose={() => setTerminalOpen(false)}
            onMinimize={() => setTerminalMinimized(true)}
            onMaximize={() => setTerminalMaximized(!terminalMaximized)}
            isMaximized={terminalMaximized}
            position={terminalPosition}
            size={terminalSize}
            onPositionChange={setTerminalPosition}
            onSizeChange={setTerminalSize}
            className="z-20 p-2"
          >
            <div style={{ padding: 16 }} className="bg-blue-900 text-white w-full flex flex-col rounded-b-xl flex-1 min-h-0">
              <div ref={terminalRef} className="flex-1 min-h-0 overflow-y-auto text-sm font-mono pr-2">
                {terminalContent.map((item, index) => (
                  <div key={index} className="leading-relaxed mb-1">
                    {item.type === 'system' && <div className="text-gray-300 mb-1">{item.text}</div>}
                    {item.type === 'command' && <div className="text-white mb-1">{item.text}</div>}
                    {item.type === 'response' && (
                      <div className="text-gray-100 whitespace-pre-line mb-2">{item.text}</div>
                    )}
                    {item.type === 'prompt' && index === terminalContent.length - 1 && (
                      <div className="flex items-center text-yellow-300">
                        <span className="mr-1">{item.text}</span>
                        <input
                          type="text"
                          value={currentCommand}
                          onChange={(e) => setCurrentCommand(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 bg-transparent border-none outline-none text-white min-w-0 px-1 py-1"
                          autoFocus
                          style={{ marginLeft: 2 }}
                        />
                      </div>
                    )}
                    {item.type === 'prompt' && index !== terminalContent.length - 1 && (
                      <div className="text-yellow-300 mb-1">{item.text}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </DraggableResizableWindow>
        </ErrorBoundary>
      )}

      {imageViewerOpen && !imageViewerMinimized && (
        <ErrorBoundary>
          <DraggableResizableWindow
            title="Photos - profile-pic.png"
            onClose={() => setImageViewerOpen(false)}
            onMinimize={() => setImageViewerMinimized(true)}
            onMaximize={() => setImageViewerMaximized(!imageViewerMaximized)}
            isMaximized={imageViewerMaximized}
            position={imageViewerPosition}
            size={imageViewerSize}
            onPositionChange={setImageViewerPosition}
            onSizeChange={setImageViewerSize}
            className="z-20 p-0"
          >
            <div className="bg-gray-900 p-8 h-full flex items-center justify-center overflow-auto rounded-b-lg">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-sm flex flex-col items-center border border-white/20">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-500/50 animate-pulse"></div>
                  <User className="w-16 h-16 text-white relative z-10" />
                </div>
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{portfolioData.name}</h2>
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full">
                    {portfolioData.title}
                  </div>
                  <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    {portfolioData.location}
                  </p>
                  <div className="flex justify-center space-x-4 pt-4">
                    <a 
                      href={`mailto:${portfolioData.email}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      {portfolioData.email}
                    </a>
                    <a 
                      href={portfolioData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </DraggableResizableWindow>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Windows10Portfolio;