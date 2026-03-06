import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export function AboutSnippet() {
  return (
    <section className="py-24 lg:py-32 bg-black-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"
              alt="Ember & Crest restaurant interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 px-4 py-2 bg-gold-primary/90 text-black-primary text-xs font-semibold tracking-wider uppercase">
              Established 2009 · Downtown Austin
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold-primary text-xs uppercase tracking-widest mb-4">Our Story</p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-semibold tracking-wide text-white-primary mb-6">
              A Taste of Austin, Refined by Fire
            </h2>
            <p className="text-white-muted leading-relaxed mb-6">
              Nestled in the heart of downtown Austin, Ember & Crest has been a beacon of culinary excellence since 2009. Our kitchen centers on wood-fired cooking—harnessing live flames to transform locally sourced ingredients into unforgettable dishes.
            </p>
            <p className="text-white-muted leading-relaxed mb-8">
              We partner with Texas Hill Country farms and ranches, bringing the best of the region to your plate. From our signature wood-grilled ribeye to seasonal vegetables kissed by the flame, every bite tells a story of place and passion.
            </p>
            <Link to="/about">
              <Button variant="outline">Learn Our Story</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
