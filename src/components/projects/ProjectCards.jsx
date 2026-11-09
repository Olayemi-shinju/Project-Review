import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <article className="group bg-white p-3 rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 transition-colors duration-300">

      <Link
        to={`/projects/${project.slug}`}
        className="block relative h-[240px] overflow-hidden bg-[#F5F7FA]"
      >
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[#102B46]/0 group-hover:bg-[#102B46]/10 transition-colors duration-300" />

        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#102B46] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={19} />
        </div>
      </Link>

  
      <div className="p-5 sm:p-6">

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <MapPin size={14} />
          <span>{project.location}</span>
        </div>

        <Link to={`/projects/${project.slug}`}>
          <h3 className="text-lg font-bold text-[#102B46] group-hover:text-[#D99A08] transition-colors duration-200">
            {project.title}
          </h3>
        </Link>

        <p className="text-sm text-slate-500 leading-7 mt-3 line-clamp-2">
          {project.description}
        </p>

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#102B46] hover:text-[#D99A08] transition-colors"
        >
          View Project
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
