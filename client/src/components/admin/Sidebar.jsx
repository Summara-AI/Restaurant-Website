import { NavLink, useNavigate } from 'react-router-dom';
import { Flame, LayoutDashboard, Calendar, Mail, UtensilsCrossed, FileText, Settings, LogOut } from 'lucide-react';
import { logout } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/reservations', label: 'Reservations', icon: Calendar },
  { to: '/admin/events', label: 'Event Inquiries', icon: Mail },
  { to: '/admin/contacts', label: 'Contact Messages', icon: Mail },
  { to: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
  { to: '/admin/blog', label: 'Blog', icon: FileText },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-black-secondary border-r border-black-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-black-border">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-gold-primary" />
          <span className="font-playfair font-semibold text-white-primary">Admin</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-red-primary/20 text-red-accent' : 'text-white-muted hover:text-white-primary hover:bg-black-card'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-black-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white-muted hover:text-red-accent hover:bg-red-primary/10 w-full"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
