import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSideBar';
import AdminNavbar from './AdminNavBar';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        <AdminNavbar />

        <main className="flex-1 p-5 sm:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
