import { Link } from 'react-router-dom';
import { Flame, Instagram, Facebook, Twitter } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="bg-black-primary border-t border-gold-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-gold-primary" />
              <span className="font-playfair text-lg font-semibold">Ember & Crest</span>
            </Link>
            <p className="font-cormorant italic text-white-muted text-sm">
              Where Fire Meets Flavor. Since 2009.
            </p>
          </div>

          <div>
            <h4 className="font-playfair text-sm uppercase tracking-wider text-gold-primary mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white-muted hover:text-white-primary text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li><Link to="/reservations" className="text-white-muted hover:text-white-primary text-sm">Reservations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-sm uppercase tracking-wider text-gold-primary mb-4">Hours</h4>
            <p className="text-white-muted text-sm space-y-1">
              Mon–Thu: 5:00 PM – 10:00 PM<br />
              Fri–Sat: 5:00 PM – 11:00 PM<br />
              Sun: 4:00 PM – 9:00 PM<br />
              <span className="text-white-subtle">Closed Tuesday</span>
            </p>
          </div>

          <div>
            <h4 className="font-playfair text-sm uppercase tracking-wider text-gold-primary mb-4">Contact</h4>
            <p className="text-white-muted text-sm space-y-1">
              123 Congress Ave<br />
              Austin, TX 78701<br />
              <a href="tel:5125550192" className="hover:text-white-primary">(512) 555-0192</a><br />
              <a href="mailto:hello@emberandcrest.com" className="hover:text-white-primary">hello@emberandcrest.com</a>
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/emberandcrest" target="_blank" rel="noopener noreferrer" className="text-white-muted hover:text-gold-primary">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/emberandcrest" target="_blank" rel="noopener noreferrer" className="text-white-muted hover:text-gold-primary">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/emberandcrest" target="_blank" rel="noopener noreferrer" className="text-white-muted hover:text-gold-primary">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black-border flex flex-col sm:flex-row justify-between items-center gap-4 text-white-subtle text-sm">
          <p>© {new Date().getFullYear()} Ember & Crest. Made in Austin, TX.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white-muted">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white-muted">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
