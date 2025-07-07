// //
// 'use client';
// import { ReactLenis } from 'lenis/react';

// export default function Stacking(): JSX.Element {
//     return (
//       <ReactLenis root>
//         <main className='bg-black'>
//           {/* The wrapper now contains ALL the sticky elements */}
//           <div className='wrapper'>
//             {/* Section 1: The sticky header */}
//             <section className='text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0'>
//               <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
//               <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
//                 CSS Sticky Properties for <br /> Stacking Cards. Scroll down! 👇
//               </h1>
//             </section>
  
//             {/* Section 2: The stacking cards are now INSIDE the wrapper */}
//             {/* Note: We don't need the extra <section> wrapper around the cards anymore */}
            
//             <div className='sm:sticky sm:top-0 w-full'>
//               <figure className='w-full h-screen flex items-center justify-center'>
//                 <img
//                   src='https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=1200&auto=format&fit=crop'
//                   alt=''
//                   className='transition-all duration-300 h-[80%] w-[55%] align-bottom object-cover rounded-md'
//                 />
//               </figure>
//             </div>
//             <div className='sm:sticky sm:top-2 w-full'>
//               <figure className='w-full h-screen flex items-center justify-center'>
//                 <img
//                   src='https://images.unsplash.com/photo-1476180814856-a36609db0493?w=1200&auto=format&fit=crop'
//                   alt=''
//                   className='transition-all duration-300 h-[80%] w-[60%] align-bottom object-cover rounded-md [box-shadow:0_-5px_16px_4px_rgba(0,0,0,0.8),0_2px_4px_-1px_rgba(0,0,0,0.06)]'
//                 />
//               </figure>
//             </div>
//             <div className='sm:sticky sm:top-4 w-full'>
//               <figure className='w-full h-screen flex items-center justify-center'>
//                 <img
//                   src='https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=1200&auto=format&fit=crop'
//                   alt=''
//                   className='transition-all duration-300 h-[80%] w-[65%] align-bottom object-cover rounded-md'
//                 />
//               </figure>
//             </div>
//             <div className='sm:sticky sm:top-6 w-full'>
//               <figure className='w-full h-screen flex items-center justify-center'>
//                 <img
//                   src='https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=1200&auto=format&fit=crop'
//                   alt=''
//                   className='transition-all duration-300 h-[80%] w-[70%] align-bottom object-cover rounded-md'
//                 />
//               </figure>
//             </div>
//             <div className='sm:sticky sm:top-8 w-full'>
//               <figure className='w-full h-screen flex items-center justify-center'>
//                 <img
//                   src='https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=1200&auto=format&fit=crop'
//                   alt=''
//                   className='transition-all duration-300 h-[80%] w-[75%] align-bottom object-cover rounded-md'
//                 />
//               </figure>
//             </div>
//             <div className='sm:sticky sm:top-12 w-full'>
//               <figure className='w-full h-screen flex items-center justify-center'>
//                 <img
//                   src='https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=1200&auto=format&fit=crop'
//                   alt=''
//                   className='transition-all duration-300 h-[80%] w-[80%] align-bottom object-cover rounded-md'
//                 />
//               </figure>
//             </div>
//           </div>
  
//           {/* The footer comes after the wrapper has finished scrolling */}
//           <footer className='group bg-slate-950'>
//             <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
//               ui-layout
//             </h1>
//             <div className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
//           </footer>
//         </main>
//       </ReactLenis>
//     );
//   // 



// import React, { useEffect, useRef } from 'react';
// import { animate, scroll, spring } from 'motion';
// import { ReactLenis } from 'lenis/react';

// export default function HorizontalScroll(): JSX.Element {
//   const ulRef = useRef<HTMLUListElement | null>(null);

//   useEffect(() => {
//     // Only grab the LIs inside *this* section
//     const sectionEl = document.querySelector<HTMLElement>('section');
//     const items = sectionEl?.querySelectorAll<HTMLLIElement>('ul > li') || [];

