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
  // --- CHANGE 2: RE-INTRODUCE THREE ROWS FOR BETTER LAYOUT ---
  // Splitting products into three rows creates a more balanced and visually stable grid,
  // preventing rows from becoming excessively long on wide screens.
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'], // Animate from the start of the component to the end
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // --- CHANGE 3: ADJUST ANIMATION VALUES FOR A TIGHTER FEEL ---
  // Reduced translation from 1000px to a more subtle 400px.
  // This pairs with the reduced container height to make the effect feel more cohesive.
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 400]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 0]), // Adjusted for a smoother entry
    springConfig
  );

  return (
    // --- CHANGE 1: REDUCE CONTAINER HEIGHT TO MINIMIZE WHITESPACE ---
    // Switched from h-[200vh] to h-[120vh]. This is the most critical fix.
    // It provides enough scroll distance for the parallax effect without creating
    // a huge empty space after the content.
    <div
      ref={ref}
      className="h-[120vh] py-20 sm:py-40 overflow-hidden antialiased relative flex flex-col self-auto items-center [perspective:1000px] [transform-style:preserve-3d]"
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

// --- Header Component (No changes needed, it's already responsive) ---
export const Header: React.FC = () => {
  return (
    <div id="projects" className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full text-center">
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