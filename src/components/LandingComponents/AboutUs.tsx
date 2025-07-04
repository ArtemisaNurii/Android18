import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ToolMarquee from './Marquee';

gsap.registerPlugin(ScrollTrigger);

const AboutUsPage: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
  
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

          <div className="col-span-1 md:col-span-2 text-gray-600 leading-relaxed space-y-6 text-base lg:text-lg">
    {/* <h2 className="text-2xl lg:text-3xl font-bold ">CodeVider: Code That Powers Progress</h2> */}
    <p>
    Established in 2019 in Tirana, Albania, CodeVider is a premier outsourcing software development partner specializing in cost-effective, nearshore web development solutions. We empower startups, SMEs, and enterprises to accelerate time-to-market and reduce development costs by up to 60%, delivering tailor-made web and mobile applications, cloud-native microservices, and AI-powered integrations. 
    </p>

    <p>
        Our dedicated teams of 25+ senior developers are masters of the modern tech stack. We embed into your project with an agile, sprint-based workflow, ensuring transparent communication and on-time delivery. From requirements gathering and expert team selection to daily stand-ups, weekly progress reports, seamless deployment, and 24/7 maintenance, we provide end-to-end project management and scalable support.
    </p>
    <ul className="list-disc list-inside space-y-2 pl-4">
        <li><strong>Full-Stack Development:</strong> Node.js, Python, PHP, React.js, Vue.js</li>
        <li><strong>Cloud-Native Solutions:</strong> Scalable and resilient microservices.</li>
        <li><strong>AI & Integrations:</strong> Future-proofing your platform with smart technology.</li>
    </ul>

    <p>
      Ready to build a future-ready system that evolves with your business? <a href="#contact"
        className="text-emerald-900 font-semibold">Request a free consultation</a> and discover your new tech partner.
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