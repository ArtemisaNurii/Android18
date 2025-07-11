// src/components/WorldMapDemo.tsx

import React, { useState } from "react";
import WorldMap from "../ui/world-map"; // Assuming this is the path to your map component

// Define a type for our location data for better type safety
interface Location {
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
}

// Define the type for the arcs/dots we'll be drawing
interface Arc {
  name: string;
  start: Location["coords"];
  end: Location["coords"];
}

export const WorldMapDemo: React.FC = () => {
  // --- 1. Enhanced Data Structure ---
  const centralLocation: Location = {
    name: "Tirana, Albania",
    coords: { lat: 41.3275, lng: 19.8187 },
  };

  const connections: Arc[] = [
    { name: "Los Angeles, USA", start: centralLocation.coords, end: { lat: 34.0522, lng: -118.2437 } },
    { name: "New York, USA", start: centralLocation.coords, end: { lat: 40.7128, lng: -74.0060 } },
    { name: "Sydney, Australia", start: centralLocation.coords, end: { lat: -38.8888, lng: 141.2093 } },
    { name: "Tokyo, Japan", start: centralLocation.coords, end: { lat: 38.6895, lng: 134.6917 } },
    { name: "Rio de Janeiro, Brazil", start: centralLocation.coords, end: { lat: -22.9068, lng: -43.1729 } },
    { name: "Moscow, Russia", start: centralLocation.coords, end: { lat: 55.7558, lng: 37.6173 } },
    { name: "London, UK", start: centralLocation.coords, end: { lat: 51.5074, lng: -0.1278 } },
  ];

  // --- 2. State for Interactivity ---
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  
  // --- 3. Configuration for Visuals ---
  // No need for globeConfig here as the 2D map doesn't rotate.
  const arcColors = ["#0A3C30", "#0A3C30", "#0A3C30"]; // Lime, Orange, Indigo

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background px-4 pb-40 pt-8 md:pt-12">
      
      {/* This div acts as our dynamic tooltip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 whitespace-nowrap text-center text-lg font-semibold text-foreground transition-opacity duration-300 sm:text-xl">
        {/* --- SUGGESTION: Added a fallback for the tooltip to show the central location name when nothing is hovered. This improves UX. --- */}
        {hoveredLocation || centralLocation.name}
      </div>
      
      {/* --- The Enhanced WorldMap Component --- */}
      <WorldMap
    
        data={connections}
        onPointHover={(data) => setHoveredLocation(data?.name ?? null)}
        activePoint={hoveredLocation}
        colors={arcColors}
      />
    </div>
  );
};

export default WorldMapDemo;