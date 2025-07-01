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
    title: 'Full-Stack Engineering',
    description: (
      <>
        End-to-end development covering bothfront-end
        andback-end—from UI components and state management to scalable APIs and databases.
      </>
    ),
  },
  {
    number: '2',
    title: 'Mobile  Development',
    description: (
      <>
        Native and cross-platform mobile experiences using Swift,
        Kotlin, or React Native
        to engage users on iOS and Android.
      </>
    ),
  },



  {
    number: '3',
    title: 'QA & Testing',
    description: (
      <>
        Rigorous testing strategies—unit, integration, and end-to-end—to ensure your software is
       bug-free andproduction-ready.
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
    title: 'UI/UX Design',
    description: (
      <>
        User-centered design services, from wireframes to high-fidelity prototypes, ensuring
       intuitive,engaging interfaces.
      </>
    ),
  },
  {
    number: '6',
    title: 'Custom Software Development',
    description: (
      <>
        Tailor-made web and mobile applications built withReact, Angular, Vue,
        Node.js, orPython
        to fit your exact business requirements.
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
    id="services-section"

    className="relative bg-white my-20  py-16 px-4 "
  >
    <div className="max-w-8xl mx-auto text-center  mb-16">
      <p className="text-sm font-bold text-gray-500 tracking-tight mb-2">
        SERVICES
      </p>
      <h1 className="text-4xl lg:text-4xl max-sm:text-2xl text-gray-900">
        How Codevider Powers Your Tech
      </h1>
    </div>

    {/* Services Grid */}
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-20">
          {servicesData.map(({ number, title, description }) => (
            <div key={number} className="space-y-4">
              <span className="text-5xl f text-gray-200">{number}</span>
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
  </div>
);
};

export default ServicesPage;
