// pages/index.tsx
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis'; 
import { ReactLenis } from 'lenis/react'
import ServicesPage from '@/components/LandingComponents/Services';
import Testimonials from '@/components/LandingComponents/Testimonials';
import Process from '@/components/LandingComponents/Process';
import Contact from '@/components/LandingComponents/ContactPage';
import Loader from '@/components/Loader/Loader';
import AboutUsPage from '@/components/LandingComponents/AboutUs';
import { Benefits } from '@/components/LandingComponents/Benefits';
import { Map } from '@/components/LandingComponents/Projects';
import { Hero } from '@/components/LandingComponents/Hero';
import FaqSection from '@/components/LandingComponents/Faq';
import Projects from '@/components/LandingComponents/ProjectSection';

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  // const teamRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);




  return (
    <div className="relative min-h-screen">
          <ReactLenis root>


      <div className="relative z-10">


        <section ref={heroRef}><Hero /></section>
        <section ref={aboutRef}><AboutUsPage /></section>
        <section ref={servicesRef}><ServicesPage /></section>
        <Benefits />
        <Map />
        <section ref={processRef}><Process /></section>
    <section ref={projectsRef}><Projects/></section>
        <section ref={testimonialsRef}><Testimonials /></section>
        {/* <section ref={teamRef}>  <TeamPage/>    
        </section> */}
<FaqSection/>
        <section ref={contactRef}><Contact /></section>
      </div>
      </ReactLenis>

    </div>
  );
};

export default Index;