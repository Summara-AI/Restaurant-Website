import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Heart } from 'lucide-react';

const items = [
  { num: '01', icon: Flame, title: 'Ambiance', desc: 'Warm, intimate dining in the heart of downtown Austin. Dark wood, soft lighting, and the glow of our open kitchen.' },
  { num: '02', icon: UtensilsCrossed, title: 'Cuisine', desc: 'Contemporary American with wood-fire influence. Seasonal Texan ingredients, craft cocktails, and Chef Marcus\' signature techniques.' },
  { num: '03', icon: Heart, title: 'Service', desc: 'Attentive, knowledgeable staff dedicated to making every visit memorable. From wine pairings to dietary accommodations.' },
];

export function Experience() {
  return (
    <section className="py-24 lg:py-32 bg-black-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[length:60px_60px] bg-[radial-gradient(circle_at_1px_1px,rgba(201,168,76,0.3)_1px,transparent_0)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <span className="font-playfair text-4xl text-red-primary font-semibold">{item.num}</span>
              <div className="flex justify-center my-4">
                <item.icon className="w-10 h-10 text-gold-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-white-primary mb-3">{item.title}</h3>
              <p className="text-white-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
