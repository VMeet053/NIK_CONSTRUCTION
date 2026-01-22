import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Projects', path: '/admin/projects' },
  { name: 'Services', path: '/admin/services' },
  { name: 'Testimonials', path: '/admin/testimonials' },
  { name: 'Clients', path: '/admin/clients' },
  { name: 'Achievements', path: '/admin/achievements' },
  { name: 'Blog', path: '/admin/blog' },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-black text-white min-h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wider uppercase text-indigo-500">Admin Panel</h1>
        <p className="text-xs text-gray-400 mt-1">Kirti Construction Content Manager</p>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-bold' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-800 space-y-3">
        <Link 
          to="/" 
          className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-indigo-900/50 hover:text-indigo-200 transition-all text-sm font-medium border border-transparent hover:border-indigo-500/30"
        >
          View Live Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/30 rounded-lg hover:bg-red-900/40 transition-colors text-sm font-medium"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
