import UserCase from '@/components/UserStories/StoriesListing';
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Loader from '@/components/Loader/Loader';
import CaseStudyDetailPage from '@/components/UserStories/StoryProfileView';
import NavbarVariant from '@/components/Navbar';
import Contact from '@/components/LandingComponents/ContactPage';


const UserCasesPage = () => {
    const casesRef = useRef<HTMLElement>(null);
    const caseProfileRef = useRef<HTMLElement>(null);

  
    const [isPageLoading, setPageLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 200);
  
      return () => clearTimeout(timer);
    }, []);
  
    // 2. ADD THIS USEEFFECT HOOK FOR SMOOTH SCROLLING
    useEffect(() => {
      // Initialize Lenis for smooth scrolling
      const lenis = new Lenis({
        duration: 1.2, // speed
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing function
      });
  
      // This function will be called on every animation frame
      function raf(time: number) {
        lenis.raf(time); // Update Lenis's scroll position
        requestAnimationFrame(raf); // Request the next frame
      }
  
      // Start the animation loop
      requestAnimationFrame(raf);
  
      // Clean up the instance when the component unmounts
      return () => {
        lenis.destroy();
      };
    }, []); // Empty dependency array ensures this runs only once on mount
  
    return (
      <div className="relative min-h-screen">
        <Loader isLoading={isPageLoading} />
  
        <div className="relative z-10">
          {/* <NavbarVariant
            sections={{
                Cases: casesRef,
                CaseProfile: caseProfileRef,
            }}
          /> */}
          <section ref={casesRef}><UserCase /></section>
          <Contact/>
        {/* <section ref={caseProfileRef}><CaseStudyDetailPage /></section>  */}
     
        </div>
      </div>
    );
  };
  export default UserCasesPage;