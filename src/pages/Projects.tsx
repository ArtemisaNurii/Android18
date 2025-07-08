// import { useEffect, useRef, useState } from 'react';
// import Lenis from '@studio-freight/lenis'; 
// import Loader from '@/components/Loader/Loader';
// import ProjectPage from '@/components/ProjectPage.tsx/AllProject';

// function ProjectsRoute() {
//     const [isPageLoading, setPageLoading] = useState(true);
    
//       useEffect(() => {
//         const timer = setTimeout(() => {
//           setPageLoading(false);
//         }, 200);
    
//         return () => clearTimeout(timer);
//       }, []);
    
//       useEffect(() => {
//         const lenis = new Lenis({
//           duration: 1.2, 
//           easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         });
    
//         function raf(time: number) {
//           lenis.raf(time); 
//           requestAnimationFrame(raf); 
//         }
    
//         requestAnimationFrame(raf);
    
//         return () => {
//           lenis.destroy();
//         };
//       }, []); 
    
//   return (
//     <div className="relative min-h-screen">
//       {/* <Loader isLoading={isPageLoading} /> */}
// <ProjectPage/>
// {/* <Contact/> */}

//     </div>
//   )
// }

// export default ProjectsRoute