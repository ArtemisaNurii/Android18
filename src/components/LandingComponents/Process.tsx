// components/Process.tsx
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  duration: string;
  title: string;
  description: string;
  bullets: string[];
}

const steps: Step[] = [
  {
    duration: '1',
    title: 'Determine Client Needs',
    description:
      'Stakeholder interviews and product-vision canvas to align goals, constraints, and success metrics.',
    bullets: ['User-story mapping', 'Prioritised feature list'],
  },
  {
    duration: '2',
    title: 'Team Selection',
    description:
      'Our developer skills will be matched with your requirements',
    bullets: ['High-level diagrams', 'Sprint roadmap'],
  },
  {
    duration: '3',
    title: 'Development',
    description:
      'Selected developer/s will work delicately on your project.',
    bullets: ['Design tokens & style-guide', 'Accessibility review'],
  },
  {
    duration: '4',
    title: 'Daily Meeting & Weekly Reporting',
    description:
      'Cross-functional squads ship incremental features with CI/CD, code reviews, and daily stand-ups.',
    bullets: ['Automated tests', 'Containerised environments'],
  },
  {
    duration: '5',
    title: 'Deployment',
    description:
      'We will give you a development server when you can test your project. On your servers you will have clean code.',
    bullets: ['OWASP scan', 'Lighthouse benchmarks'],
  },
  {
    duration: '6',
    title: 'On Going & Maintenance',
    description:
      'You can work with the same team to get consistent Productivity..',
    bullets: ['24-hour hyper-care', 'Run-books & monitoring'],
  },
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vertical timeline
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );

      // Animate each card
      gsap.utils
        .toArray<HTMLDivElement>('.process-card')
        .forEach((card: HTMLDivElement, i: number) => {
          const fromDir = i % 2 === 0 ? 100 : -100; // alternate sides
          gsap.from(card, {
            opacity: 0,
            x: fromDir,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          });
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white pt-24  px-6 max-sm:px-10  lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
            Process
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our Project&nbsp;Life&nbsp;Cycle
          </h2>
        </div>

        {/* Timeline + Cards */}
        <div className="relative" ref={containerRef}>
          {/* vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gray-300 max-md:hidden"
          />

          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className="relative mb-16">
                {/* dot */}
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-teal-900 rounded-full transform -translate-x-1/2 max-md:hidden" />

                {/* card */}
                <div
                  className={
                    `process-card  w-full md:w-1/2 px-6 py-6 bg-transparent   ` +
                    (isLeft
                      ? 'md:ml-auto md:text-right'
                      : 'md:mr-auto md:text-left')
                  }
                >
                  <span className="inline-block bg-transparent text-gray-600 text-xs font-medium px-3 py-1  mb-3">
                    {step.duration}
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>

              
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
