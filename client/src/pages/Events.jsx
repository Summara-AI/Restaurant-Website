import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { createEventInquiry } from '../services/api';
import { Button } from '../components/common/Button';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  eventType: z.string().min(1),
  date: z.string().min(1),
  guestCount: z.number().min(1),
  message: z.string().optional(),
});

const packages = [
  { name: 'Bronze', price: '$75', desc: 'Per person, 15 guest minimum. Basic AV, house menu.', features: ['Private room', 'Dedicated server', 'House menu'] },
  { name: 'Silver', price: '$95', desc: 'Per person, 15 guest minimum. Full AV, custom menu options.', features: ['Private room', 'Dedicated server', 'Custom menu', 'AV equipment'] },
  { name: 'Gold', price: '$125', desc: 'Per person, 20 guest minimum. Full venue buyout available.', features: ['Full venue option', 'Executive chef', 'Custom menu', 'Premium bar'] },
];

export function Events() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { eventType: 'Private Dining Room', guestCount: 10 },
  });

  return (
    <main className="pt-24">
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920)` }} />
        <div className="absolute inset-0 bg-black-primary/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">Private Dining & Events</p>
          <h1 className="font-playfair text-5xl lg:text-7xl font-semibold text-white-primary">Host With Us</h1>
        </div>
      </section>

      <section className="py-24 bg-black-secondary">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {[
            { title: 'The Hearth Room', cap: 20, desc: 'Our private dining room seats up to 20 guests. Full AV, custom menus, dedicated service. Ideal for corporate dinners, celebrations, and intimate gatherings.', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', flip: false },
            { title: 'Corporate Events', cap: null, desc: 'Impress clients and colleagues. We offer tailored menus, AV support, and flexible layouts for meetings, product launches, and team celebrations.', img: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800', flip: true },
            { title: 'Special Occasions', cap: null, desc: 'Birthdays, anniversaries, proposals—we make them memorable. Custom cakes, champagne toasts, and a team that cares about every detail.', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', flip: false },
            { title: 'Full Venue Buyout', cap: 80, desc: 'Have the entire restaurant to yourself. Perfect for large celebrations, company parties, and exclusive events. Capacity up to 80 guests.', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', flip: true },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${s.flip ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={s.flip ? 'lg:order-2' : ''}>
                <img src={s.img} alt={s.title} className="w-full aspect-[4/3] object-cover rounded-lg" />
              </div>
              <div className={s.flip ? 'lg:order-1' : ''}>
                <h2 className="font-playfair text-3xl text-white-primary mb-4">{s.title}</h2>
                {s.cap && <p className="text-gold-primary text-sm mb-2">Capacity: {s.cap} guests</p>}
                <p className="text-white-muted leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-black-primary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-playfair text-3xl text-white-primary text-center mb-12">Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black-card border border-black-border rounded-lg p-6 hover:border-gold-primary/50 transition-colors"
              >
                <h3 className="font-playfair text-xl text-gold-primary mb-2">{pkg.name}</h3>
                <p className="text-2xl font-semibold text-white-primary mb-2">{pkg.price}</p>
                <p className="text-white-muted text-sm mb-4">{pkg.desc}</p>
                <ul className="space-y-2">
                  {pkg.features.map((f) => (
                    <li key={f} className="text-white-muted text-sm">• {f}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black-secondary">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-playfair text-3xl text-white-primary mb-8">Inquiry Form</h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              setLoading(true);
              try {
                await createEventInquiry({
                  ...data,
                  date: new Date(data.date).toISOString(),
                });
                toast.success('Inquiry sent! We will contact you soon.');
                reset();
              } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to send');
              } finally {
                setLoading(false);
              }
            })}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-white-muted mb-2">Name *</label>
              <input {...register('name')} className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary" />
              {errors.name && <p className="text-red-accent text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-white-muted mb-2">Email *</label>
              <input type="email" {...register('email')} className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary" />
              {errors.email && <p className="text-red-accent text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-white-muted mb-2">Phone *</label>
              <input {...register('phone')} className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary" />
              {errors.phone && <p className="text-red-accent text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-white-muted mb-2">Event Type *</label>
              <select {...register('eventType')} className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary">
                <option value="Private Dining Room">Private Dining Room</option>
                <option value="Corporate Events">Corporate Events</option>
                <option value="Special Occasions">Special Occasions</option>
                <option value="Buyout / Full Venue">Buyout / Full Venue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white-muted mb-2">Date *</label>
              <input type="date" {...register('date')} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary" />
              {errors.date && <p className="text-red-accent text-sm">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-white-muted mb-2">Guest Count *</label>
              <input type="number" {...register('guestCount', { valueAsNumber: true })} min={1} className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary" />
              {errors.guestCount && <p className="text-red-accent text-sm">{errors.guestCount.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-white-muted mb-2">Message</label>
              <textarea {...register('message')} rows={4} className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary" />
            </div>
            <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Submit Inquiry'}</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
