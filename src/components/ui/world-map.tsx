// src/ui/world-map.tsx

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion'; // <-- NEW: Import useInView
import DottedMap from 'dotted-map';

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
  theme?: 'light' | 'dark'; // Assuming you might handle theme
}

const WorldMap: React.FC<MapProps> = ({
  dots = [],
  lineColor = '#50C878',
  theme = 'light',
}) => {
  // NEW: Create a ref to attach to the component's main element
  const ref = useRef(null);
  
  // NEW: useInView will return true when the ref element is in the viewport
  // { once: true } ensures the animation only runs once
  // { amount: 0.5 } triggers the animation when 50% of the map is visible
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const map = new DottedMap({ height: 100, grid: 'diagonal' });
  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === 'dark' ? '#50C878' : '#00000040',
    shape: 'circle',
    backgroundColor: 'transparent',
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2 - Math.abs(start.x - end.x) * 0.2; // Adjust curve
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const bgColorClass = theme === 'dark' ? 'bg-black' : 'bg-white';

  return (
    // NEW: Attach the ref to this main div
    <div ref={ref} className={`w-full aspect-[2/1] ${bgColorClass} rounded-lg relative font-sans`}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              // CHANGED: Animate only when isInView is true
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{
                duration: 1.5,
                delay: isInView ? i * 0.2 : 0, // Stagger animation only when in view
                ease: "easeOut",
              }}
            />
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="20%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="80%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-${i}`}>
            {/* Start point (Albania) */}
            <circle cx={projectPoint(dot.start.lat, dot.start.lng).x} cy={projectPoint(dot.start.lat, dot.start.lng).y} r="3" fill={lineColor} />
            {/* Pulsing animation for start point */}
            {isInView && (
              <circle cx={projectPoint(dot.start.lat, dot.start.lng).x} cy={projectPoint(dot.start.lat, dot.start.lng).y} r="3" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="3" to="10" dur="1.5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            )}
            {/* End point */}
            <circle cx={projectPoint(dot.end.lat, dot.end.lng).x} cy={projectPoint(dot.end.lat, dot.end.lng).y} r="3" fill={lineColor} />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default WorldMap;