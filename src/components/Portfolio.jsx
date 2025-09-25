import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import StaggeredMenu from "./StaggeredMenu";
import Lanyard from "./Lanyard";
import ModelViewer from "./ModelViewer";
import ScrambledText from "./ScrambledText";
import LiquidEther from "./LiquidEther";
import Timeline from "./Timeline";
import InfiniteMenu from "./InfiniteMenu";
import myProfile from "../assets/pictures/my-profile.png";
import myProfileNoBg from "../assets/pictures/my-profile-bg-removed.png";
import projectImage from "../assets/marek-piwnicki-unsplash.jpg";
import cardModel from "../assets/3D/untitled.glb";
import lanyardTexture from "../assets/lanyard/lanyard.png";
const Portfolio = () => {
  const [showMainPage, setShowMainPage] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const blackScreenRef = useRef(null);
  const mainPageRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    // Initial black screen animation
    const tl = gsap.timeline();

    tl.to(blackScreenRef.current, {
      duration: 2,
      opacity: 1,
      ease: "power2.out",
    }).to(
      blackScreenRef.current,
      {
        duration: 1.5,
        opacity: 0,
        ease: "power2.inOut",
        onComplete: () => {
          setShowMainPage(true);
        },
      },
      "+=1"
    );
  }, []);

  useEffect(() => {
    if (showMainPage) {
      // Main page entrance animation
      gsap.fromTo(
        mainPageRef.current,
        { opacity: 0, y: 50 },
        {
          duration: 1.5,
          opacity: 1,
          y: 0,
          ease: "power3.out",
        }
      );

      // Name animation
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, scale: 0.8 },
        {
          duration: 1.2,
          opacity: 1,
          scale: 1,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
    }
  }, [showMainPage]);

  const menuItems = [
    { label: "About", ariaLabel: "Learn about Manukrishna", link: "#about" },
    {
      label: "Experience",
      ariaLabel: "View work experience",
      link: "#experience",
    },
    {
      label: "Projects",
      ariaLabel: "See portfolio projects",
      link: "#projects",
    },
    { label: "Skills", ariaLabel: "View technical skills", link: "#skills" },
    { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com/JustEmkay/" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/manukrishna-t-m/" },
    { label: "Email", link: "mailto:t.m.manukrishna@gmail.com" },
  ];

  const experiences = [
    {
      id: 1,
      company: "Triangle Software Solutions",
      position: "Junior ML/AI Developer",
      description:
        "My first job in started as a junior ML/AI developer.Worked on realtime AI assistant for company product. Mastered Prompt engineering and data pipeline implementation for realtime ai assistant",
      duration: "2025 - Present",
      location: "Remote",
      startDate: "January 2025",
      endDate: "Present",
      learned:
        "Learned about LLMs, Prompt engineering, data pipeline implementation, Langchain, RAG pipeline, OpenAI,FastAPI, Chromadb",
      occupation: "Junior ML/AI Developer(backend)",
      url: "https://trianglesoftwaresolutions.com",
    },
    {
      id: 2,
      company: "iDatalytics",
      position: "ML/AI Intern",
      description:
        "Got hands-on experience in machine learning and artificial intelligence, Did my first project in machine learning project. Learned about deeplearning, computer vision, and natural language processing",
      duration: "2023 - 2023",
      location: "Kochi, Infopark",
      startDate: "June 2023",
      endDate: "Sep 2023",
      learned:
        "Streamlit, tensorflow, opencv, nltk, powerbi, pytorch, CNN, NLP, flask",
      occupation: "Full-Stack Developer",
      url: "https://www.idatalytics.com/",
    },
    {
      id: 3,
      company: "Freelancing for multiple clients",
      position: "Freelancing",
      description:
        "Freelancing to design UI/UX, logos, posters(instagram posts), and other designs",
      duration: "2020 - 2021",
      location: "Remote",
      startDate: "2020",
      endDate: "2021",
      learned: "Learned to design UI/UX, logos, posters, and other designs",
      occupation: "freelancer",
      url: null,
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Parking Space detection System using CNN",
      description:
        "Centeralized Parking Space detection System using CNN and OpenCV",
      technologies: ["Flask", "TensorFlow", "Streamlit", "OpenCV"],
      github: "https://github.com/JustEmkay/SpotDash",
      live: null,
      image: "https://picsum.photos/900/900?random=1",
    },
    {
      id: 2,
      title: "Experiment-VoiceAssistant-LLM",
      description:
        "Done this project to experiment with LLM and Voice Assistant",
      technologies: ["Python", "Ollama", "STT", "TTS", "Streamlit"],
      github: "https://github.com/JustEmkay/Experiment-VoiceAssistant-LLM",
      live: null,
      image: "https://picsum.photos/900/900?random=2",
    },
    {
      id: 3,
      title: "Project Management Application (Take-Home-Challenge)",
      description:
        "This project is a web-based application for managing projects and tasks (todos) as the part of Recruitment process of Hatio Innovations Private Limited . Users can create projects, manage todos, and export project summaries as GitHub gists or markdown files.",
      technologies: ["FastAPI", "SQLite", "Streamlit", "GitHub"],
      github: "https://github.com/JustEmkay/Hatio-Take-Home-Challenge",
      live: null,
      image: "https://picsum.photos/900/900?random=3",
    },
  ];

  // Transform projects for InfiniteMenu
  const infiniteMenuItems = projects.map(project => ({
    image: project.image || 'https://picsum.photos/900/900?random=' + project.id,
    link: project.github,
    title: project.title,
    description: project.description
  }));

  // Debug: Log the items being passed to InfiniteMenu
  console.log('InfiniteMenu items:', infiniteMenuItems);

  const models3D = [
    {
      id: 1,
      title: "Character Model",
      description: "Low-poly character model created in Blender",
      modelUrl: cardModel,
      thumbnail: lanyardTexture,
    },
    {
      id: 2,
      title: "Environment Scene",
      description: "3D environment scene with lighting and materials",
      modelUrl: cardModel,
      thumbnail: lanyardTexture,
    },
  ];

  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Staggered Menu Overlay */}
      <StaggeredMenu
        position="right"
        colors={["#A2D5C6", "#CFFFE2", "#F6F6F6"]}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        logoUrl={myProfile}
        menuButtonColor="#CFFFE2"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        accentColor="#A2D5C6"
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />

      {/* Namaskāram Welcome Message */}
      {!showMainPage && (
        <div
          ref={blackScreenRef}
          className="fixed inset-0 flex items-center justify-center z-30"
          style={{
            opacity: 0,
            background: "linear-gradient(135deg, #000000 0%, #A2D5C6 100%)",
          }}
        >
          <div className="text-center">
            <h1
              className="text-6xl font-bold tracking-wider mb-4"
              style={{ color: "#CFFFE2" }}
            >
              Namaskāram
            </h1>
            <p className="text-xl" style={{ color: "#F6F6F6" }}>
              Welcome to my portfolio
            </p>
          </div>
        </div>
      )}

      {/* Main Page */}
      {showMainPage && (
        <div
          ref={mainPageRef}
          className="min-h-screen relative"
          style={{ opacity: 0, backgroundColor: "#000000" }}
        >
          {/* Main Content */}
          <div className="flex items-center justify-center min-h-screen px-8 relative">
            {/* LiquidEther Background */}
            <div className="absolute inset-0 z-0">
              <LiquidEther
                colors={["#A2D5C6", "#CFFFE2", "#F6F6F6"]}
                mouseForce={15}
                cursorSize={80}
                resolution={0.6}
                autoDemo={true}
                autoSpeed={0.3}
                autoIntensity={1.5}
                className="w-full h-full"
              />
            </div>
            
            <div className="text-center relative z-10">
              <h1
                ref={nameRef}
                className="text-8xl md:text-9xl font-black mb-8 tracking-tight"
                style={{ opacity: 0, color: "#CFFFE2" }}
              >
                MANUകൃഷ്ണ T.M
              </h1>
              <p
                className="text-xl max-w-2xl mx-auto"
                style={{ color: "#F6F6F6" }}
              >
                Junior AI/Backend Developer passionate about creating innovative
                solutions
              </p>
            </div>
          </div>

          {/* Sections for smooth scrolling */}
          <section
            id="about"
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#A2D5C6" }}
          >
            <div className="container mx-auto px-8">
              <div className="flex items-center justify-center gap-12 max-w-6xl">
                {/* Profile Picture - Left Side */}
                <div className="flex-shrink-0">
                  <img
                    src={myProfileNoBg}
                    alt="Manukrishna T.M Profile"
                    className="w-80 h-80 object-cover"
                  />
                </div>

                {/* About Description - Right Side */}
                <div className="flex-1 text-left">
                  <ScrambledText
                    radius={150}
                    duration={1.5}
                    speed={0.3}
                    scrambleChars=".:!@#$%^&*()"
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ color: "#000000" }}
                  >
                    Hello, I’m <i className="font-[1000]">Manukrishna T.M</i>, a <b>{new Date().getFullYear() - 2000}</b>-year-old developer based in Kochi. I currently work as a
                    Backend Developer and ML/AI Engineer at a startup, where I
                    mostly code in Python and build APIs using FastAPI and
                    Flask.
                    <br />
                    I’m a naturally curious person — I love asking “why does
                    this work like that?” and experimenting with different
                    approaches. Along the way, I’ve tried, failed, and learned
                    from many projects, which keeps fueling my growth as a
                    developer.
                    <br />
                    <p>My philosophy in development is simple:
                    <br />
                    <i className="font-bold">“let it exist first.”</i> Even if
                    I’m new to a topic, I dive in, learn, and build something
                    real. For me, every challenge is a chance to experiment,
                    explore, and create.</p>
                  </ScrambledText>
                </div>
              </div>
            </div>
          </section>

          <section
            id="experience"
            className="min-h-screen relative"
            style={{ backgroundColor: "#F6F6F6" }}
          >
            {/* Company Title Background */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="text-center opacity-30">
                <h1
                  className="text-9xl font-black tracking-wider"
                  style={{ color: "#A2D5C6" }}
                >
                  TRIANGLE SOFTWARE SOLUTIONS
                </h1>
              </div>
            </div>

            {/* 3D Lanyard - Full Screen */}
            <div className="absolute inset-0 z-0">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div>

            {/* Section Title */}
            <div className="absolute top-8 left-8 z-20">
              <h2
                className="text-4xl font-bold mb-2"
                style={{ color: "#000000" }}
              >
                Experience
              </h2>
              <p className="text-lg" style={{ color: "#000000" }}>
                Click on cards to explore details
              </p>
            </div>

            {/* Right Side - Vertical Experience Cards */}
            <div className="absolute top-8 right-8 z-20 w-96 max-h-[calc(100vh-4rem)] overflow-y-auto experience-scrollbar">
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="cursor-pointer transition-all duration-500 ease-in-out"
                    onClick={() =>
                      setSelectedCompany(
                        selectedCompany?.id === exp.id ? null : exp
                      )
                    }
                  >
                    {/* Main Card */}
                    <div
                      className="bg-white rounded-xl shadow-lg border-2 transition-all duration-500 hover:shadow-2xl overflow-hidden"
                      style={{
                        borderColor:
                          selectedCompany?.id === exp.id
                            ? "#A2D5C6"
                            : "transparent",
                        backgroundColor:
                          selectedCompany?.id === exp.id ? "#F6F6F6" : "white",
                        transform:
                          selectedCompany?.id === exp.id
                            ? "scale(1.02)"
                            : "scale(1)",
                      }}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3
                              className="text-lg font-bold mb-2"
                              style={{ color: "#000000" }}
                            >
                              {exp.company}
                            </h3>
                            <p
                              className="text-sm font-semibold mb-2"
                              style={{ color: "#A2D5C6" }}
                            >
                              {exp.position}
                            </p>
                            <p
                              className="text-xs mb-3"
                              style={{ color: "#666" }}
                            >
                              {exp.duration} • {exp.location}
                            </p>
                            <p
                              className="text-xs leading-relaxed"
                              style={{ color: "#000000" }}
                            >
                              {exp.description}
                            </p>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                                selectedCompany?.id === exp.id
                                  ? "rotate-180"
                                  : ""
                              }`}
                              style={{ backgroundColor: "#A2D5C6" }}
                            >
                              <svg
                                className="w-3 h-3"
                                style={{ color: "#000000" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedCompany?.id === exp.id && (
                        <div className="border-t border-gray-200 bg-white">
                          <div className="p-4">
                            <div className="space-y-4">
                              <div>
                                <h4
                                  className="text-sm font-semibold mb-2"
                                  style={{ color: "#000000" }}
                                >
                                  Key Details
                                </h4>
                                <div className="space-y-2">
                                  <div>
                                    <span
                                      className="font-medium text-xs"
                                      style={{ color: "#A2D5C6" }}
                                    >
                                      Duration:
                                    </span>
                                    <p
                                      className="text-xs mt-1"
                                      style={{ color: "#000000" }}
                                    >
                                      {exp.startDate} - {exp.endDate}
                                    </p>
                                  </div>
                                  <div>
                                    <span
                                      className="font-medium text-xs"
                                      style={{ color: "#A2D5C6" }}
                                    >
                                      Role:
                                    </span>
                                    <p
                                      className="text-xs mt-1"
                                      style={{ color: "#000000" }}
                                    >
                                      {exp.occupation}
                                    </p>
                                  </div>
                                  {exp.url && (
                                    <div>
                                      <span
                                        className="font-medium text-xs"
                                        style={{ color: "#A2D5C6" }}
                                      >
                                        Website:
                                      </span>
                                      <p className="text-xs mt-1">
                                        <a
                                          href={exp.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                          Visit Company
                                        </a>
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4
                                  className="text-sm font-semibold mb-2"
                                  style={{ color: "#000000" }}
                                >
                                  What I Learned
                                </h4>
                                <p
                                  className="text-xs leading-relaxed"
                                  style={{ color: "#000000" }}
                                >
                                  {exp.learned}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="projects"
            className="min-h-screen"
            style={{ backgroundColor: "#A2D5C6" }}
          >
            
              <InfiniteMenu items={infiniteMenuItems} />
            
          </section>

          <section
            id="skills"
            className="min-h-screen py-20"
            style={{ backgroundColor: "#F6F6F6" }}
          >
            <Timeline />
          </section>

          <section
            id="contact"
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#A2D5C6" }}
          >
            <div className="text-center">
              <h2
                className="text-5xl font-bold mb-8"
                style={{ color: "#000000" }}
              >
                Contact
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{ color: "#000000" }}
              >
                t.m.manukrishna@gmail.com
              </p>
              <p className="font-italics">Thanks</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
