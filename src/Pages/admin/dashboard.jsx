
import { useEffect, useState } from 'react';
import {
  FolderKanban,
  Image,
  Eye,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import ProjectTable from '../../components/admin/ProjectTable';
import StatCard from '../../components/admin/StartCard';
import { getProjects } from '../../firebase/services/projectServices';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch dashboard projects:', err);
        setError('Unable to load project statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalProjects = projects.length;

  const publishedProjects = projects.filter(
    (project) => project.status === 'Published'
  ).length;

  const totalImages = projects.reduce((total, project) => {
    const galleryCount = Array.isArray(project.gallery)
      ? project.gallery.length
      : 0;

    const hasCoverImage = Boolean(
      project.coverImage || project.image
    );

    return total + galleryCount + (hasCoverImage ? 1 : 0);
  }, 0);

  const recentProjects = projects.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#102B46]">
            Overview
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Here's what's happening with your project portfolio.
          </p>
        </div>

        <Link
          to="/admin/projects/add"
          className="primary-button w-fit"
        >
          <Plus size={18} />
          Add New Project
        </Link>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          title="Total Projects"
          value={loading ? '...' : totalProjects}
          description="Projects in your portfolio"
          icon={FolderKanban}
        />

        <StatCard
          title="Published Projects"
          value={loading ? '...' : publishedProjects}
          description="Visible on your website"
          icon={Eye}
        />

        <StatCard
          title="Project Images"
          value={loading ? '...' : totalImages}
          description="Images across all projects"
          icon={Image}
        />
      </div>

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <p className="text-slate-500">Loading recent projects...</p>
        </div>
      ) : (
        <ProjectTable projects={recentProjects} />
      )}

      <div className="flex justify-end">
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] hover:text-[#D99A08]"
        >
          View all projects
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
