

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable card component to keep the main component clean and organized
const FeatureCard = ({ id, title, description }) => {
  return (
    <div className="rounded-2xl p-6 flex flex-col h-full transition-all duration-300 hover:scale-105 bg-[#e0e0e0] text-black hover:bg-transparent hover:text-white hover:border-2 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.6)] border-2 border-transparent">
      {/* Card Number */}
      <span className="text-sm font-medium">{id}</span>
      
      <div className="flex-grow flex items-end mt-4">
        <h3 className="text-3xl md:text-2xl lg:text-4xl font-medium uppercase leading-tight">
          {title}
        </h3>
      </div>
      
      <div>
        <hr className="w-full border-t border-black/30 hover:border-white/30 my-4 transition-colors duration-300" />
        <p className="text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

// Main Section Component
const Projectss = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      id: '01',
      title: 'Fast Delivery',
      description: 'Optimized development pipelines and automation ensure your projects launch at record speed.',
    },
    {
      id: '02',
      title: 'Granular Access Controls',
      description: 'Define precise user roles and permissions to keep your codebase secure and compliant.',
    },
    {
      id: '03',
      title: 'Unlimited Scalability',
      description: 'Our modular architecture grows with you—deploy and manage applications across any number of devices effortlessly.',
    },
  ];
  

  return (
    <section className="section-standard w-full min-h-screen flex items-center py-16 md:py-24 justify-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col">

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight text-white uppercase tracking-wide mb-6 lg:mb-0">
              What makes us<br />different
            </h1>
            <div className="flex flex-col lg:items-end gap-4 sm:gap-6">
              <p className="text-sm text-gray-400 max-w-sm lg:text-right">
                Our commitment to quality and innovation is what sets us apart from the competition.
              </p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/projects')}
                  className="bg-[#ffffff] text-[#2a2a2a] text-xs px-5 py-2 rounded-full border border-gray-700 hover:text-white hover:bg-black transition-colors uppercase"
                >
                  Our projects
                </button>
         
              </div>
            </div>
          </div>

          {/* Bottom part: Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature) => (
              <div key={feature.id} className="h-[20rem] sm:h-[22rem] md:h-auto md:aspect-square">
                <FeatureCard 
                  id={feature.id}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projectss;