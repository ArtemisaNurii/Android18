import React from 'react';
import Marquee from 'react-fast-marquee';

const logos = ["LOREM", "IPSUM", "LOGO", "GENESY", "PIPER"];

const HeroMarquee: React.FC = () => (
  <div className="overflow-hidden pl-6 pr-6 whitespace-nowrap py-6 bg-transparent">
    <Marquee>
      <div className="inline-flex">
        {[...logos, ...logos].map((name, idx) => (
          <div key={idx} className="mx-8 flex-shrink-0 text-2xl font-semibold text-gray-600 hover:text-black transition-colors">
            {name}
          </div>
        ))}
      </div>
    </Marquee>
  </div>
);

export default HeroMarquee;
