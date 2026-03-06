import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', filter: 'Food' },
  { src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800', filter: 'Food' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', filter: 'Food' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', filter: 'Ambiance' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', filter: 'Ambiance' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800', filter: 'Ambiance' },
  { src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800', filter: 'Team' },
  { src: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=800', filter: 'Team' },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', filter: 'Events' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', filter: 'Events' },
  { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800', filter: 'Food' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', filter: 'Food' },
  { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', filter: 'Ambiance' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800', filter: 'Events' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800', filter: 'Ambiance' },
];

const FILTERS = ['All', 'Food', 'Ambiance', 'Team', 'Events'];

export function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'All' ? images : images.filter((i) => i.filter === filter);

  return (
    <main className="pt-24">
      <section className="py-16 bg-black-secondary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">Gallery</p>
          <h1 className="font-playfair text-4xl lg:text-6xl font-semibold text-white-primary">A Visual Journey</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm ${filter === f ? 'bg-red-primary text-white-primary' : 'bg-black-card text-white-muted hover:text-white-primary'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {filtered.map((img, i) => (
            <motion.div
              key={`${img.src}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="break-inside-avoid cursor-pointer"
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={`Gallery ${i + 1}`}
                className="w-full rounded-lg object-cover hover:opacity-90 transition-opacity"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white p-2" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Lightbox"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
