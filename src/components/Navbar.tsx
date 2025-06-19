import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/whiteLogo.png';

const items = [
  { label: 'About Us', id: 'About Us' },
  { label: 'Services', id: 'Services' },
  { label: 'Careers', id: 'Careers' },
  { label: 'Why Us', id: 'Why Us' },
];

const NavbarVariant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight / 3;
      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos && el.offsetTop + el.clientHeight > pos) {
          setActive(id);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Left */}
        <div className="hidden lg:flex space-x-8">
          {items.slice(0,2).map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`text-sm font-medium transition-colors ${active === id ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Logo Center */}
        <div className="cursor-pointer" onClick={() => handleClick('Home')}>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Right */}
        <div className="hidden lg:flex space-x-8">
          {items.slice(2).map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`text-sm font-medium transition-colors ${active === id ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleClick('Contact Us')}
            className="ml-4 px-6 py-2 border border-white text-white rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 p-2 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Page Drop-Down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100vh' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden bg-black fixed top-0 left-0 w-full z-40"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {items.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className="text-white text-2xl font-semibold hover:text-gray-400 transition"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => handleClick('Contact Us')}
                className="mt-4 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarVariant;
