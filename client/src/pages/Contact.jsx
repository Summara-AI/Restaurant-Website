import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { createContact } from '../services/api';
import { Button } from '../components/common/Button';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(1, 'Subject required'),
  message: z.string().min(10, 'Message required'),
});

export function Contact() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <main className="pt-24 min-h-screen bg-black-secondary">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <p className="text-gold-primary text-xs uppercase tracking-widest mb-2">Contact</p>
              <h1 className="font-playfair text-4xl font-semibold text-white-primary mb-8">Get in Touch</h1>

              <form
                onSubmit={handleSubmit(async (data) => {
                  setLoading(true);
                  try {
                    await createContact(data);
                    toast.success('Message sent! We will respond soon.');
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
                  <label className="block text-sm text-white-muted mb-2">Subject *</label>
                  <select
                    {...register('subject')}
                    className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                  >
                    <option value="" className="bg-black-primary">Select...</option>
                    <option value="Reservation" className="bg-black-primary">Reservation</option>
                    <option value="Private Dining" className="bg-black-primary">Private Dining</option>
                    <option value="General Inquiry" className="bg-black-primary">General Inquiry</option>
                    <option value="Feedback" className="bg-black-primary">Feedback</option>
                    <option value="Other" className="bg-black-primary">Other</option>
                  </select>
                  {errors.subject && <p className="text-red-accent text-sm mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="block text-sm text-white-muted mb-2">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className="w-full px-4 py-3 bg-black-card border border-black-border rounded-lg text-white-primary focus:ring-2 focus:ring-gold-primary"
                  />
                  {errors.message && <p className="text-red-accent text-sm mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-black-card border border-black-border rounded-lg p-6 sticky top-28">
                <h3 className="font-playfair text-xl text-white-primary mb-4">Visit Us</h3>
                <p className="text-white-muted text-sm mb-4">
                  123 Congress Ave<br />Austin, TX 78701
                </p>
                <p className="text-white-muted text-sm mb-4">
                  <strong>Phone:</strong> (512) 555-0192<br />
                  <strong>Email:</strong> hello@emberandcrest.com
                </p>
                <p className="text-white-muted text-sm mb-4">
                  <strong>Hours:</strong><br />
                  Mon–Thu: 5pm–10pm<br />
                  Fri–Sat: 5pm–11pm<br />
                  Sun: 4pm–9pm<br />
                  Closed Tuesday
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-black-primary mt-4">
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
