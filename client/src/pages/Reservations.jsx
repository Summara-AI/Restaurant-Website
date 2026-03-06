import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { createReservation } from '../services/api';
import { Button } from '../components/common/Button';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Phone required'),
  date: z.string().min(1, 'Date required'),
  time: z.string().min(1, 'Time required'),
  partySize: z.number().min(1).max(20),
  seatingPreference: z.enum(['Indoor', 'Outdoor Patio', 'Private Dining Room', 'Bar Area']),
  specialOccasion: z.enum(['None', 'Birthday', 'Anniversary', 'Business Dinner', 'Proposal', 'Other']).optional().default('None'),
  specialRequests: z.string().optional(),
  agreePolicy: z.boolean().refine((v) => v === true, 'You must agree to the cancellation policy'),
});

const times = ['5:00PM', '5:30PM', '6:00PM', '6:30PM', '7:00PM', '7:30PM', '8:00PM', '8:30PM', '9:00PM', '9:30PM', '10:00PM'];

export function Reservations() {
  const [searchParams] = useSearchParams();
  const initialDate = searchParams.get('date') || '';
  const initialParty = searchParams.get('partySize') || '2';

  const [step, setStep] = useState(1);
  const [bookingRef, setBookingRef] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date: initialDate,
      time: '7:00PM',
      partySize: Number(initialParty) || 2,
      seatingPreference: 'Indoor',
      specialOccasion: 'None',
      specialRequests: '',
      agreePolicy: false,
    },
  });

  const date = watch('date');
  const minDate = new Date().toISOString().split('T')[0];

  return (
    <main className="pt-24 min-h-screen bg-black-secondary">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">Reservations</p>
              <h1 className="font-playfair text-4xl font-semibold text-white-primary mb-8">Reserve a Table</h1>

              {bookingRef ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-black-card border border-gold-primary/30 rounded-lg p-8 text-center"
                >
                  <h2 className="font-playfair text-2xl text-gold-primary mb-4">Reservation Confirmed</h2>
                  <p className="text-white-muted mb-2">Your booking reference:</p>
                  <p className="font-playfair text-3xl text-white-primary mb-6">{bookingRef}</p>
                  <p className="text-white-muted text-sm">A confirmation email has been sent. We look forward to seeing you.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(async (data) => {
                    setLoading(true);
                    try {
                      const res = await createReservation({
                        ...data,
                        date: new Date(data.date).toISOString(),
                      });
                      setBookingRef(res.data.bookingRef);
                      toast.success('Reservation confirmed!');
                    } catch (err) {
                      toast.error(err.response?.data?.message || 'Failed to create reservation');
                    } finally {
                      setLoading(false);
                    }
                  })}
                  className="space-y-6"
                >
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Date *</label>
                          <input
                            type="date"
                            {...register('date')}
                            min={minDate}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          />
                          {errors.date && <p className="text-red-accent text-sm mt-1">{errors.date.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Time *</label>
                          <select
                            {...register('time')}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          >
                            {times.map((t) => (
                              <option key={t} value={t} className="bg-black-primary">{t}</option>
                            ))}
                          </select>
                          {errors.time && <p className="text-red-accent text-sm mt-1">{errors.time.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Party Size *</label>
                          <select
                            {...register('partySize', { valueAsNumber: true })}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          >
                            {[...Array(20)].map((_, i) => (
                              <option key={i} value={i + 1} className="bg-black-primary">{i + 1} guests</option>
                            ))}
                          </select>
                        </div>
                        <Button type="button" onClick={() => setStep(2)} className="w-full">Continue</Button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Full Name *</label>
                          <input
                            {...register('name')}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          />
                          {errors.name && <p className="text-red-accent text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Email *</label>
                          <input
                            type="email"
                            {...register('email')}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          />
                          {errors.email && <p className="text-red-accent text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Phone *</label>
                          <input
                            {...register('phone')}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          />
                          {errors.phone && <p className="text-red-accent text-sm mt-1">{errors.phone.message}</p>}
                        </div>
                        <div className="flex gap-4">
                          <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                          <Button type="button" onClick={() => setStep(3)}>Continue</Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Seating Preference *</label>
                          <select
                            {...register('seatingPreference')}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          >
                            <option value="Indoor" className="bg-black-primary">Indoor</option>
                            <option value="Outdoor Patio" className="bg-black-primary">Outdoor Patio</option>
                            <option value="Private Dining Room" className="bg-black-primary">Private Dining Room</option>
                            <option value="Bar Area" className="bg-black-primary">Bar Area</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Special Occasion</label>
                          <select
                            {...register('specialOccasion')}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          >
                            <option value="None" className="bg-black-primary">None</option>
                            <option value="Birthday" className="bg-black-primary">Birthday</option>
                            <option value="Anniversary" className="bg-black-primary">Anniversary</option>
                            <option value="Business Dinner" className="bg-black-primary">Business Dinner</option>
                            <option value="Proposal" className="bg-black-primary">Proposal</option>
                            <option value="Other" className="bg-black-primary">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-white-muted mb-2">Special Requests / Dietary Notes</label>
                          <textarea
                            {...register('specialRequests')}
                            rows={4}
                            className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                          />
                        </div>
                        <div>
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" {...register('agreePolicy')} className="mt-1" />
                            <span className="text-white-muted text-sm">I agree to the cancellation policy (48 hours notice required).</span>
                          </label>
                          {errors.agreePolicy && <p className="text-red-accent text-sm mt-1">{errors.agreePolicy.message}</p>}
                        </div>
                        <div className="flex gap-4">
                          <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
                          <Button type="submit" disabled={loading}>{loading ? 'Booking...' : 'Confirm Reservation'}</Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-black-card border border-black-border rounded-lg p-6 sticky top-28">
                <h3 className="font-playfair text-xl text-white-primary mb-4">Visit Us</h3>
                <p className="text-white-muted text-sm mb-4">
                  123 Congress Ave<br />Austin, TX 78701
                </p>
                <p className="text-white-muted text-sm mb-4">
                  <strong>Hours:</strong><br />
                  Mon–Thu: 5pm–10pm<br />
                  Fri–Sat: 5pm–11pm<br />
                  Sun: 4pm–9pm<br />
                  Closed Tuesday
                </p>
                <p className="text-white-muted text-sm mb-4">
                  <strong>Parking:</strong> Valet Thu–Sun, street parking available.
                </p>
                <p className="text-white-muted text-sm mb-4">
                  <strong>Cancellation:</strong> 48 hours notice required. No-shows may be charged.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-black-primary">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.296250554!2d-97.743!3d30.267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469ad57!2s123%20Congress%20Ave%2C%20Austin%2C%20TX%2078701!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Map"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
