// // src/components/FeaturedProjects.tsx

// 'use client';

// import React, { useLayoutEffect, useRef, createRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import ProjectCard, { featuredProjects } from './ProjectCard';

// gsap.registerPlugin(ScrollTrigger);

// const FeaturedProjects: React.FC = () => {
//   const component = useRef<HTMLDivElement>(null);
//   const scrollContainer = useRef<HTMLDivElement>(null);
  
//   const cardRefs = useRef<React.RefObject<HTMLDivElement>[]>(
//     featuredProjects.map(() => createRef<HTMLDivElement>())
//   );

//   useLayoutEffect(() => {
//     const cards = cardRefs.current.map(ref => ref.current).filter(Boolean) as HTMLDivElement[];
//     const numCards = cards.length;

//     // The total height provides the scroll "track" for the animation.
//     // 100vh for the initial view, and 100vh for each card transition.
//     const scrollHeight = `${100 * numCards}vh`;
//     if (scrollContainer.current) {
//         scrollContainer.current.style.height = scrollHeight;
//     }
    
//     const ctx = gsap.context(() => {
//       const timeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: component.current,
//           start: 'top top',
//           end: 'bottom bottom',
//           scrub: 1,
//           pin: true, // Pin the entire component
//           invalidateOnRefresh: true,
//         },
//       });

//       // Set initial z-index for stacking
//       cards.forEach((card, index) => {
//         gsap.set(card, { zIndex: numCards - index });
//       });
      
//       // Animate each card
//       cards.slice(0, -1).forEach((card, index) => {
//         const nextCard = cards[index + 1];
        
//         // Select the parts of the card to animate
//         const image = card.querySelector('.card-image-container');
//         const contentContainer = card.querySelector('.card-content-container');
//         const content = card.querySelector('.card-content');
        
//         // Add a point in the timeline to start the transition
//         timeline.add(`start-transition-${index}`);

//         // 1. Animate the outgoing card's content to its "stacked" state
//         timeline.to(content, {
//           y: () => -(contentContainer?.clientHeight || 0) / 2 + (index + 1) * 60, // Move up and stack
//           scale: 0.8,
//           ease: 'power2.inOut',
//         }, `start-transition-${index}`);
        
//         // 2. Fade out the outgoing card's image
//         timeline.to(image, {
//           autoAlpha: 0, // Fades and sets visibility to hidden
//           ease: 'power2.inOut',
//         }, `start-transition-${index}`);

//         // 3. Bring the next card's content into view from below (optional but nice)
//         // It starts slightly offset down and moves to its final centered position.
//         timeline.from(nextCard.querySelector('.card-content-container'), {
//             yPercent: 10,
//             autoAlpha: 0,
//             ease: 'power2.out',
//         }, `start-transition-${index}`);

//         // Add a pause in the timeline. The user has to scroll more before the next transition starts.
//         timeline.add(`end-transition-${index}`);
//       });

//     }, component);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={component}>
//       {/* 
//         This is the STICKY STAGE. GSAP will pin this element.
//         It contains the scrollable track and the cards.
//       */}
//       <div className="relative w-full">
//         {/* Title Section (part of the sticky container) */}
//         <div className="max-w-7xl mx-auto px-8 py-12 md:py-20">
//           <h1 className="text-7xl md:text-9xl font-semibold -tracking-tighter flex items-start justify-between">
//             <span>Featured</span>
//             <span className="text-3xl md:text-4xl font-mono text-zinc-400 mt-2">({String(featuredProjects.length).padStart(2, '0')})</span>
//           </h1>
//           <div className="h-px bg-zinc-300 mt-6"></div>
//         </div>

