/* eslint-disable */

import React, { useState, useEffect, RefObject, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import logo from '../assets/images/whiteLogo.png';

interface NavbarProps {
  sections: Record<string, RefObject<HTMLElement>>;
}

const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: [0.42, 0, 0.58, 1], // Your preferred easing
      duration: 0.3,
    },
  },
};


const NavbarVariant: React.FC<NavbarProps> = ({ sections }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const NAVBAR_HEIGHT = 64;

  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    menuTl.current = gsap.timeline({ paused: true })
      .to(line1.current, { y: 4, rotation: 45, duration: 0.3, ease: 'power2.inOut' }, 0)
      .to(line2.current, { y: -4, rotation: -45, duration: 0.3, ease: 'power2.inOut' }, 0);
  }, []);

  useEffect(() => {
    mobileOpen ? menuTl.current?.play() : menuTl.current?.reverse();
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
  }, [mobileOpen]);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      setIsHidden(current > lastScroll && current > 100);
      lastScroll = current;
      const heroRef = sections.Home;
      if (heroRef?.current) {
        setIsTransparent(heroRef.current.getBoundingClientRect().bottom > NAVBAR_HEIGHT);
      } else {
        setIsTransparent(current < 50);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.body.style.overflow = 'auto';
    };
  }, [sections]);

  const handleNavClick = (ref: RefObject<HTMLElement>) => {
    setMobileOpen(false);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <>
      <motion.nav
        initial="visible"
        animate={isHidden ? 'hidden' : 'visible'}
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed w-full top-0 z-50 backdrop-blur-sm transition-colors duration-300 ${isTransparent ? 'bg-transparent' : 'bg-black/80 shadow-md'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
          <img src={logo} alt="Logo" className="h-8" />

          <ul className="hidden md:flex space-x-6">
            {Object.entries(sections).map(([label, ref]) => (
              <li key={label}>
                <button onClick={() => handleNavClick(ref)} className="text-white hover:text-gray-200 font-light transition-colors">
                  {label}
                </button>
              </li>
            ))}
          </ul>
          
          <button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <div ref={line1} className="absolute w-6 h-0.5 bg-white" style={{ transform: 'translateY(-4px)' }}></div>
            <div ref={line2} className="absolute w-6 h-0.5 bg-white" style={{ transform: 'translateY(4px)' }}></div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            // CHANGE: The main container now lays out its children (list and footer) vertically.
            // The padding-top is only to account for the navbar space. `gap10` was invalid and removed.
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col p-6 pt-20"
          >
            {/* CHANGE: This list now grows to fill available space AND centers its content vertically */}
            <motion.ul
              className="flex flex-col justify-center space-y-4 flex-grow"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.entries(sections).map(([label, ref]) => (
                <motion.li key={label} >
                  {/* FIX: Removed the massive `pt-24` and `items-center` from the button itself.
                      Added a reasonable `py-2` for a better click target. */}
                  <button
                    onClick={() => handleNavClick(ref)}
                    className="block w-full text-left text-white/90 hover:text-white py-2 text-3xl font-light transition-colors"
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div 
              className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
            >
              © Codevide 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarVariant;