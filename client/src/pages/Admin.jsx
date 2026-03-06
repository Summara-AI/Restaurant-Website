import { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/admin/Sidebar';
import { getReservations, getEventInquiries, getContacts } from '../services/api';

export function Admin() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([getReservations(), getEventInquiries(), getContacts()])
      .then(([res, ev, con]) => {
        const today = new Date().toISOString().split('T')[0];
        const reservations = res.data;
        const todayRes = reservations.filter((r) => new Date(r.date).toISOString().split('T')[0] === today);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekRes = reservations.filter((r) => new Date(r.date) >= weekAgo);
        const pendingInq = ev.data.filter((e) => e.status === 'new').length;
        setStats({
          todayReservations: todayRes.length,
          weekReservations: weekRes.length,
          pendingInquiries: pendingInq,
          totalContacts: con.data.length,
        });
      })
      .catch(() => setStats({ todayReservations: 0, weekReservations: 0, pendingInquiries: 0, totalContacts: 0 }));
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <div className="flex min-h-screen bg-black-primary">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet context={{ stats }} />
      </main>
    </div>
  );
}
