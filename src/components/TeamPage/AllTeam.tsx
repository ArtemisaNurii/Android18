"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Masonry from "../ui/Mansory";
import { items } from "./Team Member";

// --- Data Structure Update ---
// Added an `imageUrl` for each member to make it more personal.
// Using placeholder images from picsum.photos. Replace with your actual team photos.
interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}


// --- New Team Member Card Component ---
// This card is rectangular, more suited for portraits.
// It features an interactive hover effect that reveals details.
const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className="team-card group relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-lg">
    {/* Background Image */}
    <img
      src={member.imageUrl}
      alt={`${member.name} portrait`}
      className="absolute inset-0 z-0 h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:grayscale-0 grayscale"
    />

    {/* Content Overlay */}
    {/* This overlay slides up on hover, revealing the role. */}
    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white transition-transform duration-500 ease-in-out  transform translate-y-[calc(100%-80px)] group-hover:translate-y-0">
      <h3 className="text-xl font-bold tracking-tight">{member.name}</h3>
      
      {/* Role appears with a slight delay after the slide-up */}
      <div className="mt-2 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:delay-300">
        <p className="text-sm text-green-300 font-medium">{member.role}</p>
        {/* You could add social media links here */}
        <div className="mt-4 flex space-x-4">
            {/* Example: <a href="#" className="text-white/70 hover:text-white">LinkedIn</a> */}
        </div>
      </div>
    </div>
  </div>
);

// --- Main Page Component (Largely the same) ---
const AllTeam: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // The GSAP animation for initial load remains the same - it's a great effect!
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-card",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: { amount: 0.5, from: "start" },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="w-full mt-20 min-h-screen  text-white font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {/* --- Header Section (Slightly updated for the new theme) --- */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white bg-clip-text ">
            Meet Our Minds
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            A collective of brilliant minds dedicated to crafting the future. Get to know the people who make it all happen.
          </p>
        </div>
<div className="mt-20">        <Masonry
  items={items}
  ease="power3.out"
  duration={0.6}
  stagger={0.05}
  animateFrom="bottom"
  scaleOnHover={true}
  hoverScale={0.95}
  blurToFocus={true}
  colorShiftOnHover={false}
/></div>

      </div>
    </main>
  );
};

export default AllTeam;