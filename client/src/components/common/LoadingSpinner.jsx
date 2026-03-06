import { motion } from 'framer-motion';

export function LoadingSpinner({ className = '' }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`w-10 h-10 border-2 border-gold-primary/30 border-t-gold-primary rounded-full ${className}`}
    />
  );
}
