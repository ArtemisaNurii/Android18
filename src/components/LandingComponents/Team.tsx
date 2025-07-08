// import React, { useLayoutEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register the GSAP plugin for scroll-based animations
// gsap.registerPlugin(ScrollTrigger);

// // --- Data Structure for Team Members ---
// interface TeamMember {
//   id: number;
//   name: string;
//   role: string;
//   imageUrl: string;
// }

// // --- Generate Placeholder Data for 25 People ---
// const roles = [
//   'Software Engineer', 'Product Manager', 'UI/UX Designer', 'Lead Developer', 
//   'QA Tester', 'DevOps Specialist', 'Data Scientist', 'Project Coordinator',
//   'Marketing Lead', 'Content Strategist', 'Customer Support', 'Frontend Developer'
// ];
// const firstNames = [
//   'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Jamie', 'Riley', 'Cameron',
//   'Avery', 'Peyton', 'Skyler', 'Reese', 'Quinn', 'Rowan', 'Finley'
// ];
// const lastNames = [
//   'Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore',
//   'Garcia', 'Rodriguez', 'Martinez', 'Lee', 'Walker', 'Hall', 'Allen'
// ];

// const teamMembers: TeamMember[] = Array.from({ length: 25 }, (_, i) => ({
//   id: i + 1,
//   name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
//   role: roles[i % roles.length],
//   // Using a consistent set of seeds for more "realistic" unique faces
//   imageUrl: `https://i.pravatar.cc/500?img=${i + 1}`,
// }));


// // --- The React Component ---
// const TeamPage: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLUListElement>(null);

//   useLayoutEffect(() => {
//     // Create a GSAP context for safe cleanup
//     const ctx = gsap.context(() => {
//       // Animate the grid items staggering in on scroll
//       gsap.from(gridRef.current!.children, {
//         opacity: 0,
//         y: 40,
//         duration: 0.8,
//         ease: 'power3.out',
//         stagger: 0.08, // This creates the beautiful staggered effect
//         scrollTrigger: {
//           trigger: gridRef.current,
//           start: 'top 85%', // Start animation when 85% of the viewport is reached
//           toggleActions: 'play none none reverse',
//         },
//       });
//     }, containerRef);

//     return () => ctx.revert(); // Cleanup GSAP animations on component unmount
//   }, []);

//   return (
//     <div ref={containerRef} className="bg-white">
//       <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
//         {/* Page Header */}
//         <div className="mx-auto max-w-2xl text-center">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             A dedicated team of professionals committed to pushing boundaries and delivering excellence in every project.
//           </p>
//         </div>

//         {/* Team Grid */}
//         <ul
//           ref={gridRef}
//           role="list"
//           className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5"
//         >
//           {teamMembers.map((person) => (
//             <li key={person.id} className="group">
//               <img
//                 className="mx-auto h-24 w-24 rounded-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg"
//                 src={person.imageUrl}
//                 alt={`Portrait of ${person.name}`}
//               />
//               <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
//               <p className="text-sm leading-6 text-indigo-600">{person.role}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TeamPage;