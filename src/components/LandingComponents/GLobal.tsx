// // src/App.jsx

// import { useRef } from 'react';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';

// // --- Import the new component ---
// import typingImage from './../../assets/images/black.png';
// import WorldMapDemo from './WorldMap';

// function GlobalismPage() {
//   const container = useRef();
  
//   // The main page-load animation timeline remains here
//   // to orchestrate the entire page's entry sequence.
//   useGSAP(() => {
//     const tl = gsap.timeline({ defaults: { ease: 'power3.out' }});
    
//     tl.from('.fade-in-up', {
//         y: 50,
//         opacity: 0,
//         duration: 0.8,
//         stagger: 0.2
//       })
//       // GSAP can still target '.map-image' and '.map-dot' even though
//       // they are in a child component, because the scope covers all children.
//       .from('.map-image', { 
//         opacity: 0, 
//         scale: 0.9, 
//         duration: 1 
//       }, '-=0.5')
//       .from('.map-dot', { 
//         opacity: 0,
//         scale: 0,
//         duration: 0.5,
//         stagger: 0.05
//       }, '-=0.7')
//       .from('.plans-card', {
//         x: -100,
//         opacity: 0,
//         duration: 1
//       }, '-=0.5')
//       .from('.typing-image-container', {
//         opacity: 0,
//         duration: 1
//       }, '<');

//   }, { scope: container });

//   return (
//     <div ref={container} className="bg-dark-bg text-white font-sans min-h-screen p-8 md:p-12 lg:p-16 overflow-hidden">
//       <main className="w-full max-w-7xl mx-auto">
//         {/* === TOP SECTION: GLOBAL SCOPE === */}
//         <section className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[50vh]">
//           {/* Left Side: Text content */}
//           <div className="flex flex-col gap-6">
//             <h1 className="fade-in-up text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest-plus">
//               Globalism
//             </h1>
//             <p className="fade-in-up text-gray-300 max-w-md">
//               Our vision transcends borders. We're building a connected future,
//               leveraging technology to foster collaboration on a worldwide scale.
//             </p>
//             <div className="fade-in-up mt-4">
//               <button className="bg-primary-lime text-dark-bg font-bold py-3 px-8 rounded-full transition-transform hover:scale-105">
//                 View more
//               </button>
//             </div>
//           </div>

//           {/* Right Side: Replaced with our new component */}
//           <WorldMapDemo />

//         </section>

//         {/* === BOTTOM SECTION: PLANS === */}
//         <section className="relative mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           {/* Left Side: Plans Card */}
//           <div className="plans-card relative z-10 bg-gray-100/95 backdrop-blur-sm text-dark-bg p-8 md:p-10 rounded-3xl shadow-2xl overflow-hidden">
//             <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest-plus flex items-center">
//               Plans <span className="ml-4 text-3xl">→</span>
//             </h2>
//             <p className="mt-4 text-gray-600 max-w-sm">
//               Explore our strategic initiatives designed for global impact and
//               sustainable growth.
//             </p>
//             <div className="absolute w-52 h-52 md:w-64 md:h-64 bg-primary-lime rounded-full -bottom-24 -left-24 md:-bottom-28 md:-left-28"></div>
//           </div>
          
//           {/* Right Side: Typing Image */}
//           <div className="typing-image-container relative h-64 md:h-full w-full rounded-3xl overflow-hidden -mt-16 md:mt-0 md:-ml-24">
//              <img 
//                src={typingImage} 
//                alt="Person typing on a laptop" 
//                className="absolute inset-0 w-full h-full object-cover filter grayscale"
//              />
//              <div className="absolute inset-0 bg-black/30"></div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default GlobalismPage;