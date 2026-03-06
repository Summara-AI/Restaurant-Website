import { motion } from 'framer-motion';
import { Flame, Users, Award, Clock } from 'lucide-react';

const team = [
  { name: 'Chef Marcus Dellacroix', title: 'Head Chef', bio: 'Lyon-born, Marcus brings decades of fire-cooking expertise. His wood-fired techniques have defined Ember & Crest since 2009.', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400' },
  { name: 'Elena Vasquez', title: 'Sous Chef', bio: 'Austin native with a passion for Texan ingredients. Elena leads our seasonal menu development and farm partnerships.', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400' },
  { name: 'James Thornton', title: 'Sommelier', bio: 'James curates our wine program, pairing Hill Country vintages with wood-fired flavors. Certified sommelier since 2012.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
];

const partners = ['Johnson Family Farm', 'Round Rock Heirlooms', 'Hill Country Beef Co.', 'Austin Honey Co.', 'Barton Springs Greens'];

const awards = ['2022 Best Fine Dining Austin', 'Zagat Rated', 'Wine Spectator Award of Excellence', 'Austin Chronicle Best Restaurant'];

const milestones = [
  { year: '2009', text: 'Ember & Crest opens on Congress Ave' },
  { year: '2012', text: 'Wine Spectator Award' },
  { year: '2016', text: 'The Hearth Room private dining opens' },
  { year: '2019', text: '10th anniversary celebration' },
  { year: '2022', text: 'Best Fine Dining Austin' },
  { year: '2025', text: '16 years of fire and flavor' },
];

export function About() {
  return (
    <main className="pt-24">
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920)` }} />
        <div className="absolute inset-0 bg-black-primary/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">Our Story</p>
          <h1 className="font-playfair text-5xl lg:text-7xl font-semibold text-white-primary">Our Story</h1>
        </div>
      </section>

      <section className="py-24 bg-black-secondary">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-primary text-xs uppercase tracking-widest mb-4"
          >
            The Beginning
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl text-white-primary mb-6"
          >
            From Lyon to Austin
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white-muted leading-relaxed"
          >
            Ember & Crest was born from Chef Marcus Dellacroix&apos;s vision: bring the soul of French hearth cooking to the heart of Texas. In 2009, we opened our doors on Congress Avenue, and Austin embraced us. Our wood-fired kitchen became a destination for those who believe that fire transforms ingredients into something transcendent.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-black-primary">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-primary text-xs uppercase tracking-widest mb-4"
          >
            Our Philosophy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl text-white-primary mb-6"
          >
            Farm to Flame
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white-muted leading-relaxed mb-4"
          >
            We source from local Austin and Hill Country farms. Our wood-fired grill and oven are the heart of the kitchen—every dish carries the signature of live fire. Seasonal, sustainable, and unapologetically Texan.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-black-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-primary text-xs uppercase tracking-widest mb-2 text-center"
          >
            Meet the Team
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl text-white-primary text-center mb-16"
          >
            The People Behind the Flame
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black-card rounded-lg overflow-hidden border border-black-border hover:border-red-primary/30 transition-colors"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h4 className="font-playfair text-xl font-semibold text-white-primary">{person.name}</h4>
                  <p className="text-gold-primary text-sm mb-2">{person.title}</p>
                  <p className="text-white-muted text-sm">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black-primary">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-primary text-xs uppercase tracking-widest mb-2 text-center"
          >
            Our Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white-muted text-center mb-12"
          >
            Local farms and suppliers we trust
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 bg-black-card border border-black-border rounded-lg text-white-muted font-medium"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black-secondary">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-primary text-xs uppercase tracking-widest mb-2 text-center"
          >
            Awards & Recognition
          </motion.h2>
          <ul className="space-y-3 mt-8">
            {awards.map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-white-primary"
              >
                <Award className="w-5 h-5 text-gold-primary shrink-0" />
                {a}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 overflow-x-auto">
        <div className="flex gap-8 min-w-max px-4 pb-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-48 text-center"
            >
              <span className="text-red-primary font-playfair text-3xl font-semibold block mb-2">{m.year}</span>
              <p className="text-white-muted text-sm">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
