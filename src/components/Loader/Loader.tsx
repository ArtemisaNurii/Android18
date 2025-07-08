// components/Loader/Loader.tsx

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface LoaderProps {
  isLoading: boolean;
  // Add this new prop. It's an optional function.
  onLoadingComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, onLoadingComplete }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isLoading) setShouldRender(true);
    const tl = gsap.timeline();

    if (shouldRender) {
      if (isLoading) {
        tl.to(loaderRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        })
        .to(textRef.current, {
            text: "Codevider",
            duration: 1.5,
            ease: 'none',
            // --- THIS IS THE KEY CHANGE ---
            // When this animation completes, call the function passed in via props.
            onComplete: () => {
              if (onLoadingComplete) {
                // We add a small delay so the user can see the word before it vanishes
                setTimeout(onLoadingComplete, 500);
              }
            },
          },
          '>-0.2'
        );

        gsap.to(cursorRef.current, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }
      else {
        tl.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => setShouldRender(false),
        });
      }
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([cursorRef.current, textRef.current, loaderRef.current]);
    };
  }, [isLoading, shouldRender, onLoadingComplete]); // Add onLoadingComplete to dependency array

  if (!shouldRender) return null;

  return (
    <div ref={loaderRef} className="fixed inset-0 z-50 flex items-center justify-center  bg-gradient-to-br from-black via-[#050a08] to-[#47a893] opacity-0">
      <div className="flex items-center">
        <h1 ref={textRef} className="text-4xl md:text-6xl font-mono text-gray-100"></h1>
        <span ref={cursorRef} className="ml-2 h-10 md:h-16 w-1 bg-green-400" />
      </div>
    </div>
  );
};

export default Loader;