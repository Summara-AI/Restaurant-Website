import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400',
];

export function GalleryStrip() {
  return (
    <section className="py-16 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4"
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} className="relative flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden group">
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-red-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
