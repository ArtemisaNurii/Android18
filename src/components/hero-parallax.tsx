import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';

// Interfaces and data structure remain the same
interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  // --- CHANGE 1: DYNAMIC ROW GENERATION ---
  // Instead of hardcoding 3 rows, we split the products array in half.
  // This makes the component flexible for any number of products.
  const firstRow = products.slice(0, Math.ceil(products.length / 2));
  const secondRow = products.slice(Math.ceil(products.length / 2));
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
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

  // --- CHANGE 2: ADJUSTED VERTICAL ANIMATION ---
  // The images will now move from -500px to 0px (their final resting position).
  // The original `500` pushed them far down the page, creating extra space.
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 0]),
    springConfig
  );

  return (
    // --- CHANGE 3: REDUCED CONTAINER HEIGHT ---
    // Reduced from 300vh to 200vh. This is the primary fix for the excessive
    // whitespace. It provides enough room for the effect without being overly long.
    <div
      ref={ref}
      className="h-[200vh] py-40 overflow-hidden antialiased relative flex flex-col items-center perspective-[1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="mb-20" // Add margin bottom here to space it from content below
      >
        {/* We now only render the two dynamic rows */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        {/* The hardcoded third row is now removed */}
      </motion.div>
    </div>
  );
};

// Header and ProductCard components remain unchanged. They are correct.
export const Header: React.FC = () => (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full text-center">
                <p className="text-sm  uppercase tracking-wide text-gray-500 pb-10">PROJECTS</p>

      <h1 className="text-2xl md:text-5xl font-normal text-black">
        The Ultimate <br /> development company
      </h1>
      <p className="max-w-2xl mx-auto text-base md:text-xl mt-8 text-black">
        We build beautiful products with the latest technologies and frameworks. Here are some of our latest  projects.
      </p>
    </div>
);
  
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
        className="group/product h-96 w-[30rem] relative flex-shrink-0"
        >
        <a href={product.link} className="block group-hover/product:shadow-2xl">
            <img
            src={product.thumbnail}
            height="600"
            width="600"
            className="object-cover object-left-top absolute h-full w-full inset-0"
            alt={product.title}
            />
        </a>
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
        <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
            {product.title}
        </h2>
        </motion.div>
    );
};