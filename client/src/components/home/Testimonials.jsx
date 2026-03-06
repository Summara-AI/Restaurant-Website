import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { text: 'The wood-grilled ribeye was the best steak I\'ve ever had. Ember & Crest has set a new standard for fine dining in Austin.', name: 'David M.', location: 'Austin, TX', stars: 5 },
  { text: 'Impeccable service and stunning ambiance. Our anniversary dinner was perfect from start to finish.', name: 'Jennifer L.', location: 'Austin, TX', stars: 5 },
  { text: 'Chef Marcus and his team create magic with fire. The seasonal menu never disappoints.', name: 'Robert K.', location: 'Austin, TX', stars: 5 },
  { text: 'The Hearth Room was ideal for our corporate dinner. Custom menu, attentive staff, unforgettable experience.', name: 'Sarah T.', location: 'Austin, TX', stars: 5 },
  { text: 'From the cocktails to the desserts, every detail was perfect. Already planning our next visit.', name: 'Michael P.', location: 'Austin, TX', stars: 5 },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="py-24 lg:py-32 bg-black-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cormorant italic text-xl lg:text-2xl text-white-primary leading-relaxed mb-6"
        >
          &ldquo;{t.text}&rdquo;
        </motion.p>
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(t.stars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-gold-primary text-gold-primary" />
          ))}
        </div>
        <p className="text-white-primary font-semibold">{t.name}</p>
        <p className="text-white-muted text-sm">{t.location}</p>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} className="text-white-muted hover:text-gold-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => setIndex((i) => (i + 1) % testimonials.length)} className="text-white-muted hover:text-gold-primary">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
