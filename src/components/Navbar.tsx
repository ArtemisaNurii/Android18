/* eslint-disable */
import React, { useState, useEffect, RefObject, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import logo from '../assets/images/whiteLogo.png';

// 1. REMOVED NavbarProps interface, as we no longer need the 'sections' prop.

// Framer Motion variants for the mobile menu list items (unchanged)
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'circOut',
      duration: 0.4,
    },
  },
};

// 2. The component no longer accepts props.
const NavbarVariant: React.FC = () => {
  const navigate = useNavigate();

  // 3. DEFINE navigation items directly inside the component.
  // The `targetId` must match the 'id' attribute of your section elements.
  const navItems = [
    { label: 'Home', targetId: 'hero' },
    { label: 'About', targetId: 'about' },
    { label: 'Projects', targetId: 'projects' },
    { label: 'Process', targetId: 'process' },
  ];

  // State and refs are unchanged
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const NAVBAR_HEIGHT = 80;

  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline>();

  // GSAP timeline (unchanged)
  useEffect(() => {
    menuTl.current = gsap.timeline({ paused: true })
      .to(line1.current, { y: 4, rotation: 45, duration: 0.3, ease: 'power2.inOut' }, 0)
      .to(line2.current, { y: -4, rotation: -45, duration: 0.3, ease: 'power2.inOut' }, 0);
  }, []);

  // Mobile menu open/close effect (unchanged)
  useEffect(() => {
    mobileOpen ? menuTl.current?.play() : menuTl.current?.reverse();
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
  }, [mobileOpen]);

  // 4. UPDATED scroll handler to remove dependency on the 'sections' prop.
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      setIsHidden(current > lastScroll && current > 100);
      lastScroll = current;
      // We no longer need a ref. A simple check for the top of the page works perfectly.
      setIsTransparent(current < 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.body.style.overflow = 'auto';
    };
  }, []); // The dependency array is now empty.

  // 5. REWRITTEN click handler. It now finds the element by ID.
  const handleNavClick = (targetId: string) => {
    setMobileOpen(false);

    // Update the URL with useNavigate
    const path = targetId === 'hero' ? '/' : `/#${targetId}`;
    navigate(path);

    // Find the target element on the page and scroll to it
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        // Use `block: 'start'` to align the top of the section with the top of the viewport
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150); // Delay allows menu to start closing
  };

  return (
    <>
      {/* --- Main Navbar --- */}
      <motion.nav
        initial="visible"
        animate={isHidden ? 'hidden' : 'visible'}
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500
          ${isTransparent ? 'bg-transparent' : 'bg-black backdrop-blur-md '}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex-shrink-0">
              <img onClick={() => handleNavClick('hero')} src={logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
            </div>

            {/* Desktop Navigation Links (Centered) */}
            <div className="hidden md:flex md:justify-center md:flex-1">
              <ul className="flex items-center space-x-8">
                {/* 6. RENDER links by mapping over our new navItems array */}
                {navItems.map(({ label, targetId }) => (
                  <li key={label}>
                    <button
                      onClick={() => handleNavClick(targetId)}
                      className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium lg:text-lg transition-colors duration-300 group"
                    >
                      {label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop CTA & Mobile Menu Trigger */}
            <div className="flex items-center">
              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                  className="px-4 py-2 text-white border border-white/50 rounded-md text-sm font-medium transition-colors hover:bg-white hover:text-black"
                >
                  Get In Touch
                </a>
              </div>

              {/* Mobile Menu Hamburger Button */}
              <div className="md:hidden">
                <button
                  className="relative w-8 h-8 flex flex-col justify-center items-center"
                  onClick={() => setMobileOpen(o => !o)}
                  aria-label="Toggle menu"
                >
                  <div ref={line1} className="absolute w-6 h-0.5 bg-gray-200" style={{ transform: 'translateY(-4px)' }}></div>
                  <div ref={line2} className="absolute w-6 h-0.5 bg-gray-200" style={{ transform: 'translateY(4px)' }}></div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-black backdrop-blur-lg flex flex-col p-6"
          >
            <div className="h-20 flex-shrink-0" />
            
            <motion.ul
              className="flex flex-col items-center justify-center flex-grow space-y-6 text-center"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* 7. RENDER mobile links using the same navItems array */}
              {navItems.map(({ label, targetId }) => (
                <motion.li key={label} >
                  <button
                    onClick={() => handleNavClick(targetId)}
                    className="block text-gray-300 hover:text-white py-2 text-3xl font-light transition-colors"
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              className="flex-shrink-0 pb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } }}
            >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                  className="inline-block w-full max-w-xs px-6 py-3 mb-8 text-white border border-white/50 rounded-md text-lg font-medium transition-colors hover:bg-white hover:text-black"
                >
                  Get In Touch
                </a>
                <p className="text-gray-500 text-sm">© Codevide 2025</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarVariant;