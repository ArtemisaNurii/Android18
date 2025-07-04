// src/ui/world-map.tsx

import React, { useRef, useMemo } from 'react'; // <-- NEW: Import useMemo
import { motion, useInView } from 'framer-motion';
import DottedMap from 'dotted-map';

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
  theme?: 'light' | 'dark';
}

// --- NEW: Helper functions moved outside the component ---
// They don't rely on props or state, so they don't need to be redefined on every render.
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
// --- END NEW ---

const WorldMap: React.FC<MapProps> = ({
  dots = [],
  lineColor = '#50C878',
  theme = 'light',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // --- OPTIMIZATION 1: Memoize the expensive map generation ---
  // This will now only re-run when the `theme` prop changes, not on every render.
  const memoizedSvgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: 'diagonal' });
    return map.getSVG({
      radius: 0.22,
      color: theme === 'dark' ? '#50C878' : '#00000040',
      shape: 'circle',
      backgroundColor: 'transparent',
    });
  }, [theme]);

  // --- OPTIMIZATION 2: Memoize the dot and path calculations ---
  // This pre-calculates all coordinates and path strings, and only re-runs if `dots` prop changes.
  const memoizedDotsData = useMemo(() => {
    return dots.map((dot) => {
      const startPoint = projectPoint(dot.start.lat, dot.start.lng);
      const endPoint = projectPoint(dot.end.lat, dot.end.lng);
      const pathD = createCurvedPath(startPoint, endPoint);
      return { startPoint, endPoint, pathD };
    });
  }, [dots]);

  const bgColorClass = theme === 'dark' ? 'bg-black' : 'bg-white';

  return (
    <div ref={ref} className={`w-full aspect-[2/1] ${bgColorClass} rounded-lg relative font-sans`}>
      <img
        // CHANGED: Use the memoized SVG map
        src={`data:image/svg+xml;utf8,${encodeURIComponent(memoizedSvgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {/* CHANGED: Map over pre-calculated data for cleaner and more performant JSX */}
        {memoizedDotsData.map((data, i) => (
          <motion.path
            key={`path-${i}`}
            d={data.pathD}
            fill="none"
            stroke="url(#path-gradient)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{
              duration: 1.5,
              delay: isInView ? i * 0.2 : 0,
              ease: "easeOut",
            }}
          />
        ))}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="20%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="80%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* CHANGED: Map over pre-calculated data here as well */}
        {memoizedDotsData.map((data, i) => (
          <g key={`points-${i}`}>
            <circle cx={data.startPoint.x} cy={data.startPoint.y} r="3" fill={lineColor} />
            {isInView && (
              <circle cx={data.startPoint.x} cy={data.startPoint.y} r="3" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="3" to="10" dur="1.5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={data.endPoint.x} cy={data.endPoint.y} r="3" fill={lineColor} />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default WorldMap;