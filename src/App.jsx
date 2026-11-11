import { Routes, Route, Link } from 'react-router-dom';

import Home from './Pages/Home';
import Projects from './Pages/Projects';
import ProjectDetails from './Pages/ProjectDetails';
import About from './Pages/About';
import Contact from './Pages/Contact';

import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './Pages/admin/AdminLogin';
import ManageProjects from './Pages/admin/ManageProjects';
import AddProject from './Pages/admin/Addprojects';
import EditProject from './Pages/admin/EditProjects';
import Dashboard from './Pages/admin/dashboard';

import ProtectedRoute from './Pages/admin/ProtectedRoute';

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#102B46]">
          404
        </h1>

        <p className="text-slate-500 mt-3">
          Sorry, this page could not be found.
        </p>

        <Link to="/" className="primary-button mt-7">
          Return Home
        </Link>
      </div>
    </main>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="projects/add" element={<AddProject />} />
        <Route path="projects/edit/:id" element={<EditProject />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
