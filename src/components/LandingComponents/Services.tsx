// import React, { useLayoutEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register the ScrollTrigger plugin with GSAP
// gsap.registerPlugin(ScrollTrigger);

// // Define the type for a single service item for TypeScript
// interface ServiceItem {
//   number: string;
//   title: string;
//   description: React.ReactNode;
// }

// // Array of service data with refined, brand-focused copy
// const servicesData: ServiceItem[] = [
//   {
//     number: '01',
//     title: 'Full-Stack Engineering',
//     description: (
//       <>
//         We build robust, scalable applications from the ground up. Our experts handle everything from intuitive user interfaces (React, Vue) to powerful server-side logic (Node.js, Python), ensuring a seamless user experience.
//       </>
//     ),
//   },
//   {
//     number: '02',
//     title: 'Bespoke Mobile Apps',
//     description: (
//       <>
//         Engage your users on the go with beautiful, high-performance native (iOS, Android) and cross-platform mobile applications. We turn your ideas into intuitive, pocket-sized experiences.
//       </>
//     ),
//   },
//   {
//     number: '03',
//     title: 'AI & Advanced Integrations',
//     description: (
//       <>
//         Future-proof your business by integrating cutting-edge AI, machine learning models, and complex third-party APIs. We unlock new capabilities and automate processes to give you a competitive edge.
//       </>
//     ),
//   },
//   {
//     number: '04',
//     title: 'DevOps & Cloud Architecture',
//     description: (
//       <>
//         Achieve maximum scalability and reliability with our cloud solutions. We design automated CI/CD pipelines and manage infrastructure on AWS, Azure, or GCP, so you can deploy with confidence.
//       </>
//     ),
//   },
//   {
//     number: '05',
//     title: 'Strategic UI/UX Design',
//     description: (
//       <>
//         Great software starts with exceptional design. Our UI/UX process focuses on creating user-centric, visually stunning interfaces that are not only beautiful but also drive engagement and conversions.
//       </>
//     ),
//   },
//   {
//     number: '06',
//     title: 'Quality Assurance & Testing',
//     description: (
//       <>
//         Deliver flawless software with our rigorous QA processes. We perform comprehensive testing—from automated checks to manual deep-dives—to ensure your application is stable, secure, and production-ready.
//       </>
//     ),
//   },
// ];

// const ServicesPage: React.FC = () => {
//   const mainRef = useRef<HTMLDivElement>(null);

//   // useLayoutEffect is preferred for GSAP animations to avoid FOUC
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // --- ANIMATION FOR THE HEADER ---
//       gsap.from('.services-title > *', {
//         scrollTrigger: {
//           trigger: '.services-title',
//           start: 'top 85%',
//           toggleActions: 'play none none reverse',
//         },
//         opacity: 0,
//         y: 40,
//         duration: 1,
//         ease: 'power3.out',
//         stagger: 0.2,
//       });

//       // --- ANIMATION FOR EACH SERVICE CARD ---
//       const cards = gsap.utils.toArray<HTMLElement>('.service-card');
//       cards.forEach((card) => {
//         gsap.from(card, {
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 85%',
//             end: 'bottom 60%',
//             toggleActions: 'play none none reverse',
//           },
//           y: 60,
//           opacity: 0,
//           duration: 0.8,
//           ease: 'power3.out',
//         });
//       });

//       // --- ANIMATION FOR THE PROGRESS LINE ---
//       gsap.from('.progress-line', {
//         scaleY: 0,
//         scrollTrigger: {
//           trigger: '.services-grid',
//           start: 'top 20%',
//           end: 'bottom 80%',
//           scrub: 1.5,
//         },
//         transformOrigin: 'top center',
//         ease: 'none',
//       });
//     }, mainRef);

//     // Cleanup function
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={mainRef}
//       id="services"
//       className="section-standard bg-[#ffffff] px-6 sm:px-8"
//     >
//       <div className="mx-auto max-w-7xl">
//         {/* --- HEADER --- */}
//         <div className="max-w-3xl mx-auto text-center services-title">
//           <p className="font-semibold leading-7 text-gray-500">SERVICES</p>
//           <h1 className="mt-2 text-4xl sm:text-5xl uppercase font-semibold leading-tight  text-black/70  pb-10">
// How Codevider Powers Your Tech          </h1>
//         </div>

