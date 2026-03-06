import { motion } from 'framer-motion';

export function AdminSettings() {
  return (
    <div className="p-8">
      <h1 className="font-playfair text-3xl text-white-primary mb-6">Settings</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black-card border border-black-border rounded-lg p-6 max-w-xl"
      >
        <p className="text-white-muted">
          Restaurant hours, contact info, and other settings can be updated here. This section can be extended to connect to a settings API or environment variables.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-white-muted mb-2">Restaurant Hours</label>
            <p className="text-white-primary text-sm">
              Mon–Thu: 5pm–10pm · Fri–Sat: 5pm–11pm · Sun: 4pm–9pm · Closed Tuesday
            </p>
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Address</label>
            <p className="text-white-primary text-sm">123 Congress Ave, Austin, TX 78701</p>
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Phone</label>
            <p className="text-white-primary text-sm">(512) 555-0192</p>
          </div>
          <div>
            <label className="block text-sm text-white-muted mb-2">Email</label>
            <p className="text-white-primary text-sm">hello@emberandcrest.com</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
