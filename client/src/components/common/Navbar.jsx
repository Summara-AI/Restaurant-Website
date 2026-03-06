import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollPosition();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const bgClass = scrolled || !isHome
    ? 'bg-black-primary/95 backdrop-blur-md border-b border-black-border'
    : 'bg-transparent';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-gold-primary" />
              <span className="font-playfair text-xl font-semibold tracking-wide text-white-primary">
                Ember & Crest
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `font-jost text-sm tracking-wide transition-colors ${
                      isActive ? 'text-gold-primary border-b border-gold-primary pb-0.5' : 'text-white-muted hover:text-white-primary'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:block">
              <Link to="/reservations">
                <Button variant="primary" size="sm">Reserve a Table</Button>
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-white-primary"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black-primary lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <button className="absolute top-6 right-6 p-2" onClick={() => setOpen(false)}>
                <X className="w-6 h-6" />
              </button>
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="font-playfair text-2xl text-white-primary hover:text-gold-primary"
                >
                  {label}
                </NavLink>
              ))}
              <Link to="/reservations" onClick={() => setOpen(false)}>
                <Button variant="primary">Reserve a Table</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
