"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────
 * Types & mock data
 * ────────────────────────────────*/
interface CaseStory {
  id: number;
  title: string;
  description: string;
  image: string;
}

const caseStories: CaseStory[] = [
  {
    id: 1,
    title: "UX design for FDA-cleared neuroimaging software",
    description:
      "Learn how our experts improved the neuro-imaging software’s user experience and helped the customer obtain FDA clearance to enter the US market.",
    image:
      "https://brandlogo.org/wp-content/uploads/2024/04/OpenAI-Logo.png.webp",
  },
  {
    id: 2,
    title:
      "Platform upgrade for a nonprofit education & research organization",
    description:
      "Discover how we revamped the customer’s education platform by re-architecting the code-base—making the solution more stable, easy to maintain, and future-proof.",
    image:
      "https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Scaling enterprise operations with Dynamics 365",
    description:
      "See how we helped a global retailer ensure operational scalability by implementing a Microsoft Dynamics 365 Finance and Supply Chain Management solution.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Unified care-management platform",
    description:
      "Learn how we delivered a healthcare platform that helps the client and their end-customers unify various care-management workflows and enhance service quality.",
    image:
      "https://images.unsplash.com/photo-1617366072770-0814659ea6af?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "AI-powered demand forecasting for retail",
    description:
      "We built an ML-driven forecasting engine that slashed out-of-stock events by 32 % while reducing waste across 400+ grocery stores.",
    image:
      "https://images.unsplash.com/photo-1634836023845-eddbfe9937da?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "End-to-end digital banking migration",
    description:
      "Our engineers modernized a legacy core-banking platform—migrating 15 M+ customer records to the cloud with zero downtime.",
    image:
      "https://images.unsplash.com/photo-1678347123725-2d0d31bc06bd?q=80&w=1702&auto=format&fit=crop",
  },
];

/* ────────────────────────────────
 * Card component
 * ────────────────────────────────*/
const ElegantCaseCard: React.FC<{ story: CaseStory; span: string }> = ({
  story,
  span,
}) => {
  const navigate = useNavigate();

  return (
    <article
      className={`${span} group relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-teal-500 hover:ring-offset-4 hover:ring-offset-gray-900`}
    >
      {/* Img & overlay */}
      <img
        src={story.image}
        alt={story.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text */}
      <div className="relative z-10 space-y-4 p-6 text-white transition-transform duration-500 group-hover:-translate-y-2 md:p-8">
        <h2 className="text-xl font-bold leading-snug lg:text-2xl">
          {story.title}
        </h2>
        <p className="text-base text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:line-clamp-3">
          {story.description}
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate(`/projects/${story.id}`)}
          className="flex items-center gap-2 font-semibold text-teal-700 opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          Read Case Study
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
};


const UserCase: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Industries");



  /* GSAP entrance */
  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { y: 50, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);
  const spanClasses = [
    "col-span-12 lg:col-span-6 lg:row-span-2",
    "col-span-12 sm:col-span-6 lg:col-span-6",
    "col-span-12 sm:col-span-6 lg:col-span-6",
    "col-span-12 sm:col-span-6 lg:col-span-4",
    "col-span-12 sm:col-span-6 lg:col-span-4",
    "col-span-12 sm:col-span-12 lg:col-span-4",
  ];
  return (
    <section className="bg-white px-4 py-16  sm:px-8 md:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900  pt-24 tracking-tight md:text-5xl">
            Our Work in Action
          </h1>
          <p className="mt-4 text-lg text-gray-400 md:text-xl">
            Explore how we've helped leading companies solve complex challenges.
          </p>
        </div>



        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-12 auto-rows-[280px] gap-6 lg:auto-rows-[320px]"
        >
          {caseStories.map((story, idx) => (
            <ElegantCaseCard
              key={story.id}
              story={story}
              span={spanClasses[idx % spanClasses.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserCase;
