import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  {
    id: 1,
    title: 'Product Vision & Roadmap',
    description:
      'We kick off with discovery workshops to refine your product vision, identify core user problems, and define a phased roadmap that balances quick wins with long-term scalability.',
    credit: 'Daniel van den Berg on Unsplash',
  },
  {
    id: 2,
    title: 'System Architecture Design',
    description:
      'Our architects translate requirements into robust, cloud-native architectures—microservices, event-driven queues, and secure APIs—to ensure performance, resilience, and future growth.',
    credit: 'Sunguk Kim on Unsplash',
  },
  {
    id: 3,
    title: 'UX & Interface Crafting',
    description:
      'Pixel-perfect designs come alive through iterative prototyping. We obsess over user flows, accessibility, and responsive layouts to deliver delightful experiences on every device.',
    credit: 'Frankie Vision on Unsplash',
  },
  {
    id: 4,
    title: 'Deployment & Continuous Monitoring',
    description:
      'CI/CD pipelines automate testing and deployment, while real-time observability lets us spot issues before users do. Performance, security, and uptime are continuously tuned.',
    credit: 'Javier Martinez on Unsplash',
  },
];

export const StickyScrollGallery: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          ScrollTrigger.create({
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: imageContainerRef.current,
            pinSpacing: false,
          });
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-white text-black font-sans">
      <div className="mx-auto max-w-7xl px-4 max-sm:px-10 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div
            ref={imageContainerRef}
            className="w-full h-[60vh] md:h-screen md:sticky top-0 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-sm h-4/5 max-h-[700px] aspect-[9/12]">
              <Spline scene="https://prod.spline.design/ErG09NFH44hveMgT/scene.splinecode" />
            </div>
          </div>

          <div className="md:col-start-2">
            {galleryData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (textRefs.current[index] = el)}
                className="flex min-h-[50vh] md:min-h-screen flex-col justify-center py-20 md:py-24"
              >
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs text-gray-400">
                    Photo by {item.credit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
