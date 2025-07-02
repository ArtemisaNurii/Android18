import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data remains the same
const galleryData = [
  {
    id: 1,
    title: 'Product Vision & Roadmap',
    description:
      'We kick off with discovery workshops to refine your product vision, identify core user problems, and define a phased roadmap that balances quick wins with long-term scalability.',
    imageUrl:
      'https://images.unsplash.com/photo-1646388286080-62887d1b34ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxhYnN0cmFjdCUyMGNvbG91cnxlbnwwfHwwfHx8Mg%3D%3D',
    credit: 'Daniel van den Berg on Unsplash',
  },
  {
    id: 2,
    title: 'System Architecture Design',
    description:
      'Our architects translate requirements into robust, cloud-native architectures—microservices, event-driven queues, and secure APIs—to ensure performance, resilience, and future growth.',
    imageUrl:
      'https://images.unsplash.com/photo-1707386243591-786726b45d4a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGFic3RyYWN0JTIwY29sb3VyfGVufDB8fDB8fHwy',
    credit: 'Sunguk Kim on Unsplash',
  },
  {
    id: 3,
    title: 'UX & Interface Crafting',
    description:
      'Pixel-perfect designs come alive through iterative prototyping. We obsess over user flows, accessibility, and responsive layouts to deliver delightful experiences on every device.',
    imageUrl:
      'https://images.unsplash.com/photo-1669813013286-9d9be72171ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGFic3RyYWN0JTIwY29sb3VyfGVufDB8fDB8fHwy',
    credit: 'Frankie Vision on Unsplash',
  },
  {
    id: 4,
    title: 'Deployment & Continuous Monitoring',
    description:
      'CI/CD pipelines automate testing and deployment, while real-time observability lets us spot issues before users do. Performance, security, and uptime are continuously tuned.',
    imageUrl:
      'https://images.unsplash.com/photo-1614851099511-773084f6911d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0JTIwY29sb3VyfGVufDB8fDB8fHwy',
    credit: 'Javier Martinez on Unsplash',
  },
];

export const StickyScrollGallery: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // A GSAP context allows for safe cleanup
    const ctx = gsap.context(() => {
        
      // Use matchMedia to create responsive animations
      ScrollTrigger.matchMedia({
        
        // --- DESKTOP AND TABLET ANIMATION ---
        '(min-width: 768px)': () => {
          // Set initial state for images (hide all but the first)
          gsap.set(imageRefs.current.slice(1), { autoAlpha: 0 });
          const images = imageRefs.current;

          // Create a trigger for each text section to cross-fade images
          galleryData.forEach((_, index) => {
            if (index === 0) return; // Skip the first one

            ScrollTrigger.create({
              trigger: textRefs.current[index],
              start: 'top center',
              onEnter: () => {
                gsap.to(images[index - 1], { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' });
                gsap.to(images[index], { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' });
              },
              onLeaveBack: () => {
                gsap.to(images[index], { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' });
                gsap.to(images[index - 1], { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' });
              },
            });
          });

          // Pin the image container
          ScrollTrigger.create({
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: imageContainerRef.current,
            pinSpacing: false, // Important for a seamless layout
          });
        },

        // --- MOBILE: NO ANIMATION ---
        '(max-width: 767px)': () => {
          // On mobile, we ensure all images are visible in their natural flow.
          // GSAP's context will automatically revert any desktop styles, 
          // but we can be explicit if needed.
          gsap.set(imageRefs.current, { autoAlpha: 1 });
          // No pinning, no scroll-triggered animations. Just a simple page.
        },
      });
    }, mainRef); // Scope the context to our main container

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={mainRef} className="bg-white text-black font-sans">
      <div className="mx-auto max-w-7xl px-4 max-sm:px-10 lg:px-8">
        {/*
          The layout is now a single-column grid on mobile (md:grid-cols-1)
          and a two-column grid on tablet and up (md:grid-cols-2).
          This is the key to the structural responsiveness.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/*
            IMAGE CONTAINER:
            - On desktop, it's sticky thanks to GSAP. We give it a height of the screen.
            - On mobile, it's a normal div with a responsive height (e.g., 60vh) that just sits at the top.
          */}
          <div 
            ref={imageContainerRef} 
            className="w-full h-[60vh] md:h-screen md:sticky top-0 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-sm h-4/5 max-h-[700px] aspect-[9/12]">
              {galleryData.map((item, index) => (
                <img
                  key={item.id}
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={item.imageUrl}
                  alt={item.title}
                  // Initially only the first image is visible on desktop.
                  // This is now handled by GSAP for a flash-free experience.
                  className={`absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg ${index > 0 ? 'opacity-0' : ''}`}
                />
              ))}
            </div>
          </div>
          
          {/*
            TEXT CONTAINER:
            - On desktop, it's the second column that scrolls.
            - On mobile, it appears below the image container.
          */}
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