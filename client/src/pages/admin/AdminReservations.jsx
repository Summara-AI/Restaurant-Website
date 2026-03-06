import { useState, useEffect } from 'react';
import { getReservations, updateReservation, deleteReservation } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

export function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getReservations().then((res) => {
      setReservations(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? reservations
    : reservations.filter((r) => r.status === filter);

  const updateStatus = async (id, status) => {
    try {
      await updateReservation(id, { status });
      setReservations((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
      toast.success('Updated');
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this reservation?')) return;
    try {
      await deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r._id !== id));
      toast.success('Deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="p-8">
      <h1 className="font-playfair text-3xl text-white-primary mb-6">Reservations</h1>
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'confirmed', 'cancelled', 'no-show'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm ${filter === f ? 'bg-red-primary text-white-primary' : 'bg-black-card text-white-muted'}`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-black-card border border-black-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black-border">
                <th className="text-left p-4 text-white-muted font-medium">Ref</th>
                <th className="text-left p-4 text-white-muted font-medium">Name</th>
                <th className="text-left p-4 text-white-muted font-medium">Date</th>
                <th className="text-left p-4 text-white-muted font-medium">Time</th>
                <th className="text-left p-4 text-white-muted font-medium">Party</th>
                <th className="text-left p-4 text-white-muted font-medium">Status</th>
                <th className="text-left p-4 text-white-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-b border-black-border hover:bg-black-primary/50">
                  <td className="p-4 text-white-primary font-mono">{r.bookingRef}</td>
                  <td className="p-4 text-white-primary">{r.name}</td>
                  <td className="p-4 text-white-muted">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="p-4 text-white-muted">{r.time}</td>
                  <td className="p-4 text-white-muted">{r.partySize}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      r.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                      r.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                      r.status === 'no-show' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {r.status !== 'confirmed' && (
                      <button onClick={() => updateStatus(r._id, 'confirmed')} className="text-green-400 text-xs hover:underline">Confirm</button>
                    )}
                    {r.status !== 'cancelled' && (
                      <button onClick={() => updateStatus(r._id, 'cancelled')} className="text-red-400 text-xs hover:underline">Cancel</button>
                    )}
                    {r.status !== 'no-show' && (
                      <button onClick={() => updateStatus(r._id, 'no-show')} className="text-orange-400 text-xs hover:underline">No-Show</button>
                    )}
                    <button onClick={() => remove(r._id)} className="text-white-subtle text-xs hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
