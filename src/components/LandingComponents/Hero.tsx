// import React, { useLayoutEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import {
//   FiArrowUpRight, FiSearch, FiBell, FiGrid, FiUsers, FiBriefcase, FiCheckSquare,
//   FiUser, FiSettings, FiHelpCircle, FiPhoneCall, FiPlus, FiBarChart2
// } from 'react-icons/fi';
// import HeroHeadline from './HeroHeadline';
// import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
// gsap.registerPlugin(ScrollTrigger);

// // --- CSS for the animated shine effect ---
// const shineStyle = `
//   @keyframes shine {
//     0% { background-position: -200% 0; }
//     100% { background-position: 200% 0; }
//   }
//   .shine-border::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 1px;
//     background: linear-gradient(110deg, transparent 30%, #10b981, #34d399, transparent 70%);
//     background-size: 250% 100%;
//     animation: shine 5s linear infinite;
//     opacity: 0.8;
//   }
// `;
// const activityData = [
//   {
//     icon: FiTrendingUp,
//     iconColor: "text-green-400",
//     bgColor: "bg-green-500/10",
//     description: "Project closed",
//     category: "Revenues",
//     categoryColor: "bg-green-500",
//     amount: "+€22,500",
//     amountColor: "text-green-400",
//     time: "2h ago"
//   },
//   {
//     icon: FiTrendingDown,
//     iconColor: "text-red-400",
//     bgColor: "bg-red-500/10",
//     description: "Monthly server & API costs",
//     category: "Expense",
//     categoryColor: "bg-red-500",
//     amount: "-€1,280",
//     amountColor: "text-red-400",
//     time: "8h ago"
//   },
//   {
//     icon: FiBriefcase,
//     iconColor: "text-blue-400",
//     bgColor: "bg-blue-500/10",
//     description: "New Client Onboarded: Synergy Corp",
//     category: "New",
//     categoryColor: "bg-blue-500",
//     amount: "+€8,200",
//     amountColor: "text-green-400",
//     time: "1d ago"
//   },
// ];

// export const Hero: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const dashboardRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      
//       tl.fromTo('.hero-text', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15 })
//         .fromTo(dashboardRef.current, { scale: 0.9, opacity: 0, y: 100 }, { scale: 1, opacity: 1, y: 0, duration: 1.2 }, "-=0.8")
//         .fromTo('.dashboard-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }, "-=0.8");

//       ScrollTrigger.matchMedia({
//         "(min-width: 1024px)": () => {
//           const dashboard = dashboardRef.current;
//           if (!dashboard) return;
//           const onMouseMove = (e: MouseEvent) => {
//             const { clientX, clientY } = e;
//             const { left, top, width, height } = dashboard.getBoundingClientRect();
//             const x = (clientX - (left + width / 2)) / (width / 2);
//             const y = (clientY - (top + height / 2)) / (height / 2);
//             gsap.to(dashboard, { duration: 0.7, rotateY: x * 5, rotateX: -y * 5, ease: 'power3.out' });
//           };
//           containerRef.current?.addEventListener('mousemove', onMouseMove);
//           return () => {
//             containerRef.current?.removeEventListener('mousemove', onMouseMove);
//             gsap.to(dashboard, { duration: 0.8, rotateX: 0, rotateY: 0, ease: 'elastic.out(1, 0.5)' });
//           }
//         },
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//     id='hero'
//       ref={containerRef}
//       style={{ fontFamily: "Poppins, sans" }} 
//       className="relative flex items-center justify-center w-full min-h-screen py-40  text-gray-100 bg-black font-sans overflow-hidden"
//     >
//       <style>{shineStyle}</style>
//       <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-[#050a08] to-[#47a893]"></div>
//       <div className="absolute inset-0 z-0 bg-dot-grid-white/[0.07] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      
//       <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 px-4">
        
//       <HeroHeadline />


