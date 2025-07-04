// pages/index.tsx
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis'; // <--- 1. IMPORT LENIS

// import Hero from '@/components/LandingComponents/Hero';
import ServicesPage from '@/components/LandingComponents/Services';
// import Projects from '@/components/LandingComponents/Projects';
import Testimonials from '@/components/LandingComponents/Testimonials';
import Process from '@/components/LandingComponents/Process';
import Contact from '@/components/LandingComponents/ContactPage';
import HeroParallaxDemo from '@/components/LandingComponents/Team';
import Loader from '@/components/Loader/Loader';
import NavbarVariant from '@/components/Navbar';
import AboutUsPage from '@/components/LandingComponents/AboutUs';
import { Benefits } from '@/components/LandingComponents/Benefits';
import { Map } from '@/components/LandingComponents/Projects';
import { Hero } from '@/components/LandingComponents/Hero';
// import Team from '@/components/LandingComponents/Founder';
import FaqSection from '@/components/LandingComponents/Faq';
// import Team from '@/components/LandingComponents/Founder';

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

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
        <NavbarVariant
          sections={{
            About: aboutRef,
            Services: servicesRef,
            Projects: projectsRef,
            Process: processRef,
          }}
        />

        <section ref={heroRef}><Hero /></section>
        <section ref={aboutRef}><AboutUsPage /></section>
        <section ref={servicesRef}><ServicesPage /></section>
        <Benefits />
        <section ref={processRef}><Process /></section>
        <Map />

        <section ref={testimonialsRef}><Testimonials /></section>
        <section ref={teamRef}><HeroParallaxDemo /></section>
<FaqSection/>
        <section ref={contactRef}><Contact /></section>
      </div>
    </div>
  );
};

export default Index;