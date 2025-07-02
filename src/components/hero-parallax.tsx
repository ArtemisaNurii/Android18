// import React, { useRef } from 'react';
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue,
// } from 'framer-motion';

// // --- Interfaces (No changes needed) ---
// interface Product {
//   title: string;
//   link: string;
//   thumbnail: string;
// }

// interface HeroParallaxProps {
//   products: Product[];
// }

// export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
//   const firstRow = products.slice(0, 5);
//   const secondRow = products.slice(5, 10);
//   const thirdRow = products.slice(10, 15);
//   const ref = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['start start', 'end start'],
//   });

//   const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

//   const translateX = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, 400]),
//     springConfig
//   );
//   const translateXReverse = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, -400]),
//     springConfig
//   );

//   // --- CHANGE 2: REFINE THE ENTRY ANIMATION ---
//   // We adjust the animation range to feel smoother over the new, taller container.
//   // The translateY starts from a less extreme -400px and settles at 50px for better framing.
//   const animationRange = [0, 0.3]; // Use a variable for consistency
//   const rotateX = useSpring(
//     useTransform(scrollYProgress, animationRange, [15, 0]),
//     springConfig
//   );
//   const opacity = useSpring(
//     useTransform(scrollYProgress, animationRange, [0.2, 1]),
//     springConfig
//   );
//   const rotateZ = useSpring(
//     useTransform(scrollYProgress, animationRange, [20, 0]),
//     springConfig
//   );
//   const translateY = useSpring(
//     useTransform(scrollYProgress, animationRange, [-400, 50]), // From -400px to 50px
//     springConfig
//   );

//   return (
//     // --- CHANGE 1: INCREASE CONTAINER HEIGHT ---
//     // Switched from h-[120vh] to h-[160vh]. This is the critical fix.
//     // It provides enough scroll distance to see all three rows of content on
//     // most laptop screens without creating excessive empty space.
//     <div
//       ref={ref}
//       className="h-[120vh] max-md:h-[160vh] py-20 sm:py-40 overflow-hidden antialiased relative flex flex-col self-auto items-center [perspective:1000px] [transform-style:preserve-3d]"
//     >
//       <Header />
//       <motion.div
//         style={{
//           rotateX,
//           rotateZ,
//           translateY,
//           opacity,
//         }}
//         className=""
//       >
//         <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 sm:space-x-20 mb-10 sm:mb-20">
//           {firstRow.map((product) => (
//             <ProductCard
//               product={product}
//               translate={translateX}
//               key={product.title}
//             />
//           ))}
//         </motion.div>
//         <motion.div className="flex flex-row mb-10 sm:mb-20 space-x-10 sm:space-x-20">
//           {secondRow.map((product) => (
//             <ProductCard
//               product={product}
//               translate={translateXReverse}
//               key={product.title}
//             />
//           ))}
//         </motion.div>
//         <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 sm:space-x-20">
//           {thirdRow.map((product) => (
//             <ProductCard
//               product={product}
//               translate={translateX}
//               key={product.title}
//             />
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// // --- Header Component (No changes needed) ---
// export const Header: React.FC = () => {
//   return (
//     <div
//       id="projects"
//       className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full text-center"
//     >
//       <p className="text-sm uppercase tracking-wide text-gray-500 pb-10">
//         PROJECTS
//       </p>
//       <h1 className="text-3xl md:text-5xl font-bold text-neutral-800">
//         The Ultimate <br /> Development Showcase
//       </h1>
//       <p className="max-w-2xl mx-auto text-base md:text-xl mt-8 text-neutral-600">
//         We build beautiful products with the latest technologies and frameworks.
//         Here are some of our latest projects.
//       </p>
//     </div>
//   );
// };

// // --- ProductCard Component (No changes needed) ---
// interface ProductCardProps {
//   product: Product;
//   translate: MotionValue<number>;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   translate,
// }) => {
//   return (
//     <motion.div
//       style={{
//         x: translate,
//       }}
//       whileHover={{
//         y: -20,
//       }}
//       key={product.title}
//       className="group/product h-64 w-[20rem] sm:h-96 sm:w-[30rem] relative flex-shrink-0"
//     >
//       <a
//         href={product.link}
//         className="block group-hover/product:shadow-2xl transition-shadow duration-300"
//       >
//         <img
//           src={product.thumbnail}
//           height="600"
//           width="600"
//           className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
//           alt={product.title}
//         />
//       </a>
//       <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black/70 pointer-events-none transition-opacity duration-300 rounded-lg"></div>
//       <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-lg">
//         {product.title}
//       </h2>
//     </motion.div>
//   );
// };


"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  SpringOptions,
} from "framer-motion";

/* ──────────────────────────────────────────────
   Shared Types
   ────────────────────────────────────────────── */

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

/* ──────────────────────────────────────────────
   Hero Parallax
   ────────────────────────────────────────────── */

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  // Slice the array into three equal-length rows (defensive fallback for short lists)
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll progress (0 → 1) while the section is in view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Spring settings reused across animations
  const springConfig: SpringOptions = { stiffness: 300, damping: 30, bounce: 0.8 };

  // Derived animated values
  const translateX: MotionValue<number> = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse: MotionValue<number> = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  return (
    <div
      ref={ref}
      className="relative flex flex-col overflow-hidden py-2s0 h-[200vh] antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {/* Row 1 */}
        <motion.div className="mb-20 flex flex-row-reverse space-x-reverse space-x-20">
          {firstRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="mb-20 flex flex-row space-x-20">
          {secondRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateXReverse} />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Header
   ────────────────────────────────────────────── */

export const Header: React.FC = () => (
  <header className="relative mx-auto w-full max-w-7xl px-4 py-20 md:py-40">
    <h1 className="text-2xl font-bold dark:text-white md:text-7xl">
Projects      <br />
    </h1>
    <p className="mt-8 max-w-2xl text-base dark:text-neutral-200 md:text-xl">
    We build beautiful products with the latest technologies and frameworks.
             Here are some of our latest projects.
    </p>
  </header>
);

/* ──────────────────────────────────────────────
   Product Card
   ────────────────────────────────────────────── */

interface ProductCardProps {
  product: Product;
  translate: MotionValue<number>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, translate }) => (
  <motion.div
    className="group/product relative h-96 w-[30rem] shrink-0"
    style={{ x: translate }}
    whileHover={{ y: -20 }}
  >
    <a href={product.link} className="block group-hover/product:shadow-2xl">
      <img
        src={product.thumbnail}
        alt={product.title}
        width={600}
        height={600}
        className="absolute inset-0 h-full w-full object-cover object-left-top"
      />
    </a>

    {/* Darken overlay */}
    <div className="pointer-events-none absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black" />

    {/* Caption */}
    <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
      {product.title}
    </h2>
  </motion.div>
);
