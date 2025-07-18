import { HandCoins, Hourglass, Rabbit } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- REFACTORED: Data is now separated from presentation ---
const cardData = [
  {
    percentage: "+30%",
    description: "Our solutions lead the way to a faster, sustainable deployment.",
    label: "SPEED",
    Icon: Rabbit,
  },
  {
    percentage: "25%",
    description: "Flexible engagement models that cut your costs.",
    label: "Flex & Cost",
    Icon: HandCoins,
  },
  {
    percentage: "40-days",
    description: "Faster talent acquisition to keep your pipeline full.",
    label: "Time‑to‑Hire",
    Icon: Hourglass,
  },
];

// --- NEW: Reusable StatCard component ---
// This simplifies the main component and makes the code much cleaner.
interface StatCardProps {
  percentage: string;
  description: string;
  label: string;
  Icon: React.ComponentType<{ size: number | string; className: string }>;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(({ percentage, description, label, Icon }, ref) => (
  <div
    ref={ref} // Forwarding the ref for GSAP animations
    className="flex flex-col justify-between rounded-2xl p-8 h-full cursor-pointer bg-gradient-to-br from-black to-emerald-900 [transform-style:preserve-3d]"
  >
    <div>
      <p className="text-5xl lg:text-7xl font-extralight tracking-tighter leading-none text-white">
        {percentage}
      </p>
      <p className="mt-4 text-base leading-relaxed text-gray-800">
        {description}
      </p>
    </div>
    <div className="mt-10 pt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">{label}</p>
      <div className="flex items-end justify-between mt-3">
        {/* Decorative logo bars */}
        <div className="flex items-center">
          <div className="flex items-end mr-2">
            <span className="h-4 w-1 bg-gray-800"></span>
            <span className="h-3 w-1 bg-gray-800 ml-0.5"></span>
          </div>
        </div>
        <Icon size={32} className="text-emerald-400" />
      </div>
    </div>
  </div>
));


const Saving = () => {
  // --- REFACTORED: Removed isMobile and isReadMoreHovered states ---
  // Their logic is now handled by Tailwind's responsive and hover prefixes.

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP animation logic remains largely the same, as it targets refs.
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      });

      // Paragraph text animation with split text effect
      const paragraphText = paragraphRef.current;
      if (paragraphText) {
        const words = paragraphText.textContent.split(' ');
        paragraphText.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        const wordSpans = paragraphText.querySelectorAll('.word');
        gsap.fromTo(wordSpans, { y: 20, opacity: 0, rotateX: 90 }, {
          y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.03, ease: "power2.out",
          scrollTrigger: { trigger: paragraphRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        });
      }

      // Cards animation with stagger effect
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.fromTo(cards, { y: 80, opacity: 0, scale: 0.8, rotateY: 45 }, {
          y: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: cards[0], start: "top 85%", toggleActions: "play none none reverse" }
        });

        // GSAP-based hover animations are preserved
        cards.forEach((card) => {
          const handleMouseEnter = () => gsap.to(card, { scale: 1.05, y: -10, duration: 0.3, ease: "power2.out" });
          const handleMouseLeave = () => gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
          card.addEventListener('mouseenter', handleMouseEnter);
          card.addEventListener('mouseleave', handleMouseLeave);
          // Cleanup
          return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
          };
        });
      }
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    // REFACTORED: Using Tailwind classes instead of style objects.
    // NOTE: bg-[#f8f7f4] is an arbitrary value to perfectly match the original design.
    <div className="bg-[#f8f7f4] font-sans p-6 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <header className="max-w-[550px] mb-16" ref={headerRef}>
          <h1 className="text-4xl lg:text-5xl font-semibold text-gray-700 leading-tight tracking-tight">
            Embedded, cross‑functional pods that ship 30% faster and cut run‑rate 25%
          </h1>
        </header>

        {/* REFACTORED: Using responsive grid classes */}
        <main className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-8">
          <div className="flex flex-col justify-between">
            <p className="text-lg leading-relaxed text-gray-700 [perspective:1000px]" ref={paragraphRef}>
              In under two weeks, tap into our vetted offshore developers and project managers to supercharge your team—with flexible, month‑to‑month agreements you can cancel or scale at any time, no long‑term contracts required. Our outcome‑focused SLAs guarantee results, reinforced by weekly velocity KPI reviews to keep your project on track.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* REFACTORED: Mapping over data to render reusable StatCard components */}
            {cardData.map((card, index) => (
              <StatCard
                key={card.label}
                ref={el => (cardsRef.current[index] = el)}
                {...card}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Saving;