import { useState, useEffect } from 'react';
import { getEventInquiries, updateEventInquiry } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export function AdminEvents() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventInquiries().then((res) => {
      setInquiries(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateEventInquiry(id, { status });
      setInquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)));
      toast.success('Updated');
    } catch (err) {
      toast.error('Failed');
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="p-8">
      <h1 className="font-playfair text-3xl text-white-primary mb-6">Event Inquiries</h1>
      <div className="space-y-4">
        {inquiries.map((e) => (
          <div key={e._id} className="bg-black-card border border-black-border rounded-lg p-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h3 className="font-playfair text-lg text-white-primary">{e.name}</h3>
                <p className="text-white-muted text-sm">{e.email} · {e.phone}</p>
                <p className="text-white-muted text-sm mt-2">{e.eventType} · {e.guestCount} guests · {new Date(e.date).toLocaleDateString()}</p>
                {e.message && <p className="text-white-subtle text-sm mt-2">{e.message}</p>}
              </div>
              <div className="flex gap-2">
                <select
                  value={e.status}
                  onChange={(ev) => updateStatus(e._id, ev.target.value)}
                  className="bg-black-primary border border-black-border rounded px-3 py-2 text-white-primary text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="booked">Booked</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
