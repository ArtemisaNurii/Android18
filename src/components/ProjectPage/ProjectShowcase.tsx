import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectShowcaseProps {
  project: Project;
  index: number;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project, index }) => {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (showcaseRef.current) {
        gsap.from(showcaseRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top 85%',
          },
        });
      }
    }, showcaseRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={showcaseRef} 
      className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-gray-700/70 transition-all duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Image Section - Smaller and more professional */}
        <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="relative w-full h-48 sm:h-56 lg:h-64 object-cover rounded-xl border border-gray-700/50 transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
        </div>
        
        {/* Content Section */}
        <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {/* Category and Client Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium border border-emerald-500/20">
              {project.category}
            </span>
            {project.client && (
              <span className="text-gray-400">
                <span className="text-gray-500">Client:</span> {project.client}
              </span>
            )}
            {project.duration && (
              <span className="text-gray-400">
                <span className="text-gray-500">Duration:</span> {project.duration}
              </span>
            )}
          </div>
          
          {/* Title and Description */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {/* Technologies */}
          <div>
            <p className="text-gray-400 font-medium mb-3 text-sm">Technologies & Tools:</p>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <span 
                  key={feature} 
                  className="bg-gray-800/60 border border-gray-700/50 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full hover:border-gray-600/70 transition-colors"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="pt-2">
            <Link
              to={`/projects/${project.id}`} 
              className="inline-flex items-center gap-2 text-white font-medium bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group"
            >
              View Case Study
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase; 