// components/Loader/Loader.tsx

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface LoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, onLoadingComplete }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const hasCalledComplete = useRef(false);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      hasCalledComplete.current = false;
      animationStarted.current = false;
    }
    
    if (shouldRender && isLoading && !animationStarted.current) {
      animationStarted.current = true;
      console.log("Starting loader animation");
      
      const tl = gsap.timeline();
      
      // Reset text content
      gsap.set(textRef.current, { text: "" });
      
      // Show loader immediately and start animation
      tl.set(loaderRef.current, { opacity: 1 })
        .to(textRef.current, {
          text: "Codevider",
          duration: 1.2,
          ease: 'none',
          onComplete: () => {
            console.log("Text animation complete");
            if (onLoadingComplete && !hasCalledComplete.current) {
              hasCalledComplete.current = true;
              // Small delay to let user see the complete text
              setTimeout(() => {
                console.log("Calling onLoadingComplete");
                onLoadingComplete();
              }, 300);
            }
          },
        })
        .to(cursorRef.current, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: 'power2.inOut',
        }, 0);

      return () => {
        tl.kill();
        gsap.killTweensOf([cursorRef.current, textRef.current, loaderRef.current]);
      };
    } else if (!isLoading && shouldRender) {
      // Fade out when loading is complete
      const tl = gsap.timeline();
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => setShouldRender(false),
      });

      return () => tl.kill();
    }
  }, [isLoading, shouldRender, onLoadingComplete]);

  // Fallback: ensure callback is called even if animation fails
  useEffect(() => {
    if (isLoading && onLoadingComplete && !hasCalledComplete.current) {
      const fallbackTimer = setTimeout(() => {
        console.log("Fallback: calling onLoadingComplete");
        if (!hasCalledComplete.current) {
          hasCalledComplete.current = true;
          onLoadingComplete();
        }
      }, 2000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [isLoading, onLoadingComplete]);

  console.log("Loader render:", { isLoading, shouldRender, animationStarted: animationStarted.current });

  if (!shouldRender) return null;

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-[#050a08] to-[#47a893]"
      style={{ opacity: 1 }}
    >
      <div className="flex items-center">
        <h1 ref={textRef} className="text-4xl md:text-6xl font-mono text-gray-100"></h1>
        <span ref={cursorRef} className="ml-2 h-10 md:h-16 w-1 bg-green-400" />
      </div>
    </div>
  );
};

export default Loader;