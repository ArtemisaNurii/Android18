// src/components/HeroHeadline.tsx
import React, { useState, useEffect } from 'react';

// --- Configuration ---
const PHRASES = [
  "AI Productions",
  "Blockchain Apps",
  "Fintech",
  "API Management"
];
const TYPING_SPEED = 120; // ms per character
const PAUSE_DURATION = 2000; // ms to wait after typing
const DELETING_SPEED = 70; // ms per character

const HeroHeadline: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleTyping = () => {
      const currentPhrase = PHRASES[phraseIndex];

      if (isDeleting) {
        // --- Handle Deleting ---
        if (displayedText.length > 0) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to the next phrase
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
        }
      } else {
        // --- Handle Typing ---
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          timeoutId = setTimeout(() => {
            setIsDeleting(true);
          }, PAUSE_DURATION);
        }
      }
    };

    timeoutId = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    // Cleanup function to clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, phraseIndex]);

  // CSS for the blinking cursor effect
  const cursorStyle = `
    @keyframes blink {
      50% { opacity: 0; }
    }
    .blinking-cursor {
      color: #34d399; /* Emerald color for the cursor */
      animation: blink 1s step-end infinite;
    }
  `;

  return (
    <div className="flex flex-col gap-4 text-center items-center">
      <style>{cursorStyle}</style>
    <h1 style={{ fontFamily: "Poppins, sans" }} className="hero-text text-4xl md:text-6xl lg:text-7xl font-normal tracking-tighter h-24 md:h-40 lg:h-48 flex flex-col justify-center">
      <span className="block text-white/90">Your Partner in</span>

      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
        {displayedText}
        <span className="blinking-cursor">|</span>
      </span>
    </h1>
      {/* <p className="hero-text text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
        Supercharge your workflow with our solutions. We build systems that think, learn, and perform.
      </p> */}
    </div>
  );
};

export default HeroHeadline;