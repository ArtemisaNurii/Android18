import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Silk from '../AnimatedBackground'; // Make sure this path is correct

const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // This useEffect now runs once when the component mounts
  // It no longer depends on the 'loaded' state from the removed Spline component
  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );
  }, []); // Empty dependency array means this runs once on mount

  // Note: The IntersectionObserver useEffect for playing/stopping the animation
  // is currently not doing anything because it was tied to the splineApp ref.
  // If your <Silk> component has a play/stop API, you would adapt that logic here.

  return (
    <div ref={containerRef} id='hero' className="relative w-full h-screen overflow-hidden font-sans text-white">
      {/* 1. SILK BACKGROUND */}
      {/* This div is the container for the background. z-0 places it at the bottom of the stacking order. */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Silk
          speed={8}
          scale={0.9}
          color="#152238"
          noiseIntensity={0}
          rotation={5.5}
        />
      </div>
      <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-sm"></div>

      
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center md:items-start md:justify-end max-w-7xl mx-auto px-6  md:px-16 pb-16 opacity-0 text-center md:text-left"
      >
        <main className="grid md:grid-cols-2 items-center max-sm:items-start max-sm:space-x-0 space-x-24 gap-44 w-full">
          <div className="max-w-4xl text-left">
            <h1 className="text-4xl lg:text-5xl font-normal tracking-normal leading-tight">
              Strategic Softwares for Sustainable Growth.
            </h1>
          </div>
          <div className="max-w-md flex flex-col items-center gap-y-6 md:items-start">
            <p className="text-base text-gray-300 leading-loose">
              Join us in crafting a digital experience that truly distinguishes you from others
            </p>
            <button
              id="services-button" // Changed from 'services' to avoid duplicate IDs if you have a section with that ID
              className="bg-white w-full text-black font-medium py-3 px-8 hover:brightness-110 transition-all"
              onClick={() => {
                const servicesSection = document.getElementById('services-section');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Our services
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;