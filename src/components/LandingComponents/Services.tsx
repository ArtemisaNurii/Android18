import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Define the type for a single service item for TypeScript
interface ServiceItem {
  number: string;
  title: string;
  description: React.ReactNode;
}

// Array of service data reflecting CodeVider's expertise
type ServicesData = ServiceItem[];
const servicesData: ServicesData = [
  {
    number: '1',
    title: 'Custom Software Development',
    description: (
      <>
        Tailor-made web and mobile applications built withReact, Angular, Vue,
        Node.js, orPython
        to fit your exact business requirements.
      </>
    ),
  },
  {
    number: '2',
    title: 'Full-Stack Engineering',
    description: (
      <>
        End-to-end development covering bothfront-end
        andback-end—from UI components and state management to scalable APIs and databases.
      </>
    ),
  },
  {
    number: '3',
    title: 'Mobile App Development',
    description: (
      <>
        Native and cross-platform mobile experiences usingSwift,
        Kotlin, orReact Native
        to engage users on iOS and Android.
      </>
    ),
  },
  {
    number: '4',
    title: 'DevOps & Cloud Deployment',
    description: (
      <>
        Automated CI/CD pipelines, containerization withDocker
        &Kubernetes, plus cloud setup on AWS, Azure, or GCP for
       scalability andreliability.
      </>
    ),
  },
  {
    number: '5',
    title: 'QA & Testing',
    description: (
      <>
        Rigorous testing strategies—unit, integration, and end-to-end—to ensure your software is
       bug-free andproduction-ready.
      </>
    ),
  },
  {
    number: '6',
    title: 'UI/UX Design',
    description: (
      <>
        User-centered design services, from wireframes to high-fidelity prototypes, ensuring
       intuitive,engaging interfaces.
      </>
    ),
  },
];

gsap.registerPlugin(ScrollTrigger);

const ServicesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    // Line animation
    const line = gsap.fromTo(
      '.progress-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top top+=100',
          end: 'bottom bottom',
          scrub: true,
        },
        transformOrigin: 'top center',
        ease: 'none',
      }
    );

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div
    id="services"
    className="relative bg-white mt-20 font-sans px-4 sm:px-6 lg:px-8"
  >
    <div className="max-w-7xl mx-auto text-center mb-16">
      <p className="text-sm font-bold text-gray-500 tracking-tight mb-2">
        SERVICES
      </p>
      <h1 className="text-4xl lg:text-5xl max-sm:text-2xl text-gray-900">
        How Codevider Powers Your Tech
      </h1>
    </div>

    {/* Services Grid */}
    <div
      ref={containerRef}
      className="
        services-grid
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-x-8
        gap-y-16
        max-w-7xl       
        mx-auto          
        justify-items-center /* center each card */
        px-2 sm:px-4 lg:px-0  /* smaller side padding on mobile */
      "
    >
      {servicesData.map((service) => (
        <div
          key={service.number}
          className="service-card flex flex-col p-6 bg-white rounded-lg w-full"
        >
          <p className="text-sm font-bold text-blue-900 mb-4">
            {service.number}
          </p>
          <h2 className="text-3xl max-sm:text-2xl text-gray-900 mb-4">
            {service.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);
};

export default ServicesPage;
