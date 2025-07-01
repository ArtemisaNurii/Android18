// // components/Projects.jsx
// import { useEffect, useRef, useState } from 'react';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// // --- Data (using more distinct images for clarity) ---
// const projects = [
//   { name: 'Pasho Toska', description: 'CEO & Founder', category: 'E-Commerce',  image:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop' },
//   { name: 'Ervin Ziko', description: 'Managing Partner', category: 'Service',  image:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop' },
//   { name: 'Altin Luli', description: 'Co-Founder', category: 'Technology',   image:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop' },
//   { name: 'Erion Domi', description: 'Co-Founder', category: 'Partnership',  image:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop' },
// ];

// // --- Sub-Components for Elegance and Structure ---

// // Elegant Left-side navigation item
// const ProjectItem = ({ name, description, isActive }) => {
//   return (
//     <motion.div
//       className="relative w-full p-4 pl-8 cursor-pointer"
//       animate={{ scale: isActive ? 1.05 : 1, x: isActive ? 10 : 0 }}
//       transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//     >
//       {/* Animated Border for active state */}
//       <AnimatePresence>
//         {isActive && (
//           <motion.div
//             className="absolute left-0 top-0 h-full w-[1px] bg-blue-900 rounded-full"
//             initial={{ scaleY: 0 }}
//             animate={{ scaleY: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
//             exit={{ scaleY: 0, transition: { duration: 0.3, ease: 'easeIn' } }}
//             style={{ originY: 0.5 }}
//           />
//         )}
//       </AnimatePresence>
      
//       {/* Animated Text Opacity */}
//       <motion.h3 
//         className="text-xl font-thin"
//         animate={{ color: isActive ? '#111827' : '#6B7280' }} // gray-900 vs gray-500
//         transition={{ duration: 0.3 }}
//       >
//         {name}
//       </motion.h3>
//       <motion.p 
//         className="text-sm"
//         animate={{ color: isActive ? '#374151' : '#9CA3AF' }} // gray-700 vs gray-400
//         transition={{ duration: 0.3 }}
//       >
//         {description}
//       </motion.p>
//     </motion.div>
//   );
// };

// // Right-side image card with smoother animations
// const ProjectImage = ({ project, idx, scrollYProgress }) => {
//   const slotSize = 1 / projects.length;
//   const projectStart = idx * slotSize;
//   const projectEnd = projectStart + slotSize;

//   const opacity = useTransform(
//     scrollYProgress,
//     [projectStart, projectStart + slotSize * 0.15, projectEnd - slotSize * 0.15, projectEnd],
//     [0, 1, 1, 0]
//   );
  
//   const scale = useTransform(
//     scrollYProgress,
//     [projectStart, projectStart + slotSize * 0.15, projectEnd - slotSize * 0.15, projectEnd],
//     [0.85, 1, 1, 0.85]
//   );
  
//   const y = useTransform(
//     scrollYProgress,
//     [projectStart, projectEnd],
//     ['20vh', '-20vh']
//   );

//   return (
//     <motion.div
//       className="absolute inset-0 flex items-center justify-center"
//       style={{ opacity, scale, y }}
//     >
//       <div className="relative w-4/5 h-4/5  shadow-xl overflow-hidden">
//         {/* Subtle Ken Burns Effect on the image */}
//         <motion.img 
//           src={project.image} 
//           alt={project.name} 
//           className="w-full h-full object-cover"
//           style={{ scale: 1.15 }} // Start slightly zoomed in
//           animate={{ scale: 1 }} // Zoom out to normal over a long duration
//           transition={{ duration: 16, ease: 'linear' }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//         <div className="absolute bottom-10 left-10 text-white">
//           <h3 className="text-4xl font-light mb-2">{project.name}</h3>
//           <p className="text-lg opacity-80">{project.category}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // --- Main Component ---
// const Projects = () => {
//   const containerRef = useRef(null);
//   const [activeProject, setActiveProject] = useState(0);
  
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end'],
//   });

//   useEffect(() => {
//     const unsubscribe = scrollYProgress.on('change', (latest) => {
//       const newActiveProject = Math.min(projects.length - 1, Math.floor(latest * projects.length));
//       setActiveProject(newActiveProject);
//     });
//     return () => unsubscribe();
//   }, [scrollYProgress]);

//   const scrollToProject = (index) => {
//     if (!containerRef.current) return;
//     const totalHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
//     const targetScroll = (totalHeight * index) / (projects.length - 1);
    
//     window.scrollTo({
//       top: containerRef.current.offsetTop + targetScroll,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     // Reverted to original light/dark split theme
//     <div 
//       ref={containerRef} 
//       className="relative bg-gray-50" // Light bg for the container
//       style={{ height: `${projects.length * 120}vh` }} // Added a bit more height for smoother scroll
//     >
//       <div className="sticky top-0 h-screen flex overflow-hidden">
//         {/* Left Side: Navigation */}
//         <div className="w-1/2 flex flex-col justify-center items-start p-12">
//             <motion.h1
//               className="text-2xl lg:text-3xl  text-gray-300 tracking-widest  uppercase mb-12"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8 }}
//             >
//               Our Founders
//             </motion.h1>

