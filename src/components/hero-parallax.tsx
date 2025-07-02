import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';

// --- Interfaces (No changes needed) ---
interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 400]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400]),
    springConfig
  );

  // --- CHANGE 2: REFINE THE ENTRY ANIMATION ---
  // We adjust the animation range to feel smoother over the new, taller container.
  // The translateY starts from a less extreme -400px and settles at 50px for better framing.
  const animationRange = [0, 0.3]; // Use a variable for consistency
  const rotateX = useSpring(
    useTransform(scrollYProgress, animationRange, [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, animationRange, [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, animationRange, [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, animationRange, [-400, 50]), // From -400px to 50px
    springConfig
  );

  return (
    // --- CHANGE 1: INCREASE CONTAINER HEIGHT ---
    // Switched from h-[120vh] to h-[160vh]. This is the critical fix.
    // It provides enough scroll distance to see all three rows of content on
    // most laptop screens without creating excessive empty space.
    <div
      ref={ref}
      className="h-[120vh] max-md:h-[160vh] py-20 sm:py-40 overflow-hidden antialiased relative flex flex-col self-auto items-center [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 sm:space-x-20 mb-10 sm:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-10 sm:mb-20 space-x-10 sm:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 sm:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- Header Component (No changes needed) ---
export const Header: React.FC = () => {
  return (
    <div
      id="projects"
      className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full text-center"
    >
      <p className="text-sm uppercase tracking-wide text-gray-500 pb-10">
        PROJECTS
      </p>
      <h1 className="text-3xl md:text-5xl font-bold text-neutral-800">
        The Ultimate <br /> Development Showcase
      </h1>
      <p className="max-w-2xl mx-auto text-base md:text-xl mt-8 text-neutral-600">
        We build beautiful products with the latest technologies and frameworks.
        Here are some of our latest projects.
      </p>
    </div>
  );
};

// --- ProductCard Component (No changes needed) ---
interface ProductCardProps {
  product: Product;
  translate: MotionValue<number>;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  translate,
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-64 w-[20rem] sm:h-96 sm:w-[30rem] relative flex-shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl transition-shadow duration-300"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black/70 pointer-events-none transition-opacity duration-300 rounded-lg"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-lg">
        {product.title}
      </h2>
    </motion.div>
  );
};