//         <div className="flex flex-col items-center gap-6">
//             <button className="hero-text bg-green-400 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transform transition-transform duration-300 hover:scale-105 hover:bg-green-300">
//              Our Services <FiArrowUpRight />
//             </button>
//         </div>

//         {/* --- Dashboard UI --- */}
//         <div
//           ref={dashboardRef}
//           style={{ transformStyle: 'preserve-3d' }}
//           className="relative w-full max-w-6xl mx-auto mt-8 bg-[#121212]/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl shadow-black/40 flex overflow-hidden shine-border hover:shadow-emerald-300/60"
//         >
//           {/* Sidebar - Hidden on mobile, flex on desktop */}
//           <div className="hidden lg:flex w-[240px] flex-shrink-0 bg-black/20 p-4 border-r border-white/5 flex-col justify-between">
//              <div>
//               <div className="flex items-center gap-3 p-2 mb-6">
//                 <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-green-500 to-teal-400 flex items-center justify-center">
//                     <FiBarChart2 size={18}/>
//                 </div>
//                 <h2 className="text-xl  text-white">Codevider</h2>
//               </div>
//               <nav className="flex flex-col gap-2">
//                   <a href="#" className="flex items-center gap-3 p-2 rounded-lg bg-white/10 text-white "><FiGrid /> Dashboard</a>
//                   <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiUsers /> Leads</a>
//                   <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiBriefcase /> Companies</a>
//                   <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiCheckSquare /> Tasks</a>
//               </nav>
//             </div>
//             <nav className="flex flex-col gap-2">
//                 <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiUser /> Profile</a>
//                 <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiSettings /> Settings</a>
//                 <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"><FiHelpCircle /> Support</a>
//             </nav>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1 p-4 md:p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h1 className="text-xl md:text-3xl  text-white">Sales Dashboard</h1>
//               </div>
//               <div className="flex items-center gap-2 md:gap-4">
//                   <FiBell className="text-gray-400 hover:text-white cursor-pointer" size={20}/>
//                   <FiSearch className="text-gray-400 hover:text-white cursor-pointer" size={20}/>
//               </div>
//             </div>

//             {/* RESPONSIVE Grid for Widgets */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Lead Velocity Chart */}
//               <div className="dashboard-item md:col-span-2 lg:col-span-2 bg-black/20 rounded-xl p-4 flex flex-col min-h-[250px]">
//                   <div className="flex justify-between items-start">
//                       <div>
//                           <p className="text-gray-400 text-sm">Lead Velocity</p>
//                           <p className="text-2xl md:text-3xl font-bold text-white">1,284 <span className="text-lg text-green-400 font-semibold">+15.7%</span></p>
//                       </div>
//                       <div className="flex gap-1 bg-black/40 p-1 rounded-lg">
//                            {['1D', '7D'].map(t => <button key={t} className="px-2 py-1 text-xs text-gray-400 rounded hover:bg-white/10">{t}</button>)}
//                           <button className="px-2 py-1 text-xs text-black bg-white rounded font-bold">1M</button>
//                       </div>
//                   </div>
//                   <div className="flex-grow mt-4 -mb-2 -mx-4">
//                       <svg width="100%" height="100%" viewBox="0 0 450 150" preserveAspectRatio="none">
//                           <defs>
//                               <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
//                                   <stop offset="0%" stopColor="rgba(4,211,153,0.3)" />
//                                   <stop offset="100%" stopColor="rgba(4,211,153,0)" />
//                               </linearGradient>
//                           </defs>
//                           <path d="M0,120 C50,110 80,90 130,95 S180,110 220,80 S280,30 330,40 S400,80 450,70" stroke="#04d399" fill="url(#chartGradient)" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
//                       </svg>
//                   </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="dashboard-item lg:col-span-1 bg-black/20 rounded-xl p-4 flex flex-col gap-3 justify-center">
//                   <h3 className="font-medium text-white text-center mb-2">Quick Actions</h3>
//                   <button className="w-full text-left flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-semibold transition-colors"><FiPhoneCall className="text-green-400"/> Log a Call</button>
//                   <button className="w-full text-left flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-semibold transition-colors"><FiCheckSquare className="text-green-400"/> Create a Task</button>
//                   <button className="w-full text-left flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-semibold transition-colors"><FiPlus className="text-green-400"/> Add New Lead</button>
//               </div>

