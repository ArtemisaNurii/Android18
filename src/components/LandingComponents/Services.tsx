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

// Array of service data reflecting CodeVider's expertise
const servicesData: ServiceItem[] = [
  {
    number: '1',
    title: 'Full-Stack Engineering',
    description: (
      <>
        End-to-end development covering both front-end and back-end—from UI
        components and state management to scalable APIs and databases.
      </>
    ),
  },
  {
    number: '2',
    title: 'Mobile Development',
    description: (
      <>
        Native and cross-platform mobile experiences using Swift, Kotlin, or
        React Native to engage users on iOS and Android.
      </>
    ),
  },
  {
    number: '3',
    title: 'QA & Testing',
    description: (
      <>
        Rigorous testing strategies—unit, integration, and end-to-end—to ensure
        your software is bug-free and production-ready.
      </>
    ),
  },
  {
    number: '4',
    title: 'DevOps & Cloud Deployment',
    description: (
      <>
        Automated CI/CD pipelines, containerization with Docker & Kubernetes,
        plus cloud setup on AWS, Azure, or GCP for scalability and reliability.
      </>
    ),
  },
  {
    number: '5',
    title: 'UI/UX Design',
    description: (
      <>
        User-centered design services, from wireframes to high-fidelity
        prototypes, ensuring intuitive, engaging interfaces.
      </>
    ),
  },
  {
    number: '6',
    title: 'Custom Software Development',
    description: (
      <>
        Tailor-made web and mobile applications built with React, Angular, Vue,
        Node.js, or Python to fit your exact business requirements.
      </>
    ),
  },
];

const ServicesPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect is preferred for GSAP animations to avoid FOUC (Flash of Unstyled Content)
  useLayoutEffect(() => {
    // Create a GSAP context for safe cleanup
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
      const cards = gridRef.current?.querySelectorAll('.service-card');
      cards?.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%', // Start animation when the top of the card hits 85% of the viewport height
            end: 'bottom 60%',
            toggleActions: 'play none none reverse', // Play on enter, reverse on scroll up
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
          start: 'top top+=200', // Start when the top of the grid is 200px from the top of the viewport
          end: 'bottom bottom-=200', // End when the bottom of the grid is 200px from the bottom
          scrub: 1, // Smoothly animates with scroll
        },
        transformOrigin: 'top center',
        ease: 'none',
      });
    }, mainRef); // Scope animations to the main container

    // Cleanup function to kill all ScrollTriggers on component unmount
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      id="services-section"
      className="relative bg-white my-10 pb-36 px-4 overflow-hidden  max-sm:px-10 " // Added overflow-hidden to contain animations
    >


      <div className="max-w-7xl mx-auto text-center mb-20 services-title">
        <p className="text-sm font-bold text-gray-500 tracking-tight mb-2">
          SERVICES
        </p>
        <h1 className="text-4xl font-bold my-2 max-sm:text-3xl text-gray-900">
          How Codevider Powers Your Tech
        </h1>
      </div>

      {/* --- SERVICES GRID --- */}
      <div
        ref={gridRef}
        className="services-grid relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:pl-40 md:pr-16"
      >
        {servicesData.map(({ number, title, description }) => (
          // Added 'service-card' class for GSAP targeting
          <div key={number} className="service-card space-y-4">
            <span className="text-5xl font-bold text-gray-200">{number}</span>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;