import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Define the type for the component's props
interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Animate open/close based on the isOpen prop
  useEffect(() => {
    const contentEl = contentRef.current;
    const iconEl = iconRef.current;

    if (contentEl && iconEl) {
      gsap.killTweensOf([contentEl, iconEl]); // Prevent overlapping animations

      const tl = gsap.timeline();

      if (isOpen) {
        tl.to(iconEl, { rotation: 45, duration: 0.3, ease: 'power2.inOut' })
          .to(contentEl, {
            height: 'auto',
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          }, '<'); // The '<' starts this animation at the same time as the previous one
      } else {
        tl.to(iconEl, { rotation: 0, duration: 0.3, ease: 'power2.inOut' })
          .to(contentEl, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          }, '<');
      }
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6"
        aria-expanded={isOpen}
      >
        <span className="textmd font-normal text-black/80">{question}</span>
        {/* The 'x' in the original is created by rotating a '+' */}
        <div ref={iconRef} className="relative w-6 h-6 flex-shrink-0">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-[#36c574]"></span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#36c574]"></span>
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden h-0 opacity-0"
        style={{ willChange: 'height, opacity' }} // Optimize for animation
      >
        <p className="pb-6 text-black/70">
          {answer}
        </p>
      </div>
      
    </div>
  );
};

export default FaqItem;