//               {/* Hot Leads - HIDDEN on mobile, visible on medium screens and up */}
//               <div className="dashboard-item hidden md:flex flex-col md:col-span-2 lg:col-span-2 bg-black/20 rounded-xl p-4">
//     <h3 className="font-medium text-white mb-3">Recent Activity</h3>
//     <div className="flex-grow space-y-3 text-sm">
//         {activityData.map((activity, index) => (
//             <div key={index} className="grid grid-cols-12 items-center gap-4 p-1">
//                 {/* Icon */}
//                 <div className="col-span-1">
//                     <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${activity.bgColor}`}>
//                         <activity.icon className={activity.iconColor} size={18} />
//                     </div>
//                 </div>

//                 {/* Description */}
//                 <div className="col-span-5">
//                     <p className="font-semibold text-white truncate">{activity.description}</p>
//                 </div>

//                 {/* Category Pill */}
//                 <div className="col-span-2 flex justify-start">
//                     <span className={`text-xs font-bold px-2 py-1 rounded-full text-white/90 ${activity.categoryColor}`}>
//                         {activity.category}
//                     </span>
//                 </div>

//                 {/* Amount */}
//                 <div className="col-span-2">
//                     <p className={`font-semibold text-right ${activity.amountColor}`}>{activity.amount}</p>
//                 </div>

//                 {/* Time */}
//                 <div className="col-span-2">
//                     <p className="text-xs text-gray-500 text-right">{activity.time}</p>
//                 </div>
//             </div>
//         ))}
//     </div>
// </div>

//               {/* Lead Sources */}
//               <div className="dashboard-item lg:col-span-1 bg-black/20 rounded-xl p-4 flex flex-col">
//                   <h3 className="font-bold text-white mb-2">Lead Sources</h3>
//                   <div className="flex-grow flex items-center justify-center my-4">
//                     <div className="relative w-32 h-32 md:w-40 md:h-40">
//                          <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
//                             <circle cx="18" cy="18" r="15.9155" className="stroke-current text-green-500" fill="transparent" strokeWidth="4" strokeDasharray="55 45"></circle>
//                             <circle cx="18" cy="18" r="15.9155" className="stroke-current text-blue-500" fill="transparent" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-55"></circle>
//                             <circle cx="18" cy="18" r="15.9155" className="stroke-current text-amber-500" fill="transparent" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-85"></circle>
//                         </svg>
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-2 text-xs">
//                       <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Organic</div> <span>55%</span></div>
//                       <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Referrals</div> <span>30%</span></div>
//                       <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Paid Ads</div> <span>15%</span></div>
//                   </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };



// src/components/Hero.tsx
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowUpRight, FiSearch, FiBell, FiGrid, FiUsers, FiBriefcase, FiCheckSquare,
  FiUser, FiSettings, FiHelpCircle, FiPhoneCall, FiPlus, FiBarChart2,
  FiTrendingUp, FiTrendingDown, FiCode, FiDollarSign, FiCpu, FiCloud,
  FiShare2, FiLayers, FiDatabase, FiLock, FiTerminal
} from 'react-icons/fi';
import HeroHeadline from './HeroHeadline';

gsap.registerPlugin(ScrollTrigger);

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

const PHRASES = [
  "Blockchain Apps",
  "Fintech",
  "AI Productions",
  "API Management"
];
const TYPING_SPEED = 120;
const PAUSE_DURATION = 2000;
const DELETING_SPEED = 70;

