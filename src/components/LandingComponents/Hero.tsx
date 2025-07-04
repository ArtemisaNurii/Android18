import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowUpRight, FiSearch, FiBell, FiGrid, FiUsers, FiBriefcase, FiCheckSquare,
  FiUser, FiSettings, FiHelpCircle, FiPhoneCall, FiPlus, FiBarChart2
} from 'react-icons/fi';
import HeroHeadline from './HeroHeadline';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
gsap.registerPlugin(ScrollTrigger);

// --- CSS for the animated shine effect ---
const shineStyle = `
  @keyframes shine {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .shine-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(110deg, transparent 30%, #10b981, #34d399, transparent 70%);
    background-size: 250% 100%;
    animation: shine 5s linear infinite;
    opacity: 0.8;
  }
`;
const activityData = [
  {
    icon: FiTrendingUp,
    iconColor: "text-green-400",
    bgColor: "bg-green-500/10",
    description: "Project closed",
    category: "Revenues",
    categoryColor: "bg-green-500",
    amount: "+€22,500",
    amountColor: "text-green-400",
    time: "2h ago"
  },
  {
    icon: FiTrendingDown,
    iconColor: "text-red-400",
    bgColor: "bg-red-500/10",
    description: "Monthly server & API costs",
    category: "Expense",
    categoryColor: "bg-red-500",
    amount: "-€1,280",
    amountColor: "text-red-400",
    time: "8h ago"
  },
  {
    icon: FiBriefcase,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    description: "New Client Onboarded: Synergy Corp",
    category: "New",
    categoryColor: "bg-blue-500",
    amount: "+€8,200",
    amountColor: "text-green-400",
    time: "1d ago"
  },
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      
      tl.fromTo('.hero-text', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15 })
        .fromTo(dashboardRef.current, { scale: 0.9, opacity: 0, y: 100 }, { scale: 1, opacity: 1, y: 0, duration: 1.2 }, "-=0.8")
        .fromTo('.dashboard-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }, "-=0.8");

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const dashboard = dashboardRef.current;
          if (!dashboard) return;
          const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = dashboard.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) / (width / 2);
            const y = (clientY - (top + height / 2)) / (height / 2);
            gsap.to(dashboard, { duration: 0.7, rotateY: x * 5, rotateX: -y * 5, ease: 'power3.out' });
          };
          containerRef.current?.addEventListener('mousemove', onMouseMove);
          return () => {
            containerRef.current?.removeEventListener('mousemove', onMouseMove);
            gsap.to(dashboard, { duration: 0.8, rotateX: 0, rotateY: 0, ease: 'elastic.out(1, 0.5)' });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ fontFamily: "Poppins, sans" }} 
      className="relative flex items-center justify-center w-full min-h-screen py-40  text-gray-100 bg-black font-sans overflow-hidden"
    >
      <style>{shineStyle}</style>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-[#050a08] to-[#47a893]"></div>
      <div className="absolute inset-0 z-0 bg-dot-grid-white/[0.07] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 px-4">
        
      <HeroHeadline />


        <div className="flex flex-col items-center gap-6">
            <button className="hero-text bg-green-400 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transform transition-transform duration-300 hover:scale-105 hover:bg-green-300">
             Our Services <FiArrowUpRight />
            </button>
        </div>

        {/* --- Dashboard UI --- */}
        <div
          ref={dashboardRef}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-6xl mx-auto mt-8 bg-[#121212]/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl shadow-black/40 flex overflow-hidden shine-border hover:shadow-emerald-300/60"
        >
          {/* Sidebar - Hidden on mobile, flex on desktop */}
          <div className="hidden lg:flex w-[240px] flex-shrink-0 bg-black/20 p-4 border-r border-white/5 flex-col justify-between">
             <div>
              <div className="flex items-center gap-3 p-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-green-500 to-teal-400 flex items-center justify-center">
                    <FiBarChart2 size={18}/>
                </div>
                <h2 className="text-xl  text-white">Codevider</h2>
              </div>
              <nav className="flex flex-col gap-2">
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg bg-white/10 text-white "><FiGrid /> Dashboard</a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiUsers /> Leads</a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiBriefcase /> Companies</a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiCheckSquare /> Tasks</a>
              </nav>
            </div>
            <nav className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiUser /> Profile</a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiSettings /> Settings</a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiHelpCircle /> Support</a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl md:text-3xl  text-white">Sales Dashboard</h1>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                  <FiBell className="text-gray-400 hover:text-white cursor-pointer" size={20}/>
                  <FiSearch className="text-gray-400 hover:text-white cursor-pointer" size={20}/>
              </div>
            </div>

            {/* RESPONSIVE Grid for Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Lead Velocity Chart */}
              <div className="dashboard-item md:col-span-2 lg:col-span-2 bg-black/20 rounded-xl p-4 flex flex-col min-h-[250px]">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-gray-400 text-sm">Lead Velocity</p>
                          <p className="text-2xl md:text-3xl font-bold text-white">1,284 <span className="text-lg text-green-400 font-semibold">+15.7%</span></p>
                      </div>
                      <div className="flex gap-1 bg-black/40 p-1 rounded-lg">
                           {['1D', '7D'].map(t => <button key={t} className="px-2 py-1 text-xs text-gray-400 rounded hover:bg-white/10">{t}</button>)}
                          <button className="px-2 py-1 text-xs text-black bg-white rounded font-bold">1M</button>
                      </div>
                  </div>
                  <div className="flex-grow mt-4 -mb-2 -mx-4">
                      <svg width="100%" height="100%" viewBox="0 0 450 150" preserveAspectRatio="none">
                          <defs>
                              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                  <stop offset="0%" stopColor="rgba(4,211,153,0.3)" />
                                  <stop offset="100%" stopColor="rgba(4,211,153,0)" />
                              </linearGradient>
                          </defs>
                          <path d="M0,120 C50,110 80,90 130,95 S180,110 220,80 S280,30 330,40 S400,80 450,70" stroke="#04d399" fill="url(#chartGradient)" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                      </svg>
                  </div>
              </div>

              {/* Quick Actions */}
              <div className="dashboard-item lg:col-span-1 bg-black/20 rounded-xl p-4 flex flex-col gap-3 justify-center">
                  <h3 className="font-medium text-white text-center mb-2">Quick Actions</h3>
                  <button className="w-full text-left flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-semibold transition-colors"><FiPhoneCall className="text-green-400"/> Log a Call</button>
                  <button className="w-full text-left flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-semibold transition-colors"><FiCheckSquare className="text-green-400"/> Create a Task</button>
                  <button className="w-full text-left flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-semibold transition-colors"><FiPlus className="text-green-400"/> Add New Lead</button>
              </div>

              {/* Hot Leads - HIDDEN on mobile, visible on medium screens and up */}
              <div className="dashboard-item hidden md:flex flex-col md:col-span-2 lg:col-span-2 bg-black/20 rounded-xl p-4">
    <h3 className="font-medium text-white mb-3">Recent Activity</h3>
    <div className="flex-grow space-y-3 text-sm">
        {activityData.map((activity, index) => (
            <div key={index} className="grid grid-cols-12 items-center gap-4 p-1">
                {/* Icon */}
                <div className="col-span-1">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${activity.bgColor}`}>
                        <activity.icon className={activity.iconColor} size={18} />
                    </div>
                </div>

                {/* Description */}
                <div className="col-span-5">
                    <p className="font-semibold text-white truncate">{activity.description}</p>
                </div>

                {/* Category Pill */}
                <div className="col-span-2 flex justify-start">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full text-white/90 ${activity.categoryColor}`}>
                        {activity.category}
                    </span>
                </div>

                {/* Amount */}
                <div className="col-span-2">
                    <p className={`font-semibold text-right ${activity.amountColor}`}>{activity.amount}</p>
                </div>

                {/* Time */}
                <div className="col-span-2">
                    <p className="text-xs text-gray-500 text-right">{activity.time}</p>
                </div>
            </div>
        ))}
    </div>
</div>

              {/* Lead Sources */}
              <div className="dashboard-item lg:col-span-1 bg-black/20 rounded-xl p-4 flex flex-col">
                  <h3 className="font-bold text-white mb-2">Lead Sources</h3>
                  <div className="flex-grow flex items-center justify-center my-4">
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                         <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                            <circle cx="18" cy="18" r="15.9155" className="stroke-current text-green-500" fill="transparent" strokeWidth="4" strokeDasharray="55 45"></circle>
                            <circle cx="18" cy="18" r="15.9155" className="stroke-current text-blue-500" fill="transparent" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-55"></circle>
                            <circle cx="18" cy="18" r="15.9155" className="stroke-current text-amber-500" fill="transparent" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-85"></circle>
                        </svg>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Organic</div> <span>55%</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Referrals</div> <span>30%</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Paid Ads</div> <span>15%</span></div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};