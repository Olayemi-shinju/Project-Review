import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Sun,
  ExternalLink,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Projects',
    path: '/admin/projects',
    icon: FolderKanban,
  },
];

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#102B46] text-white flex flex-col shrink-0">
      <div className="h-20 px-6 flex items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#F4B928] flex items-center justify-center">
            <Sun size={21} className="text-[#102B46]" />
          </div>

          <div>
            <h1 className="font-bold text-lg tracking-wide">QUICKVIEW</h1>
            <p className="text-[10px] text-white/50 tracking-widest uppercase">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-7 flex-1">
        <p className="text-[11px] uppercase tracking-widest text-white/40 font-semibold px-3 mb-4">
          Workspace
        </p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F4B928] text-[#102B46]'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          View Website
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;
