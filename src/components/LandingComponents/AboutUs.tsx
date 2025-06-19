import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ToolMarquee from './Marquee';

// --- CHANGE 1: Register the ScrollTrigger plugin with GSAP ---
gsap.registerPlugin(ScrollTrigger);

const AboutUsPage: React.FC = () => {

  // --- CHANGE 2: Use an effect to set up animations on component mount ---
  useEffect(() => {
    // This targets every element with the class 'gsap-fade-in'
    const fadeElements = document.querySelectorAll('.gsap-fade-in');

    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        {
          opacity: 0,
          y: 50, // Start 50px down
        },
        {
          opacity: 1,
          y: 0, // End at its original position
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,      // The animation is triggered by the element itself
            start: 'top 85%', // Starts when the top of the element is 85% from the top of the viewport
            toggleActions: 'play none none none', // Play the animation once and don't reverse
          },
        }
      );
    });

    // Cleanup function to kill triggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    // Added a container for the effect context
    <div className="bg-white text-gray-800 mt-20 font-sans py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section 1: Who we are */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-24">
          
          {/* --- CHANGE 3: Add the target class 'gsap-fade-in' --- */}
          <div className="col-span-1 gsap-fade-in">
            <p className="text-sm font-bold text-gray-500 tracking-widest mb-4">ABOUT US</p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900">
              Who we are: Our story and mission
            </h1>
          </div>

          {/* --- CHANGE 3: Add the target class 'gsap-fade-in' --- */}
          <div className="col-span-1 md:col-span-2 text-gray-600 leading-relaxed space-y-6 text-base lg:text-lg gsap-fade-in">
            <p>
              CodeVider is a professional web development outsourcing company based in Tirana, Albania, founded in 2019. We specialize in delivering high-quality, cost-effective software solutions—from custom web and mobile applications to full-stack development—to help businesses accelerate time-to-market and achieve technological excellence. 
            </p>
            <p>
              Our expert team of 25 developers works across the entire stack—Node.js, Python, PHP, React.js, Angular.js, Vue.js, and more—using an agile, sprint-based process. From gathering requirements and selecting the right specialists, to daily stand-ups, weekly reporting, deployment, and ongoing maintenance, we partner with you at every step to ensure smooth delivery and lasting results. 
            </p>
            <p>
              At CodeVider, we believe in “Code That Powers Progress”: combining innovation, transparency, and close collaboration so that your project not only meets its goals, but also scales seamlessly as your business grows.
            </p>
          </div>
        </section>

        {/* Section 2: Partnership & Certification */}
        <section className="text-center">
          {/* --- CHANGE 3: Add the target class 'gsap-fade-in' --- */}
          <p className="text-sm font-bold text-gray-500 tracking-widest mb-8 gsap-fade-in">
            We love tools
          </p>

          {/* --- CHANGE 3: Add the target class 'gsap-fade-in' --- */}
          <div className="mb-12 gsap-fade-in">
            <ToolMarquee />
          </div> 

          {/* --- CHANGE 3: Add the target class 'gsap-fade-in' --- */}
          <div className="max-w-3xl mx-auto gsap-fade-in">
            {/* <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
              Our partnership and certification programs offer unparalleled opportunities for businesses to collaborate with our expert team—driving impactful results in custom software development, digital transformation, and beyond.
            </p> */}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;