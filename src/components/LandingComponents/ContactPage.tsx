import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    description: '',
    budget: '$500 – $1,000',
  });

  const handleSelectChange = (value: string) => {
    setForm({ ...form, budget: value });
  };

  useEffect(() => {
    // Observer logic if needed
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert('Thank you! Your message has been sent.');
  };

  return (
    <>
      {/* --- STRUCTURAL CHANGE: A new parent wrapper holds the background --- */}
      <div
        id="contact" // Moved id here for anchor links
        className="relative overflow-hidden bg-gradient-to-br from-black to-teal-300 text-white"
      >
        {/* The background overlay is now a child of the main wrapper, covering everything inside */}
        <div className="absolute inset-0 bg-black/70" />

        {/* --- Contact Section --- */}
        {/* It no longer needs background styles, just padding and layout */}
        <section
          ref={sectionRef}
          className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        >
          {/* Content Container */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Left Column: Persuasion */}
            <div className="text-center lg:text-left mb-12 lg:mb-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-3">
                Let's Connect
              </p>
              <h2 style={{fontFamily:"Poppins, sans"}} className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Ready to Build Your Next Big Idea?
              </h2>
              <p className="text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 mb-8">
                Whether you have a specific project in mind or just want to explore possibilities, our team is here to help. Fill out the form, or reach out to us directly.
              </p>
              
              {/* Alternative Contact Methods */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <a href="mailto:hello@codevider.com" className="group flex items-center gap-3 text-left">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-teal-400/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold">Email Us Directly</p>
                    <p className="text-sm text-gray-400">hello@codevider.com</p>
                  </div>
                </a>
                <a href="#schedule-call" className="group flex items-center gap-3 text-left">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-teal-400/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold">Schedule a Call</p>
                    <p className="text-sm text-gray-400">Book a 15-min intro</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-5 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                      <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                          <Input id="name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required className="bg-transparent border-gray-600 focus-visible:ring-offset-0 focus-visible:ring-teal-400"/>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                          <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={form.email} onChange={handleChange} required className="bg-transparent border-gray-600 focus-visible:ring-offset-0 focus-visible:ring-teal-400"/>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-400">Tell us about your project</Label>
                      <Textarea id="description" name="description" placeholder="I'm looking to build a new web application that..." value={form.description} onChange={handleChange} required className="bg-transparent border-gray-600 min-h-[120px] focus-visible:ring-offset-0 focus-visible:ring-teal-400"/>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="budget" className="text-gray-400">What's your budget?</Label>
                      <Select name="budget" value={form.budget} onValueChange={handleSelectChange}>
                          <SelectTrigger id="budget" className="w-full bg-transparent border-gray-600 focus:ring-offset-0 focus:ring-teal-400">
                              <SelectValue placeholder="Select a budget range" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="$500 – $1,000">$500 – $1,000</SelectItem>
                              <SelectItem value="$1,000 – $5,000">$1,000 – $5,000</SelectItem>
                              <SelectItem value="$5,000 – $10,000">$5,000 – $10,000</SelectItem>
                              <SelectItem value="$10,000+">$10,000+</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                  <Button type="submit" variant="secondary" className="w-full text-base font-semibold py-6">
                      Send Your Message
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                  </Button>
                </form>
            </div>
          </div>
        </section>

        {/* --- MODIFIED Footer Section --- */}
        {/* It is now inside the gradient wrapper and styled for a dark background */}
        <footer className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/20 pb-8 mb-8">
              <p className="text-center md:text-left text-gray-300 max-w-2xl">
                Stay updated on our latest developments, insights, and opportunities by following us.
              </p>
              <button 
                className="border border-white/80 px-8 py-3 font-semibold rounded-lg hover:bg-white hover:text-black transition-colors w-full md:w-auto flex-shrink-0"
                onClick={() => (window.location.href = "mailto:hr@codevider.com")}
              >
                Let's Talk
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div className="space-y-3">
                <p className="font-bold text-base text-white">Company</p>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#about" className="hover:text-white">About Us</a></li>
                  <li><a href="#services" className="hover:text-white">Services</a></li>
                  <li><a href="#projects" className="hover:text-white">Projects</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="font-bold text-base text-white">Social</p>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="https://www.instagram.com/codevider/?hl=en" className="hover:text-white">Instagram</a></li>
                  <li><a href="https://www.facebook.com/codevider/" className="hover:text-white">Facebook</a></li>
                  <li><a href="https://al.linkedin.com/company/codevider" className="hover:text-white">LinkedIn</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="font-bold text-base text-white">Legal</p>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="font-bold text-base text-white">Contact</p>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="mailto:hello@codevider.com" className="hover:text-white">hr@codevider.com</a></li>
                  <li><a href="tel:+355695877742" className="hover:text-white"> +355 695877742</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-white/20 pt-8 text-center">
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} Codevider. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Contact;