// src/components/Loader.tsx

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex space-x-2">
        <span className="w-3 h-3 rounded-full bg-white animate-dot-pulse-0" />
        <span className="w-3 h-3 rounded-full bg-white animate-dot-pulse-1" />
        <span className="w-3 h-3 rounded-full bg-white animate-dot-pulse-2" />
      </div>
    </div>
  );
};

export default Loader;
