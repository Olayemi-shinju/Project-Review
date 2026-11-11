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

const sampleProjects = [
  {
    id: '1',
    title: 'Residential Solar Installation',
    location: 'Akure, Ondo State',
    category: 'Residential',
    status: 'Published',
    coverImage:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&q=80',
  },
  {
    id: '2',
    title: 'Commercial Solar System',
    location: 'Lagos, Nigeria',
    category: 'Commercial',
    status: 'Published',
    coverImage:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&q=80',
  },
  {
    id: '3',
    title: 'Solar Inverter Installation',
    location: 'Ibadan, Oyo State',
    category: 'Residential',
    status: 'Published',
    coverImage:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=300&q=80',
  },
];

function Dashboard() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          title="Total Projects"
          value="12"
          description="Projects in your portfolio"
          icon={FolderKanban}
        />

        <StatCard
          title="Published Projects"
          value="10"
          description="Visible on your website"
          icon={Eye}
        />

        <StatCard
          title="Project Images"
          value="48"
          description="Images across all projects"
          icon={Image}
        />
      </div>

      <ProjectTable projects={sampleProjects} />

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
