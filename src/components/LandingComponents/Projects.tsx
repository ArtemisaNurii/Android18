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
import { WorldMapDemo } from './WorldMap';
import { Blend, ChartSpline, Code } from 'lucide-react';

const featuresData = [
  {
    id: 1,
    icon: Code,
    title: 'Code Craftsmanship',
    description: 'We hold ourselves to the highest standards of quality, writing clean, maintainable, and well-tested code. We ensure long-term reliability and ease of future enhancements.',
  },
  {
    id: 2,
    icon: Blend,
    title: 'Transparent Collaboration',
    description: 'Open communication, clear priorities, and full visibility into progress and challenges keep our clients informed and engaged at every step.',
  },
  {
    id: 3,
    icon: ChartSpline,
    title: 'Continuous Innovation',
    description: 'We invest in learning the latest tools, frameworks, and best practices so that our solutions stay ahead of the curve.',
  },
];

export const Map: React.FC = () => {
  return (
    <div className="relative bg-white font-sans">
      
      {/* 1. MAP BANNER SECTION */}
      <header 
  
        className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] overflow-hidden max-sm:bottom-4  bottom-64"
      >
        <div 
          className="
            absolute inset-0 
            transition-transform duration-500 ease-in-out
            
            -translate-y-[%] 
            
            md:-translate-y-[15%] 
            
            lg:-translate-y-[10%]
            
            xl:translate-y-0
            max-sm:scale-100
          "
        >
          {/* The WorldMapDemo now fills its positioned wrapper */}
          <WorldMapDemo />
        </div>
      </header>

      {/* 2. CONTENT SECTION */}
      {/* This part remains the same as my previous suggestion, as it correctly handles the overlap. */}
      <section 
        className="relative z-10 bg-white -mt-16  max-sm:-mt-44 md:-mt-24 rounded-t-2xl pt-12 pb-16 sm:pt-16 sm:pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 items-start">
            <div className="lg:pr-8">
              <p className="text-sm font-semibold leading-7 text-teal-600 uppercase tracking-wider">
                Global Partnership
              </p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Outsourcing Code Company
              </h2>
            </div>
            <div className="lg:pt-2">
              <p className="text-lg leading-8 text-gray-600">
                Unlock cost savings and expert precision, scale with agile flexibility, and focus on what you do best—outsource the rest.
              </p>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {featuresData.map(({ id, icon: Icon, title, description }) => (
                <div key={id}>
                  <div className="mb-4">
                    <Icon className="h-8 w-8 text-teal-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">{title}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Map;