const DASHBOARD_DATA = [
  {
    dashboardTitle: "Blockchain Analytics",
    mainStat: { label: "Transactions / Block", value: "2,912", trend: "+5.2%", trendColor: "text-green-400" },
    chartPath: "M0,80 C50,90 80,110 130,105 S180,90 220,100 S280,120 330,100 S400,60 450,70",
    quickActions: [
      { text: "Deploy Contract", icon: FiCloud },
      { text: "Inspect a Block", icon: FiSearch },
      { text: "View Mempool", icon: FiLayers },
    ],
    recentActivity: [
      { icon: FiTrendingUp, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "Contract 'TokenV2' Deployed", category: "Deployment", categoryColor: "bg-white/10", amount: "0.05 ETH", amountColor: "text-gray-300", time: "3m ago" },
      { icon: FiShare2, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "1,500 TOKEN transferred", category: "Transfer", categoryColor: "bg-white/10", amount: "-> 0x4f...c8", amountColor: "text-gray-300", time: "1h ago" },
      { icon: FiLock, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "Security Audit Completed", category: "Audit", categoryColor: "bg-white/10", amount: "98/100", amountColor: "text-green-400", time: "6h ago" }
    ],
    pieChart: {
      title: "Gas Usage by Contract",
      data: [
        { label: "TokenSwap", value: 60, color: "text-green-400" },
        { label: "NFTMinter", value: 25, color: "text-teal-400" },
        { label: "Staking", value: 15, color: "text-emerald-600" },
      ]
    }
  },
  {
    dashboardTitle: "Financial Overview",
    mainStat: { label: "Portfolio Value", value: "€1.25M", trend: "+1.8%", trendColor: "text-green-400" },
    chartPath: "M0,120 C50,110 80,90 130,95 S180,110 220,80 S280,30 330,40 S400,80 450,70",
    quickActions: [
      { text: "Execute Trade", icon: FiTrendingUp },
      { text: "Generate P&L Report", icon: FiBarChart2 },
      { text: "Compliance Check", icon: FiCheckSquare },
    ],
    recentActivity: [
      { icon: FiTrendingUp, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "Bought 10 AAPL Shares", category: "Trade", categoryColor: "bg-white/10", amount: "+€1,750.20", amountColor: "text-green-400", time: "12m ago" },
      { icon: FiTrendingDown, iconColor: "text-gray-400", bgColor: "bg-white/5", description: "Sold 5 TSLA Shares", category: "Trade", categoryColor: "bg-white/10", amount: "-€1,280.00", amountColor: "text-gray-300", time: "2h ago" },
      { icon: FiDollarSign, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "Dividend Received: MSFT", category: "Income", categoryColor: "bg-white/10", amount: "+€210.50", amountColor: "text-green-400", time: "1d ago" }
    ],
    pieChart: {
      title: "Asset Allocation",
      data: [
        { label: "Equities", value: 55, color: "text-green-400" },
        { label: "Bonds", value: 30, color: "text-teal-400" },
        { label: "Cash", value: 15, color: "text-emerald-600" },
      ]
    }
  },
  {
    dashboardTitle: "AI Model Performance",
    mainStat: { label: "Model Accuracy", value: "98.2%", trend: "+0.5%", trendColor: "text-green-400" },
    chartPath: "M0,40 C50,30 80,50 130,45 S180,30 220,50 S280,80 330,70 S400,50 450,60",
    quickActions: [
      { text: "Start Training Job", icon: FiCpu },
      { text: "Deploy to Production", icon: FiCloud },
      { text: "Analyze Dataset", icon: FiDatabase },
    ],
    recentActivity: [
      { icon: FiCpu, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "Job 'ClassifierV4' started", category: "Training", categoryColor: "bg-white/10", amount: "24h est.", amountColor: "text-gray-300", time: "5m ago" },
      { icon: FiTrendingUp, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "Model 'RecommenderV2' accuracy up", category: "Metric", categoryColor: "bg-white/10", amount: "94.5%", amountColor: "text-green-400", time: "3h ago" },
      { icon: FiDatabase, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "Dataset 'Images_Q4' ingested", category: "Data", categoryColor: "bg-white/10", amount: "10.2 GB", amountColor: "text-gray-300", time: "8h ago" }
    ],
    pieChart: {
      title: "Compute Resource Usage",
      data: [
        { label: "GPU", value: 70, color: "text-green-400" },
        { label: "CPU", value: 20, color: "text-teal-400" },
        { label: "Storage", value: 10, color: "text-emerald-600" },
      ]
    }
  },
  {
    dashboardTitle: "API Gateway Traffic",
    mainStat: { label: "Requests / Min", value: "1.2M", trend: "-2.1%", trendColor: "text-gray-400" },
    chartPath: "M0,70 C50,80 80,60 130,65 S180,80 220,50 S280,20 330,30 S400,70 450,60",
    quickActions: [
      { text: "Register New Endpoint", icon: FiPlus },
      { text: "View API Logs", icon: FiTerminal },
      { text: "Generate API Key", icon: FiLock },
    ],
    recentActivity: [
      { icon: FiTrendingDown, iconColor: "text-gray-400", bgColor: "bg-white/5", description: "High latency on /users endpoint", category: "Alert", categoryColor: "bg-white/10", amount: "1200ms", amountColor: "text-gray-300", time: "1m ago" },
      { icon: FiPlus, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "New Subscription: 'Partner Inc.'", category: "Billing", categoryColor: "bg-white/10", amount: "Pro Tier", amountColor: "text-green-400", time: "45m ago" },
      { icon: FiCode, iconColor: "text-green-400", bgColor: "bg-green-500/10", description: "API version v1.2 deployed", category: "Deployment", categoryColor: "bg-white/10", amount: "#a4b1c3", amountColor: "text-gray-300", time: "4h ago" }
    ],
    pieChart: {
      title: "Traffic by Endpoint",
      data: [
        { label: "/orders", value: 45, color: "text-green-400" },
        { label: "/users", value: 35, color: "text-teal-400" },
        { label: "/products", value: 20, color: "text-emerald-600" },
      ]
    }
  },
];

