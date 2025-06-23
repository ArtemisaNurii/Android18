// pages/index.tsx
import { useEffect, useRef, useState } from 'react';

import Hero from '@/components/LandingComponents/Hero';
import ServicesPage from '@/components/LandingComponents/Services';
import Projects from '@/components/LandingComponents/Projects';
import Testimonials from '@/components/LandingComponents/Testimonials';
import Process from '@/components/LandingComponents/Process';
import Contact from '@/components/LandingComponents/ContactPage';
import HeroParallaxDemo from '@/components/LandingComponents/Team';
import Loader from '@/components/Loader/Loader';
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

  // This state now controls the loader's visibility.
  const [isPageLoading, setPageLoading] = useState(true);

  // This effect runs once after the page content has been mounted.
  // This is where we tell the loader that the content is ready.
  useEffect(() => {
    // We use a short timeout to ensure the browser has had a moment to paint the Hero.
    // You can adjust this timing. 200ms is usually enough.
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []); // The empty array [] ensures this runs only once.

  return (
    // NO background class here. The Hero component itself should have its own background.
    <div className="relative min-h-screen">
      {/*
        FIX: The page content is rendered IMMEDIATELY.
        The Loader is rendered ON TOP of the content.
      */}
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