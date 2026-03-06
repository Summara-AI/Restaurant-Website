import { motion } from 'framer-motion';

export function Button({ children, variant = 'primary', className = '', size = 'md', ...props }) {
  const base = 'inline-flex items-center justify-center font-jost font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-red-primary hover:bg-red-hover text-white-primary rounded-full',
    outline: 'border-2 border-gold-primary text-gold-primary hover:bg-gold-primary/10 rounded-full',
    ghost: 'text-white-primary hover:bg-white/5 rounded-full',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
