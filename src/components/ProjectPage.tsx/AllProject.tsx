// src/components/ProjectPage.tsx

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // <--- 1. Import Link
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Interfaces and Data (Removed the 'link' property) ---
interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  features: string[];
}

// For a real app, you might want to move this data to its own file (e.g., src/data/projects.ts)
// and import it in both ProjectPage and ProjectDetailPage.
export const projectsData: Project[] = [
    { 
      id: 1, 
      title: 'Enterprise CRM Platform', 
      category: 'Web Application', 
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
      description: 'A comprehensive CRM solution designed for large-scale enterprises to manage customer relations, sales pipelines, and marketing campaigns with unparalleled efficiency.', 
      features: ['React.js', 'Node.js', 'PostgreSQL', 'Data Analytics', 'CI/CD Pipeline']
    },
    { 
      id: 2, 
      title: 'AI-Powered Analytics', 
      category: 'Data Science', 
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
      description: 'An advanced analytics dashboard that uses machine learning to provide predictive insights and rich data visualizations for business intelligence.', 
      features: ['Python (Flask)', 'TensorFlow', 'Scikit-learn', 'D3.js', 'AWS SageMaker']
    },
    { 
      id: 3, 
      title: 'Mobile Banking App', 
      category: 'Mobile Application', 
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
      description: 'A secure and intuitive mobile banking application for iOS and Android, featuring biometric login, instant fund transfers, and bill payment services.', 
      features: ['React Native', 'Firebase', 'Biometric Auth', 'PCI Compliance', 'Java/Kotlin']
    },
    { 
      id: 4, 
      title: 'Corporate Branding & Website', 
      category: 'UI/UX Design & Development', 
      imageUrl: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80', 
      description: 'Complete rebranding and a new corporate website for a major tech firm, focusing on a modern UI/UX, accessibility (WCAG 2.1), and a compelling brand story.', 
      features: ['Figma', 'Next.js', 'Contentful CMS', 'GSAP', 'WCAG 2.1']
    },
];

// --- Sub-component for a single project showcase ---
interface ProjectShowcaseProps {
    project: Project;
    index: number;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project, index }) => {
    const showcaseRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;

    useEffect(() => {
        // ... (GSAP animation code remains the same)
        const ctx = gsap.context(() => {
            if (showcaseRef.current) {
                gsap.from(showcaseRef.current.children, {
                    opacity: 0, y: 60, duration: 0.8, ease: 'power3.out', stagger: 0.2,
                    scrollTrigger: { trigger: showcaseRef.current, start: 'top 80%' },
                });
            }
        }, showcaseRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={showcaseRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className={`flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <p className="text-gray-400 font-bold tracking-widest uppercase mb-3">{project.category}</p>
                <h3 className="text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight">{project.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{project.description}</p>
                <div className="mb-8">
                    <p className="text-gray-400 font-semibold mb-3">Key Features & Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                        {project.features.map(feature => (
                            <span key={feature} className="bg-gray-800 border border-gray-700 text-emerald-300 text-sm font-medium px-3 py-1 rounded-full">
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
                {/* --- 2. Replace <a> with <Link> and update the destination --- */}
                <Link
                    to={`/projects/${project.id}`} 
                    className="inline-flex items-center gap-2 text-white font-semibold border-[2px] border-white rounded-md px-6 py-3 transition-all duration-300 hover:bg-white hover:text-black group w-fit"
                >
                    View Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>
            </div>
            
            {/* Image Content */}
            <div className={`group relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="absolute -inset-2.5 rounded-xl opacity-0 group-hover:opacity-75 transition duration-500 blur-xl"></div>
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="relative w-full h-auto object-cover rounded-xl border-2 border-gray-700/50 transition-transform duration-500 ease-out group-hover:scale-105" 
                />
            </div>
        </div>
    );
};

// --- Main Project Page Component ---
function ProjectPage() {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 text-white z-0" />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center py-24 sm:py-32">
                    <h1 className="text-5xl sm:text-6xl font-bold font-poppins text-white">
                       Engineered Digital Solutions
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                        We build robust, scalable, and impactful software. Explore some of our recent work.
                    </p>
                </header>
                <main className="py-16 md:py-24 space-y-28 md:space-y-40">
                    {projectsData.map((project, index) => (
                        <ProjectShowcase key={project.id} project={project} index={index} />
                    ))}
                </main>
            </div>
        </div>
    );
}

export default ProjectPage;