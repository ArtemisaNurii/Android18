// src/components/Team.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- TypeScript Interfaces for Data Structures ---
interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

interface PartnerLogo {
  id: number;
  name: string;
  logoUrl: string;
}

// --- Mock Data (can be replaced with data from an API) ---
const teamMembersData: TeamMember[] = [
  {
    id: 1,
    name: 'Pasho Toska',
    role: 'Co-founder, Chairman',
    imageUrl: 'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-1.png',
  },
  {
    id: 2,
    name: 'Altin Luli',
    role: 'Managing Director',
    imageUrl: 'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-2.png',
  },
  {
    id: 3,
    name: 'Erion Domi',
    role: 'Head of Technology',
    imageUrl: 'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-3.png',
  },
  {
    id: 4,
    name: 'Ervin Ziko',
    role: 'Chief Financial Officer',
    imageUrl: 'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-4.png',
  },
];

const partnerLogosData: PartnerLogo[] = [
  {
    id: 1,
    name: 'Waverio',
    logoUrl: 'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/logo-waverio.svg',
  },
  {
    id: 2,
    name: 'Squarestone',
    logoUrl: 'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/logo-squarestone.svg',
  },
  {
    id: 3,
    name: 'Creaty',
    logoUrl: 'https://cdn.rareblocks.xyz/collection/clarity/images/team/1/logo-creaty.svg',
  },
];

// --- Sub-component for the SVG Separator ---
const SeparatorSVG: React.FC = () => (
  <svg
    className="w-auto h-4 mx-auto text-gray-300"
    viewBox="0 0 172 16"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)" />
    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)" />
  </svg>
);

// --- Main Team Component ---
const Team: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Using GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // Create a timeline for sequenced animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: 'top 80%', // Animation starts when the top of the component is 80% down the viewport
          toggleActions: 'play none none none',
        },
      });

      // Animate the main heading
      tl.from('.team-heading', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate team members with a stagger effect
      tl.from('.team-member-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2, // 0.2s delay between each card animation
        ease: 'power3.out',
      }, '-=0.5'); // Start this animation 0.5s before the previous one ends

      // Animate the separator and logos
      tl.from(['.separator', '.partner-logos'], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
      });

    }, componentRef);

    // Cleanup function to revert all animations
    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="py-12 bg-white sm:py-16 lg:py-20 font-sans">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl team-heading">
            Our Investors & Board of Directors
          </h2>
        </div>

        <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-4 gap-y-12 lg:gap-x-16 xl:gap-x-20">
          {teamMembersData.map((member) => (
            <div key={member.id} className="team-member-card">
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src={member.imageUrl}
                alt={member.name}
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">{member.name}</p>
              <p className="mt-2 text-base font-normal text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 separator">
          <SeparatorSVG />
        </div>

        <div className="max-w-3xl mx-auto mt-12 space-y-8 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:mt-16 sm:gap-x-16 partner-logos">
          {partnerLogosData.map((partner) => (
            <div key={partner.id}>
              <img className="w-auto mx-auto h-11" src={partner.logoUrl} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;