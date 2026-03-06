import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';

export function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-black-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-playfair text-8xl text-red-primary font-semibold">404</h1>
        <p className="font-cormorant italic text-xl text-white-muted mt-4">Page not found</p>
        <p className="text-white-subtle text-sm mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="inline-block mt-8">
          <Button variant="primary">Return Home</Button>
        </Link>
      </motion.div>
    </main>
  );
}
