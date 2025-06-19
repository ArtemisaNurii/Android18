import React, { useEffect, useRef, useState } from 'react';
import video from "../../assets/videos/glass-wave.mp4";
import poster from "../../assets/images/poster.png"

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  // once the video can play, flip loaded to true
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    function onCanPlay() {
      setLoaded(true);
      v.play().catch(() => {});
    }
    v.addEventListener('canplay', onCanPlay);
    return () => v.removeEventListener('canplay', onCanPlay);
  }, []);
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white">
      {/* Video background */}
      <div className="absolute inset-0 z-0 w-full h-full">
      <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          poster={poster}
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* Blurred overlay */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-20 backdrop-blur-sm"></div>

      {/* Content overlay */}
      <div
        className="
          relative z-20 flex flex-col
          items-center justify-center    /* mobile: center both axes */
          md:items-start md:justify-end /* desktop: original bottom/right */
          h-full max-w-7xl mx-auto
          px-8 md:px-16 py-8
        "
      >
        <main className="grid md:grid-cols-2 items-center gap-8 w-full">
          {/* Left column */}
          <div className="max-w-xl">
            <h1 className="text-6xl lg:text-7xl leading-tight text-center md:text-left">
              CODEVIDER
            </h1>
            <p className="text-4xl mt-4 text-center md:text-left">
              Launch your journey here and experience inspiration without bounds.
            </p>
          </div>

          {/* Right column */}
          <div className="md:justify-self-end w-full">
            <div className="max-w-sm flex flex-col items-center gap-y-6 md:items-start">
              <p className="text-base text-gray-300 text-center md:text-left">
                Join us in crafting a digital experience that truly distinguishes you from others
              </p>
              <button className="bg-white text-black font-semibold py-3 px-8 rounded-lg hover:brightness-110 transition-all">
                Our services
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;
