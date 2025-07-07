// pages/index.tsx
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis'; 
import { ReactLenis } from 'lenis/react'
import ServicesPage from '@/components/LandingComponents/Services';
import Testimonials from '@/components/LandingComponents/Testimonials';
import Process from '@/components/LandingComponents/Process';
import Contact from '@/components/LandingComponents/ContactPage';
import Loader from '@/components/Loader/Loader';
import NavbarVariant from '@/components/Navbar';
import AboutUsPage from '@/components/LandingComponents/AboutUs';
import { Benefits } from '@/components/LandingComponents/Benefits';
import { Map } from '@/components/LandingComponents/Projects';
import { Hero } from '@/components/LandingComponents/Hero';
import FaqSection from '@/components/LandingComponents/Faq';

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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time); 
      requestAnimationFrame(raf); 
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []); 

  return (
    <div className="relative min-h-screen">
          <ReactLenis root>

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
        <Map />
        <section ref={processRef}><Process /></section>
        <section ref={testimonialsRef}><Testimonials /></section>
        <section ref={teamRef}>      
        </section>
<FaqSection/>
        <section ref={contactRef}><Contact /></section>
      </div>
      </ReactLenis>

    </div>
  );
};

export default Index;