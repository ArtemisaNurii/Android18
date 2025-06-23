import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';
// 1. Import the 'Application' type from the Spline runtime for type safety
import { Application } from '@splinetool/runtime';

const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // 2. Create a ref to hold the Spline application instance
  const splineApp = useRef<Application | null>(null);
  
  // 3. Create a ref for the component's container to be observed
  const containerRef = useRef<HTMLDivElement>(null);

  // Updated onLoad handler to capture the Spline application instance
  const handleSplineLoad = (spline: Application) => {
    // 4. Store the Spline application object in our ref
    splineApp.current = spline;
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );
  }, [loaded]);

  // 5. useEffect to set up the Intersection Observer
  useEffect(() => {
    // Ensure both the spline app and the container are available
    if (!splineApp.current || !containerRef.current) return;
    
    // Create the observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting is a boolean that is true if the element is in the viewport
        if (entry.isIntersecting) {
          // If the component is visible, play the Spline animation
          console.log('Spline in view, playing animation.');
          splineApp.current?.play();
        } else {
          // If the component is not visible, stop the Spline animation
          console.log('Spline out of view, stopping animation.');
          splineApp.current?.stop();
        }
      },
      {
        // threshold determines how much of the element must be visible to trigger the callback
        // 0.5 means 50% of the element needs to be visible
        threshold: 0.5,
      }
    );

    // Start observing the component's container
    observer.observe(containerRef.current);

    // Cleanup function: Disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
    
  }, [loaded]); // This effect runs once the Spline scene is loaded

  return (
    // Attach the container ref to the root element we want to observe
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden font-sans text-white">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/69EEMNnKjd9kHoCE/scene.splinecode"
          onLoad={handleSplineLoad} 
        />
      </div>

      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center md:items-start md:justify-end max-w-7xl mx-auto px-6  md:px-16 pb-16 opacity-0 text-center md:text-left"

      >
        <main className="grid md:grid-cols-2 items-center max-sm:items-start max-sm:space-x-0 space-x-24 gap-44 w-full">
          <div className="max-w-4xl text-left">
            <h1 className="text-4xl lg:text-5xl font-normal tracking-normal leading-tight">
              Strategic Softwares for Sustainable Growth.    
              Codevider is Your Partner

            </h1>
          </div>
          <div className="max-w-md flex flex-col items-center gap-y-6 md:items-start">
          <p className="text-base text-gray-300 leading-loose">
              Join us in crafting a digital experience that truly distinguishes you from others
            </p>
            <button
              id="services"
              className="bg-white w-full text-black font-medium py-3 px-8 hover:brightness-110 transition-all"
            >
              Our services
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;