// components/Loader.tsx
import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onFinish: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const removeTimer = setTimeout(() => onFinish(), 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
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
