import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- ICONS (UNCHANGED) ---
const EngineeringIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const PartnershipIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const AccelerateIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.88l-8.57 8.57" />
  </svg>
);
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

  // --- ANIMATIONS (UNCHANGED) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, 
        },
      });

      parallaxTl
        .to('.benefits-header', { yPercent: -50 }, 0)
        .to('.benefits-grid', { yPercent: -15 }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative  text-gray-700 pt-10     bg-[#f8f7f4] flex flex-col items-center w-full px-4 sm:px-6"
    >
      <header className="benefits-header relative z-10 pt-10 text-center mb-12 lg:mb-16 max-w-4xl w-full">
        <h1 className="header-title mt-6 lg:mt-10 font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold  text-gray-700  tracking-[0.1em] sm:tracking-[0.15em]  ">
          BEYOND THE CODE
        </h1>
        <p className="header-subtitle mt-4 text-base lg:text-lg  text-gray-700  max-w-2xl mx-auto">
          We believe true partnership goes beyond lines of code. It's about shared goals, transparent collaboration, and building technology that drives tangible business growth.
        </p>
      </header>

      {/* BUMPED: Increased gap for more breathing room on mobile */}
      <main className="benefits-grid relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 w-full max-w-6xl">
        {codeviderPrinciples.map(({ Icon, title, description, colSpan }, i) => (
          <div
            key={i}
            // BUMPED: Increased padding from p-4 to p-6 for more internal space.
            className={`principle-card bg-white/95 backdrop-blur-sm p-6 lg:p-8 rounded-xl sm:rounded-2xl flex flex-col items-start text-left shadow-lg ${colSpan}`}
          >
            {/* BUMPED: Increased icon size from w-6 to w-8 on mobile. */}
            <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-[#52ca86] mb-4 lg:mb-6" />
            {/* BUMPED: Increased title size from sm to lg on mobile for more emphasis. */}
            <h2 className="font-mono text-lg sm:text-xl font-bold tracking-wider uppercase text-gray-700 mb-3 leading-tight">
              {title}
            </h2>
            {/* BUMPED: Increased description text from xs to sm for readability. This is the most important change. */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};