//         <div className="relative">
       
//           <div
//             className="services-grid grid grid-cols-1 pt-10 gap-y-12 md:grid-cols-2 md:gap-y-20 md:pl-28 
//                        md:gap-x-24" 
//           >
//             {servicesData.map(({ number, title, description }) => (
//               <div key={number} className="service-card relative">
//                 {/* Number - absolutely positioned on desktop, static on mobile */}
//                 <div className="md:absolute md:left-0 md:-translate-x-full md:top-1.5 md:pr-8">
//                   <span className="text-2xl md:text-3xl font- text-[#36c574]">
//                     {number}
//                   </span>
//                 </div>
                
//                 {/* Card Content */}
//                 <div className="mt-2 md:mt-0">
//                   <h3 className="text-xl font-semibold leading-8 text-gray-900">{title}</h3>
//                   <p className="mt-2 text-base leading-7  text-black/70 ">
//                     {description}
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

// export default ServicesPage;

// import React from 'react';
// import { FiArrowRight } from 'react-icons/fi';

// // ============================================================================
// // 1. REUSABLE CARD COMPONENT (ServiceCard)
// // This component is now smarter, using a `variant` prop for styling.
// // ============================================================================

// // Define styles for each card variant to keep the component clean
// const cardVariants = {
//   primary: {
//     container: 'bg-[#2F855A] text-white',
//     iconColor: 'text-white',
//   },
//   light: {
//     container: 'bg-[#F7FAFC] text-gray-700 border border-gray-100',
//     iconColor: 'text-[#2F855A]',
//   },
//   dark: {
//     container: 'bg-gradient-to-br from-[#000000] to-[#2F855A] text-white',
//     iconColor: 'text-white',
//   },
// };

// const ServiceCard = ({ title, description, variant = 'light' }) => {
//   const style = cardVariants[variant] || cardVariants.light;

//   return (
//     <div
//       className={`
//         group rounded-xl shadow-lg p-8 flex flex-col justify-between min-h-[260px] sm:min-h-[280px]
//         transform hover:-translate-y-2 transition-transform duration-300 ease-in-out
//         ${style.container}
//       `}
//     >
//       <div>
//         <h3 className="text-xl font-bold mb-3">{title}</h3>
//         <p className="text-lg font-light leading-relaxed mb-4">
//           {description}
//         </p>
//       </div>
      
//       <div className="flex justify-end">
//         <FiArrowRight 
//           size={24} 
//           className={`
//             ${style.iconColor} 
//             transition-transform duration-300 ease-in-out
//             group-hover:translate-x-1
//           `} 
//         />
//       </div>
//     </div>
//   );
// };


// // ============================================================================
// // 2. PAGE SECTIONS
// // These are the distinct logical parts of the page.
// // ============================================================================

// const Header = () => (
//   <header className="px-6 sm:px-8 md:px-16 py-6 border-b border-gray-200">
//     <p className="text-sm text-gray-600 tracking-wider">
//       NORTHVOLT <span className="text-gray-400 ml-2 sm:ml-4">Sustainability & Annual Report 2023</span>
//     </p>
//   </header>
// );

// const Headline = () => (
//   <section className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
//     {/* Responsive font sizes fix the "disgusting" look on mobile */}
//     <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-700 leading-tight">
//       <span className="font-light">
//         We empower the three pivotal market segments that drive{' '}
//       </span>
//       <span className="font-semibold text-[#2F855A]">
//         innovation, efficiency, and growth.
//       </span>
//     </h1>
//   </section>
// );

// // Service data is defined here, making the grid component cleaner
// const servicesData = [
//   {
//     title: "Series A/B Start-ups",
//     description: "Ship your roadmap without payroll bloat. Deploy a dedicated pod in under two weeks.",
//     variant: 'primary',
//   },
//   {
//     title: "Enterprise Modernisation",
//     description: "Eliminate tech debt and refactor 25% cheaper by migrating to cloud-native SaaS.",
//     variant: 'light',
//   },
//   {
//     title: "CRM-Centric Orgs",
//     description: "Boost adoption by 35% with custom workflows. Achieve an $8.71 ROI for every $1 spent.",
//     variant: 'dark',
//   },
// ];

