import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMenu } from '../../services/api';
import { Button } from '../common/Button';

export function SignatureDishes() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getMenu().then((res) => {
      const chefs = res.data.filter((d) => d.isChefsPick).slice(0, 3);
      setDishes(chefs.length >= 3 ? chefs : res.data.slice(0, 3));
    }).catch(() => setDishes([]));
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-black-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold-primary text-xs uppercase tracking-widest mb-2"
        >
          Our Signatures
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-4xl lg:text-5xl font-semibold tracking-wide text-white-primary mb-16"
        >
          Chef&apos;s Favorites
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-black-card border border-black-border rounded-lg overflow-hidden hover:border-red-primary/50 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={dish.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                {dish.isChefsPick && (
                  <span className="text-red-accent text-xs font-semibold tracking-wider uppercase">Chef&apos;s Recommendation</span>
                )}
                <h3 className="font-playfair text-xl font-semibold text-white-primary mt-2">{dish.name}</h3>
                <p className="text-white-muted text-sm mt-1 line-clamp-2">{dish.description}</p>
                <p className="text-gold-primary font-semibold mt-3">${dish.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/menu">
            <Button variant="primary">View Full Menu</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
