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

// --- The Main Component ---
const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  // --- GSAP Animation ---
  useEffect(() => {
    const cardWidth = cardRef.current?.offsetWidth || 0;
    const gap = 32; // Corresponds to gap-8 in Tailwind

    gsap.to(sliderRef.current, {
      x: -currentIndex * (cardWidth + gap),
      duration: 1.2,
      ease: 'power3.inOut',
    });
  }, [currentIndex]);

  // --- Navigation Handlers ---
  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleCards = 3;

  return (
    <section id="projects" className="bg-white text-black min-h-screen w-full p-8 md:p-16 lg:p-24 flex flex-col justify-center font-sans overflow-hidden">
      <div className="max-w-screen-xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-end">
          {/* Left Side: Title and Description */}
          <div>
            <p className="text-emerald-500 mb-2 text-sm tracking-widest uppercase">Our Projects</p>
            <h1 className="text-5xl sm:text-4xl md:text-5xl   font-semibold leading-tight mt-2  tracking-tight text-gray-900 ">
             Explore our recent <br />
              <span className="">works  from thought to</span> <br />
               implementation
            </h1>
          </div>
          
          {/* Right Side: Paragraph and View All */}
          <div className="flex flex-col items-start md:items-end justify-between h-full">
             <p className=" md:text-right mb-8 md:mb-0 text-lg leading-8 text-gray-600">
              Each application we build demonstrates our commitment to delivering robust, scalable solutions that empower your business.
            </p>
             <a href="#" className="text-emerald-500 tracking-widest text-sm font-semibold border-b border-emerald-400 pb-1 hover:bg-emerald-400 hover:text-zinc-900 transition-all duration-300">
              VIEW ALL
            </a>
          </div>
        </div>
        
        {/* Carousel Navigation */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-4">
                <button 
                    onClick={handlePrev} 
                    className={`text-gray-500 text-2xl p-2 transition-all duration-300 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-emerald-500 hover:scale-110'}`}
                    aria-label="Previous Project"
                    disabled={currentIndex === 0}
                >
                    <FaArrowLeft />
                </button>
                <button 
                    onClick={handleNext} 
                    className={`text-gray-500 text-2xl p-2 transition-all duration-300 ${currentIndex >= projects.length - visibleCards ? 'opacity-30 cursor-not-allowed' : 'hover:text-emerald-500 hover:scale-110'}`}
                    aria-label="Next Project"
                    disabled={currentIndex >= projects.length - visibleCards}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>

        {/* Carousel Slider */}
        <div className="w-full overflow-hidden">
          <div ref={sliderRef} className="flex gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                ref={index === 0 ? cardRef : null}
                className="relative bg-cover bg-center rounded-2xl flex-shrink-0 w-[300px] md:w-[350px] h-[450px] text-white flex flex-col justify-end p-6 overflow-hidden group shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/40"></div>
                <div className="absolute top-6 right-6 z-10 text-white text-2xl opacity-0 group-hover:opacity-100 transform -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
                    <FaArrowRight />
                </div>
                <div className="relative z-10 transform transition-all duration-500 group-hover:-translate-y-4">
                  <h3 className="text-3xl font-serif font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transition-all duration-500">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
