import React, { useEffect, useRef, useState } from 'react';
import video from "../../assets/videos/glass-wave.mp4";

const Contact: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
  
    useEffect(() => {
      // fallback play() call if needed
      videoRef.current?.play().catch(() => {
        console.warn('Autoplay blocked');
      });
    }, []);
  const [form, setForm] = useState({
    name: '',
    email: '',
    description: '',
    budget: '$500 – $1,000',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <div>
      {/* Contact Section with Video Background */}
      <section className="relative h-screen overflow-hidden py-20 px-6 md:px-20">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline                 /* <-- standard prop */
          webkit-playsinline="true"  /* <-- lower-case for older iOS */
          className="absolute inset-0 w-full h-full object-cover"
        > <source src={video} type="video/mp4" />
        </video>

        {/* Overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-white">
          <p className="uppercase text-sm text-gray-300 mb-4">Contact Us</p>
          <h2 className="text-4xl font-semibold mb-16">
            Share your business objectives with us, <br />
            and let's collaborate to craft something extraordinary
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl"
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
              className="col-span-2 bg-white text-black py-3 text-center font-medium transition-all rounded-md hover:brightness-110"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer unchanged */}
      <footer className="bg-white text-black py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-center border-b pb-8">
            <p className="text-center md:text-left mb-4 md:mb-0">
              Stay updated on our latest developments, insights, and opportunities by following us on LinkedIn.
            </p>
            <button className="border border-black px-6 py-2 hover:bg-black hover:text-white transition-all">
              Let's talk
            </button>
          </div>
          <div className=" grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-semibold">Codevider</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Company</p>
              <ul className="space-y-1">
                <li>About Us</li>
                <li>Services</li>
                <li>Case Studies</li>
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
      </footer>
    </div>
  );
};

export default Contact;
