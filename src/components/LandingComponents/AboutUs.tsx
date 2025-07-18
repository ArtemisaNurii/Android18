import React from 'react';
// --- Import the animation components ---
import { motion } from 'framer-motion';

import ToolMarquee from './Marquee';
import TextAnimation from '../ui/AnimationText';

// A simple variant for elements we want to fade in as a block
const blockFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' as const 
    } 
  },
};

const AboutUsPage: React.FC = () => {
  // We no longer need the GSAP useEffect, so it has been removed.

  return (
    <div id='about' className=" py-20   bg-[#f8f7f4] text-gray-700 px-4 max-sm:px-10 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section 1: Who we are */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16">
          
          <div className="col-span-1">
            <TextAnimation 
              as="p" 
              text="ABOUT US" 
              classname="text-sm font-medium  text-gray-700  tracking-widest mb-4" 
            />
            <TextAnimation
              as="h1"
              text="Who we are: Our story and mission"
              classname="text-4xl sm:text-5xl font-semibold  leading-tight ttext-gray-700"
            />
          </div>

          <div className="col-span-1 md:col-span-2  text-black/70 leading-relaxed space-y-6 text-base lg:text-lg">
            <TextAnimation
              as="p"
              text="Established in 2019 in Tirana, Albania, CodeVider is a premier outsourcing software development partner specializing in cost-effective, nearshore web development solutions. We empower startups, SMEs, and enterprises to accelerate time-to-market and reduce development costs by up to 60%, delivering tailor-made web and mobile applications, cloud-native microservices, and AI-powered integrations."
            />
            <TextAnimation
              as="p"
              text="Our dedicated teams of 25+ senior developers are masters of the modern tech stack. We embed into your project with an agile, sprint-based workflow, ensuring transparent communication and on-time delivery. From requirements gathering and expert team selection to daily stand-ups, weekly progress reports, seamless deployment, and 24/7 maintenance, we provide end-to-end project management and scalable support."
            />

     
          </div>

        </section>

        {/* Section 2: Partnership & Certification */}
        <section className="text-center">
          <TextAnimation
            as="p"
            text="We love tools"
            classname="text-sm font-bold  text-black/70  tracking-widest mb-8"
          />

          {/* Animate the Marquee container to fade in smoothly */}
          <motion.div 
            className="mb-12"
            variants={blockFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ToolMarquee />
          </motion.div> 
          
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;