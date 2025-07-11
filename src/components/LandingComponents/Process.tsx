import React, { useLayoutEffect, useRef } from 'react';
import {
  Search,
  Users,
  Code,
  CalendarCheck,
  Server,
  HeartPulse,
  Component,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// We'll add an 'icon' to our data structure
interface Step {
  duration: string;
  title: string;
  description: string;
  bullets: string[];
}

const steps: Step[] = [
  {
    duration: '01',
    title: 'Discovery & Needs',
    description: 'We start by understanding your vision. Stakeholder interviews and product-vision canvas sessions align goals and metrics.',
    bullets: ['User-story mapping', 'Prioritised feature list'],
  
  },
  {
    duration: '02',
    title: 'Team Selection',
    description: 'The perfect team, assembled for you. We match our developer skills and expertise directly to your project requirements.',
    bullets: ['High-level diagrams', 'Sprint roadmap'],
 
  },
  {
    duration: '03',
    title: 'Development',
    description: 'Where the magic happens. Our developers work diligently, crafting high-quality, clean code for your project.',
    bullets: ['Design tokens & style-guide', 'Accessibility review'],
  },
  {
    duration: '04',
    title: 'Agile Reporting',
    description: 'Stay in the loop, always. We use CI/CD, code reviews, daily stand-ups, and weekly reports to ensure transparency.',
    bullets: ['Automated tests', 'Containerised environments'],
  },
  {
    duration: '05',
    title: 'Deployment',
    description: 'Going live, smoothly. We provide a staging server for testing and deploy clean, optimized code to your servers.',
    bullets: ['OWASP security scan', 'Lighthouse benchmarks'],
  },
  {
    duration: '06',
    title: 'Maintenance',
    description: 'We’re with you for the long haul. You can continue with the same team for consistent productivity and support.',
    bullets: ['24-hour hyper-care', 'Run-books & monitoring'],
  },
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card animation
      gsap.from(gridRef.current.children!, { // Use the gridRef here
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1, // This creates the cool staggered effect
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative min-h-screen flex flex-col items-center w-full py-32
    bg-gradient-to-br from-black to-teal-400 z-1 px-6 font-poppins" ref={containerRef}>
      <div className="absolute inset-0 bg-black/70" />

      <div className="mx-auto  max-w-7xl z-20 px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold  leading-7 text-gray-500">
            Our Proven Workflow
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            A Better Way to Build
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            Our project lifecycle is designed for efficiency, transparency, and outstanding results. We turn complex problems into elegant digital solutions.
          </p>
        </div>

        {/* Interactive Grid */}
        <div ref={gridRef} className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => {
              return (
                // Each card is a "group" to allow for hover effects on child elements
                <div key={step.title} className="group relative flex flex-col p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Large background number */}
                  <div className="absolute -top-4 -right-4 text-[120px] font-black text-slate-100/80 transition-colors duration-300 group-hover:text-teal-50 -z-0">
                    {step.duration}
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg group-hover:text-emerald-500 transition-all duration-300">
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">
                      {step.description}
                    </p>
                    
                    {/* Hidden Bullets - revealed on hover */}
                    <div className="mt-6 border-t border-gray-200 pt-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out">
                      <ul className="space-y-2 text-sm text-gray-700">
                        {step.bullets.map((bullet, bIdx) => (
                           <li key={bIdx} className="flex items-center">
                           <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 mr-3"></span>
                           <span>{bullet}</span>
                         </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;