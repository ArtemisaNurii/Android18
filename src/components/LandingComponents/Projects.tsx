import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const projects = [
    { name: 'Pasho Toska', description: 'CEO & Founder', category: 'E-Commerce',  image:'https://images.unsplash.com/photo-1606002830191-c1b4f20e6cda?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Ervin Ziko', description: 'Managing Partner', category: 'Service',  image:'https://images.unsplash.com/photo-1606002830191-c1b4f20e6cda?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Altin Luli', description: 'Co-Founder', category: 'Technology',  image:'https://images.unsplash.com/photo-1606002830191-c1b4f20e6cda?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Erion Domi', description: 'Co-Founder', category: 'Healthcare', image:'https://images.unsplash.com/photo-1606002830191-c1b4f20e6cda?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const projectProgress = useTransform(scrollYProgress, [0, 1], [0, projects.length - 1]);
  useEffect(() => {
    const unsubscribe = projectProgress.on('change', (p) => setActiveProject(Math.round(p)));
    return () => unsubscribe();
  }, [projectProgress]);

  return (
    <div ref={containerRef} className="min-h-[400vh] bg-gray-900">
      <div className="sticky top-0 h-screen flex">
        {/* Left Side */}
        <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-start p-12 space-y-12">
          <motion.h1
            className="text-sm tracking-wide text-gray-400 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            OUR FOUNDERS 
          </motion.h1>

          <div className="space-y-8 w-full">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                className={`cursor-pointer transition-all duration-300 ${
                  activeProject === idx
                    ? 'text-gray-900 border-l-4 border-blue-900 pl-6 scale-105'
                    : 'text-gray-500 hover:text-gray-700 pl-4'
                }`}
                onClick={() => setActiveProject(idx)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-gradient-to-br from-black via-black to-[#071e30] relative overflow-hidden">
        
          {projects.map((project, idx) => {
            // Each project gets an equal "slot" of the total scroll progress.
            const slotSize = 1 / projects.length;
            
            // The point where the project's image should be fully visible.
            const projectStart = idx * slotSize; 
            
            // The point where the next project's image starts becoming visible.
            const projectEnd = projectStart + slotSize;

            // A small fraction of the slot to use for the fade transition.
            // 0.2 means the fade will take up 20% of the project's scroll slot.
            // Feel free to tweak this value (e.g., to 0.1 for a faster fade or 0.3 for a slower one).
            const FADE_DURATION_FACTOR = 0.2;
            const fadeDuration = slotSize * FADE_DURATION_FACTOR;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const imageY = useTransform(
              scrollYProgress,
              [projectStart, projectEnd],
              ['100%', '0%']
            );
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const imageOpacity = useTransform(
              scrollYProgress,
              [
                projectStart - fadeDuration, // Start fading in
                projectStart,              // Fully visible
                projectEnd - fadeDuration,   // Start fading out
                projectEnd,                  // Fully faded out
              ],
              [0, 1, 1, 0] // Opacity values
            );

            return (
              <motion.div
                key={idx}
                className="absolute inset-0 flex items-center justify-center"
                style={{ y: imageY, opacity: imageOpacity }}
              >
                <div className="relative w-4/5 h-4/5 rounded-2xl shadow-2xl overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <motion.div
                    className="absolute bottom-8 left-8 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: activeProject === idx ? 1 : 0,
                      y: activeProject === idx ? 0 : 20,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-3xl font-light mb-1">{project.name}</h3>
                    <p className="text-md opacity-80">{project.category}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          {/* Progress Indicator */}
          <div className="absolute top-8 right-8 text-white">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}>
              <span className="text-lg font-light">
                {String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;