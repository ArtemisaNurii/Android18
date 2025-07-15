import React from 'react';
import Marquee from 'react-fast-marquee';
import sarah from '../../assets/images/sarah.jpg';
import james from '../../assets/images/james.jpg';
import lisa from '../../assets/images/lisa.jpg';

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
    text: "Codevider transformed our online presence. Their SEO expertise boosted our rankings and brought in a flood of organic traffic we'd never seen before."
  },
  {
    name: 'James Carter',
    role: 'ABC Plumbing',
    image: james,
    text: 'After partnering with Codevider, our traffic and conversions saw a significant increase. Their team is knowledgeable, responsive, and genuinely invested in our success.'
  },
  {
    name: 'Lisa Chen',
    role: 'Innovative Software',
    image: lisa,
    text: 'Codevider truly understood our business, delivering results that went far beyond our expectations. Their work has made a real, measurable impact on our bottom.'
  }
];

const CARD_WIDTH = 'w-80 sm:w-96';
const CARD_HEIGHT = 'h-80 sm:h-96';

const Testimonials: React.FC = () => (
  <section className="section-standard relative overflow-hidden text-white">
    <div className="absolute inset-0">
      <div className="absolute inset-0 " />
    </div>

    <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
      <div className="mb-16 text-center">
        <p className="text-sm uppercase tracking-wider text-gray-300">Testimonials</p>
        <h2 className="mt-4  text-4xl sm:text-5xl font-semibold leading-tight text-white">What Our Clients Say</h2>
        <p className="mt-4 text-lg max-sm:px-10 text-gray-400">Real insights from those we’ve had the pleasure to serve.</p>
      </div>

      <Marquee gradient={false} speed={30} className="py-4">
        {testimonials.map((t, idx) => (
          <article
            key={idx}
            className={`relative mx-4 flex ${CARD_WIDTH} ${CARD_HEIGHT} flex-shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-8 shadow-lg backdrop-blur-md`}
          >
            <p className="text-lg leading-relaxed text-gray-200 line-clamp-5">{t.text}</p>
            <footer className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
              <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-600" />
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            </footer>
          </article>
        ))}
      </Marquee>
    </div>
  </section>
);

export default Testimonials;
