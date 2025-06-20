import React, { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import sarah from '../../assets/images/sarah.jpg';
import james from '../../assets/images/james.jpg';
import lisa from '../../assets/images/lisa.jpg';
// import video from '../../assets/videos/glass-wave.mp4';
// import Silk from '../AnimatedBackground';
import Spline from '@splinetool/react-spline';

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
    text: 'Codevider took the time to understand our business needs and delivered results beyond our expectations.  real impact.'
  }
];

const Testimonials: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
  


    const videoRef = useRef<HTMLVideoElement>(null);
    const handleSplineLoad = () => {
      setLoaded(true);
    };
    useEffect(() => {
      // fallback play() call if needed
      videoRef.current?.play().catch(() => {
        console.warn('Autoplay blocked');
      });
    }, []);
  return (
    <section className="relative overflow-hidden py-32 px-6 md:px-20 text-white">
      {/* <div className="absolute inset-0 z-0 w-full h-full">


<Silk
  speed={6}
  scale={0.8}
  color="#0c1422"
  noiseIntensity={0}
  rotation={4.5}
/>      </div> */}
 <div className="absolute inset-0 z-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/69EEMNnKjd9kHoCE/scene.splinecode"
          onLoad={handleSplineLoad}
        />
      </div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content container */}
      <div className="relative z-10 max-w-8xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wide text-gray-300 pb-10">Testimonials</p>
          <h2 className="text-4xl max-sm:text-3xl  leading-tight mt-2">
            What our clients are saying:<br />
            <span className="text-gray-400">Insights from those we&apos;ve served</span>
          </h2>
        </div>

        <Marquee gradient={false} speed={30} className="py-6">
  <div className="flex gap-20">
    {testimonials.map((testimonial, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-3/4 max-w-md sm:w-auto"
      >
        <p className="text-lg max-sm:text-sm  text-gray-200 mb-6">{testimonial.text}</p>
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
