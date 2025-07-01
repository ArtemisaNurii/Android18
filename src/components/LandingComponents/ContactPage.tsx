import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Application } from '@splinetool/runtime';

// Lazy load the Spline component for better initial page load performance

const Contact: React.FC = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const splineApp = useRef<Application | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // This effect uses IntersectionObserver to only load and play the Spline
  // animation when the component is visible in the viewport. This is a crucial
  // performance optimization, especially for heavy assets like 3D scenes.
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If it's the first time intersecting, trigger the lazy load.
          if (!isSplineLoaded) {
            setIsSplineLoaded(true);
          }
          // Once the app instance is available, play the animation.
          splineApp.current?.play();
        } else {
          // Pause the animation when it goes out of view to save resources.
          splineApp.current?.stop();
        }
      },
      {
        // Start loading when the section is 10% visible
        threshold: 0.1,
      }
    );

    observer.observe(sectionRef.current);

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [isSplineLoaded]); // Rerun effect logic if isSplineLoaded changes

  const [form, setForm] = useState({
    name: '',
    email: '',
    description: '',
    budget: '$500 – $1,000',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., API call)
    console.log('Form submitted:', form);
    alert('Thank you for your message!');
  };

  return (
    <>
      {/* 
        The main contact section.
        - Uses padding instead of fixed height for flexibility.
        - Spacing is defined mobile-first and scales up.
      */}
      <section
        ref={sectionRef}
        id="contact"
        className="relative overflow-hidden bg-black text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
     

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Contact Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins  leading-tight mb-12 md:mb-16">
              Codevider Is Just a Message Away <br /> from Your Next Big Move
            </h2>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-8 max-sm:px-10 gap-x-6"
          >
            {/* Form Fields */}
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-500 py-3 focus:outline-none focus:border-white transition-colors"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-500 py-3 focus:outline-none focus:border-white transition-colors"
              required
            />
            <textarea
              name="description"
              placeholder="Project description"
              value={form.description}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-500 py-3 md:col-span-2 focus:outline-none focus:border-white transition-colors resize-none"
              rows={3}
              required
            />
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-500 py-3 md:col-span-2 focus:outline-none focus:border-white text-gray-400 focus:text-white"
            >
              {/* Added a disabled option as a placeholder */}
              <option value="" disabled className="text-black">Select your budget</option>
              <option className="text-black">$500 – $1,000</option>
              <option className="text-black">$1,000 – $5,000</option>
              <option className="text-black">$5,000 – $10,000</option>
              <option className="text-black">$10,000+</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="md:col-span-2 bg-white text-black py-3 px-6 text-center font-semibold rounded-lg transition-transform hover:scale-105 active:scale-100"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white text-black py-12 sm:py-16 px-4 max-sm:px-10 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Footer Top: Call to Action */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-200 pb-8 mb-8">
            <p className="text-center md:text-left text-gray-700 max-w-2xl">
              Stay updated on our latest developments, insights, and opportunities by following us.
            </p>
            <button className="border border-black px-8 py-3 font-semibold rounded-lg hover:bg-black hover:text-white transition-colors w-full md:w-auto flex-shrink-0">
              Let's Talk
            </button>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div className="space-y-3">
              <p className="font-bold text-base">Company</p>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#about" className="hover:text-black">About Us</a></li>
                <li><a href="#services-section" className="hover:text-black">Services</a></li>
                <li><a href="#projects" className="hover:text-black">Projects</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-bold text-base">Social</p>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Instagram</a></li>
                <li><a href="#" className="hover:text-black">Facebook</a></li>
                <li><a href="#" className="hover:text-black">LinkedIn</a></li>
              </ul>
            </div>
            {/* Added two more columns for a balanced footer on larger screens */}
            <div className="space-y-3">
              <p className="font-bold text-base">Legal</p>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-black">Terms of Service</a></li>
              </ul>
            </div>
             <div className="space-y-3">
              <p className="font-bold text-base">Contact</p>
              <ul className="space-y-2 text-gray-600">
                <li><a href="mailto:hello@codevider.com" className="hover:text-black">hello@codevider.com</a></li>
                <li><a href="#contact" className="hover:text-black">Contact Form</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Codevider. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;