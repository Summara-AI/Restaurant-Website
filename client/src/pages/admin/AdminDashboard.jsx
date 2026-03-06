import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Mail, MessageSquare } from 'lucide-react';

export function AdminDashboard() {
  const { stats } = useOutletContext() || {};

  const cards = [
    { label: 'Reservations Today', value: stats?.todayReservations ?? '—', icon: Calendar, color: 'text-red-accent' },
    { label: 'Reservations This Week', value: stats?.weekReservations ?? '—', icon: Calendar, color: 'text-gold-primary' },
    { label: 'Pending Event Inquiries', value: stats?.pendingInquiries ?? '—', icon: Users, color: 'text-gold-primary' },
    { label: 'Contact Messages', value: stats?.totalContacts ?? '—', icon: MessageSquare, color: 'text-white-muted' },
  ];

  return (
    <div className="p-8">
      <h1 className="font-playfair text-3xl text-white-primary mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-black-card border border-black-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-white-muted text-sm">{card.label}</span>
              <card.icon className={`w-8 h-8 ${card.color}`} />
            </div>
            <p className="font-playfair text-3xl text-white-primary mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
