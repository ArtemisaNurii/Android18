import React, { useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import sarah from '../../assets/images/sarah.jpg';
import james from '../../assets/images/james.jpg';
import lisa from '../../assets/images/lisa.jpg';
import video from '../../assets/videos/glass-wave.mp4';

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
    text: 'Working with Codevider transformed our online presence. Their expertise in SEO helped us climb the rankings and attract more organic traffic than ever before.'
  },
  {
    name: 'James Carter',
    role: 'ABC Plumbing',
    image: james,
    text: 'We saw a significant increase in our website traffic and conversions after partnering with Codevider. Their team is knowledgeable, responsive, and genuinely cares about our success.'
  },
  {
    name: 'Lisa Chen',
    role: 'Innovative Software',
    image: lisa,
    text: 'Codevider took the time to understand our business needs and delivered results beyond our expectations. Their strategic approach to SEO has made a real impact.'
  }
];

const Testimonials: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
  
    useEffect(() => {
      // fallback play() call if needed
      videoRef.current?.play().catch(() => {
        console.warn('Autoplay blocked');
      });
    }, []);
  return (
    <section className="relative overflow-hidden py-32 px-6 md:px-20 text-white">
      {/* Video Background with slight blur */}
      <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline                 /* <-- standard prop */
          webkit-playsinline="true"  /* <-- lower-case for older iOS */
          className="w-full h-full object-cover"
        > <source src={video} type="video/mp4" />
        </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wide text-gray-300">Testimonials</p>
          <h2 className="text-4xl font-semibold leading-tight mt-2">
            What our clients are saying:<br />
            <span className="text-gray-400">Insights from those we&apos;ve served</span>
          </h2>
        </div>

        <Marquee gradient={false} speed={30} className="py-6">
          <div className="flex gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="max-w-sm">
                <p className="text-lg text-gray-200 mb-6">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
