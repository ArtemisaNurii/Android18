import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ToolMarquee from './Marquee';

gsap.registerPlugin(ScrollTrigger);

const AboutUsPage: React.FC = () => {
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.gsap-fade-in');

    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    // --- PIXEL PERFECT FIX: Replaced `mt-20 py-20` with `py-40` for equal top/bottom padding ---
    <div id='about' className="bg-white text-gray-800 py-40 px-4 max-sm:px-10 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section 1: Who we are */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-24">
          
          <div className="col-span-1 gsap-fade-in">
            <p className="text-sm font-medium text-gray-500 tracking-widest mb-4">ABOUT US</p>
            <h1 className="text-4xl lg:text-5xl font-bold max-sm:text-2xl ">
              Who we are: Our story and mission
            </h1>
          </div>

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
          <p className="text-sm font-bold text-gray-500 tracking-widest mb-8 gsap-fade-in">
            We love tools
          </p>

          <div className="mb-12 gsap-fade-in">
            <ToolMarquee />
          </div> 

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