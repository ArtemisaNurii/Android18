// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// // import Spline from '@splinetool/react-spline';
// import { Application } from '@splinetool/runtime';

// const Hero: React.FC = () => {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const splineApp = useRef<Application | null>(null);
//   const [loaded, setLoaded] = useState(false);

//   const handleSplineLoad = (app: Application) => {
//     splineApp.current = app;
//     setLoaded(true);
//   };

//   useEffect(() => {
//     if (!contentRef.current) return;
//     gsap.fromTo(
//       contentRef.current,
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
//     );
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       id="hero"
//       className="relative w-full h-screen overflow-hidden font-sans text-white"
//     >
//       <div className="absolute bg-black inset-0 z-0 w-full h-full">
//         {/* <Spline
//           scene="https://prod.spline.design/69EEMNnKjd9kHoCE/scene.splinecode"
//           onLoad={handleSplineLoad}
//         /> */}
//       </div>
//       <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-sm" />
//       <div
//         ref={contentRef}
//         className="absolute inset-0 z-10 flex flex-col items-center justify-center md:items-start md:justify-end max-w-7xl mx-auto px-6 md:px-16 pb-16 opacity-0 text-center md:text-left"
//       >
//         <main className="grid md:grid-cols-2 items-center max-sm:items-start max-sm:space-x-0 space-x-24 gap-44 w-full">
//           <div className="max-w-4xl text-left">
//             <h1 className="text-4xl lg:text-5xl font-normal tracking-normal leading-tight">
//               Strategic Softwares for Sustainable Growth.
//             </h1>
//           </div>
//           <div className="max-w-md flex flex-col items-center gap-y-6 md:items-start">
//             <p className="text-base text-gray-300 leading-loose">
//               Join us in crafting a digital experience that truly distinguishes you from others
//             </p>
//             <button
//               id="services-button"
//               className="bg-white w-full text-black font-medium py-3 px-8 hover:brightness-110 transition-all"
//               onClick={() => {
//                 const section = document.getElementById('services-section');
//                 section?.scrollIntoView({ behavior: 'smooth' });
//               }}
//             >
//               Our services
//             </button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowUpRight, FiCheck, FiBarChart2, FiMessageSquare, FiList,
  FiCalendar, FiBell, FiSettings, FiRefreshCw, FiLock, FiPlus
} from 'react-icons/fi';
import { FaPiedPiper } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const kpiData = [
  { icon: <FiCheck />, value: "46+", label: "Projects completed" },
  { icon: <FiBarChart2 />, value: "$25K", label: "Cost saved per month" },
  { icon: <FiMessageSquare />, value: "5h", label: "Hours saved per day" },
  { icon: <FiPlus />, value: "", label: "Add new metric" }
];
const logos = ["LOREM", "IPSUM", "LOGO", "GENESY", "PIPER"];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      tl.fromTo('.hero-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
      )
      .fromTo(dashboardRef.current,
        { scale: 0.9, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2 },
        "-=0.8"
      )
      .fromTo('.chart-bar',
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, duration: 0.8, stagger: 0.05 },
        "-=0.8"
      )
      .fromTo('.logo-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.5"
      );
      
      ScrollTrigger.matchMedia({
        
        "(min-width: 1024px)": () => {
          const dashboard = dashboardRef.current;
          if (!dashboard) return;

          const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = dashboard.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) / (width / 2);
            const y = (clientY - (top + height / 2)) / (height / 2);
            
            gsap.to(dashboard, {
              duration: 0.7,
              rotateY: x * 8,
              rotateX: -y * 8,
              ease: 'power3.out'
            });
          };
          
          const onMouseEnter = () => {
            gsap.to(dashboard, {
              duration: 0.5,
              scale: 1.05,
              boxShadow: '0px 40px 80px -20px rgba(0, 255, 170, 0.2)',
              ease: 'power3.out',
            });
          };
          
          const onMouseLeave = () => {
            gsap.to(dashboard, {
              duration: 0.8,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              boxShadow: '0px 20px 40px -10px rgba(0, 0, 0, 0.4)',
              ease: 'elastic.out(1, 0.5)',
            });
          };

          containerRef.current?.addEventListener('mousemove', onMouseMove);
          dashboard.addEventListener('mouseenter', onMouseEnter);
          dashboard.addEventListener('mouseleave', onMouseLeave);

          const kpiCards = gsap.utils.toArray('.kpi-card');
          kpiCards.forEach(card => {
            const c = card as HTMLElement;
            c.addEventListener('mouseenter', () => gsap.to(c, { y: -6, backgroundColor: '#1F1F1F', duration: 0.3, ease: 'power2.out' }));
            c.addEventListener('mouseleave', () => gsap.to(c, { y: 0, backgroundColor: '#171717', duration: 0.3, ease: 'power2.out' }));
          });
        },
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative flex items-center justify-center w-full min-h-screen px-4 py-20 overflow-hidden text-gray-100 inset-0 bg-gradient-to-br from-black via-black to-teal-300 font-sans"
      style={{ perspective: '1500px' }}
    >      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 bg-dot-grid-white/[0.07] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      
      <div className="relative z-10 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
          <div className="hero-text bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2.5 text-sm backdrop-blur-sm">
            {/* <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400">Available Now</span> */}
          </div>

          <h1 className="hero-text text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
            CODEVIDER
          </h1>

          <p className="hero-text text-lg text-gray-400 max-w-md">
            Supercharge your workflow with next-generation AI solutions. We build systems that think, learn, and perform.
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <button 
              className="bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 text-black font-semibold py-3 px-6 rounded-sm flex items-center justify-center gap-2 transform hover:scale-105"
              onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
              }}
            >
              Get Started <FiArrowUpRight />
            </button>
          </div>
          
          <div className="hero-text mt-12 w-full">
            <p className="text-gray-500 text-sm">Trusted by the industry leaders</p>
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-4 flex-wrap">
              {logos.map((name, i) => (
                <div key={i} className="logo-item text-gray-600 hover:text-white transition-colors duration-300 flex items-center gap-2 opacity-0 grayscale hover:grayscale-0">
                  <FaPiedPiper size={20} />
                  <span className="font-bold tracking-widest text-sm">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div 
          ref={dashboardRef}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-2xl mx-auto h-[500px] sm:h-[550px] bg-[#131313] rounded-xl border border-white/10 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center gap-2 p-4 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-grow h-8 bg-black/30 rounded-md ml-4 flex items-center justify-between px-3 text-sm text-gray-500">
                <FiLock size={14} />
                <FiRefreshCw size={14} className="hover:text-white transition-colors cursor-pointer"/>
            </div>
          </div>
          
          <div className="flex h-[calc(100%-65px)]">
            <div className="w-16 flex-col items-center gap-6 py-6 border-r border-white/10 text-gray-500 hidden sm:flex">
                {[FiList, FiCalendar, FiBell, FiBarChart2, FiSettings].map((Icon, i) => (
                    <div key={i} className="relative p-2 rounded-lg hover:bg-white/5 transition-colors duration-300 cursor-pointer">
                      <Icon size={20} className={`transition-colors duration-300 ${i === 0 ? 'text-white' : 'hover:text-white'}`} />
                      {i === 1 && <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-emerald-500 rounded-full flex items-center justify-center text-black font-bold">12</span>}
                    </div>
                ))}
                <div className="mt-auto p-2">
                  <img src="https://i.pravatar.cc/32?u=a042581f4e29026704d" alt="avatar" className="rounded-full opacity-80 hover:opacity-100 transition-opacity"/>
                </div>
            </div>
            
            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 overflow-hidden">
                <h2 className="text-xl font-semibold text-white">Dashboard Overview</h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpiData.map((kpi, i) => (
                      <div key={i} className={`kpi-card p-3 sm:p-4 rounded-lg flex flex-col gap-2 transition-all duration-300 cursor-pointer ${i === 3 ? 'bg-transparent border border-dashed border-gray-700 hover:border-gray-500 hover:text-white justify-center items-center text-gray-600' : 'bg-[#171717] hover:shadow-lg'}`}>
                        {i < 3 ? ( <>
                            <div className="flex justify-between items-center text-gray-400"> {kpi.icon} <FiArrowUpRight className="text-emerald-400" /> </div>
                            <p className="text-xl sm:text-2xl font-bold text-white">{kpi.value}</p>
                            <p className="text-xs text-gray-500">{kpi.label}</p> </>
                        ) : ( <> {kpi.icon} <p className="text-xs mt-2">{kpi.label}</p> </>)}
                      </div>
                    ))}
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <h3 className="font-semibold text-white">Efficiency Gains</h3>
                    <div className="flex-1 grid grid-cols-5 gap-3 sm:gap-4 items-end">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month) => (
                          <div key={month} className="text-center group">
                            <div className="chart-bar h-full bg-gradient-to-t from-emerald-600/50 to-emerald-500/90 group-hover:from-emerald-500 group-hover:to-emerald-400 transition-colors duration-300 rounded-t-md"></div>
                            <p className="text-xs text-gray-500 group-hover:text-white transition-colors duration-300 mt-2">{month}</p>
                          </div>
                      ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};