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
   Shared Types & Constants
   ────────────────────────────────────────────── */

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

const springConfig: SpringOptions = {
  stiffness: 300,
  damping: 30,
  bounce: 0.8,
};

/* ──────────────────────────────────────────────
   Hero Parallax Component (Main)
   ────────────────────────────────────────────── */

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  // Ensure we always have arrays, even if products are fewer than 15
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = useRef<HTMLDivElement | null>(null);

  // Set up scroll tracking for the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // Animation starts when the top of the container hits the top of the viewport
  });

  // --- REFINED ANIMATIONS FOR RESPONSIVENESS ---

  // Parallax translation for the rows. Reduced the travel distance for a subtler effect.
  const translateX: MotionValue<number> = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    springConfig
  );
  const translateXReverse: MotionValue<number> = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    springConfig
  );

  // Entry animation for the entire grid. Happens quickly at the beginning of the scroll.
  const entryAnimationRange = [0, 0.2];
  const rotateX = useSpring(useTransform(scrollYProgress, entryAnimationRange, [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, entryAnimationRange, [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, entryAnimationRange, [10, 0]), springConfig);
  // Using scale instead of translateY for the entry animation is more robust across screen sizes.
  const scale = useSpring(useTransform(scrollYProgress, entryAnimationRange, [0.8, 1]), springConfig);

  return (
    // --- RESPONSIVE CONTAINER ---
    // Removed fixed h-[200vh]. Height is now determined by content + padding.
    // This solves the "too much white space" problem on large screens.
    <div
      ref={ref}
      className="relative flex flex-col items-center self-auto overflow-hidden py-20 antialiased md:py-40 [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          scale,
          opacity,
        }}
        className="mt-8 md:mt-12"
      >
        {/* Row 1 */}
        <motion.div className="mb-4 flex flex-row-reverse space-x-4 space-x-reverse sm:mb-8 sm:space-x-8">
          {firstRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="mb-4 flex flex-row space-x-4 sm:mb-8 sm:space-x-8">
          {secondRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateXReverse} />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div className="flex flex-row-reverse space-x-4 space-x-reverse sm:space-x-8">
          {thirdRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Header Component
   ────────────────────────────────────────────── */

export const Header: React.FC = () => (
  <header className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center">
    <h1 className="text-3xl font-bold dark:text-white md:text-5xl lg:text-6xl">
     Our Projects
    </h1>
    <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 dark:text-neutral-300 md:text-xl">
      We build beautiful products with the latest technologies and frameworks. Here are some of our latest projects.
    </p>
  </header>
);

/* ──────────────────────────────────────────────
   Product Card Component
   ────────────────────────────────────────────── */

interface ProductCardProps {
  product: Product;
  translate: MotionValue<number>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, translate }) => (
  <motion.div
    // --- RESPONSIVE CARD SIZING ---
    className="group/product relative h-64 w-[20rem] shrink-0 rounded-lg sm:h-80 sm:w-[25rem] lg:h-96 lg:w-[30rem]"
    style={{ x: translate }}
    whileHover={{ y: -20, transition: { duration: 0.2 } }}
  >
    <a
      href={product.link}
      className="block h-full w-full group-hover/product:shadow-2xl transition-shadow duration-300"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        width={600}
        height={600}
        className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
      />
    </a>

    {/* Darken overlay on hover */}
    <div className="pointer-events-none absolute inset-0 h-full w-full rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover/product:opacity-60" />

    {/* Title on hover */}
    <h2 className="absolute bottom-4 left-4 font-semibold text-white opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
      {product.title}
    </h2>
  </motion.div>
);