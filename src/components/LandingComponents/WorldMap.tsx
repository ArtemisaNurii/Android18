// src/components/WorldMapDemo.tsx

import React from 'react';
// Assuming the actual map component is in the specified path
import WorldMap from '../ui/world-map'; 

export const WorldMapDemo: React.FC = () => {
  // NEW: Define the primary location for Albania (Tirana)
  const albaniaCoords = { lat: 31.3275, lng: 19.8187 }; // Tirana, Albania

  const sampleDots = [
    {
      start: albaniaCoords,
      end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    },
    {
      start: albaniaCoords,
      end: { lat: 40.7128, lng: -74.0060 }, // New York
    },
    {
      start: albaniaCoords,
      end: { lat: -33.8688, lng: 151.2093 }, // Sydney
    },
    {
      start: albaniaCoords,
      end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
    },
    {
      start: albaniaCoords,
      end: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
    },
    {
      start: albaniaCoords,
      end: { lat: 55.7558, lng: 37.6173 }, // Moscow
    },
  ];

  return (
    // You can adjust the padding/background here as needed for your page layout
    <div className="py-20 md:py-40 dark:bg-black bg-white w-full absolute inset-0 h-full object-cover">

      <WorldMap dots={sampleDots} lineColor="#50C878" />
    </div>
  );
};

export default WorldMapDemo;