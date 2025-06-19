import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Interface and data remain the same
interface Step {
  duration: string;
  title: string;
  description: string;
  bullets: string[];
}

const steps: Step[] = [
    {
        duration: '2 HOURS',
        title: 'Discovery Phase',
        description: 'We conduct a comprehensive analysis of your business, audience, and industry to identify your unique needs.',
        bullets: ['Conduct comprehensive business analysis', 'Identify unique needs and objectives'],
    },
    {
        duration: '1 WEEK',
        title: 'Strategy Development',
        description: 'We craft a tailored SEO strategy outlining specific tactics to meet your goals.',
        bullets: ['Create a tailored SEO strategy based on insights', 'Outline specific tactics and approaches'],
    },
    {
        duration: '3 DAYS',
        title: 'Content Planning',
        description: 'We plan content aligned with your brand voice, SEO goals, and customer journey.',
        bullets: ['Content calendar creation', 'SEO keyword alignment'],
    },
    {
        duration: '5 DAYS',
        title: 'Design & Wireframing',
        description: 'We design wireframes and mockups focused on usability and conversion.',
        bullets: ['Wireframe user flows', 'Design engaging interfaces'],
    },
    {
        duration: '1 WEEK',
        title: 'Development & Integration',
        description: 'We bring the design to life with code and integrate any needed tools or APIs.',
        bullets: ['Build responsive front-end', 'Back-end & API integration'],
    },
    {
        duration: '2 DAYS',
        title: 'Launch & Optimization',
        description: 'We deploy your site, track performance, and fine-tune for optimal results.',
        bullets: ['Launch and monitor KPIs', 'Performance tuning & SEO optimization'],
    },
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase text-gray-400 mb-4 text-center md:text-left">Process</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-16 text-center md:text-left">
          The project life cycle section delineates the pivotal phases a project traverses
        </h2>

        {/* The container for the timeline itself */}
        <div className="relative" ref={containerRef}>
          {/* The vertical timeline bar. Its position changes responsively. */}
          <motion.div
            className="absolute left-4 top-0 w-1 bg-blue-900 origin-top md:left-1/2 md:-translate-x-1/2"
            style={{ height: lineHeight }}
          />

          {/* Mapping over the steps to create each timeline entry */}
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              // Each step is now wrapped in a container to manage spacing and relative positioning
              <div key={index} className="relative mb-12">
                {/* The dot on the timeline. Its position also changes responsively. */}
                <div className="absolute top-1 left-4 -translate-x-1/2 w-4 h-4 bg-blue-900 rounded-full md:left-1/2" />
                
                {/* The content block, with responsive positioning and alignment */}
                <motion.div
                  className={`
                    w-full pl-12 text-left
                    md:w-1/2 
                    ${isLeft 
                      ? 'md:text-right md:pr-12 md:pl-0 md:mr-auto' 
                      : 'md:text-left md:pl-12 md:ml-auto'
                    }
                  `}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <p className="text-gray-400 text-sm font-medium mb-1">{step.duration}</p>
                  <h3 className="text-xl font-semibold text-black mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  
                  {/* Bullets with better styling */}
               
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;