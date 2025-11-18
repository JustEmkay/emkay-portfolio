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
import projectImage from "../assets/pictures/psd.png";
import projectImage2 from "../assets/pictures/eva.png";
import projectImage3 from "../assets/pictures/at.png";
import cardModel from "../assets/3D/untitled.glb";
import lanyardTexture from "../assets/lanyard/lanyard.png";
const Portfolio = () => {
  const [showMainPage, setShowMainPage] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [useOptimizedBackground, setUseOptimizedBackground] = useState(false);
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
    // Performance detection
    const detectPerformance = () => {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setUseOptimizedBackground(true);
        return;
      }

      // Check for low-end device indicators
      const isLowEnd =
        navigator.hardwareConcurrency <= 2 || // 2 or fewer CPU cores
        navigator.deviceMemory <= 4 || // 4GB or less RAM
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ); // Mobile devices

      setUseOptimizedBackground(isLowEnd);
    };

    detectPerformance();
  }, []);

  useEffect(() => {
    // Mobile device detection and alert
    const isMobileDevice = () => {
      return (
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        (window.innerWidth <= 768 && window.innerHeight <= 1024)
      );
    };

    // Check if user has already dismissed the alert in this session
    const hasSeenAlert = sessionStorage.getItem("mobileAlertDismissed");

    if (isMobileDevice() && !hasSeenAlert) {
      // Small delay to let the page load first
      setTimeout(() => {
        alert(
          "📱 Please switch to desktop mode, otherwise you'll understand why I'm a backend developer 😅"
        );
        sessionStorage.setItem("mobileAlertDismissed", "true");
      }, 1000);
    }
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
      image: projectImage,
    },
    {
      id: 2,
      title: "Experiment-VoiceAssistant-LLM",
      description:
        "Done this project to experiment with LLM and Voice Assistant",
      technologies: ["Python", "Ollama", "STT", "TTS", "Streamlit"],
      github: "https://github.com/JustEmkay/Experiment-VoiceAssistant-LLM",
      live: null,
      image: projectImage2,
    },
    {
      id: 3,
      title: "Agentic Task Management System",
      description:
        "This project is a agentic task management system for managing tasks and projects.",
      technologies: ["Streamlit", "pydantic-ai", "OpenAI"],
      github: "https://github.com/JustEmkay/m01",
      live: null,
      image: projectImage3,
    },
  ];

  // Transform projects for InfiniteMenu
  const infiniteMenuItems = projects.map((project) => ({
    image:
      project.image || "https://picsum.photos/900/900?random=" + project.id,
    link: project.github,
    title: project.title,
    description: project.description,
  }));

  // Debug: Log the items being passed to InfiniteMenu
  console.log("InfiniteMenu items:", infiniteMenuItems);

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
          <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 relative">
            {/* LiquidEther Background */}
            <div className="absolute inset-0 z-0">
              {useOptimizedBackground ? (
                // Fallback gradient background for low-end devices
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #A2D5C6 0%, #CFFFE2 50%, #F6F6F6 100%)",
                    animation: "gradientShift 8s ease-in-out infinite",
                  }}
                />
              ) : (
                <LiquidEther
                  colors={["#A2D5C6", "#CFFFE2", "#F6F6F6"]}
                  mouseForce={8}
                  cursorSize={60}
                  resolution={0.3}
                  autoDemo={true}
                  autoSpeed={0.2}
                  autoIntensity={1.0}
                  autoResumeDelay={2000}
                  className="w-full h-full"
                />
              )}
            </div>

            <div className="text-center relative z-10 px-4">
              <h1
                ref={nameRef}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 md:mb-8 tracking-tight break-words"
                style={{ opacity: 0, color: "#CFFFE2" }}
              >
                MANUകൃഷ്ണ T.M
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2"
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
            className="min-h-screen flex items-center justify-center py-12 sm:py-16"
            style={{ backgroundColor: "#A2D5C6" }}
          >
            <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">
                {/* Profile Picture - Left Side */}
                <div className="flex-shrink-0 w-full max-w-sm">
                  <img
                    src={myProfileNoBg}
                    alt="Manukrishna T.M Profile"
                    className="w-full h-auto max-h-80 object-contain"
                  />
                </div>

                {/* About Description - Right Side */}
                <div className="flex-1 text-left w-full">
                  <ScrambledText
                    radius={150}
                    duration={1.5}
                    speed={0.3}
                    scrambleChars=".:!@#$%^&*()"
                    className="text-base sm:text-lg lg:text-xl leading-relaxed space-y-4"
                    style={{ color: "#000000" }}
                  >
                    <p className="text-lg sm:text-xl font-semibold text-black">
                      Hello, I’m <i className="font-[1000]">Manukrishna T.M</i>,
                      a <b>{new Date().getFullYear() - 2000}</b>-year-old
                      developer based in Kochi.
                    </p>
                    <p>
                      I currently work as a Backend Developer and ML/AI Engineer
                      at a startup, where I mostly code in Python and build APIs
                      using FastAPI and Flask. I’m a naturally curious person —
                      I love asking “why does this work like that?” and
                      experimenting with different approaches. Along the way,
                      I’ve tried, failed, and learned from many projects, which
                      keeps fueling my growth as a developer.
                    </p>
                    <p className="font-medium">
                      My philosophy in development is simple:
                      <br />
                      <i className="font-bold">“let it exist first.”</i> Even if
                      I’m new to a topic, I dive in, learn, and build something
                      real. For me, every challenge is a chance to experiment,
                      explore, and create.
                    </p>
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
            className="min-h-screen h-screen"
            style={{ backgroundColor: "#A2D5C6" }}
          >
            <InfiniteMenu className="w-full h-full" items={infiniteMenuItems} />
          </section>

          <section
            id="skills"
            className="min-h-screen  py-20"
            style={{ backgroundColor: "#F6F6F6" }}
          >
            <Timeline className="h-screen" />
          </section>
          <footer class="bg-white lg:grid lg:grid-cols-5">
            {/* <div class="relative block h-32 lg:col-span-2 lg:h-full">
    <img src="../assets/pictures/footer-bg.png" alt="" class="absolute inset-0 h-full w-full object-cover">
  </div> */}

            <div class="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p>
                    <span class="text-xs tracking-wide text-gray-500 uppercase">
                      {" "}
                      Email me{" "}
                    </span>

                    <a
                      href="#"
                      class="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl"
                    >
                      t.m.manukrishna@gmail.com
                    </a>
                  </p>

                  {/* <ul class="mt-8 space-y-1 text-sm text-gray-700">
          <li>Monday to Friday: 10am - 5pm</li>
          <li>Weekend: 10am - 3pm</li>
        </ul> */}

                  <ul class="mt-8 flex gap-6">
                    {/* <li>
            <a href="#" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:opacity-75">
              <span class="sr-only">Instagram</span>

              <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </li>

          <li>
            <a href="#" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:opacity-75">
              <span class="sr-only">Twitter</span>

              <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          </li> */}

                    <li>
                      <a
                        href="https://github.com/JustEmkay"
                        rel="noreferrer"
                        target="_blank"
                        class="text-gray-700 transition hover:opacity-75"
                      >
                        <span class="sr-only">GitHub</span>

                        <svg
                          class="size-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.linkedin.com/in/manukrishna-t-m/"
                        rel="noreferrer"
                        target="_blank"
                        class="text-gray-700 transition hover:opacity-75"
                      >
                        <span class="sr-only">LinkedIn</span>
                        <svg
                          class="size-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-3.5 15h-2V9h2v8zm-1-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7.5 8h-2v-4c0-.55-.45-1-1-1s-1 .45-1 1v4h-2V9h2v1.5c.66-.99 1.99-1.5 2.5-1.5 2 0 3.5 1.5 3.5 4v4h-2z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mt-12 border-t border-gray-100 pt-12">
                <div class="sm:flex sm:items-center sm:justify-between">
                  <ul class="flex flex-wrap gap-4 text-xs">
                    <li>
                      <a
                        href="#"
                        class="text-gray-500 transition hover:opacity-75"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        class="text-gray-500 transition hover:opacity-75"
                      >
                        {" "}
                        Privacy Policy{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        class="text-gray-500 transition hover:opacity-75"
                      >
                        {" "}
                        Cookies{" "}
                      </a>
                    </li>
                  </ul>

                  <p class="mt-8 text-xs text-gray-500 sm:mt-0">
                    © 2025. Manukrishna T.M. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
          {/* <section
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
          </section> */}
        </div>
      )}

      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background: linear-gradient(
              135deg,
              #a2d5c6 0%,
              #cfffe2 50%,
              #f6f6f6 100%
            );
          }
          50% {
            background: linear-gradient(
              135deg,
              #cfffe2 0%,
              #f6f6f6 50%,
              #a2d5c6 100%
            );
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