//         {/* 
//           This is the SCROLLABLE TRACK. Its height drives the animation progress.
//           It's inside the pinned component but doesn't have sticky positioning itself.
//         */}
//         <div ref={scrollContainer} className="relative">
//           {/* 
//             This is the CARD CONTAINER. It holds all the cards stacked on top of each other.
//             We make it sticky so the cards stay in the viewport while the track scrolls "underneath".
//           */}
//           <div className="sticky top-0 h-screen w-full">
//             {featuredProjects.map((project, index) => (
//               <ProjectCard
//                 ref={cardRefs.current[index]}
//                 key={project.id}
//                 project={project}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- See More Section (placed AFTER the pinned component) --- */}
//       <div className="flex flex-col items-center justify-center text-center py-24 md:py-32 bg-[#E8E8E8]">
//         <h3 className="text-lg text-zinc-500">More in the vault.</h3>
//         <p className="text-3xl md:text-4xl font-semibold mt-2 -tracking-tight">Take a look.</p>
//         <button
//           className="mt-8 px-8 py-3 bg-zinc-800 text-white font-semibold rounded-full
//                      hover:bg-zinc-700 transition-colors duration-300
//                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E8E8E8] focus:ring-zinc-800"
//         >
//           SEE MORE
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProjects;


// StackingCards.jsx
// import React, { useLayoutEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const cardsData = [
//   {
//     id: 1,
//     title: 'Card One',
//     text: 'This is the content of card one. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//     img: 'https://assets.codepen.io/210284/flower-9.jpg',
//   },
//   {
//     id: 2,
//     title: 'Card Two',
//     text: 'This is the content of card two. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//     img: 'https://assets.codepen.io/210284/flower-8.jpg',
//   },
//   {
//     id: 3,
//     title: 'Card Three',
//     text: 'This is the content of card three. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//     img: 'https://assets.codepen.io/210284/flower-7.jpg',
//   },
//   {
//     id: 4,
//     title: 'Card Four',
//     text: 'This is the content of card four. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//     img: 'https://assets.codepen.io/210284/flower-6.jpg',
//   },
// ];

// const FeaturedProjects = () => {
//   const containerRef = useRef(null);
//   const cardRefs = useRef([]);

//   useLayoutEffect(() => {
//     const cards = cardRefs.current;
//     const num = cards.length;
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: 1,
//       },
//     });

//     cards.forEach((el, i) => {
//       const idx0 = i;
//       const reverseIndex = num - idx0;
//       const scaleTo = 1.1 - 0.1 * reverseIndex;
//       // each animation begins at `i` seconds into the timeline:
//       tl.to(el, { 
//         scale: scaleTo, 
//         transformOrigin: '50% 0%', 
//         ease: 'none' 
//       }, idx0);
//     });

//     return () => ScrollTrigger.getAll().forEach(t => t.kill());
//   }, []);

//   return (
//     <div style={{ backgroundColor: '#131212', color: 'beige' }} className="text-center pb-[20vh]">
//       <header className="w-[80vw] mx-auto h-[35vh] grid place-items-center mb-20">
//         <div>
//           <h1 className="font-serif font-light text-5xl mb-4">Stacking Cards Animation</h1>
//           <p className="text-base">Scroll down to stack the cards. Scroll back up to unstack them.</p>
//         </div>
//       </header>
//       <main className="w-[80vw] mx-auto" ref={containerRef} style={{ paddingBottom: `${cardsData.length}em` }}>
//         <ul className="list-none">
//           {cardsData.map((card, i) => (
//             <li
//               key={card.id}
//               ref={el => (cardRefs.current[i] = el)}
//               className="sticky top-0 h-[40vw] mb-[4vw]"
//               style={{ paddingTop: `${i + 1}em` }}
//             >
//               <div className="bg-[#fffaf2] text-[#131212] rounded-2xl overflow-hidden grid grid-cols-2 items-stretch shadow-lg p-6">
//                 <div className="flex flex-col justify-center gap-4 text-left">
//                   <h2 className="font-serif font-bold text-4xl">{card.title}</h2>
//                   <p className="text-lg leading-snug">{card.text}</p>
//                 </div>
//                 <figure className="overflow-hidden">
//                   <img
//                     src={card.img}
//                     alt={card.title}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </figure>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default FeaturedProjects;



