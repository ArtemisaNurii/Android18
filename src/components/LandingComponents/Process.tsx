import React, { useLayoutEffect, useRef } from 'react';
import {
  Search,
  Users,
  Code,
  CalendarCheck,
  Server,
  HeartPulse,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The 'icon' property has been added to the interface and data
interface Step {
  duration: string;
  title: string;
  description: string;
  bullets: string[];
  icon: React.ElementType; // Added icon type
}

// Data is updated with a relevant icon for each step
const steps: Step[] = [
  {
    duration: '01',
    title: 'Discovery & Needs',
    description: 'We start by understanding your vision. Stakeholder interviews and product-vision canvas sessions align goals and metrics.',
    bullets: ['User-story mapping', 'Prioritised feature list'],
    icon: Search,
  },
  {
    duration: '02',
    title: 'Team Selection',
    description: 'The perfect team, assembled for you. We match our developer skills and expertise directly to your project requirements.',
    bullets: ['High-level diagrams', 'Sprint roadmap'],
    icon: Users,
  },
  {
    duration: '03',
    title: 'Development',
    description: 'Where the magic happens. Our developers work diligently, crafting high-quality, clean code for your project.',
    bullets: ['Design tokens & style-guide', 'Accessibility review'],
    icon: Code,
  },
  {
    duration: '04',
    title: 'Agile Reporting',
    description: 'Stay in the loop, always. We use CI/CD, code reviews, daily stand-ups, and weekly reports to ensure transparency.',
    bullets: ['Automated tests', 'Containerised environments'],
    icon: CalendarCheck,
  },
  {
    duration: '05',
    title: 'Deployment',
    description: 'Going live, smoothly. We provide a staging server for testing and deploy clean, optimized code to your servers.',
    bullets: ['OWASP security scan', 'Lighthouse benchmarks'],
    icon: Server,
  },
  {
    duration: '06',
    title: 'Maintenance',
    description: 'We’re with you for the long haul. You can continue with the same team for consistent productivity and support.',
    bullets: ['24-hour hyper-care', 'Run-books & monitoring'],
    icon: HeartPulse,
  },
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered item animation for the new timeline view
      const timelineItems = gsap.utils.toArray('.timeline-item');
      gsap.from(timelineItems, {
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-32 font-poppins text-white" ref={containerRef}>
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 " />
      {/* Optional: Add a subtle noise pattern for texture */}
      <div className="absolute inset-0 -z-10 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm sm:text-base font- leading-7 text-gray-800">
            Our Proven Workflow
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            A Better Way to Build
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300 max-w-2xl mx-auto">
            Our project lifecycle is designed for efficiency, transparency, and outstanding results. We turn complex problems into elegant digital solutions.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-4xl">
          {/* The connecting line - hidden on mobile, shown on larger screens */}
          <div className="absolute left-1/2 top-8 h-full w-0.5 -translate-x-1/2 bg-gray-700/50 hidden lg:block" />
          
          <div className="space-y-8 sm:space-y-12">
            {steps.map((step, index) => {
              const { icon: Icon } = step;
              const isLeft = index % 2 === 0;

              return (
                <div key={step.title} className="timeline-item relative">
                  {/* Mobile Layout - Centered */}
                  <div className="flex flex-col items-center lg:hidden">
                    {/* Icon */}
          
                    
                    {/* Content Card */}
                    <div className="w-full max-w-md space-y-3 rounded-xl border border-gray-200 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/10">
                      <p className="text-sm font-semibold text-emerald-400 text-center">
                        STEP {step.duration}
                      </p>
                      <h3 className="text-xl font-bold text-white text-center">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray-300 text-center">
                        {step.description}
                      </p>
                 
                    </div>
                  </div>

                  {/* Desktop Layout - Alternating */}
                  <div className="hidden lg:flex items-center">
                    {/* Icon on the timeline */}
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 opacity-25 ring-8 ring-black/30 absolute left-1/2 top-4 -translate-x-1/2">
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    {/* Content Card */}
                    <div
                      className={`w-[45%] space-y-3 rounded-xl border border-gray-200 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/10
                      ${isLeft ? 'mr-auto' : 'ml-auto'}`}
                    >
                      <p className="text-sm font- text-emerald-400">
                        STEP {step.duration}
                      </p>
                      <h3 className="text-xl font-semoibold text-white">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray-300">
                        {step.description}
                      </p>
                      <ul className="space-y-2 pt-2 text-sm text-gray-400">
                        {step.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-center">
                            <span className="mr-3 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
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