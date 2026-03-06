import { useState, useEffect } from 'react';
import { getContacts } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContacts().then((res) => {
      setContacts(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="p-8">
      <h1 className="font-playfair text-3xl text-white-primary mb-6">Contact Messages</h1>
      <div className="space-y-4">
        {contacts.map((c) => (
          <div key={c._id} className="bg-black-card border border-black-border rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-playfair text-lg text-white-primary">{c.name}</h3>
                <p className="text-white-muted text-sm">{c.email}</p>
                <p className="text-gold-primary text-sm mt-1">{c.subject}</p>
                <p className="text-white-subtle text-sm mt-2">{c.message}</p>
              </div>
              <span className="text-white-subtle text-xs">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
