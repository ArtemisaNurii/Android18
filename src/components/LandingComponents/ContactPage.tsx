import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Application } from '@splinetool/runtime';

// Lazy load the Spline component
const LazySpline = lazy(() => import('@splinetool/react-spline'));

const Contact: React.FC = () => {
  const [isSplineVisible, setIsSplineVisible] = useState(false);
  const splineApp = useRef<Application | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('Contact section in view, loading Spline.');
          setIsSplineVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
    console.log('Form submitted:', form);
  };

  return (
    <div>
      <section ref={containerRef} className="relative sm:h-screen overflow-hidden py-20 px-6 pb-12 md:px-20">
        {/* Spline Background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          {isSplineVisible && (
            <Suspense fallback={null}>
              <LazySpline
                scene="https://prod.spline.design/69EEMNnKjd9kHoCE/scene.splinecode"
                onLoad={(spline) => {
                  splineApp.current = spline;
                  spline.play();
                }}
              />
            </Suspense>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-white">
          <p className="uppercase text-sm text-gray-300 mb-4">Contact Us</p>
          <h2 className="text-4xl max-sm:text-3xl mb-16">
            Codevider Is Just a Message Away <br /> from Your Next Big Move
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:gap-10 gap-6 max-w-3xl"
          >
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 py-3 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 py-3 focus:outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Project description"
              value={form.description}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 py-3 col-span-2 focus:outline-none resize-none"
              rows={4}
              required
            />
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 py-3 col-span-2 focus:outline-none text-white"
            >
              <option className="text-black">$500 – $1,000</option>
              <option className="text-black">$1,000 – $5,000</option>
              <option className="text-black">$5,000 – $10,000</option>
              <option className="text-black">$10,000+</option>
            </select>
            <button
              type="submit"
              className="col-span-2 bg-white text-black py-4 mb-8 sm:mb-0 text-center font-base transition-all rounded-md hover:brightness-110"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white my-4 text-black py-4 sm:py-10 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-center border-b pb-8">
            <p className="text-center max-sm:text-sm md:text-left mb-4 md:mb-0">
              Stay updated on our latest developments, insights, and opportunities by following us on LinkedIn.
            </p>
            <button className="border border-black max-sm:w-full px-6 py-2 hover:bg-black hover:text-white transition-all">
              Let's talk
            </button>
          </div>
          <div className="grid md:grid-cols-2 max-sm:flex max-sm:flex-row max-sm:justify-between max-sm:gap-10 gap-8 text-sm">
            <div>
              <p className="font-semibold mb-2">Company</p>
              <ul className="space-y-1">
                <li>About Us</li>
                <li>Services</li>
                <li>Projects</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Social</p>
              <ul className="space-y-1">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-4">
          <p className="text-center text-sm">© 2025 Codevider. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
