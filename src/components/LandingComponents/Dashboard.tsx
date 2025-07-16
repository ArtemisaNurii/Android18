import { useState } from 'react';
import { FiBarChart2, FiGrid, FiUsers, FiBriefcase, FiCheckSquare, FiUser, FiSettings, FiHelpCircle, FiBell, FiSearch, FiPlay, FiUploadCloud, FiDatabase } from 'react-icons/fi';

// Dummy data to make the component self-contained for this example
const currentDashboardData = {
  dashboardTitle: 'AI Model Performance',
  mainStat: {
    label: 'Model Accuracy',
    value: '98.2%',
    trend: '+0.5%',
    trendColor: 'text-emerald-400',
  },
  chartPath: "M0,75 C50,50 100,100 150,80 S250,60 300,90 S400,120 450,100",
  quickActions: [
    { text: 'Start Training Job', icon: FiPlay },
    { text: 'Deploy to Production', icon: FiUploadCloud },
    { text: 'Analyze Dataset', icon: FiDatabase },
  ],
  recentActivity: [
    { description: "Job 'ClassifierV4' started", category: 'Training', amount: '24h est.', time: '5m ago', icon: FiPlay, bgColor: 'bg-green-500/20', iconColor: 'text-green-400', categoryColor: 'bg-green-500/30', amountColor: 'text-white' },
    { description: "Model 'RecommenderV2' accuracy up", category: 'Metric', amount: '94.5%', time: '3h ago', icon: FiBarChart2, bgColor: 'bg-emerald-500/20', iconColor: 'text-emerald-400', categoryColor: 'bg-emerald-500/30', amountColor: 'text-emerald-400' },
    { description: "Dataset 'images_Q4' ingested", category: 'Data', amount: '10.2 GB', time: '8h ago', icon: FiDatabase, bgColor: 'bg-sky-500/20', iconColor: 'text-sky-400', categoryColor: 'bg-sky-500/30', amountColor: 'text-white' },
  ],
  pieChart: {
    title: 'Compute Resource Usage',
    data: [
      { label: 'GPU', value: 70, color: 'text-green-400' },
      { label: 'CPU', value: 20, color: 'text-teal-400' },
      { label: 'Storage', value: 10, color: 'text-sky-400' },
    ]
  }
};


