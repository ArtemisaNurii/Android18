// src/ui/world-map.tsx

import React, { useRef, useMemo, FC } from "react";
import { motion, useInView } from "framer-motion";
import DottedMap from "dotted-map";

// --- 1. Define Richer Prop Types ---
interface LocationData {
  name: string;
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

interface MapProps {
  data: LocationData[];
  colors?: string[];
  onPointHover?: (data: LocationData | null) => void;
  activePoint?: string | null;
  theme?: "light" | "dark";
}

// Helper function for projecting lat/lng to 2D coordinates
const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

// Helper function for creating the SVG curve path
const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2 - Math.abs(start.x - end.x) * 0.25; // Adjusted curve
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};


const WorldMap: FC<MapProps> = ({
  data = [],
  colors = ["#ffffff", "#ffffff", "#ffffff"], // Gray-900 color for connecting lines
  onPointHover = () => {},
  activePoint = null,
  theme = "light",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // --- 2. Memoized Background Map ---
  const memoizedSvgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: theme === "dark" ? "#34d399" : "#10b981", // Emerald dot colors
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [theme]);

  // --- 3. Memoized Arc & Point Data ---
  // This calculates all path and point data once, preventing recalculation on every render.
  const memoizedDotsData = useMemo(() => {
    return data.map((item, index) => {
      const startPoint = projectPoint(item.start.lat, item.start.lng);
      const endPoint = projectPoint(item.end.lat, item.end.lng);
      const pathD = createCurvedPath(startPoint, endPoint);
      const color = colors[index % colors.length]; // Cycle through colors
      
      return { ...item, startPoint, endPoint, pathD, color };
    });
  }, [data, colors]);

  const centralPointData = memoizedDotsData[0]; // Assuming first item has the central start point

  return (
    <div ref={ref} className="relative w-full h-full select-none">
      {/* Background Dotted Map */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(memoizedSvgMap)}`}
        className="pointer-events-none absolute inset-0 w-full h-full object-contain [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map background"
        draggable={false}
      />
      {/* SVG Overlay for Arcs and Points */}
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {/* Render all arcs */}
          {memoizedDotsData.map((item, i) => {
            const isActive = activePoint === item.name;
            return (
              <motion.path
                key={`path-${item.name}`}
                d={item.pathD}
                fill="none"
                stroke={item.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeOpacity={isActive ? 1 : 0.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isInView ? 1 : 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </g>
        
        <g>
          {/* Render central point with animation */}
          {centralPointData && (
            <g>
              <circle cx={centralPointData.startPoint.x} cy={centralPointData.startPoint.y} r="4" fill={centralPointData.color} />
              {isInView && (
                <circle cx={centralPointData.startPoint.x} cy={centralPointData.startPoint.y} r="4" fill={centralPointData.color} opacity="0.7">
                  <animate attributeName="r" from="4" to="12" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          )}

          {/* Render destination points */}
          {memoizedDotsData.map((item) => {
             const isActive = activePoint === item.name;
            return (
              <motion.g 
                key={`point-${item.name}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <circle
                  cx={item.endPoint.x}
                  cy={item.endPoint.y}
                  r={isActive ? 5 : 3.5}
                  fill={item.color}
                  style={{ transition: 'r 0.2s ease-in-out' }}
                />
                {/* --- 4. Interactive Hover Area --- */}
                <rect
                  x={item.endPoint.x - 10}
                  y={item.endPoint.y - 10}
                  width="20"
                  height="20"
                  fill="transparent"
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => onPointHover(item)}
                  onMouseLeave={() => onPointHover(null)}
                />
              </motion.g>
            )
          })}
        </g>
      </svg>
    </div>
  );
};

export default WorldMap;