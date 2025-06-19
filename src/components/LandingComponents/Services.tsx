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
        Tailor-made web and mobile applications built with <strong className="font-semibold text-gray-800">React, Angular, Vue,</strong>
        <strong className="font-semibold text-gray-800"> Node.js,</strong> or <strong className="font-semibold text-gray-800">Python</strong>
        to fit your exact business requirements.
      </>
    ),
  },
  {
    number: '2',
    title: 'Full-Stack Engineering',
    description: (
      <>
        End-to-end development covering both <strong className="font-semibold text-gray-800">front-end</strong>
        and <strong className="font-semibold text-gray-800">back-end</strong>—from UI components and state management to scalable APIs and databases.
      </>
    ),
  },
  {
    number: '3',
    title: 'Mobile App Development',
    description: (
      <>
        Native and cross-platform mobile experiences using <strong className="font-semibold text-gray-800">Swift</strong>,
        <strong className="font-semibold text-gray-800"> Kotlin</strong>, or <strong className="font-semibold text-gray-800">React Native</strong>
        to engage users on iOS and Android.
      </>
    ),
  },
  {
    number: '4',
    title: 'DevOps & Cloud Deployment',
    description: (
      <>
        Automated CI/CD pipelines, containerization with <strong className="font-semibold text-gray-800">Docker</strong>
        & <strong className="font-semibold text-gray-800">Kubernetes</strong>, plus cloud setup on AWS, Azure, or GCP for
        <strong className="font-semibold text-gray-800">scalability</strong> and <strong className="font-semibold text-gray-800">reliability</strong>.
      </>
    ),
  },
  {
    number: '5',
    title: 'QA & Testing',
    description: (
      <>
        Rigorous testing strategies—unit, integration, and end-to-end—to ensure your software is
        <strong className="font-semibold text-gray-800">bug-free</strong> and <strong className="font-semibold text-gray-800">production-ready</strong>.
      </>
    ),
  },
  {
    number: '6',
    title: 'UI/UX Design',
    description: (
      <>
        User-centered design services, from wireframes to high-fidelity prototypes, ensuring
        <strong className="font-semibold text-gray-800">intuitive</strong>, <strong className="font-semibold text-gray-800">engaging</strong> interfaces.
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
    <div className="relative bg-white mt-20 font-sans py-48 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <p className="text-sm font-bold text-gray-500 tracking-widest mb-2">SERVICES</p>
        <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900">
          How CodeVider Powers Your Tech
        </h1>
      </div>


      {/* Services Grid */}
      <div ref={containerRef} className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {servicesData.map((service) => (
          <div key={service.number} className="service-card flex flex-col items-start p-6 bg-white rounded-lg ">
            <p className="text-sm font-bold text-blue-900 mb-4">{service.number}</p>
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
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
