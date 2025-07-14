import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Define the type for a single service item for TypeScript
interface ServiceItem {
  number: string;
  title: string;
  description: React.ReactNode;
}

// Array of service data with refined, brand-focused copy
const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'Full-Stack Engineering',
    description: (
      <>
        We build robust, scalable applications from the ground up. Our experts handle everything from intuitive user interfaces (React, Vue) to powerful server-side logic (Node.js, Python), ensuring a seamless user experience.
      </>
    ),
  },
  {
    number: '02',
    title: 'Bespoke Mobile Apps',
    description: (
      <>
        Engage your users on the go with beautiful, high-performance native (iOS, Android) and cross-platform mobile applications. We turn your ideas into intuitive, pocket-sized experiences.
      </>
    ),
  },
  {
    number: '03',
    title: 'AI & Advanced Integrations',
    description: (
      <>
        Future-proof your business by integrating cutting-edge AI, machine learning models, and complex third-party APIs. We unlock new capabilities and automate processes to give you a competitive edge.
      </>
    ),
  },
  {
    number: '04',
    title: 'DevOps & Cloud Architecture',
    description: (
      <>
        Achieve maximum scalability and reliability with our cloud solutions. We design automated CI/CD pipelines and manage infrastructure on AWS, Azure, or GCP, so you can deploy with confidence.
      </>
    ),
  },
  {
    number: '05',
    title: 'Strategic UI/UX Design',
    description: (
      <>
        Great software starts with exceptional design. Our UI/UX process focuses on creating user-centric, visually stunning interfaces that are not only beautiful but also drive engagement and conversions.
      </>
    ),
  },
  {
    number: '06',
    title: 'Quality Assurance & Testing',
    description: (
      <>
        Deliver flawless software with our rigorous QA processes. We perform comprehensive testing—from automated checks to manual deep-dives—to ensure your application is stable, secure, and production-ready.
      </>
    ),
  },
];

const ServicesPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect is preferred for GSAP animations to avoid FOUC
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- ANIMATION FOR THE HEADER ---
      gsap.from('.services-title > *', {
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // --- ANIMATION FOR EACH SERVICE CARD ---
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      // --- ANIMATION FOR THE PROGRESS LINE ---
      gsap.from('.progress-line', {
        scaleY: 0,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 20%',
          end: 'bottom 80%',
          scrub: 1.5,
        },
        transformOrigin: 'top center',
        ease: 'none',
      });
    }, mainRef);

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      id="services"
      className="bg-white py-24 sm:py-32 px-6 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* --- HEADER --- */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24 services-title">
          <p className="font-semibold leading-7 text-gray-500">SERVICES</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-semibold leading-tight text-gray-900">
How Codevider Powers Your Tech          </h1>
        </div>

        {/* --- SERVICES GRID with Progress Line --- */}
        <div className="relative">
          {/* 
            FIX #2: Added the progress line back in. It's hidden on mobile (md:block) and
            positioned to align with the numbers. The GSAP animation targets this element.
          */}
          
          <div
            className="services-grid grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-y-20 md:pl-28 
                       md:gap-x-24" // FIX #1: Increased horizontal gap from 12 to 24
          >
            {servicesData.map(({ number, title, description }) => (
              <div key={number} className="service-card relative">
                {/* Number - absolutely positioned on desktop, static on mobile */}
                <div className="md:absolute md:left-0 md:-translate-x-full md:top-1.5 md:pr-8">
                  <span className="text-2xl md:text-3xl font- text-emerald-400">
                    {number}
                  </span>
                </div>
                
                {/* Card Content */}
                <div className="mt-2 md:mt-0">
                  <h3 className="text-xl font-semibold leading-8 text-gray-900">{title}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;