import React, { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import Spline from '@splinetool/react-spline';
// 1. Import the 'Application' type from the Spline runtime for type safety
import { Application } from '@splinetool/runtime';

// Image imports
import sarah from '../../assets/images/sarah.jpg';
import james from '../../assets/images/james.jpg';
import lisa from '../../assets/images/lisa.jpg';
import Silk from '../AnimatedBackground';

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
    text: 'Codevider took the time to understand our business needs and delivered results beyond our expectations. A real impact.'
  }
];

const Testimonials: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
  
    // 2. Create refs for the Spline app instance and the container element
    const splineApp = useRef<Application | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);

    // 3. Update the onLoad handler to capture the Spline application instance
    const handleSplineLoad = (spline: Application) => {
      splineApp.current = spline;
      setLoaded(true);
    };

    // 4. useEffect to set up the Intersection Observer
    useEffect(() => {
        // Ensure the Spline app and container are ready
        if (!splineApp.current || !containerRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // If the section is in view, play the animation
                    console.log('Testimonials Spline in view, playing.');
                    splineApp.current?.play();
                } else {
                    // If the section is out of view, stop the animation
                    console.log('Testimonials Spline out of view, stopping.');
                    splineApp.current?.stop();
                }
            },
            {
                // Trigger when 25% of the element is visible
                threshold: 0.25,
            }
        );

        // Start observing the section container
        observer.observe(containerRef.current);

        // Cleanup: disconnect the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
        
    }, [loaded]); // Run this effect once the Spline scene has loaded

  return (
    // 5. Attach the container ref to the root element we want to observe
    <section ref={containerRef} className="relative overflow-hidden py-32 px-6 md:px-20 text-white">
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* <Spline
          scene="https://prod.spline.design/69EEMNnKjd9kHoCE/scene.splinecode"
          onLoad={handleSplineLoad} // Use the updated handler
        /> */}
            <div className="absolute inset-0 z-0 w-full h-full">
        <Silk
          speed={8}
          scale={0.9}
          color="#152238"
          noiseIntensity={0}
          rotation={5.5}
        />
      </div>
      </div>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content container */}
      <div className="relative z-10 max-w-8xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wide text-gray-300 pb-10">Testimonials</p>
          <h2 className="text-4xl max-sm:text-3xl leading-tight mt-2">
            What our clients are saying:<br />
            <span className="text-gray-400">Insights from those we've served</span>
          </h2>
        </div>

        <Marquee gradient={false} speed={30} className="py-6">
          <div className="flex gap-20">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-3/4 max-w-md sm:w-auto"
              >
                <p className="text-lg max-sm:text-sm text-gray-200 mb-6">{testimonial.text}</p>
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