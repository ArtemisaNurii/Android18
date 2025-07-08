import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// --- Data for our software development projects/applications ---
const projects = [
  {
    title: "E-Commerce Platform Revamp",
    description:
      "Redesigned and optimized for performance, this e-commerce platform delivers seamless shopping experiences and drives higher conversion rates.",
    image:
      "https://img.freepik.com/premium-vector/business-icon-logo-design-vector-graphic_6415-17810.jpg",
  },
  {
    title: "Mobile Banking App",
    description:
      "Secure and intuitive mobile banking solution with real-time transaction tracking, biometric authentication, and AI-driven financial insights.",
    image:
      "https://img.freepik.com/premium-vector/elegant-contemporary-abstract-logo_315428-169.jpg",
  },
  {
    title: "Real-Time Analytics Dashboard",
    description:
      "Interactive dashboard providing live data visualizations and custom reporting tools to drive data-driven decision-making across the organization.",
    image:
      "https://img.freepik.com/free-vector/business-logo_23-2147503133.jpg",
  },
  {
    title: "CRM Integration Tool",
    description:
      "Custom-built connector that seamlessly integrates existing CRM systems with third-party services, automating workflows and improving lead management.",
    image:
      "https://img.freepik.com/free-vector/figure-folded-logo_1043-97.jpg",
  },
  {
    title: "Cloud Migration Service",
    description:
      "Comprehensive planning and execution to migrate legacy infrastructure to the cloud, ensuring minimal downtime and enhanced scalability.",
    image:
      "https://www.shutterstock.com/image-vector/modern-vector-graphic-cubes-colorful-260nw-1960184035.jpg",
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  // GSAP animation on index change
  useEffect(() => {
    const cardWidth = cardRef.current?.offsetWidth || 0;
    const gap = window.innerWidth < 640 ? 16 : 32; // gap-4 mobile, gap-8 desktop

    gsap.to(sliderRef.current, {
      x: -currentIndex * (cardWidth + gap),
      duration: 1,
      ease: 'power3.inOut',
    });
  }, [currentIndex]);

  // Navigation handlers
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

  // Determine visible cards based on screen width
  const visibleCards =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;

  return (
    <section id="projects"     className="bg-white text-black w-full p-4 sm:p-10 md:p-16 pt-24 lg:pt-40 font-sans ">

      <div className="max-w-screen-xl mx-auto max-sm:overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          <div>
            <p className="text-gray-400 mb-1 text-xs sm:text-sm uppercase tracking-widest">
              Our Projects
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
              Explore our recent <br />
              <span>works from thought to</span> <br />
              implementation
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end justify-between">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 mb-4 md:mb-0">
              Each application we build demonstrates our commitment to delivering robust,
              scalable solutions that empower your business.
            </p>
            <a
              href="/projects"
              className="text-black text-xs sm:text-sm font-semibold tracking-widest border-b border-emerald-400 pb-1 hover:text-emerald-600 transition-all duration-300"
            >
              VIEW ALL
            </a>
          </div>
        </div>

        {/* Slider with arrow controls */}
        <div className="relative">
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/60 hover:bg-white p-2 rounded-full shadow transition-opacity duration-300"
          >
            <FaArrowLeft className={currentIndex === 0 ? 'opacity-30' : 'opacity-100'} />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= projects.length - visibleCards}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/60 hover:bg-white p-2 rounded-full shadow transition-opacity duration-300"
          >
            <FaArrowRight className={currentIndex >= projects.length - visibleCards ? 'opacity-30' : 'opacity-100'} />
          </button>

          {/* Carousel Slider */}
          <div className="w-full overflow-x-auto sm:overflow-hidden pt-20">
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-8 pb-4 sm:pb-0"
              style={{ cursor: 'grab' }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={index === 0 ? cardRef : null}
                  className="relative bg-cover bg-center rounded-xl flex-shrink-0 w-full sm:w-[250px] md:w-[300px] lg:w-[350px] h-52 sm:h-80 md:h-[350px] text-white p-4 sm:p-6 overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
           
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                      {project.title}
                    </h3>
            
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;



