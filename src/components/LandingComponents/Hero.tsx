import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowUpRight, FiCheck, FiBarChart2, FiMessageSquare, FiList,
  FiCalendar, FiBell, FiSettings, FiRefreshCw, FiLock, FiPlus
} from 'react-icons/fi';
import { FaPiedPiper } from "react-icons/fa";

// GSAP Plugin registration
gsap.registerPlugin(ScrollTrigger);

// Data for the dashboard and logos - easy to update
const kpiData = [
  { icon: <FiCheck />, value: "46+", label: "Projects completed" },
  { icon: <FiBarChart2 />, value: "$25K", label: "Cost saved per month" },
  { icon: <FiMessageSquare />, value: "5h", label: "Hours saved per day" },
  { icon: <FiPlus />, value: "", label: "Add new metric" }
];
const logos = ["LOREM", "IPSUM", "LOGO", "GENESY", "PIPER"];

// The new Hero Component
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // GSAP Context for safe animation cleanup
    const ctx = gsap.context(() => {
      
      // 1. Entrance Animation Timeline
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
        { scaleY: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out' },
        "-=0.8"
      )
      .fromTo('.logo-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.5"
      );
      
      // 2. Interactive 3D Effect (Desktop only for performance)
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const dashboard = dashboardRef.current;
          if (!dashboard) return;

          // Mouse move for 3D tilt
          const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = dashboard.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) / (width / 2); // -1 to 1
            const y = (clientY - (top + height / 2)) / (height / 2); // -1 to 1
            
            gsap.to(dashboard, {
              duration: 0.7,
              rotateY: x * 8, // Adjust multiplier for more/less tilt
              rotateX: -y * 8,
              ease: 'power3.out'
            });
          };
          
          // Mouse enter for scale and shadow effect
          const onMouseEnter = () => {
            gsap.to(dashboard, {
              duration: 0.5,
              scale: 1.05,
              boxShadow: '0px 40px 80px -20px rgba(0, 255, 170, 0.2)', // Using a green accent for the glow
              ease: 'power3.out',
            });
          };
          
          // Mouse leave to reset
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

          // 3. Micro-interactions for KPI cards
          const kpiCards = gsap.utils.toArray('.kpi-card');
          kpiCards.forEach(card => {
            const c = card as HTMLElement;
            c.addEventListener('mouseenter', () => gsap.to(c, { y: -6, backgroundColor: '#1F1F1F', duration: 0.3, ease: 'power2.out' }));
            c.addEventListener('mouseleave', () => gsap.to(c, { y: 0, backgroundColor: '#171717', duration: 0.3, ease: 'power2.out' }));
          });
        },
      });
      
    }, containerRef);

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative flex items-center justify-center w-full min-h-screen px-4 py-20 overflow-hidden text-gray-100 bg-black font-sans"
      style={{ perspective: '1500px' }} // Enables 3D transforms for child elements
    >
      {/* Background Styling: Subtle gradient and dot pattern for a modern, techy feel */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-[#050a08] to-[#0a1f18]"></div>
      <div className="absolute inset-0 z-0 bg-dot-grid-white/[0.07] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      
      <div className="relative z-10 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Headline, Subtext, CTA, and Social Proof */}
        <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
          <h1 className="hero-text text-5xl md:text-6xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
            Strategic Softwares for Sustainable Growth.
          </h1>

          <p className="hero-text text-lg text-gray-300 max-w-lg leading-relaxed">
            We don't just build software; we engineer bespoke systems that integrate seamlessly into your workflow, driving efficiency and unlocking new avenues for growth.
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-xs mx-auto sm:max-w-none sm:mx-0">
            <button 
              onClick={() => {
              const servicesSection = document.getElementById('services-section');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }
              }}
              className="bg-white hover:bg-gray-200 transition-all duration-300 text-black font-medium py-3 px-8 rounded-md flex items-center justify-center gap-2 transform hover:scale-105"
            >
              Our Services <FiArrowUpRight />
            </button>
          </div>
          
          <div className="hero-text mt-12 w-full">
            <p className="text-gray-500 text-sm tracking-widest uppercase">Trusted By</p>
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

        {/* Right Column: The Interactive Dashboard Mockup */}
        <div 
          ref={dashboardRef}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-2xl mx-auto h-[500px] sm:h-[550px] bg-[#131313] rounded-xl border border-white/10 shadow-2xl shadow-black/40"
        >
          {/* Window Bar */}
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
            {/* Sidebar */}
            <div className="w-16 flex-shrink-0 flex-col items-center gap-6 py-6 border-r border-white/10 text-gray-500 hidden sm:flex">
                {[FiList, FiCalendar, FiBell, FiBarChart2, FiSettings].map((Icon, i) => (
                    <div key={i} className="relative p-2 rounded-lg hover:bg-white/5 transition-colors duration-300 cursor-pointer">
                      <Icon size={20} className={`transition-colors duration-300 ${i === 3 ? 'text-emerald-400' : 'hover:text-white'}`} />
                      {i === 2 && <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 rounded-full flex items-center justify-center text-white font-bold">3</span>}
                    </div>
                ))}
                <div className="mt-auto p-2">
                  <img src="https://i.pravatar.cc/32" alt="avatar" className="rounded-full opacity-80 hover:opacity-100 transition-opacity"/>
                </div>
            </div>
            
            {/* Main Content */}
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
                      {[1, 0.7, 0.8, 0.5, 0.9].map((h, i) => (
                          <div key={i} className="text-center group flex flex-col h-full justify-end">
                            <div className="chart-bar bg-gradient-to-t from-emerald-600/30 to-emerald-500/0 group-hover:from-emerald-500 group-hover:to-emerald-400/90 transition-colors duration-300 rounded-t-md" style={{height: `${h*100}%`}}></div>
                            <p className="text-xs text-gray-500 group-hover:text-white transition-colors duration-300 mt-2">{['Jan', 'Feb', 'Mar', 'Apr', 'May'][i]}</p>
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