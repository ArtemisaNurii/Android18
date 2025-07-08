"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Contact from "../LandingComponents/ContactPage";

// Project data with unique IDs
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform Revamp",
    description:
      "Redesigned and optimized for performance, this e-commerce platform delivers seamless shopping experiences and drives higher conversion rates.",
    image:
      "https://img.freepik.com/premium-vector/business-icon-logo-design-vector-graphic_6415-17810.jpg",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description:
      "Secure and intuitive mobile banking solution with real-time transaction tracking, biometric authentication, and AI-driven financial insights.",
    image:
      "https://img.freepik.com/premium-vector/elegant-contemporary-abstract-logo_315428-169.jpg",
  },
  {
    id: 3,
    title: "Real-Time Analytics Dashboard",
    description:
      "Interactive dashboard providing live data visualizations and custom reporting tools to drive data-driven decision-making across the organization.",
    image:
      "https://img.freepik.com/free-vector/business-logo_23-2147503133.jpg",
  },
  {
    id: 4,
    title: "CRM Integration Tool",
    description:
      "Custom-built connector that seamlessly integrates existing CRM systems with third-party services, automating workflows and improving lead management.",
    image:
      "https://img.freepik.com/free-vector/figure-folded-logo_1043-97.jpg",
  },
  {
    id: 5,
    title: "Cloud Migration Service",
    description:
      "Comprehensive planning and execution to migrate legacy infrastructure to the cloud, ensuring minimal downtime and enhanced scalability.",
    image:
      "https://www.shutterstock.com/image-vector/modern-vector-graphic-cubes-colorful-260nw-1960184035.jpg",
  },
];

const SCALE_FACTOR = 0.06;
// Tighter separation for desktop stacking
const CARD_SEPARATION_PERCENT = 40;

// Calculate circular offset for infinite loop effect
const getCircularOffset = (index: number, activeIndex: number, total: number) => {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

const ProjectCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };
  const handleCardClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeProject = projects[activeIndex];

  const mobileVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Desktop 3D Carousel */}
      <div className="relative hidden h-[400px] w-full max-w-4xl md:block">
        {projects.map((project, index) => {
          const offset = getCircularOffset(index, activeIndex, projects.length);
          const isVisible = Math.abs(offset) <= 2;
          return isVisible ? (
            <motion.div
              key={project.id}
              className="absolute flex h-[450px] w-[350px] cursor-pointer items-center justify-center rounded-xl shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                left: "50%",
                top: "50%",
                y: "-50%",
              }}
              animate={{
                x: `calc(-50% + ${offset * CARD_SEPARATION_PERCENT}%)`,
                scale: 1 - Math.abs(offset) * SCALE_FACTOR,
                zIndex: projects.length - Math.abs(offset),
                filter: `blur(${Math.abs(offset) > 0 ? 4 : 0}px)`,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={() => handleCardClick(index)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="pointer-events-none h-full w-full rounded-xl object-cover"
              />
            </motion.div>
          ) : null;
        })}
      </div>

      {/* Mobile Carousel */}
      <div className="w-full px-4 md:hidden">
        <div className="relative mx-auto h-[480px] w-full max-w-sm overflow-hidden rounded-xl bg-black/10">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={mobileVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute flex h-full w-full flex-col items-center justify-start p-4"
            >
              <div className="relative h-52 w-full">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full rounded-lg object-cover shadow-lg"
                />
              </div>
              <div className="mt-4 flex-grow text-center">
                <h2 className="text-2xl font-bold text-white">{activeProject.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  {activeProject.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Details & Call-to-Action */}
      <div className="relative mt-20 sm:pb-10 w-full max-w-xl text-center">
        <div className="hidden md:block mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                {activeProject.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
                {activeProject.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => navigate(`/projects/${activeProject.id}`)}
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-emerald-500/30"
        >
          View Project
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Prev / Next Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handlePrev}
          className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Previous Project"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Next Project"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

const ProjectPage: React.FC = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-x-hidden
        bg-black
        px-4 sm:px-8 md:px-10 lg:px-20
        py-16
        min-h-screen
        flex flex-col justify-center
      "
    >
      {/* Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-teal-300" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center">
        <div className="mb-12 sm:mb-4 text-center md:mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our Work in Action
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400 md:text-xl">
            Explore how we've helped leading companies solve complex challenges
            through innovative solutions.
          </p>
        </div>
        <ProjectCarousel />
      </div>

    </section>
  );
};

export default ProjectPage;