//             <div className="w-full max-w-md space-y-4">
//               {projects.map((project, idx) => (
//                 <div key={idx} onClick={() => scrollToProject(idx)}>
//                   <ProjectItem 
//                     name={project.name}
//                     description={project.description}
//                     isActive={activeProject === idx}
//                   />
//                 </div>
//               ))}
//             </div>
//         </div>

//         {/* Right Side: Visuals */}
//         <div className="w-1/2 bg-gradient-to-br from-black via-black to-[#071e30] relative">
//           {projects.map((project, idx) => (
//             <ProjectImage key={idx} project={project} idx={idx} scrollYProgress={scrollYProgress} />
//           ))}

//           {/* Progress Indicator */}
//           <div className="absolute top-8 right-8 text-white font-mono">
//               <span className="text-xl">
//                 {String(activeProject + 1).padStart(2, '0')}
//               </span>
//               <span className="text-xl text-gray-500">
//                 {' / '}{String(projects.length).padStart(2, '0')}
//               </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Projects;



import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// --- 1. DEFINE YOUR CONTENT DATA ---
const galleryData = [
  {
    id: 1,
    title: 'Concept & Vision',
    description:
      'We begin with the core idea, shaping a vision that is both innovative and achievable. Our process is built on a foundation of clear communication and a deep understanding of the project goals.',
    imageUrl: 'https://images.unsplash.com/photo-1646388286080-62887d1b34ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxhYnN0cmFjdCUyMGNvbG91cnxlbnwwfHwwfHx8Mg%3D%3D',
    credit: 'Daniel van den Berg on Unsplash',
  },
  {
    id: 2,
    title: 'Architectural Design',
    description:
      'Our designs blend form and function, creating spaces that are aesthetically pleasing and highly practical. We focus on clean lines, natural light, and sustainable materials to craft timeless structures.',
    imageUrl: 'https://images.unsplash.com/photo-1707386243591-786726b45d4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGFic3RyYWN0JTIwY29sb3VyfGVufDB8fDB8fHwy',
    credit: 'Sunguk Kim on Unsplash',
  },
  {
    id: 3,
    title: 'Interior Details',
    description:
      'Every detail matters. The interior is where life unfolds, so we meticulously plan every element, from the flow of movement to the texture of the surfaces, ensuring a harmonious and inviting atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1669813013286-9d9be72171ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGFic3RyYWN0JTIwY29sb3VyfGVufDB8fDB8fHwy',
    credit: 'Frankie Vision on Unsplash',
  },
  {
    id: 4,
    title: 'Light & Shadow',
    description:
      'The interplay of light and shadow is fundamental to our philosophy. We use it to sculpt spaces, create mood, and connect the built environment with the natural world, resulting in a dynamic experience.',
    imageUrl: 'https://images.unsplash.com/photo-1614851099511-773084f6911d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0JTIwY29sb3VyfGVufDB8fDB8fHwy',
    credit: 'Javier Martinez on Unsplash',
  },
];

// --- 2. THE REACT COMPONENT ---
export const StickyScrollGallery: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set the initial state: all images are invisible except the first one
      gsap.set(imageRefs.current.slice(1), { autoAlpha: 0 });

      // Animate images based on text sections scrolling into view
      galleryData.forEach((_, index) => {
        if (index === 0) return;
        ScrollTrigger.create({
          trigger: textRefs.current[index],
          start: 'top center',
          onEnter: () => {
            gsap.to(imageRefs.current[index - 1], { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' });
            gsap.to(imageRefs.current[index], { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' });
          },
          onLeaveBack: () => {
            gsap.to(imageRefs.current[index], { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' });
            gsap.to(imageRefs.current[index - 1], { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' });
          },
        });
      });

      textRefs.current.forEach((textEl) => {
        gsap.to(textEl, {
          autoAlpha: 0, // Fade out
          scrollTrigger: {
            trigger: textEl,
            start: "top 40%", // Start fading when the top of the text hits 65% of the viewport height
            end: "top 60%",   // Fully faded out when it hits 60% (the bottom of the image)
            scrub: true,      // Link animation progress to scroll position
          },
        });
      });

      // Pin the entire image container
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '#image-container',
        pinSpacing: false,
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-white text-black font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div id="image-container" className="h-[60vh] lg:h-screen w-full lg:w-1/2 top-0 flex items-center justify-center p-2">
            <div className="relative w-full h-2/3 max-h-[700px] aspect-[9/12]">
              {galleryData.map((item, index) => (
                <img
                  key={item.id}
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-start-2">
            {galleryData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (textRefs.current[index] = el)}
                className="flex min-h-[60vh] lg:min-h-screen flex-col justify-center py-24"
              >
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs text-gray-400">
                    Photo by {item.credit}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};