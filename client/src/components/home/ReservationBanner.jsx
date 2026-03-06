import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';

const times = ['5:00PM', '5:30PM', '6:00PM', '6:30PM', '7:00PM', '7:30PM', '8:00PM', '8:30PM', '9:00PM', '9:30PM', '10:00PM'];

export function ReservationBanner() {
  const [date, setDate] = useState('');
  const [partySize, setPartySize] = useState('2');
  const navigate = useNavigate();

  const handleCheck = (e) => {
    e.preventDefault();
    if (date) navigate(`/reservations?date=${date}&partySize=${partySize}`);
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-red-primary to-red-hover">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-4xl lg:text-5xl font-semibold text-white-primary mb-8"
        >
          Reserve Your Table Tonight
        </motion.h2>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleCheck}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white-primary placeholder-white-muted focus:outline-none focus:ring-2 focus:ring-gold-primary"
          />
          <select
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white-primary focus:outline-none focus:ring-2 focus:ring-gold-primary"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n} className="bg-black-primary">{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
          <Button type="submit" variant="outline" className="border-white text-white hover:bg-white/20">
            Check Availability
          </Button>
        </motion.form>
        <p className="text-white/80 text-sm mt-4">
          Or <Link to="/reservations" className="underline hover:text-gold-light">go to full reservation form</Link>
        </p>
      </div>
    </section>
  );
}
