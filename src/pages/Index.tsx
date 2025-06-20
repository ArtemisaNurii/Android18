// pages/index.tsx
import { useEffect, useRef, useState } from 'react';

import Hero from '@/components/LandingComponents/Hero';
import ServicesPage from '@/components/LandingComponents/Services';
import Projects from '@/components/LandingComponents/Projects';
import Testimonials from '@/components/LandingComponents/Testimonials';
import Process from '@/components/LandingComponents/Process';
import Contact from '@/components/LandingComponents/ContactPage';
import HeroParallaxDemo from '@/components/LandingComponents/Team';
import DotOrbitLoader from '@/components/Loader/Loader';
import NavbarVariant from '@/components/Navbar';
import AboutUsPage from '@/components/LandingComponents/AboutUs';

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fade-in observer...
  useEffect(() => {
    /* your existing IntersectionObserver code */
  }, []);

  // Loader timeout...
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <DotOrbitLoader />;

  return (
    <div className="relative min-h-screen bg-inherit">
      <div className="relative z-10">
        {/* Pass an object mapping link names → refs */}
        <NavbarVariant
          sections={{
            About: aboutRef,
            Services: servicesRef,
            Projects: projectsRef,
            Process: processRef,
   
            Contact: contactRef,
          }}
        />

        <section ref={heroRef}><Hero /></section>
        <section ref={aboutRef}><AboutUsPage /></section>
        <section ref={servicesRef}><ServicesPage /></section>
        <section ref={projectsRef}><Projects /></section>
        <section ref={processRef}><Process /></section>
        <section ref={testimonialsRef}><Testimonials /></section>
        <section ref={teamRef}><HeroParallaxDemo /></section>
        <section ref={contactRef}><Contact /></section>
      </div>
    </div>
  );
};

export default Index;
