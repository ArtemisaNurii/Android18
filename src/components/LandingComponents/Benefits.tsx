import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const LearnIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ConnectIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8.9V7a2 2 0 0 0-2-2h-3.42" />
    <path d="M8 15.1V17a2 2 0 0 0 2 2h3.42" />
    <path d="m8 8.9 4 4 4-4" />
    <path d="m16 15.1-4-4-4 4" />
  </svg>
);

const GrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.93 15.63 10 14l-2.93 1.63a1 1 0 0 1-1.45-1.05l.56-3.23-2.34-2.28a1 1 0 0 1 .55-1.7h3.38l1.52-3.06a1 1 0 0 1 1.78 0l1.52 3.06h3.38a1 1 0 0 1 .55 1.7l-2.34 2.28.56 3.23a1 1 0 0 1-1.45 1.05Z"/>
    <path d="M18 6h-3"/>
    <path d="M21 9h-3"/>
  </svg>
);

// --- Data for the Benefit Cards ---
const benefitsData = [
    {
      Icon: LearnIcon,
      title: "LEARN FROM OTHERS",
      description: "Hear from experts and peers and get new ideas. See how others tackle similar challenges, and gain fresh perspectives on your own work. Share experiences and learn together.",
      colSpan: "md:col-span-3", // This card will span 3 of 5 columns on medium screens+
    },
    {
      Icon: ConnectIcon,
      title: "CONNECT",
      description: "Connect with like-minded people. Build relationships that last beyond the event. Help grow your network for future opportunities.",
      colSpan: "md:col-span-2", // This card will span 2 of 5 columns
    },
    {
      Icon: GrowIcon,
      title: "GROW",
      description: "Gain new skills, insights, and strategies to move forward. Apply what you learn, improve your work, and grow as an individual.",
      colSpan: "md:col-span-2", // This card will span 2 of 5 columns
    },
    {
      Icon: LearnIcon, 
      title: "GET INSPIRED",
      description: "Hear stories, ideas, and experiences that spark creativity. Walk away with fresh motivation and the energy to tackle new challenges with confidence.",
      colSpan: "md:col-span-3", // This card will span 3 of 5 columns
    },
  ];
// --- The Main Benefits Component ---

export const Benefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Header slides in once the section itself is 60% visible */
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

      /* Card-by-card reveal on scroll */
      const cards = gsap.utils.toArray<HTMLElement>('.benefit-card');
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
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative text-neutral-800 font-poppins flex  inset-0 bg-gradient-to-br from-black to-teal-300 flex-col items-center min-h-screen w-full py-24 px-4 max-sm:px-10 lg:px-8"
    >
      <div className="absolute inset-0 bg-black/60" />
      
      {/* --------- HEADER --------- */}
      <header className="relative z-10 text-center mb-16 max-w-4xl">
        <h1 className="header-title font-poppins text-4xl md:text-6xl font-bold text-white tracking-[0.2em] uppercase">
          The Future Is Now
        </h1>
        <p className="header-subtitle mt-4 text-lg text-neutral-200 max-w-2xl mx-auto">
          A dynamic environment designed to foster learning, connection, and inspiration.
          Exchange ideas and find new pathways for the tech landscape.
        </p>
      </header>

      {/* --------- CARDS GRID --------- */}
      <main className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 w-full max-w-6xl">
        {benefitsData.map(({ Icon, title, description, colSpan }, i) => (
          <div
            key={i}
            className={`benefit-card bg-[#FEF6F8] p-8 rounded-2xl flex flex-col items-start text-left ${colSpan}`}
          >
            <Icon className="w-10 h-10 text-[#32446d] mb-6" />
            <h2 className="font-mono text-2xl lg:text-3xl font-bold tracking-widest uppercase mb-3">
              {title}
            </h2>
            <p className="text-neutral-600">{description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};