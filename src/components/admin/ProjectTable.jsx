import { Link } from 'react-router-dom';
import { Pencil, Trash2, MapPin } from 'lucide-react';

function ProjectTable({ projects = [], onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-5 border-b border-slate-100">
        <h3 className="font-bold text-[#102B46]">
          Recent Projects
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Manage your company's solar installations.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[650px]">
          <thead className="bg-slate-50">
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4 font-semibold">Project</th>
              <th className="px-5 py-4 font-semibold">Location</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                      />

                      <div>
                        <p className="text-sm font-semibold text-[#102B46]">
                          {project.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {project.category || 'Solar Installation'}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin size={14} />
                      {project.location}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                      {project.status || 'Published'}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end items-center gap-2">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        aria-label={`Edit ${project.title}`}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onDelete?.(project)}
                        aria-label={`Delete ${project.title}`}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-12 text-center text-sm text-slate-400"
                >
                  No projects available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectTable;
