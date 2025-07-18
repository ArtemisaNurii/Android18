import React from 'react';
// Importing icons from react-icons
import { BsArrowRight, BsRecordCircle } from 'react-icons/bs';
import { FiFigma, FiSlack } from 'react-icons/fi';
import { SiWebpack } from "react-icons/si";

// Reusable component for the info columns in the header
const InfoColumn = ({ metric, description, linkText, linkHref }) => {
  return (
    <div className="transform transition-all duration-300 hover:scale-105">
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="font-semibold text-gray-700">{metric}</p>
      {linkText && (
        <a href={linkHref} className="text-gray-700 font-medium underline hover:no-underline">
          {linkText}
        </a>
      )}
    </div>
  );
};

// Reusable component for the service cards
const ServiceCard = ({ number, title, description, Icon, showArrow }) => {
  // The 'color' and 'hoverColorClass' props have been removed.
  // The card now has a gradient background and white text applied directly.
  return (
    <div
      className={`group flex flex-col justify-between p-8 rounded-3xl min-h-[400px] text-white cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2.5 bg-gradient-to-br from-black to-emerald-900`}
    >
      {/* Icon at the top - animates on parent group hover */}
      <div>
        <Icon className="text-4xl text-white transform transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-125" />
      </div>

      {/* Content at the bottom */}
      <div>
        <p className="text-lg font-semibold text-white">{number}</p>
        <h3 className="text-3xl font-bold my-2">{title}</h3>
        {description && <p className="text-white mt-4 mb-6">{description}</p>}
        
        {/* Horizontal line and arrow - updated for better contrast */}
        <div className="flex items-center justify-between border-t border-white/30 pt-4">
          {/* Empty div to push the arrow to the right, only if description exists */}
          <div>{description && <span className="invisible">placeholder</span>}</div>
          
          {showArrow && (
            <button
              // Arrow animates on parent group hover - updated for better contrast
              className="flex items-center justify-center w-12 h-12 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 transform group-hover:translate-x-2 group-hover:rotate-45"
            >
              <BsArrowRight className="text-2xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function Projectss() {
  const infoData = [
    {
      metric: "",
      description: "Our dedicated pod teams bring together engineers, product managers, and QA specialists into a seamless cross‑functional squad. Each pod is fully staffed and operational in under two weeks, ensuring your project hits the ground running.",
    },
    {
      metric: "",
      description: "We leverage the power and flexibility of the MERN stack alongside microservices architecture to deliver robust, scalable solutions. This modern tech foundation not only accelerates development cycles but also makes it easier to maintain and evolve your product over time.",
    },
    {
      metric: "",
      description: "Transparency and predictability are baked into every engagement with our outcome-based service level agreements. By closely monitoring scope and deliverables, we consistently keep scope creep under 5%, ensuring projects stay on budget and on schedule.",
    },
    {
      metric: "",
      description: "Scale your team up or down month‑to‑month with no long‑term obligations, giving you maximum agility to respond to changing business needs. Our streamlined hiring cycle-averaging just 40 days from request to onboarding-means you can quickly plug talent gaps without compromising on quality.",
    },
  ];
  
  // Removed the 'color' property as it's no longer needed
  const cardData = [
    {
      number: "01.",
      title: "Pod Teams",
      Icon: FiFigma,
      showArrow: true,
    },
    {
      number: "02.",
      title: "Modern Stack",
      description: "MERN & Microservices for 50-% faster releases",
      Icon: SiWebpack,
      showArrow: true,
    },
    {
      number: "03.",
      title: "Outcome SLAs",
      Icon: BsRecordCircle,
      showArrow: true,
    },
    {
      number: "04.",
      title: "Flexible Loaning",
      Icon: FiSlack,
      showArrow: true,
    },
  ];

  return (
    <div className="bg-[#f8f7f4] text-gray-700 min-h-screen font-sans overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-5xl max-sm:text-3xl font-semibold mb-12 max-w-4xl">
            Our Solution Pillars
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 text-gray-700 lg:grid-cols-4 gap-8">
            {infoData.map((info, index) => (
              <InfoColumn 
                key={index}
                linkHref={undefined} 
                linkText={undefined} 
                {...info} 
              />
            ))}
          </div>
        </header>

        {/* Cards Section */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cardData.map((card, index) => (
              <ServiceCard
                key={index}
                number={card.number}
                title={card.title}
                description={card.description ?? ""}
                Icon={card.Icon}
                showArrow={card.showArrow ?? false}
              />
            ))}
          </div>
        </main>
      </div>
      <div className='p-10'></div>
    </div>
  );
}