export default function Dashboard() {
  // Dummy state for pie chart hover effect
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const pieSlices = []; // Assume pie chart logic populates this

  return (
    <div
      style={{ transformStyle: 'preserve-3d' }}
      className="relative w-full max-w-7xl mx-auto my-8 bg-[#121212]/50 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl shadow-black/40 flex flex-col lg:flex-row overflow-hidden"
    >
      {/* --- SIDEBAR / MOBILE HEADER --- */}
      {/* Becomes a top bar on mobile (flex-row) and a sidebar on desktop (lg:flex-col) */}
      <div className="lg:flex w-full lg:w-[240px] xl:w-[280px] flex-shrink-0 bg-black/20 p-3 sm:p-4 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-row lg:flex-col justify-between">
        
        {/* Top section: Logo and Nav */}
        <div className="flex-1 lg:flex-none">
          <div className="flex items-center gap-2 sm:gap-3 p-1 sm:p-2 mb-4 lg:mb-6">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-tr from-green-500 to-teal-400 flex items-center justify-center">
              {/* Responsive icons: smaller for mobile, larger for desktop */}
              <FiBarChart2 size={16} className="lg:hidden" />
              <FiBarChart2 size={18} className="hidden lg:block" />
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl text-white font-semibold">Codevider</h2>
          </div>

          {/* Desktop Navigation: Hidden on mobile, flex-col on desktop */}
          <nav className="hidden lg:flex flex-col gap-2">
            <a href="#" className="flex items-center gap-3 p-2 rounded-lg bg-white/10 text-white text-sm"><FiGrid size={16} /> Dashboard</a>
            <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors text-sm"><FiUsers size={16} /> Leads</a>
            <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors text-sm"><FiBriefcase size={16} /> Companies</a>
            <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors text-sm"><FiCheckSquare size={16} /> Tasks</a>
          </nav>

          {/* Mobile Navigation: A scrollable tab bar, hidden on desktop */}
          <div className="lg:hidden flex gap-1 overflow-x-auto">
            <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs whitespace-nowrap"><FiGrid size={12} /> Dashboard</a>
            <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 text-gray-300 text-xs whitespace-nowrap"><FiUsers size={12} /> Leads</a>
            <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 text-gray-300 text-xs whitespace-nowrap"><FiBriefcase size={12} /> Companies</a>
            <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 text-gray-300 text-xs whitespace-nowrap"><FiCheckSquare size={12} /> Tasks</a>
          </div>
        </div>
        
        {/* Bottom section: Profile/Settings */}
        {/* Desktop utility nav: hidden on mobile */}
        <nav className="hidden lg:flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors text-sm"><FiUser size={16} /> Profile</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors text-sm"><FiSettings size={16} /> Settings</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors text-sm"><FiHelpCircle size={16} /> Support</a>
        </nav>

        {/* Mobile Icons: Shown only on mobile at the end of the header */}
        <div className="lg:hidden flex items-center gap-3">
          <FiBell className="text-gray-400 hover:text-white cursor-pointer" size={18} />
          <FiSearch className="text-gray-400 hover:text-white cursor-pointer" size={18} />
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold">{currentDashboardData.dashboardTitle}</h1>
          {/* Desktop header icons: hidden on mobile as they are in the top bar */}
          <div className="hidden sm:flex items-center gap-4">
            <FiBell className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            <FiSearch className="text-gray-400 hover:text-white cursor-pointer" size={20} />
          </div>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">

          {/* Main Chart: Spans full width on mobile/tablet, 2/3 on desktop */}
          <div className="dashboard-item sm:col-span-2 xl:col-span-2 bg-black/20 rounded-xl p-4 flex flex-col min-h-[250px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{currentDashboardData.mainStat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {currentDashboardData.mainStat.value} <span className={`text-lg font-semibold ${currentDashboardData.mainStat.trendColor}`}>{currentDashboardData.mainStat.trend}</span>
                </p>
              </div>
              <div className="flex gap-1 bg-black/40 p-1 rounded-lg">
                {['1D', '7D'].map(t => <button key={t} className="px-2.5 py-1 text-xs text-gray-400 rounded-md hover:bg-white/10">{t}</button>)}
                <button className="px-2.5 py-1 text-xs text-black bg-white rounded-md font-bold">1M</button>
              </div>
            </div>
            <div className="flex-grow mt-4 -mb-4 -mx-4">
              <svg width="100%" height="100%" viewBox="0 0 450 150" preserveAspectRatio="none" className="min-h-[120px]">
                <defs><linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="rgba(4,211,153,0.3)" /><stop offset="100%" stopColor="rgba(4,211,153,0)" /></linearGradient></defs>
                <path d={currentDashboardData.chartPath} stroke="#04d399" fill="url(#chartGradient)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>

          {/* Quick Actions: Full width on mobile, 1/2 on tablet, 1/3 on desktop */}
          <div className="dashboard-item bg-black/20 rounded-xl p-4 flex flex-col gap-3 justify-center">
            <h3 className="font-semibold text-white text-base text-center mb-2">Quick Actions</h3>
            {currentDashboardData.quickActions.map((action, index) => (
              <button key={index} className="group w-full text-left flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg font-semibold transition-colors text-sm">
                <action.icon className="text-green-400" size={18} />
                <span>{action.text}</span>
              </button>
            ))}
          </div>

          {/* Recent Activity: Spans full width on mobile/tablet, 2/3 on desktop */}
          <div className="dashboard-item sm:col-span-2 xl:col-span-2 bg-black/20 rounded-xl p-4">
            <h3 className="font-semibold text-white text-base mb-3">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              {currentDashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-2 rounded-lg transition-colors hover:bg-white/[0.04]">
                  <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${activity.bgColor}`}>
                    <activity.icon className={activity.iconColor} size={16} />
                  </div>
                  <p className="font-medium text-white flex-1 truncate">{activity.description}</p>
                  {/* Category Tag: Hidden on small mobile to save space */}
                  <div className="hidden sm:block">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${activity.categoryColor}`}>{activity.category}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-semibold text-sm ${activity.amountColor}`}>{activity.amount}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart: Full width on mobile, 1/2 on tablet, 1/3 on desktop */}
          <div className="dashboard-item bg-black/20 rounded-xl p-4 flex flex-col">
            <h3 className="font-semibold text-white text-base mb-2">{currentDashboardData.pieChart.title}</h3>
            <div className="flex-grow flex items-center justify-center my-4">
              {/* Responsive SVG container */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40">
                {/* SVG implementation here */}
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              {currentDashboardData.pieChart.data.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
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
  );
}