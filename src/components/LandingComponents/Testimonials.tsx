import React from 'react';
import Marquee from 'react-fast-marquee';

// Image imports
import sarah from '../../assets/images/sarah.jpg';
import james from '../../assets/images/james.jpg';
import lisa from '../../assets/images/lisa.jpg';
// The useIsMobile hook is no longer needed for the marquee's logic,
// but you might still use it elsewhere.
// import { useIsMobile } from '@/hooks/use-mobile'; 

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Thompson',
    role: 'Trendy Store',
    image: sarah,
    text: "Codevider transformed our online presence. Their SEO expertise boosted our rankings and brought in a flood of organic traffic we'd never seen before.",
  },
  {
    name: 'James Carter',
    role: 'ABC Plumbing',
    image: james,
    text: 'After partnering with Codevider, our traffic and conversions saw a significant increase. Their team is knowledgeable, responsive, and genuinely invested in our success.',
  },
  {
    name: 'Lisa Chen',
    role: 'Innovative Software',
    image: lisa,
    text: 'Codevider truly understood our business, delivering results that went far beyond our expectations. Their work has made a real, measurable impact on our bottom line.',
  },
];

const Testimonials: React.FC = () => {
  // const isMobile = useIsMobile(); // This hook is no longer required for the marquee animation.

  return (
    <section className="relative overflow-hidden py-32 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-teal-300" />
      </div>
      <div className="absolute inset-0 bg-black/60" />

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-wider text-gray-300">Testimonials</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg max-sm:px-10 text-gray-400">
            Real insights from those we've had the pleasure to serve.
          </p>
        </div>

        <div className="relative">
          {/* --- ADJUSTED MARQUEE --- */}
          <Marquee
            gradient={false}
            speed={30}
            // The `play` prop defaults to true, so we can remove it.
            // The className is simplified as we no longer need mobile-specific scroll behavior.
            className="py-4" 
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                // We add margin here to create the gap between items,
                // replacing the `gap-x-8` from the deleted wrapper div.
                className="mx-4 w-80 flex-shrink-0 rounded-lg bg-transparent p-8 backdrop-blur-sm sm:w-96"
              >
                <p className="text-lg text-gray-200">"{testimonial.text}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-600"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;