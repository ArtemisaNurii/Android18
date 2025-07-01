import React from 'react';

// Define the props interface for type safety
interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, image, text }) => {
  return (
    <figure
      className="relative w-80 max-w-xs flex-shrink-0 rounded-2xl border border-white/10 bg-gray-800/60 p-6 shadow-lg backdrop-blur-sm md:w-96 md:p-8"
    >
      <blockquote className="relative z-10 text-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-4 -left-4 h-16 w-16 text-white/10"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-1.005.144-.302.345-.52.592-.659.247-.138.54-.16.896-.138 1.343.049 2.67.65 3.597 1.418.927.768 1.44 1.84 1.44 3.143 0 1.458-.69 2.733-2.074 3.828a6.32 6.32 0 0 1-3.342 1.284c-.42.062-.837.094-1.254.094a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1.558a1 1 0 0 0-1-1H12zM4 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H2.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-1.005.144-.302.345-.52.592-.659.247-.138.54-.16.896-.138 1.343.049 2.67.65 3.597 1.418.927.768 1.44 1.84 1.44 3.143 0 1.458-.69 2.733-2.074 3.828a6.32 6.32 0 0 1-3.342 1.284c-.42.062-.837.094-1.254.094a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H5.558a1 1 0 0 0-1-1H4z" />
        </svg>
        <p className="z-10 text-base font-light italic">"{text}"</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
};

export default TestimonialCard;