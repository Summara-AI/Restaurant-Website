import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMenu } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Divider } from '../components/common/Divider';

const CATEGORIES = [
  'All', 'Starters', 'Soups & Salads', 'Mains', 'Pasta & Risotto',
  'Grills & Steaks', 'Vegetarian', 'Desserts', 'Cocktails', 'Wine', 'Non-Alcoholic'
];

const FILTERS = ['All', 'Vegetarian', 'Gluten-Free', "Chef's Pick"];

export function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getMenu().then((res) => {
      setItems(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = items.filter((item) => {
    if (category !== 'All' && item.category !== category) return false;
    if (filter === 'Vegetarian' && !item.tags?.includes('V')) return false;
    if (filter === 'Gluten-Free' && !item.tags?.includes('GF')) return false;
    if (filter === "Chef's Pick" && !item.isChefsPick) return false;
    return true;
  });

  const byCategory = CATEGORIES.slice(1).reduce((acc, cat) => {
    acc[cat] = filtered.filter((i) => i.category === cat);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24 bg-black-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">Our Menu</p>
          <h1 className="font-playfair text-4xl lg:text-6xl font-semibold tracking-wide text-white-primary">
            Culinary Excellence
          </h1>
          <p className="font-cormorant italic text-white-muted mt-4">Seasonal ingredients, wood-fired passion</p>
        </div>
      </section>

      <div className="sticky top-20 z-40 bg-black-primary/95 backdrop-blur border-b border-black-border py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f ? 'bg-red-primary text-white-primary' : 'bg-black-card text-white-muted hover:text-white-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  category === cat ? 'bg-gold-primary/20 text-gold-primary border border-gold-primary' : 'text-white-muted hover:text-white-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {CATEGORIES.slice(1).map((cat) => {
              const list = category === 'All' ? byCategory[cat] : (category === cat ? byCategory[cat] : []);
              if (!list?.length) return null;
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-16"
                >
                  <Divider />
                  <h2 className="text-gold-primary text-sm uppercase tracking-widest mb-6">{cat}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {list.map((item, i) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{ x: 4 }}
                        className="flex gap-4 p-4 rounded-lg border border-transparent hover:border-red-primary/30 hover:bg-black-card/50 transition-all group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-playfair text-lg font-semibold text-white-primary">
                              {item.name}
                              {item.isChefsPick && (
                                <span className="ml-2 text-red-accent text-xs font-normal">Chef&apos;s Recommendation</span>
                              )}
                            </h3>
                            <span className="text-gold-primary font-semibold shrink-0">${item.price}</span>
                          </div>
                          <p className="text-white-muted text-sm mt-1 line-clamp-2">{item.description}</p>
                          {item.tags?.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {item.tags.map((t) => (
                                <span key={t} className="text-xs text-white-subtle bg-black-border px-2 py-0.5 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
