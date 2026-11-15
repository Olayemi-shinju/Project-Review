
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  const image = project.coverImage || project.image;

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-[#D99A08]/60 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
      <Link
        to={`/projects/${project.slug}`}
        className="block relative aspect-[4/3] overflow-hidden bg-[#F5F7FA]"
      >
        {image ? (
          <img
            src={image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
            Project image unavailable
          </div>
        )}

        <div className="absolute inset-0 bg-[#102B46]/0 group-hover:bg-[#102B46]/10 transition-colors duration-300" />

        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#102B46] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={18} />
        </div>

        {project.category && (
          <span className="absolute bottom-3 left-3 bg-white/95 text-[#102B46] text-[11px] font-bold px-3 py-1.5 rounded-md">
            {project.category}
          </span>
        )}
      </Link>

      <div className="p-4 sm:p-5">
        {project.location && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5">
            <MapPin size={13} />
            <span>{project.location}</span>
          </div>
        )}

        <Link to={`/projects/${project.slug}`}>
          <h3 className="text-base sm:text-lg font-bold text-[#102B46] group-hover:text-[#D99A08] transition-colors duration-200 line-clamp-2">
            {project.title}
          </h3>
        </Link>

        <p className="text-sm text-slate-500 leading-6 mt-2 line-clamp-2">
          {project.description || 'Explore this completed solar installation.'}
        </p>

        <div className="border-t border-slate-100 mt-4 pt-3">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] hover:text-[#D99A08] transition-colors"
          >
            View Project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