//     // 1) Horizontal pan for the whole UL
//     if (ulRef.current && sectionEl && items.length > 0) {
//       const distance = (items.length - 1) * 100; // in vw
//       const controls = animate(
//         ulRef.current,
//         { transform: ['none', `translateX(-${distance}vw)`] },
//         { easing: spring() }
//       );
//       scroll(controls, { target: sectionEl });
//     }

//     // 2) Individual H2 reveal animations
//     const segment = 1 / items.length;
//     items.forEach((item, i) => {
//       const header = item.querySelector<HTMLElement>('h2');
//       if (header && sectionEl) {
//         const headerAnim = animate(header, { x: [800, -800] });
//         scroll(headerAnim, {
//           target: sectionEl,
//           offset: [
//             [i * segment, 1],
//             [(i + 1) * segment, 0],
//           ],
//         });
//       }
//     });
//   }, []);

//   return (
//     <ReactLenis root>
//       <main>
//         <article>
//           <header className='text-white relative w-full bg-slate-950 grid place-content-center h-[80vh]'>
//             <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />
//             <h1 className='text-6xl font-bold text-center tracking-tight'>
//               I know You Love to Scroll
//               <br />
//               So Scroll
//             </h1>
//           </header>

//           <section className='h-[500vh] relative'>
//             <ul ref={ulRef} className='flex sticky top-0'>
//               <li className='h-screen w-screen bg-red-400 flex flex-col justify-center items-center overflow-hidden'>
//                 <h2 className='text-[20vw] font-semibold relative bottom-5'>PASSION</h2>
//                 <img
//                   src='https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png'
//                   className='2xl:w-[550px] w-[380px] absolute bottom-0'
//                   width={500}
//                   height={500}
//                   alt='team'
//                 />
//               </li>
//               <li className='h-screen w-screen bg-blue-400 flex flex-col justify-center items-center overflow-hidden'>
//                 <h2 className='text-[20vw] font-semibold relative bottom-5'>WORK</h2>
//                 <img
//                   src='https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png'
//                   className='2xl:w-[550px] w-[380px] absolute bottom-0'
//                   width={500}
//                   height={500}
//                   alt='team'
//                 />
//               </li>
//               <li className='h-screen w-screen bg-orange-400 flex flex-col justify-center items-center overflow-hidden'>
//                 <h2 className='text-[20vw] font-semibold relative bottom-5'>MOTIVATION</h2>
//                 <img
//                   src='https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png'
//                   className='2xl:w-[550px] w-[380px] absolute bottom-0'
//                   width={500}
//                   height={500}
//                   alt='team'
//                 />
//               </li>
//               <li className='h-screen w-screen bg-yellow-400 flex flex-col justify-center items-center overflow-hidden'>
//                 <h2 className='text-[20vw] font-semibold relative bottom-5'>INSPIRATION</h2>
//                 <img
//                   src='https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png'
//                   className='2xl:w-[550px] w-[380px] absolute bottom-0'
//                   width={500}
//                   height={500}
//                   alt='team'
//                 />
//               </li>
//               <li className='h-screen w-screen bg-green-400 flex flex-col justify-center items-center overflow-hidden'>
//                 <h2 className='text-[20vw] font-semibold relative bottom-5'>BELIEVE</h2>
//                 <img
//                   src='https://res.cloudinary.com/dzl9yxixg/image/upload/v1713532202/ui-layout/team_gsu8ej.png'
//                   className='2xl:w-[550px] w-[380px] absolute bottom-0'
//                   width={500}
//                   height={500}
//                   alt='team'
//                 />
//               </li>
//             </ul>
//           </section>

//           <footer className='bg-red-600 text-white grid place-content-center h-[80vh]'>
//             <p>
//               Created By{' '}
//               <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/mattgperry'>
//                 Matt Perry
//               </a>
//             </p>
//           </footer>
//         </article>

//         {/* Optional progress bar */}
//         <div className='progress fixed left-0 right-0 bottom-[50px] h-2 rounded-full bg-red-600 scale-x-0' />
//       </main>
//     </ReactLenis>
//   );
// }
