import React, { forwardRef } from 'react';

export interface Project {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
  }
  
  export const featuredProjects: Project[] = [
    {
      id: 'kubota',
      title: 'Kubota',
      category: 'MANUFACTURING & INDUSTRIAL',
      imageUrl: 'https://images.unsplash.com/photo-1589492479713-9864263309e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 'spafax',
      title: 'Spafax',
      category: 'INFLIGHT & MEDIA',
      imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
    },
    {
      id: 'ether-capital',
      title: 'Ether Capital',
      category: 'FINTECH',
      imageUrl: 'https://images.unsplash.com/photo-1640826515822-24376b539659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 'aero',
      title: 'Aero',
      category: 'AVIATION & TECHNOLOGY',
      imageUrl: 'https://images.unsplash.com/photo-1544012228-87334795779a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];
  



interface ProjectCardProps {
  project: Project;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(({ project }, ref) => {
  return (
    // This is the main container for a single card, positioned absolutely.
    <div ref={ref} className="project-card absolute inset-0 h-screen w-full bg-[#E8E8E8] overflow-hidden">
      {/* The image is a separate element for independent animation */}
      <div className="card-image-container absolute inset-0">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* The text content is also separate for its own animation */}
      <div className="card-content-container absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-7xl px-8">
          <div className="card-content w-full md:w-1/2 text-zinc-800">
             <h2 className="text-5xl md:text-7xl font-semibold -tracking-tighter">
                {project.title}
             </h2>
             <p className="text-sm font-medium tracking-widest text-zinc-500 mt-2">
                {project.category}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;