import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

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
    description:
      'We conduct a comprehensive analysis of your business, audience, and industry to identify your unique needs.',
    bullets: ['Comprehensive business analysis', 'Identify needs & objectives'],
  },
  {
    duration: '1 WEEK',
    title: 'Strategy Development',
    description:
      'We craft a tailored SEO strategy outlining specific tactics to meet your goals.',
    bullets: ['Custom SEO strategy', 'Define actionable tactics'],
  },
  {
    duration: '3 DAYS',
    title: 'Content Planning',
    description:
      'We plan content aligned with your brand voice, SEO goals, and customer journey.',
    bullets: ['Content calendar', 'Keyword alignment'],
  },
  {
    duration: '5 DAYS',
    title: 'Design & Wireframing',
    description:
      'We design wireframes and mockups focused on usability and conversion.',
    bullets: ['User flow wireframes', 'Engaging mockups'],
  },
  {
    duration: '1 WEEK',
    title: 'Development & Integration',
    description:
      'We bring the design to life with code and integrate any needed tools or APIs.',
    bullets: ['Responsive front-end', 'API integration'],
  },
  {
    duration: '2 DAYS',
    title: 'Launch & Optimization',
    description:
      'We deploy your site, track performance, and fine-tune for optimal results.',
    bullets: ['Monitor KPIs', 'SEO & performance tuning'],
  },
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.85], ['0%', '100%']);

  return (
    <section className="bg-white  py-24 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase text-[#] mb-2">Process</p>
          <h2 className="text-4xl lg:text-5xl  text-gray-900 ">
            Our Project Life Cycle
          </h2>
        </div>

        <div className="relative" ref={containerRef}>
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] bg-gray-300 max-md:hidden"
            style={{ height: lineHeight }}
          />

          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className="relative mb-16">
                <div
                  className={
                    `absolute top-0 left-1/2 w-4 h-4 bg-gray-300 opacity/30 rounded-full transform -translate-x-1/2 max-md:hidden`
                  }
                />

                <motion.div
                  className={
                    `w-full md:w-1/2 px-6 py-4 bg-white-70 rounded-2xl  ` +
                    (isLeft
                      ? 'md:ml-auto md:text-right'
                      : 'md:mr-auto md:text-left')
                  }
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <span className="inline-block bg-indigo-100 text-[#071e30] text-xs   px-3 py-1 rounded-full mb-3">
                    {step.duration}
                  </span>
                  <h3 className="text-2xl font- text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>

                  <ul className="space-y-2">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                       
                      </li>
                    ))}
                  </ul>
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