const getPieSlices = (data: {label: string; value: number; color: string}[]) => {
    let cumulativePercent = 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return [];

    return data.map(item => {
        const percent = (item.value / total) * 100;
        const slice = {
            ...item,
            percent,
            strokeDasharray: `${percent} ${100 - percent}`,
            strokeDashoffset: -cumulativePercent
        };
        cumulativePercent += percent;
        return slice;
    });
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const currentDashboardData = DASHBOARD_DATA[phraseIndex];
  const pieSlices = getPieSlices(currentDashboardData.pieChart.data);
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleTyping = () => {
      const currentPhrase = PHRASES[phraseIndex];
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
        }
      } else {
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        } else {
          timeoutId = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
        }
      }
    };
    timeoutId = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, phraseIndex]);

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
      id='hero'
      ref={containerRef}
      style={{ fontFamily: "Poppins, sans" }}
      className="relative flex items-center justify-center w-full min-h-screen py-40 text-gray-100 bg-black font-sans overflow-hidden"
    >
      <style>{shineStyle}</style>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-[#050a08] to-[#47a893]"></div>
      <div className="absolute inset-0 z-0 bg-dot-grid-white/[0.07] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 px-4">
        
        <HeroHeadline displayedText={displayedText} />

        <div className="flex flex-col items-center gap-6">
            <button className="hero-text bg-green-400 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transform transition-transform duration-300 hover:scale-105 hover:bg-green-300">
             Our Services <FiArrowUpRight />
            </button>
        </div>

        <div
          ref={dashboardRef}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-6xl mx-auto mt-8 bg-[#121212]/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl shadow-black/40 flex overflow-hidden shine-border hover:shadow-emerald-300/60"
        >
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

          <div className="flex-1 p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl md:text-3xl  text-white">{currentDashboardData.dashboardTitle}</h1>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                  <FiBell className="text-gray-400 hover:text-white cursor-pointer" size={20}/>
                  <FiSearch className="text-gray-400 hover:text-white cursor-pointer" size={20}/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="dashboard-item md:col-span-2 lg:col-span-2 bg-black/20 rounded-xl p-4 flex flex-col min-h-[250px]">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-gray-400 text-sm">{currentDashboardData.mainStat.label}</p>
                          <p className="text-2xl md:text-3xl font-bold text-white">
                              {currentDashboardData.mainStat.value} <span className={`text-lg font-semibold ${currentDashboardData.mainStat.trendColor}`}>{currentDashboardData.mainStat.trend}</span>
                          </p>
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
                          <path d={currentDashboardData.chartPath} stroke="#04d399" fill="url(#chartGradient)" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                      </svg>
                  </div>
              </div>

              <div className="dashboard-item lg:col-span-1 bg-black/20 rounded-xl p-4 flex flex-col gap-3 justify-center">
                  <h3 className="font-medium text-white text-center mb-2">Quick Actions</h3>
                  {currentDashboardData.quickActions.map((action, index) => (
                      <button key={index} className="group w-full text-left flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-semibold transition-all duration-200 ease-in-out">
                          <action.icon className="text-green-400 transition-transform duration-200 ease-in-out group-hover:scale-110"/> 
                          <span className="transition-transform duration-200 ease-in-out group-hover:translate-x-1">{action.text}</span>
                      </button>
                  ))}
              </div>

              <div className="dashboard-item hidden md:flex flex-col md:col-span-2 lg:col-span-2 bg-black/20 rounded-xl p-4">
                <h3 className="font-medium text-white mb-3">Recent Activity</h3>
                <div className="flex-grow space-y-2 text-sm">
                    {currentDashboardData.recentActivity.map((activity, index) => (
                        <div key={index} className="grid grid-cols-12 items-center gap-4 p-2 rounded-lg transition-colors hover:bg-white/[0.04]">
                            <div className="col-span-1">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${activity.bgColor}`}>
                                    <activity.icon className={activity.iconColor} size={18} />
                                </div>
                            </div>
                            <div className="col-span-5">
                                <p className="font-medium text-white truncate">{activity.description}</p>
                            </div>
                            <div className="col-span-2 flex justify-start">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full text-gray-200 ${activity.categoryColor}`}>
                                    {activity.category}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <p className={`font-semibold text-right ${activity.amountColor}`}>{activity.amount}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-gray-500 text-right">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>

              <div className="dashboard-item lg:col-span-1 bg-black/20 rounded-xl p-4 flex flex-col">
                  <h3 className="font-bold text-white mb-2">{currentDashboardData.pieChart.title}</h3>
                  <div className="flex-grow flex items-center justify-center my-4">
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                         <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                            {pieSlices.map((slice) => (
                                <circle 
                                    key={slice.label} 
                                    cx="18" cy="18" 
                                    r="15.9155" 
                                    className={`stroke-current ${slice.color} transition-all duration-300 ease-in-out`}
                                    fill="transparent" 
                                    strokeWidth={hoveredSlice === slice.label ? "5" : "4"}
                                    strokeDasharray={slice.strokeDasharray} 
                                    strokeDashoffset={slice.strokeDashoffset}
                                    style={{ transformOrigin: 'center center', transform: hoveredSlice === slice.label ? 'scale(1.05)' : 'scale(1)' }}
                                    opacity={hoveredSlice === null || hoveredSlice === slice.label ? 1 : 0.4}
                                />
                            ))}
                        </svg>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-sm">
                       {currentDashboardData.pieChart.data.map((item) => (
                            <div 
                                key={item.label} 
                                className="flex items-center justify-between cursor-pointer"
                                onMouseEnter={() => setHoveredSlice(item.label)}
                                onMouseLeave={() => setHoveredSlice(null)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${item.color.replace('text-', 'bg-')}`}></span> 
                                    <span className="text-gray-300">{item.label}</span>
                                </div> 
                                <span className="font-medium text-gray-200">{item.value}%</span>
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