// const ServicesGrid = () => (
//   <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//     {servicesData.map((service) => (
//       <ServiceCard
//         key={service.title}
//         title={service.title}
//         description={service.description}
//         variant={service.variant}
//       />
//     ))}
//   </section>
// );




// const ServicesPage = () => {
//   return (
//     <div className="bg-[#FFFFFF] min-h-screen font-sans">
//       <Header />
      
//       <main className="px-6 sm:px-8 md:px-16  md:py-24">
//         <Headline />
//         <ServicesGrid />
//       </main>
//     </div>
//   );
// };

// export default ServicesPage;




import React, { useRef, useEffect } from 'react';
import DotGrid from '../ui/DotGrid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// The entire page is one single component as requested.
const ServicesPage = () => {
  // Refs for GSAP animations
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const gridRef = useRef(null);

  // GSAP Animation Effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animation from left with stagger
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            x: -100,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Grid animation from bottom
      if (gridRef.current) {
        gsap.fromTo(gridRef.current,
          {
            y: 100,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

      return (

    <div ref={containerRef} className="min-h-screen bg-[#f8f7f4] font-sans text-[#0f3d24]">
      
      {/* Outer wrapper for content padding and max-width */}
      <div className="mx-auto max-w-7xl px- py-10 sm:px-10 ">

        {/* Header Section */}
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-medium"></h2>
          <button className="rounded-fullpx-6 py-2 text-sm font-medium uppercase tracking-wider text-[#0f3d24] transition-colors ">
          </button>
        </header>

        {/* Main Content Section */}
        <main className="my-16 md:my-24">
          
          {/* Main Title */}
          <h1 ref={titleRef} className="text-5xl text-gray-700 p-6 max-sm:text-3xl font-medium leading-tight md:text-5xl lg:w-4/5">
          We empower the three pivotal market segments that drive      innovation, efficiency, and growth.    </h1>

          {/* Grid Section for the three columns */}
          <div className="mt-16 grid grid-cols-1 p-6 gap-x-12 gap-y-16 md:mt-24 lg:grid-cols-3">
            
 {/* Column 1 */}
 <div ref={el => cardsRef.current[0] = el}>
   <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-black to-cyan-800">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  </div>
  <h3 className="mb-4 text-xl font-normal leading-snug text-[#0f3d24]">
    Series A/B Start‑ups
  </h3>
  <p className="text-sm leading-relaxed text-[#0f3d24]/80">
    Ship your product roadmap without unnecessary payroll overhead—stand up
    a dedicated pod in under two weeks, enabling rapid MVP iteration and
    fast customer feedback loops.
  </p>
</div>

 {/* Column 2 */}
 <div ref={el => cardsRef.current[1] = el}>
   <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-black to-cyan-800">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  </div>
  <h3 className="mb-4 text-xl font-normal leading-snug text-[#0f3d24]">
    Enterprise Modernisation
  </h3>
  <p className="text-sm leading-relaxed text-[#0f3d24]/80">
    Modernise legacy systems with cloud‑native SaaS architectures—eliminate
    tech debt, improve maintainability, and reduce total cost of ownership
    by 25% per McKinsey & Company best practices.
  </p>
</div>

 {/* Column 3 */}
 <div ref={el => cardsRef.current[2] = el}>
   <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-black to-cyan-800">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  </div>
  <h3 className="mb-4 text-xl font-normal leading-snug text-[#0f3d24]">
    CRM‑Centric Orgs
  </h3>
  <p className="text-sm leading-relaxed text-[#0f3d24]/80">
    Design and implement bespoke CRM workflows that drive a 35% boost in
    user adoption and deliver an $8.71 return on every dollar spent (Nucleus
    Research), enhancing customer retention and process efficiency.
  </p>
</div>


          </div>
        </main>
      </div>


    </div>
  );
};

export default ServicesPage;