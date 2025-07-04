// // StickyScrollSpline.tsx
// import React, { useLayoutEffect, useRef } from 'react';
// import Spline from '@splinetool/react-spline';
// import type { Application } from '@splinetool/runtime';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // --- UPDATED DATA ---
// const galleryData = [
//   {
//     id: 1,
//     title: 'Discovery & Roadmap Alignment',
//     description:
//       'CodeVider’s discovery sprints sharpen your product vision, surface core user pains, and build a phased roadmap that speeds release cycles while staying on budget.',
//     splineEventName: 'Cube',
//   },
//   {
//     id: 2,
//     title: 'Robust Cloud Architecture',
//     description:
//       'Our senior engineers craft microservice and event-driven architectures on AWS, Azure, or GCP—ensuring security, performance, and effortless scaling as your business grows.',
//     splineEventName: 'Sphere',
//   },
//   {
//     id: 3,
//     title: 'Polished UX & UI',
//     description:
//       'From wireframes to pixel-perfect components, CodeVider blends accessibility and responsive design to turn complex flows into intuitive, delightful experiences.',
//     splineEventName: 'Torus',
//   },
//   {
//     id: 4,
//     title: 'Automated Delivery & 24/7 Monitoring',
//     description:
//       'CI/CD pipelines, real-time observability, and SLA-backed support keep your product healthy, secure, and always online—so you can focus on growth, not firefighting.',
//     splineEventName: 'Pyramid',
//   },
// ];

// export const Map: React.FC = () => {
//   const mainRef = useRef<HTMLDivElement>(null);
//   const splineContainerRef = useRef<HTMLDivElement>(null);
//   const textRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const splineApp = useRef<Application | null>(null);

//   // Capture the Spline app instance
//   const handleSplineLoad = (spline: Application) => {
//     splineApp.current = spline;
//   };

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       ScrollTrigger.matchMedia({
//         // Desktop & tablet
//         '(min-width: 768px)': () => {
//           ScrollTrigger.create({
//             trigger: mainRef.current,
//             start: 'top top',
//             end: 'bottom bottom',
//             pin: splineContainerRef.current,
//             pinSpacing: false,
//           });

//           galleryData.forEach((item, index) => {
//             if (index === 0) return; // default state

//             ScrollTrigger.create({
//               trigger: textRefs.current[index],
//               start: 'top center',
//               onEnter: () => {
//                 splineApp.current?.emitEvent('lookAt', item.splineEventName);
//               },
//               onLeaveBack: () => {
//                 const prev = galleryData[index - 1];
//                 splineApp.current?.emitEvent('lookAt', prev.splineEventName);
//               },
//             });
//           });
//         },
//         // Mobile: no pinning or animations
//         '(max-width: 767px)': () => {},
//       });
//     }, mainRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={mainRef} className="bg-white text-black font-sans">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Spline (pinned) */}
//           <div
//             ref={splineContainerRef}
//             className="relative w-full h-[60vh] md:h-screen md:sticky top-0 flex items-center justify-center p-4"
//           >
//             {/* <h1 className="absolute top-20 text-gray-800 left-1/2 -translate-x-1/2 text-3xl md:text-5xl font-bold pointer-events-none z-20">
// Outsource Coding            </h1> */}
//             <div className="relative w-full h-full">
//             <Spline scene="https://prod.spline.design/WyXPj3SZ2DVqDA-o/scene.splinecode" 


//                 onLoad={handleSplineLoad}
//                 className="absolute inset-0 w-full h-full"
//               />
//             </div>
//           </div>

//           {/* Text sections */}
//           <div className="md:col-start-2">
//             {galleryData.map((item, idx) => (
//               <div
//                 key={item.id}
//                 ref={el => (textRefs.current[idx] = el)}
//                 className="flex min-h-[50vh] md:min-h-screen flex-col justify-center py-20 md:py-24"
//               >
//                 <div className="max-w-md">
//                   <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                     {item.title}
//                   </h2>
//                   <p className="mt-6 text-lg leading-8 text-gray-600">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React from 'react';
// Assuming WorldMapDemo is exported from a file named WorldMap.tsx
import { WorldMapDemo } from './WorldMap';

// Dummy data to make the component runnable
const galleryData = [
  { id: 1, title: 'Discovery & Strategy', description: 'We start by understanding your vision, market, and users to define a clear product roadmap.' },
  { id: 2, title: 'UI/UX Design', description: 'Our designers craft intuitive and beautiful interfaces that deliver an exceptional user experience.' },
  { id: 3, title: 'Engineering & Development', description: 'Our expert engineers build robust, scalable, and secure products using modern technologies.' },
  { id: 4, title: 'Launch & Support', description: 'We ensure a smooth launch and provide ongoing support and iteration to help your product grow.' },
];

export const Map: React.FC = () => {
  return (
    <div className="bg-white font-sans">
      {/* --- BANNER SECTION --- */}
      <section className="relative h-[29vh] md:h-[40vh] min-h-[250px] md:min-h-[300px] w-full flex items-center justify-center max-sm:h-[15vh] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 -translate-y-20 md:-translate-y-44">
          <WorldMapDemo />
        </div>

        {/* This overlay sits on top of the map */}
        {/* <div className="absolute inset-0 bg-black/30 z-10" /> */}

        {/* Text container */} 
   
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700">
            Outsourced Product Partner
          </h1>
        
            <p className="mt-2 max-w-xs md:max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-900">
            Engineering, design & support—CodeVider powers your full product lifecycle.
          </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {galleryData.map(({ id, title, description }) => (
              <div
                key={id}
                className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-1 md:mb-2">{title}</h3>
                <p className="text-slate-600 text-sm md:text-base">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Map; // Added default export for clarity