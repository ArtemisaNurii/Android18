import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';

const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const handleSplineLoad = () => {
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

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/69EEMNnKjd9kHoCE/scene.splinecode"
          onLoad={handleSplineLoad}
        />
      </div>

      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center md:items-start md:justify-end max-w-7xl mx-auto px-8 md:px-16 pb-16 opacity-0"
      >
        <main className="grid md:grid-cols-2 items-center gap-36 w-full">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl lg:text-5xl font-normal leading-tight">
              Strategic Softwares for Sustainable Growth.
            </h1>
          </div>
          <div className="max-w-md flex flex-col gap-y-6">
            <p className="text-base text-gray-300 leading-tight">
              Join us in crafting a digital experience that truly distinguishes you from others
            </p>
            <button
              id="services"
              className="bg-white text-black font-medium py-3 px-8 rounded-md hover:brightness-110 transition-all"
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
