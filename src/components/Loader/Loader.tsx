// components/Loader/Loader.tsx

import React, { useEffect, useState } from 'react';

interface LoaderProps {
  // The only prop it needs: a boolean to tell it if it should be visible.
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
    } else {
      // When isLoading becomes false, wait for the fade-out animation to finish before unmounting.
      const timer = setTimeout(() => setShouldRender(false), 500); // 500ms matches the duration
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) {
    return null;
  }

  return (
    // The opacity is now directly controlled by the isLoading prop.
    // When isLoading is false, opacity becomes 0, triggering the fade-out.
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex space-x-2">
        <span className="w-3 h-3 rounded-full bg-white animate-dot-pulse-0" />
        <span className="w-3 h-3 rounded-full bg-white animate-dot-pulse-1" />
        <span className="w-3 h-3 rounded-full bg-white animate-dot-pulse-2" />
      </div>
    </div>
  );
};

export default Loader;