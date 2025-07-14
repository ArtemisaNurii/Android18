import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const projects = [
  {
    title: "E-Commerce Platform Revamp",
    description: "Redesigned and optimized for performance, this e-commerce platform delivers seamless shopping experiences and drives higher conversion rates.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking solution with real-time transaction tracking, biometric authentication, and AI-driven financial insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Real-Time Analytics Dashboard",
    description: "Interactive dashboard providing live data visualizations and custom reporting tools to drive data-driven decision-making across the organization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "CRM Integration Tool",
    description: "Custom-built connector that seamlessly integrates existing CRM systems with third-party services, automating workflows and improving lead management.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Cloud Migration Service",
    description: "Comprehensive planning and execution to migrate legacy infrastructure to the cloud, ensuring minimal downtime and enhanced scalability.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);
  const [width] = useWindowSize();

  const visibleCards = useMemo(() => {
    if (width < 768) return 1;
    if (width < 1280) return 2;
    return 3;
  }, [width]);

  useEffect(() => {
    if (cardRef.current && sliderRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const gap = width < 640 ? 16 : 32;
      gsap.to(sliderRef.current, {
        x: -currentIndex * (cardWidth + gap),
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }
  }, [currentIndex, width]);

  useEffect(() => {
    const maxIndex = projects.length - visibleCards;
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, currentIndex]);
  
  const handleNext = () => {
    if (currentIndex < projects.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section id="projects" className="bg-white text-black w-full min-h-screen flex flex-col justify-center pt-8 pb-20 md:py-20 px-4 sm:px-8 lg:px-16 font-sans">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-end">
          <div>
            <p className="text-gray-500 mb-2 text-sm uppercase tracking-widest">
              Our Work
            </p>
            <h1 style={{fontFamily:"Poppins, sans"}} className="text-4xl sm:text-5xl font-semibold leading-tight text-gray-900">
              Explore Our Recent<br />
              Digital Solutions
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end justify-between">
            <p className="text-base leading-relaxed text-gray-600 max-w-md md:text-right mb-6">
              Each application we build demonstrates our commitment to delivering robust,
              scalable solutions that empower your business.
            </p>
            <button
              onClick={() => window.location.href = '/projects'}
              className="group relative text-gray-900 font-medium text-base hover:text-black transition-colors duration-300"
            >
              View All Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="md:hidden flex justify-center gap-4 mb-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-gray-100 p-3 rounded-full text-black disabled:opacity-40 transition"
            >
              <FiArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= projects.length - visibleCards}
              className="bg-gray-100 p-3 rounded-full text-black disabled:opacity-40 transition"
            >
              <FiArrowRight size={20} />
            </button>
          </div>
          
          <div className="w-full overflow-hidden">
            <div
              ref={sliderRef}
              className="flex gap-4 md:gap-8 pb-4"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={index === 0 ? cardRef : null}
                  className="relative group bg-cover bg-center rounded-xl flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[calc(50%-1rem)] xl:w-[calc(33.33%-1.33rem)] h-96 overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:!scale-105"
                  style={{ transform: "scale(1.0)" }} // Base scale for hover
                >
                   <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex absolute top-1/2 -left-20 -right-20 justify-between transform -translate-y-1/2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-white/70 backdrop-blur-sm p-4 rounded-full text-black shadow-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <FiArrowLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= projects.length - visibleCards}
              className="bg-white/70 backdrop-blur-sm p-4 rounded-full text-black shadow-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <FiArrowRight size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;