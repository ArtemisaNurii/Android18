import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Icon representing high-quality code and engineering
const EngineeringIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// Icon representing partnership and collaboration
const PartnershipIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Icon representing speed, acceleration, and value
const AccelerateIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.88l-8.57 8.57" />
  </svg>
);

// Icon representing business growth and scalability
const GrowthIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="4" />
    <polyline points="6 14 12 20 18 14" />
  </svg>
);
// --- DATA (UNCHANGED) ---
const codeviderPrinciples = [
    {
      Icon: EngineeringIcon,
      title: "TECHNICAL EXCELLENCE",
      description: "We provide access to the top 1% of nearshore tech talent. Our senior developers are not just coders; they are architects and problem-solvers dedicated to building clean, scalable, and maintainable software.",
      colSpan: "md:col-span-3",
    },
    {
      Icon: PartnershipIcon,
      title: "SEAMLESS PARTNERSHIP",
      description: "Your success is our success. We integrate directly into your workflow, adopting your tools and culture. Think of us not as an external agency, but as a dedicated extension of your own team.",
      colSpan: "md:col-span-2",
    },
    {
      Icon: AccelerateIcon,
      title: "STRATEGIC VALUE",
      description: "Accelerate your time-to-market and significantly reduce development costs. Our nearshore model delivers exceptional quality and efficiency, providing a powerful return on your investment.",
      colSpan: "md:col-span-2",
    },
    {
      Icon: GrowthIcon, 
      title: "FUTURE-READY GROWTH",
      description: "We don't just build for today; we architect for tomorrow. Our solutions are designed to be scalable, adaptable, and robust, ensuring your technology evolves seamlessly with your business.",
      colSpan: "md:col-span-3",
    },
  ];

export const Benefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- EXISTING INTRO ANIMATIONS (UNCHANGED) ---
      gsap.from(['.header-title', '.header-subtitle'], {
        y: 40,
        opacity: 0,
        ease: 'power3.out',
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>('.principle-card');
      cards.forEach((card) => {
        gsap.from(card, {
          yPercent: 20,
          autoAlpha: 0,
          scale: 0.85,
          rotationX: 8,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

  
      const parallaxTl = gsap.timeline({
        ease: 'none', // Linear ease for a direct mapping to scroll
        scrollTrigger: {
          trigger: containerRef.current,
          // Start the effect as soon as the section enters the viewport
          start: 'top bottom',
          // End the effect when the section has completely left the viewport
          end: 'bottom top',
          // `scrub: 1` creates a smooth, lagged link between scroll and animation
          scrub: 1, 
        },
      });

      // Animate the header and grid at different speeds
      parallaxTl
        .to('.benefits-header', { yPercent: -50 }, 0) // Header moves up faster
        .to('.benefits-grid', { yPercent: -15 }, 0); // Grid moves up slower

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="section-standard relative text-neutral-800 font-poppins flex flex-col items-center w-full px-4 sm:px-6"
    >

      {/* --- 1. ADD CLASS NAME TO HEADER --- */}
      <header className="benefits-header relative z-10 pt-10 text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl w-full px-2 sm:px-4 lg:px-8">
        <h1 className="header-title mt-4 sm:mt-6 lg:mt-10 font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] uppercase">
          BEYOND THE CODE
        </h1>
        <p className="header-subtitle mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-neutral-200 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
          We believe true partnership goes beyond lines of code. It's about shared goals, transparent collaboration, and building technology that drives tangible business growth.
        </p>
      </header>

      {/* --- 1. ADD CLASS NAME TO MAIN GRID --- */}
      <main className="benefits-grid relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl px-2 sm:px-4 lg:px-8">
        {codeviderPrinciples.map(({ Icon, title, description, colSpan }, i) => (
          <div
            key={i}
            className={`principle-card bg-white/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl flex flex-col items-start text-left shadow-lg ${colSpan}`}
          >
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#52ca86] mb-3 sm:mb-4 lg:mb-6" />
            <h2 className="font-mono text-sm sm:text-base lg:text-xl xl:text-2xl font-bold tracking-wider sm:tracking-widest uppercase text-gray-700 mb-2 sm:mb-3 leading-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">{description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};