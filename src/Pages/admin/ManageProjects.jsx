import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import ProjectTable from '../../components/admin/ProjectTable';
import {
  getProjects,
  deleteProject,
} from '../../firebase/services/projectServices';

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Unable to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const searchValue = search.toLowerCase();

    return (
      project.title?.toLowerCase().includes(searchValue) ||
      project.location?.toLowerCase().includes(searchValue)
    );
  });

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteProject(project.id);

      setProjects((currentProjects) =>
        currentProjects.filter((item) => item.id !== project.id)
      );
    } catch (err) {
      console.error('Failed to delete project:', err);
      setError('Unable to delete project. Please try again.');
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#102B46]">
            Manage Projects
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            View and manage all your solar installations.
          </p>
        </div>

        <Link to="/admin/projects/add" className="primary-button w-fit">
          <Plus size={18} />
          Add New Project
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name or location..."
            className="w-full border border-slate-200 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-[#102B46]"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </p>
      )}

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <p className="text-slate-500">Loading projects...</p>
        </div>
      ) : (
        <>
          <ProjectTable
            projects={filteredProjects}
            onDelete={handleDelete}
          />

          <p className="text-sm text-slate-500">
            Showing {filteredProjects.length} of {projects.length} projects.
          </p>
        </>
      )}
    </div>
  );
}

export default ManageProjects;
