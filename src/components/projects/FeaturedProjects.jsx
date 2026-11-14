
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCards';
import { getPublishedProjects } from '../../firebase/services/projectServices';

function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getPublishedProjects();

        setProjects(
          data.slice(0, 3).map((project) => ({
            ...project,
            coverImage: project.coverImage || project.image,
          }))
        );
      } catch (err) {
        console.error('Failed to fetch featured projects:', err);
        setError('Unable to load featured projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-[#F5F7FA] section-padding">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold text-[#D99A08] uppercase tracking-wider mb-3">
              Our Portfolio
            </p>

            <h2 className="section-title">
              Projects We've Delivered
            </h2>

            <p className="section-description mt-4">
              Take a look at some of our completed solar installations
              and the work we are proud to showcase.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] hover:text-[#D99A08] transition-colors shrink-0"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            Loading featured projects...
          </div>
        ) : error ? (
          <div className="py-16 text-center text-red-600">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            Our featured projects will appear here soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 p-3 lg:grid-cols-3 gap-7">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProjects;
