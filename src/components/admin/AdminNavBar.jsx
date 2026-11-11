
import { Bell, UserRound, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logoutAdmin } from '../../firebase/services/authService';


function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const pageTitles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/projects': 'Manage Projects',
    '/admin/projects/add': 'Add New Project',
  };

  const pageTitle =
    pageTitles[location.pathname] ||
    (location.pathname.includes('/edit')
      ? 'Edit Project'
      : 'Admin Panel');

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logoutAdmin();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      setLoggingOut(false);
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-5 sm:px-8 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-[#102B46]">
          {pageTitle}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Welcome to your workspace
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="w-10 h-10 rounded-full bg-[#F4B928]/20 flex items-center justify-center">
            <UserRound size={20} className="text-[#102B46]" />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#102B46]">
              Administrator
            </p>
            <p className="text-xs text-slate-500">
              Admin account
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">
            {loggingOut ? 'Logging out...' : 'Logout'}
          </span>
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;
